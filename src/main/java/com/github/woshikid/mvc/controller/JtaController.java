package com.github.woshikid.mvc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/jta")
public class JtaController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private JmsTemplate jmsTemplate;
	
	@ResponseBody
	@RequestMapping("/test")
	@Transactional
	public void test() {
		jdbcTemplate.update("insert into person(user_id, password) values('a', 'b')");
		jmsTemplate.convertAndSend("ab");
		throw new RuntimeException();
	}
	
}
