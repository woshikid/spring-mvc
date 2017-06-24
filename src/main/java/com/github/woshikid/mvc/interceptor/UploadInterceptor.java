package com.github.woshikid.mvc.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class UploadInterceptor extends HandlerInterceptorAdapter {

	private long maxUploadSize;
	
	public void setMaxUploadSize(long maxUploadSize) {
		this.maxUploadSize = maxUploadSize;
	}

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		if (request instanceof MultipartHttpServletRequest) {
			long size = request.getContentLengthLong();
			System.err.println("upload size:" + size);
			if (size > maxUploadSize) throw new MaxUploadSizeExceededException(maxUploadSize);
		}
		return true;
	}
}
