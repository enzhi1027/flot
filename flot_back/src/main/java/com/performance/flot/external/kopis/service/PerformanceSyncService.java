package com.performance.flot.external.kopis.service;

import com.performance.flot.external.kopis.dto.FacilityDetailDTO;
import com.performance.flot.external.kopis.dto.PerformanceDTO;
import com.performance.flot.external.kopis.dto.PerformanceDetailDTO;
import com.performance.flot.external.kopis.dto.PerformanceListDTO;
import com.performance.flot.external.kopis.parser.XmlParserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class PerformanceSyncService {

    private final KopisApiService kopisApiService;
    private final XmlParserService xmlParserService;
    private final KopisSaveService kopisSaveService;

    public void syncKopisData() {
        String stdate = LocalDate.now().minusMonths(2).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String eddate = LocalDate.now().plusMonths(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        syncKopisDataByPeriod(stdate, eddate);
    }

    public void syncKopisDataByPeriod(String stdate, String eddate) {
        log.info("=== Kopis 데이터 동기화 시작 (기간: {} ~ {}) ===", stdate, eddate);

        int cpage = 1;
        int rows = 100;
        boolean hasMoreData = true;
        int totalProcessed = 0;

        while (hasMoreData) {
            try {
                log.info("▶ Kopis 목록 조회 중... (페이지: {}, 개수: {})", cpage, rows);
                String listXml = kopisApiService.getPerformanceListXml(stdate, eddate, cpage, rows);
                PerformanceListDTO listDto = xmlParserService.parse(listXml, PerformanceListDTO.class);

                if (listDto == null || listDto.getPerformances() == null || listDto.getPerformances().isEmpty()) {
                    log.info("{} ~ {} 기간의 데이터 수집 완료. 종료합니다.", stdate, eddate);
                    hasMoreData = false;
                    break;
                }

                for (PerformanceDTO perf : listDto.getPerformances()) {
                    try {
                        String detailXml = kopisApiService.getPerformanceDetailXml(perf.getMt20id());
                        PerformanceDetailDTO detailDto = xmlParserService.parse(detailXml, PerformanceDetailDTO.class);

                        if (detailDto != null && detailDto.getDb() != null) {
                            PerformanceDetailDTO.DetailDb db = detailDto.getDb();
                            FacilityDetailDTO facDto = null;

                            if (db.getMt10id() != null && !db.getMt10id().isBlank()) {
                                try {
                                    String facXml = kopisApiService.getFacilityDetailXml(db.getMt10id());
                                    facDto = xmlParserService.parse(facXml, FacilityDetailDTO.class);
                                } catch (Exception e) {
                                    db.setMt10id(null);
                                }
                            }
                            kopisSaveService.savePerformanceAndFacility(db, facDto);
                            log.info("공연 상세 동기화 완료: {}", db.getPrfnm());
                            totalProcessed++;
                        }
                    } catch (Exception e) {
                        log.warn("⚠️ 공연 ID: {} 상세 조회 실패. 목록 정보로 저장 시도. 사유: {}", perf.getMt20id(), e.getMessage());
                        try {
                            kopisSaveService.savePerformanceFromListOnly(perf);
                            totalProcessed++;
                        } catch (Exception dbEx) {
                            log.error("❌ 목록 저장 실패 (ID: {})", perf.getMt20id(), dbEx);
                        }
                    }
                }
                cpage++;
                Thread.sleep(500);
            } catch (Exception e) {
                log.error("페이지 처리 오류 (cpage: {})", cpage, e);
                hasMoreData = false;
            }
        }
        log.info("=== 데이터 동기화 완료 (총 {}개 처리됨) ===", totalProcessed);
    }
}