//根据元素的checks字段检查元素值的合法性
function checkElementData(id){
	var node = document.getElementById(id);
	return checkNodeData(node);
}

//根据元素的checks字段检查元素值的合法性
function checkElementsData(name){
	var nodes = document.getElementsByName(name);
	for(var i = 0; nodes[i]; i++){
		var checks = checkNodeData(nodes[i]);
		if(checks != '')return checks;
	}
	return '';
}

//根据元素的checks字段检查元素值的合法性
function checkNodeData(node){
	var checks = node.getAttribute('checks');
	if(checks == null)return '';
	var value = getNodeValue(node);
	var check = checks.split(';');
	if(check[0] == 'Y' && value == '')return check[3];
	if(check[1] == 'int'){
		if(value == '')return '';
		if(isNaN(value))return check[3];
		if(parseInt(value) != value)return check[3];
		if(check[2] == '')return '';
		var range = check[2].split(',');
		if((num(value) < num(range[0])) || (num(value) > num(range[1])))return check[3];
	}else if(check[1] == 'float'){
		if(value == '')return '';
		if(isNaN(value))return check[3];
		if(check[2] == '')return '';
		var range = check[2].split(',');
		if((num(value) < num(range[0])) || (num(value) > num(range[1])))return check[3];
	}else if(check[1] == 'string'){
		if(value == '')return '';
		if(check[2] == '')return '';
		var range = check[2].split(',');
		if((value.length() < range[0]) || (value.length() > range[1]))return check[3];
	}
	return '';
}
