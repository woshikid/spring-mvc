package com.github.woshikid.mvc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.woshikid.mvc.service.JdbcService;

@Controller
@RequestMapping("/jdbc")
public class JdbcController {

	@Autowired
	private JdbcService jdbcService;
	
	@Value("${test.tableName}")
	private String tableName;
	
	@ResponseBody
	@RequestMapping("/test")
	public String test() throws Exception {
		return tableName + ":" + jdbcService.test();
	}
}
