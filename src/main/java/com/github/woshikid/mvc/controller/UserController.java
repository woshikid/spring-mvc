package com.github.woshikid.mvc.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {

	@RequestMapping("/")
	public String home(Model model) {
		Subject subject = SecurityUtils.getSubject();
		model.addAttribute("isAuthenticated", subject.isAuthenticated());
		model.addAttribute("isRemembered", subject.isRemembered());
		subject.getSession().setAttribute("test", subject.hasRole("test"));
		return "home";
	}
	
	@RequiresRoles("test")
	@RequestMapping("/role")
	public String role() {
		return "role";
	}
}
