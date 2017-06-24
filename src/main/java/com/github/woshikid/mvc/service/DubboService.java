package com.github.woshikid.mvc.service;

import org.springframework.stereotype.Service;

@Service("dubboService")
public class DubboService implements IDubboService {

	public String test() {
		return "dubbo test from server";
	}
	
}
