package com.performance.flot.external.kopis.service;

import com.performance.flot.domain.main.mapper.KopisMapper;
import com.performance.flot.external.kopis.dto.FacilityDetailDTO;
import com.performance.flot.external.kopis.dto.PerformanceDTO;
import com.performance.flot.external.kopis.dto.PerformanceDetailDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KopisSaveService {

    private final KopisMapper kopisMapper;

    @Transactional
    public void savePerformanceAndFacility(PerformanceDetailDTO.DetailDb db, FacilityDetailDTO facDto) {
        if (facDto != null && facDto.getDb() != null) {
            kopisMapper.upsertFacility(facDto.getDb());
        }

        kopisMapper.upsertPerformance(db);

        kopisMapper.deletePerformanceStyurls(db.getMt20id());
        if (db.getStyurls() != null && db.getStyurls().getStyurl() != null) {
            for (String url : db.getStyurls().getStyurl()) {
                kopisMapper.insertPerformanceStyurl(db.getMt20id(), url);
            }
        }

        kopisMapper.deletePerformanceRelates(db.getMt20id());
        if (db.getRelates() != null && db.getRelates().getRelateList() != null) {
            for (PerformanceDetailDTO.RelateItem link : db.getRelates().getRelateList()) {
                kopisMapper.insertPerformanceRelate(db.getMt20id(), link.getRelatenm(), link.getRelateurl());
            }
        }
    }

    @Transactional
    public void savePerformanceFromListOnly(PerformanceDTO perf) {
        PerformanceDetailDTO.DetailDb mockDb = new PerformanceDetailDTO.DetailDb();
        mockDb.setMt20id(perf.getMt20id());
        mockDb.setPrfnm(perf.getPrfnm());
        mockDb.setPrfpdfrom(perf.getPrfpdfrom());
        mockDb.setPrfpdto(perf.getPrfpdto());
        mockDb.setPoster(perf.getPoster());
        mockDb.setGenrenm(perf.getGenrenm());
        mockDb.setPrfstate(perf.getPrfstate());

        System.out.println(mockDb);
        kopisMapper.upsertPerformance(mockDb);
    }
}