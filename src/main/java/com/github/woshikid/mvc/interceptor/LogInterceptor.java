package com.github.woshikid.mvc.interceptor;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogInterceptor implements MethodInterceptor {

	private final static Logger logger = LoggerFactory.getLogger(LogInterceptor.class);

	public Object invoke(MethodInvocation invocation) throws Throwable {
		logger.info("-----{}", invocation.getMethod().getName());
		return invocation.proceed();
	}
}
