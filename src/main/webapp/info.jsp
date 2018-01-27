<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.*" %>
<%@ page import="java.text.*" %>
<html>
<body>
<b>Time</b><br/>
<%=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()) %><br/>
<br/>
<b>Info</b><br/>
request.getRemoteHost: <%=request.getRemoteHost() %><br/>
request.getRemoteAddr: <%=request.getRemoteAddr() %><br/>
request.getRemotePort: <%=request.getRemotePort() %><br/>
request.getRequestURL: <%=request.getRequestURL() %><br/>
request.getRequestURI: <%=request.getRequestURI() %><br/>
request.getServerName: <%=request.getServerName() %><br/>
request.getServerPort: <%=request.getServerPort() %><br/>
request.getScheme: <%=request.getScheme() %><br/>
request.getProtocol: <%=request.getProtocol() %><br/>
request.getMethod: <%=request.getMethod() %><br/>
request.getQueryString: <%=request.getQueryString() %><br/>
<br/>
<b>Header</b><br/>
<%	Enumeration headers = request.getHeaderNames();
	while (headers.hasMoreElements()) {
		String header = headers.nextElement().toString();
		java.util.Enumeration head = request.getHeaders(header);
		while (head.hasMoreElements()) { %>
<%=header %>: <%=head.nextElement().toString() %><br/>
<%		}
	} %>
<br/>
<b>Parameter</b><br/>
<%	Enumeration parameters = request.getParameterNames();
	while (parameters.hasMoreElements()) {
		String parameter = parameters.nextElement().toString(); %>
<%=parameter %>=<%=request.getParameter(parameter) %><br/>
<%	} %>
</body>
</html>
