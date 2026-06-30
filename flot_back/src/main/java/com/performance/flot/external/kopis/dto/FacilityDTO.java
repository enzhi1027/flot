package com.performance.flot.external.kopis.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FacilityDTO {
    @JacksonXmlProperty(localName = "mt10id")
    private String mt10id;

    @JacksonXmlProperty(localName = "fcltynm")
    private String fcltynm;

    @JacksonXmlProperty(localName = "mt13cnt")
    private int mt13cnt;
}