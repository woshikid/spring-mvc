<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE>
<html>
<body>
<form action="${pageContext.request.contextPath}/upload" enctype="multipart/form-data" method="post">
	<input type="file" name="file" />
	<input type="submit" value="submit" />
</form>
</body>
</html>