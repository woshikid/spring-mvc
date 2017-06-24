package com.github.woshikid.mvc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.woshikid.mvc.service.IDubboService;
import com.github.woshikid.mvc.service.IHessianService;

@Controller
@RequestMapping("/hessianTest")
public class HessianController {

	@Autowired
	@Qualifier("hessianClient")
	private IHessianService hessianClient;
	
	@Autowired
	@Qualifier("hessianDubboClient")
	private IDubboService hessianDubboClient;
	
	@ResponseBody
	@RequestMapping("/test")
	public String test() {
		return hessianClient.test();
	}
	
	@ResponseBody
	@RequestMapping("/dubbo")
	public String dubbo() {
		return hessianDubboClient.test();
	}
}
