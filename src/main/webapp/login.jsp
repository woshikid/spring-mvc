<!DOCTYPE html>
<%@page import="org.apache.shiro.SecurityUtils"%>
<html>
	<%	if (SecurityUtils.getSubject().isAuthenticated()) {
			response.sendRedirect(request.getContextPath());
		}
	%>
	
	<form method="POST">
	<% 	if (request.getAttribute("shiroLoginFailure") != null) { %>
		username/password error!<br/>
	<%	} %>
		username:<input type="text" name="username" /><br/>
		password:<input type="text" name="password" /><br/>
		rememberMe:<input type="checkbox" name="rememberMe" /><br/>
		<input type="submit" name="submit" />
	</form>
</html>