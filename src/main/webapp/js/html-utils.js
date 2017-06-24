function getRadio(name){
	var radios = document.getElementsByName(name);
	for(var i = 0; radios[i]; i++){
		if(radios[i].checked)return radios[i].value;
	}
	return '';
}

function setRadio(name, value){
	var radios = document.getElementsByName(name);
	for(var i = 0; radios[i]; i++){
		if(radios[i].value == value){
			radios[i].checked = true;
			return true;
		}
	}
	return false;
}

//得到html元素的值，自动判断类型，boolean会转为string
function getNodeValue(node){
	if(node.nodeName == '#text'){
		return node.data.replace('　', '');
	}else if(node.nodeName == 'TEXTAREA'){
		return node.value;
	}else if(node.nodeName == 'SPAN'){
		return node.textContent;
	}else if(node.nodeName == 'SELECT'){
		return node.value;
	}else if(node.nodeName == 'INPUT'){
		if(node.type == 'text'){
			return node.value;
		}else if(node.type == 'hidden'){
			return node.value;
		}else if(node.type == 'checkbox'){
			return node.checked?'true':'false';
		}else if(node.type == 'radio'){
			return node.checked?'true':'false';
		}else{
			return node.value;
		}
	}else{
		return node.innerText;
	}
}

//给html元素赋值，自动判断类型，checked属性会根据string值转换
function setNodeValue(node, value){
	if(value == undefined)value = '';
	if(node.nodeName == '#text'){
		node.data = value;
	}else if(node.nodeName == 'SPAN'){
		node.textContent = value;
	}else if(node.nodeName == 'TEXTAREA'){
		node.value = value;
	}else if(node.nodeName == 'SELECT'){
		if(node.options.length == 0)node.options.add(new Option(value, value));
		node.value = value;
		if(node.selectedIndex == -1 && node.options.length > 0)node.selectedIndex = 0;
	}else if(node.nodeName == 'INPUT'){
		if(node.type == 'text'){
			node.value = value;
		}else if(node.type == 'hidden'){
			node.value = value;
		}else if(node.type == 'checkbox'){
			node.checked = (value == 'true')?true:false;
		}else if(node.type == 'radio'){
			node.checked = (value == 'true')?true:false;
		}else{
			node.value = value;
		}
	}else{
		node.innerText = value;
	}
}

//根据给定元素的name得到这些元素的数据
//如果select元素需要得到中文显示值，需要设置text_ = true
function getElementsData(name){
	var data = new Object();
	var nodes = document.getElementsByName(name);
	for(var i = 0; nodes[i]; i++){
		var id = nodes[i].getAttribute('id');
		if(id == null)continue;
		var value = getNodeValue(nodes[i]);
		if(value === '')value = '';//IE8 bug
		data[id] = value;
		var text_ = nodes[i].getAttribute('text_');
		if(text_ != 'true')continue;
		var index = nodes[i].selectedIndex;
		data[id + '_'] = (index == -1)?'':nodes[i].options[index].text;
	}
	return data;
}

//根据给定元素的name设置这些元素的数据
function setElementsData(name, data){
	var nodes = document.getElementsByName(name);
	for(var i = 0; nodes[i]; i++){
		var id = nodes[i].getAttribute('id');
		if(id == null)continue;
		setNodeValue(nodes[i], data[id]);
	}
}

//根据给定元素的name设置这些元素为只读
function setElementsReadOnly(name){
	var nodes = document.getElementsByName(name);
	for(var i = 0; nodes[i]; i++){
		nodes[i].setAttribute('readOnly', true);
		if(nodes[i].nodeName == 'SELECT')nodes[i].disabled = true;
		if(nodes[i].nodeName == 'INPUT'){
			if(nodes[i].type == 'radio')nodes[i].disabled = true;
			if(nodes[i].type == 'checkbox')nodes[i].disabled = true;
			if(nodes[i].type == 'button')nodes[i].disabled = true;
		}
	}
}

function getElementsByAttribute(tag, attribute, value){
	var elements = [];
	var allElements = document.getElementsByTagName(tag);
	for(var i = 0; allElements[i]; i++){
		if(allElements[i].getAttribute(attribute) == value){
			elements[elements.length] = allElements[i];
		}
	}
	return elements;
}

function getElementsByName(tag, name){
	return getElementsByAttribute(tag, 'name', name);
}

function getValue(id){
	return document.getElementById(id).value;
}

function setValue(id, value){
	document.getElementById(id).value = value;
}

function getOptions(eid, id, fun){
	var query = _context + '/select?id=';
	if(id.startsWith('/') || id.startsWith('http')){
		query = id;
	}else{
		query += id;
	}
	
	httpGet(query, function(data){
		var element = document.getElementById(eid);
		var value = element.value;
		element.options.length = 0;
		for(var i = 0; data[i]; i++){
			element.options.add(new Option(data[i]['value'], data[i]['key']));
		}
		element.value = value;
		if(element.selectedIndex == -1 && element.options.length > 0)element.selectedIndex = 0;
		if(typeof fun == 'function')fun();
	});
}

function getOptionsByName(name, id, fun){
	var query = _context + '/select?id=';
	if(id.startsWith('/') || id.startsWith('http')){
		query = id;
	}else{
		query += id;
	}
	
	httpGet(query, function(data){
		var elements = document.getElementsByName(name);
		for(var i = 0; elements[i]; i++){
			if(elements[i].nodeName != 'SELECT')continue;
			var value = elements[i].value;
			elements[i].options.length = 0;
			for(var j = 0; data[j]; j++){
				elements[i].options.add(new Option(data[j]['value'], data[j]['key']));
			}
			elements[i].value = value;
			if(elements[i].selectedIndex == -1 && elements[i].options.length > 0)elements[i].selectedIndex = 0;
		}
		if(typeof fun == 'function')fun();
	});
}
