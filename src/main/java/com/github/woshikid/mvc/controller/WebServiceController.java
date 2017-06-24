package com.github.woshikid.mvc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.woshikid.mvc.service.IWebService;

@Controller
@RequestMapping("/webserviceTest")
public class WebServiceController {

	@Autowired
	@Qualifier("webserviceClient")
	private IWebService webserviceClient;
	
	@ResponseBody
	@RequestMapping("/test")
	public String test() {
		return webserviceClient.test();
	}
}
