package com.performance.flot.external.kopis.parser;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class XmlParserService {

    private final XmlMapper xmlMapper;

    public <T> T parse(String xmlContent, Class<T> valueType) {
        try {
            if (xmlContent == null || xmlContent.isBlank()) {
                return null;
            }
            return xmlMapper.readValue(xmlContent, valueType);
        } catch (Exception e) {
            log.error("XML Parsing Error [{}] : {}", valueType.getSimpleName(), e.getMessage());
            throw new RuntimeException("XML 파싱에 실패했습니다.", e);
        }
    }
}