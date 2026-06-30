package com.performance.flot.external.kopis.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tools.jackson.databind.PropertyNamingStrategies;
import tools.jackson.databind.annotation.JsonNaming;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JacksonXmlRootElement(localName = "dbs")
@JsonNaming(PropertyNamingStrategies.LowerCaseStrategy.class)
public class PerformanceDetailDTO {

    @JacksonXmlProperty(localName = "db")
    private DetailDb db;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class DetailDb {
        private String mt20id;
        private String prfnm;
        private String mt10id;
        private String mt13id;
        private String fcltynm;
        private String prfpdfrom;
        private String prfpdto;
        private String prfcast;
        private String prfruntime;
        private String prfage;
        private String pcseguidance;
        private String poster;
        private String sty;
        private String genrenm;
        private String updatedate;
        private String prfstate;
        private String dtguidance;

        @JacksonXmlProperty(localName = "styurls")
        private StyUrls styurls;

        @JacksonXmlProperty(localName = "relates")
        private Relates relates;
    }

    @Data
    public static class StyUrls {
        @JacksonXmlProperty(localName = "styurl")
        @JacksonXmlElementWrapper(useWrapping = false)
        private List<String> styurl;
    }

    @Data
    public static class Relates {
        @JacksonXmlProperty(localName = "relate")
        @JacksonXmlElementWrapper(useWrapping = false)
        private List<RelateItem> relateList;
    }

    @Data
    public static class RelateItem {
        private String relatenm;
        private String relateurl;
    }
}