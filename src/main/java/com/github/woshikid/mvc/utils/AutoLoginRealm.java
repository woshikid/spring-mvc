package com.github.woshikid.mvc.utils;

import java.util.LinkedHashSet;
import java.util.Set;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

public class AutoLoginRealm extends AuthorizingRealm {

	private Set<String> roleNames = new LinkedHashSet<>();
	private Set<String> permissions = new LinkedHashSet<>();
	
	public Set<String> getRoleNames() {
		return roleNames;
	}

	public void setRoleNames(Set<String> roleNames) {
		this.roleNames = roleNames;
	}

	public Set<String> getPermissions() {
		return permissions;
	}

	public void setPermissions(Set<String> permissions) {
		this.permissions = permissions;
	}

	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo(roleNames);
		info.setStringPermissions(permissions);
		return info;
	}

	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token)
			throws AuthenticationException {
		String username = ((UsernamePasswordToken)token).getUsername();
		((UsernamePasswordToken)token).setPassword(username.toCharArray());
		SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(username, username.toCharArray(), getName());
		return info;
	}
	
}
