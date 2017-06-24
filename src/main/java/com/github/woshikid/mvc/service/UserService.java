package com.github.woshikid.mvc.service;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Service;

import com.github.woshikid.mvc.model.User;

@Service
public class UserService {

	/**
	 * 得到session里的User信息，懒加载
	 * @return
	 */
	public User getLoginUser() {
		Subject subject = SecurityUtils.getSubject();
		
		if (!subject.isAuthenticated() && !subject.isRemembered()) return null;
		
		Session session = subject.getSession();
		User user = (User)session.getAttribute("user");
		
		if (user == null) {
			String code = String.valueOf(subject.getPrincipal());
			//user = getUserByCode(code);
			user = new User();
			user.setCode(code);
			session.setAttribute("user", user);
		}
		
		return user;
	}
}
