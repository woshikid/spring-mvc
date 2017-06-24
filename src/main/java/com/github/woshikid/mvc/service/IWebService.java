package com.github.woshikid.mvc.service;

import javax.jws.WebService;

@WebService//needed by jaxws, no need by simple
public interface IWebService {

	public String test();
}
