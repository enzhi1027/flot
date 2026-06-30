package com.performance.flot.domain.main.mapper;

import com.performance.flot.external.kopis.dto.FacilityDetailDTO;
import com.performance.flot.external.kopis.dto.PerformanceDetailDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface KopisMapper {

    void upsertFacility(FacilityDetailDTO.FacilityDetailDb facility);

    void upsertPerformance(PerformanceDetailDTO.DetailDb performance);

    void deletePerformanceStyurls(@Param("mt20id") String mt20id);
    void insertPerformanceStyurl(@Param("mt20id") String mt20id, @Param("styurl") String styurl);

    void deletePerformanceRelates(@Param("mt20id") String mt20id);
    void insertPerformanceRelate(@Param("mt20id") String mt20id, @Param("relatenm") String relatenm, @Param("relateurl") String relateurl);
}