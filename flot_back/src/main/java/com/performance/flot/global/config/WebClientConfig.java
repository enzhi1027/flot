package com.performance.flot.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    private final KopisProperties kopisProperties;

    public WebClientConfig(KopisProperties kopisProperties) {
        this.kopisProperties = kopisProperties;
    }

    @Bean
    public WebClient kopisWebClient() {
        ExchangeStrategies exchangeStrategies = ExchangeStrategies.builder()
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(16 * 1024 * 1024))
                .build();

        return WebClient.builder()
                .baseUrl(kopisProperties.getBaseUrl())
                .exchangeStrategies(exchangeStrategies)
                .build();
    }
}