package com.performance.flot;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@MapperScan("com.performance.flot.domain.**.mapper")
@SpringBootApplication
public class FlotBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlotBackApplication.class, args);
	}

}
