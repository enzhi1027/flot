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
public class PerformanceDTO {
    @JacksonXmlProperty(localName = "mt20id")
    private String mt20id;

    @JacksonXmlProperty(localName = "prfnm")
    private String prfnm;

    @JacksonXmlProperty(localName = "prfpdfrom")
    private String prfpdfrom;

    @JacksonXmlProperty(localName = "prfpdto")
    private String prfpdto;

    @JacksonXmlProperty(localName = "fcltynm")
    private String fcltynm;

    @JacksonXmlProperty(localName = "poster")
    private String poster;

    @JacksonXmlProperty(localName = "genrenm")
    private String genrenm;

    @JacksonXmlProperty(localName = "prfstate")
    private String prfstate;
}