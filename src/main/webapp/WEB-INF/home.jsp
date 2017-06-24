<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<shiro:principal/><br/>
isAuthenticated=<%=request.getAttribute("isAuthenticated") %><br/>
isRemembered=<%=request.getAttribute("isRemembered") %><br/>
<%=request.getSession().getAttribute("test") %>