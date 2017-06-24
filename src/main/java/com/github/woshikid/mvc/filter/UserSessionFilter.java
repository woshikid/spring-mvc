package com.github.woshikid.mvc.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.github.woshikid.mvc.service.UserService;

@Component
public class UserSessionFilter extends HandlerInterceptorAdapter {

	@Autowired
	private UserService userService;
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		userService.getLoginUser();
		return true;
	}
}
