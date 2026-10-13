// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/service/WebSocketHeadcountBroadcaster.java
package com.farmoperations.livestock.service;

import com.farmoperations.livestock.dto.HeadcountSummaryDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class WebSocketHeadcountBroadcaster {

    private final SimpMessagingTemplate messagingTemplate;

    public static final String HEADCOUNT_TOPIC = "/topic/headcount";

    public void broadcastHeadcount(HeadcountSummaryDto summary) {
        log.info("Broadcasting real-time headcount delta to {}: Total={}, Active={}, Quarantined={}, Deceased={}",
                HEADCOUNT_TOPIC, summary.getTotalHeadcount(), summary.getActiveCount(),
                summary.getQuarantineCount(), summary.getDeceasedCount());
        messagingTemplate.convertAndSend(HEADCOUNT_TOPIC, summary);
    }
}
