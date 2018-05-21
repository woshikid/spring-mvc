package com.github.woshikid.mvc.service;

import javax.jws.WebService;

@WebService //needed by cxf-jaxws, no need by cxf-simple
public interface IWebService {

	public String test();
}
