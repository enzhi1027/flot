package com.performance.flot.external.kopis.scheduler;

import com.performance.flot.external.kopis.service.PerformanceSyncService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KopisScheduler implements CommandLineRunner {

    private final PerformanceSyncService performanceSyncService;

    @Override
    public void run(String... args) throws Exception {
        log.info("🚀 [테스트] 서버 기동 즉시 Kopis 동기화를 1회 수행합니다.");
        performanceSyncService.syncKopisDataByPeriod("20250701", "20251231");
        log.info("🚀 [마이그레이션] 해당 연도 작업이 끝났습니다. 애플리케이션을 종료하거나 다음 연도를 준비하세요.");
    }

    @Scheduled(cron = "0 0 4 * * ?")
    public void runKopisDataSync() {
        log.info("▶ [스케줄러] 정기 Kopis 데이터 배치 동기화를 시작합니다.");
        try {
            performanceSyncService.syncKopisData();
            log.info("▷ [스케줄러] 정기 Kopis 데이터 배치 동기화가 성공적으로 종료되었습니다.");
        } catch (Exception e) {
            log.error("❌ [스케줄러] 정기 동기화 진행 중 에러 발생: {}", e.getMessage());
        }
    }
}