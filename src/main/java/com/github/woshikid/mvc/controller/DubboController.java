package com.github.woshikid.mvc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.woshikid.mvc.service.IDubboService;
import com.github.woshikid.mvc.service.IHessianService;

@Controller
@RequestMapping("/dubboTest")
public class DubboController {

	@Autowired
	@Qualifier("dubboClient")
	private IDubboService dubboClient;
	
	@Autowired
	@Qualifier("dubboHessianClient")
	private IHessianService dubboHessianClient;
	
	@ResponseBody
	@RequestMapping("/test")
	public String test() {
		return dubboClient.test();
	}
	
	@ResponseBody
	@RequestMapping("/hessian")
	public String hessian() {
		return dubboHessianClient.test();
	}
}
