package com.performance.flot.external.kopis.service;

import com.performance.flot.global.config.KopisProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class KopisApiService {

    private final WebClient kopisWebClient;
    private final KopisProperties kopisProperties;

    public String getPerformanceListXml(String stdate, String eddate, int cpage, int rows) {
        System.out.println("key : " + kopisProperties.getKey());
        return kopisWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/pblprfr")
                        .queryParam("service", kopisProperties.getKey())
                        .queryParam("stdate", stdate)
                        .queryParam("eddate", eddate)
                        .queryParam("cpage", cpage)
                        .queryParam("rows", rows)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getPerformanceDetailXml(String mt20id) {
        return kopisWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/pblprfr/{id}")
                        .queryParam("service", kopisProperties.getKey())
                        .build(mt20id))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getFacilityListXml(int cpage, int rows) {
        System.out.println("key : " + kopisProperties.getKey());
        return kopisWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/prfplc")
                        .queryParam("service", kopisProperties.getKey())
                        .queryParam("cpage", cpage)
                        .queryParam("rows", rows)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getFacilityDetailXml(String mt10id) {
        return kopisWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/prfplc/{id}")
                        .queryParam("service", kopisProperties.getKey())
                        .build(mt10id))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}