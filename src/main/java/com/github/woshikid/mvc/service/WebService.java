package com.github.woshikid.mvc.service;

@javax.jws.WebService //needed by jax-ws, no need by cxf
public class WebService implements IWebService {

	public String test() {
		return "webservice test from server";
	}

}
