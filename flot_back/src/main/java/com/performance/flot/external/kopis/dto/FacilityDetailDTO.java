package com.performance.flot.external.kopis.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JacksonXmlRootElement(localName = "dbs")
public class FacilityDetailDTO {

    @JacksonXmlProperty(localName = "db")
    private FacilityDetailDb db;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class FacilityDetailDb {
        private String mt10id;
        private String fcltynm;
        private int mt13cnt;
        private int seatscale;
        private String telno;
        private String relateurl;
        private String adres;
        private double la;
        private double lo;
    }
}