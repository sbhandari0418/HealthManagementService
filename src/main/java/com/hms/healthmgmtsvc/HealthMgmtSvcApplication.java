package com.hms.healthmgmtsvc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


@SpringBootApplication
public class HealthMgmtSvcApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthMgmtSvcApplication.class, args);
	}

}
