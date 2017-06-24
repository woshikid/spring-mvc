<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.*" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<body>
<h2><c:out value="Hello World" /></h2>
<jsp:useBean id="now" class="java.util.Date" scope="page" />
<fmt:formatDate value="${now}" pattern="yyyy-MM-dd HH:mm:ss" />
</body>
</html>
