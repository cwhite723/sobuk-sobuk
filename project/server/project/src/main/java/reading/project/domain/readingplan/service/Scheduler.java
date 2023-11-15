package reading.project.domain.readingplan.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@EnableScheduling
@RequiredArgsConstructor
public class Scheduler {
    private final ReadingPlanService readingPlanService;

    @Scheduled(cron = "0 0 0 * * *")
    public void readingPlanScheduler() {
        log.info("스케줄러 작동 시작");
        readingPlanService.changeStatus();
        readingPlanService.calculatePagesPerDay();
        log.info("스케줄러 작동 종료");
    }
}
