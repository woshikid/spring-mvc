package com.github.woshikid.mvc.controller;

import javax.jms.Topic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/mq")
public class MQController {

	@Autowired
	private JmsTemplate jmsTemplate;
	
	@Autowired
	private Topic testTopic;
	
	@ResponseBody
	@RequestMapping("/send")
	@Transactional
	public void send(String message) {
		jmsTemplate.convertAndSend(message);
		jmsTemplate.convertAndSend(testTopic, message);
	}
	
	@ResponseBody
	@RequestMapping("/receive")
	public String receive() throws Exception {
		Object message = jmsTemplate.receiveAndConvert(testTopic);
		return message.toString();
	}
	
}
