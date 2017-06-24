//得到td第一个子元素的值
function getCellValue(cell){
	if(cell.firstChild){
		return getNodeValue(cell.firstChild);
	}else{
		return '';
	}
}

//设置td第一个子元素的值
function setCellValue(cell, value){
	if(value == undefined)value = '';
	if(cell.firstChild){
		setNodeValue(cell.firstChild, value);
	}else{
		cell.innerHTML = value;
	}
}

//得到table对象
function getDomTable(table){
	if(typeof table == 'string'){
		return document.getElementById(table);
	}else{
		return table;
	}
}

//得到表中特定行特定列的值
function getTableValue(table, row, cell){
	table = getDomTable(table);
	return getCellValue(table.rows[row].cells[cell]);
}

//根据列名得到表中特定行特定列的值
function getTableValueByColName(table, row, colName){
	table = getDomTable(table);
	var rows = table.rows;
	var head = rows[0].cells;
	for(var j = 0; head[j]; j++){
		var name = head[j].getAttribute('name');
		if(name == null)continue;
		if(name == colName)return getCellValue(rows[row].cells[j]);
	}
	return '';
}

//设置表中特定行特定列的值
function setTableValue(table, row, cell, value){
	table = getDomTable(table);
	setCellValue(table.rows[row].cells[cell], value);
}

//设置表中已选中行中特定列的值
function setTableValueChecked(table, cell, value){
	var index = getTableCheckedIndex(table);
	if(index == -1)return;
	setTableValue(table, index, cell, value);
}

//根据列名设置表中特定行特定列的值
function setTableValueByColName(table, row, colName, value){
	table = getDomTable(table);
	var head = table.rows[0].cells;
	for(var j = 0; head[j]; j++){
		var name = head[j].getAttribute('name');
		if(name == null)continue;
		if(name == colName)setCellValue(table.rows[row].cells[j], value);
	}
}

//根据列名设置表中已选中行中特定列的值
function setTableValueCheckedByColName(table, colName, value){
	var index = getTableCheckedIndex(table);
	if(index == -1)return;
	setTableValueByColName(table, index, colName, value);
}

//判断表中是否已经有了相同的数据，可以根据传入的cols数组判断某几列是否相同
//editMode为true则可以适应编辑时原条目的干扰
function hasSameValue(table, data, cols, editMode){
	table = getDomTable(table);
	
	if(typeof cols == 'string'){
		cols = [cols];
	}
	
	if(editMode){
		var checkName = getCheckName(table);
		data[checkName] = 'false';
		cols.push(checkName);
	}
	
	return getSameValueRowIndex(table, data, cols) > -1;
}

//得到与原表中某些指定列数据相同的条目的位置
//如果未找到，返回-1
function getSameValueRowIndex(table, data, cols){
	table = getDomTable(table);
	
	if(typeof cols == 'string'){
		cols = [cols];
	}
	
	var rows = table.rows;
	var head = rows[0].cells;
	for(var i = 1; rows[i]; i++){
		for(var j = 0; head[j]; j++){
			var name = head[j].getAttribute('name');
			if(name == null)continue;
			if(!ArrayContains(cols, name))continue;
			var value = getCellValue(rows[i].cells[j]);
			if(data[name] != value)break;
		}
		if(!head[j])return i;
	}
	return -1;
}

//得到与原表中数据完全相同的条目的位置
//判断时会忽略选择列
//如果未找到，返回-1
function getRowIndex(table, data){
	table = getDomTable(table);
	var checkName = getCheckName(table);
	var rows = table.rows;
	var head = rows[0].cells;
	for(var i = 1; rows[i]; i++){
		for(var j = 0; head[j]; j++){
			var name = head[j].getAttribute('name');
			if(name == null)continue;
			if(name == checkName)continue;
			var value = getCellValue(rows[i].cells[j]);
			if(data[name] != value)break;
		}
		if(!head[j])return i;
	}
	return -1;
}

//得到表中的选择列名称
function getCheckName(table){
	table = getDomTable(table);
	return table.getAttribute('checkName');
}

//删除表中指定行号的数据
function deleteTableRow(table, index){
	table = getDomTable(table);
	table.deleteRow(index);
}

//插入数据到表中的指定行号
//isTree为true时表格可以根据树形折叠
function addRow(table, data, index, isTree){
	table = getDomTable(table);
	var checkName = getCheckName(table);
	var head = table.rows[0].cells;
	var row = document.createElement('tr');
	var maxLevel = num(table.getAttribute('maxLevel'));
	for(var i = 0; head[i]; i++){
		var name = head[i].getAttribute('name');
		var html = head[i].getAttribute('html');
		var cell = document.createElement('td');
		cell.style.display = head[i].style.display;
		cell.innerHTML = html;
		row.appendChild(cell);
		if(name == null)continue;
		setCellValue(cell, data[name]);
		if(isTree){
			if(name == checkName)continue;
			if(maxLevel < i)continue;
			if(data[name] == undefined || data[name] == '')continue;
			row.setAttribute('level', i);
			if(maxLevel == i)continue;
			cell.style.cursor = 'hand';
			cell.onclick = function(){foldTreeTable(this);};
			cell.setAttribute('func', 'fold');
		}
	}
	
	var indexNode = table.rows[index];
	if(indexNode == undefined)indexNode = null;//IE9 bug
	table.tBodies[0].insertBefore(row, indexNode);
}

//插入数据到表中的最后一行
function addLastRow(table, data){
	table = getDomTable(table);
	addRow(table, data, table.rows.length, false);
	return table.rows.length - 1;
}

//根据排序原则将数据插入表中
//返回插入的行号
function addTreeRow(table, data, isTree){
	table = getDomTable(table);
	var checkName = getCheckName(table);
	var rows = table.rows;
	var head = rows[0].cells;
	for(var i = 1; rows[i]; i++){
		for(var j = 0; head[j]; j++){
			var name = head[j].getAttribute('name');
			if(name == null)continue;
			if(name == checkName)continue;
			var value = getCellValue(rows[i].cells[j]);
			var dataValue = data[name];
			if(!isNaN(value) && !isNaN(dataValue)){
				value = num(value);
				dataValue = num(dataValue);
			}
			if(dataValue > value)break;
			if(dataValue == value)continue;
			if(dataValue < value){
				addRow(table, data, i, isTree);
				return i;
			}
		}
	}
	addRow(table, data, rows.length, isTree);
	return rows.length - 1;
}

//删除表中指定数据的行
function deleteTableData(table, data){
	var index = getRowIndex(table, data);
	if(index > -1)deleteTableRow(table, index);
}

//得到表中的所有数据，返回数组
function getTableData(table){
	table = getDomTable(table);
	if(table == null)return new Array();
	
	var rows = table.rows;
	var head = rows[0].cells;
	var array = new Array();
	for(var i = 1; rows[i]; i++){
		var object = new Object();
		for(var j = 0; head[j]; j++){
			var name = head[j].getAttribute('name');
			if(name == null)continue;
			var value = getCellValue(rows[i].cells[j]);
			if(value === '')value = '';//IE8 bug
			object[name] = value;
		}
		array[i - 1] = object;
	}
	return array;
}

//得到表中已经选中的行数据
//如无选中，返回null
function getTableDataChecked(table){
	var checkName = getCheckName(table);
	var array = getTableData(table);
	for(var i = 0; array[i]; i++){
		var object = array[i];
		if(object[checkName] == 'true')return object;
	}
	return null;
}

//得到表中已经选中的行号
//如无选中，返回-1
function getTableCheckedIndex(table){
	var checkName = getCheckName(table);
	var array = getTableData(table);
	for(var i = 0; array[i]; i++){
		var object = array[i];
		if(object[checkName] == 'true')return i + 1;
	}
	return -1;
}

//删除表中已经选中的行，并返回被删除的数据
//如无选中，返回null
function deleteTableDataChecked(table){
	var checkName = getCheckName(table);
	var array = getTableData(table);
	for(var i = 0; array[i]; i++){
		var object = array[i];
		if(object[checkName] == 'true'){
			deleteTableRow(table, i + 1);
			return object;
		}
	}
	return null;
}

//编辑表中已经选中的行，赋上新值
function setTableDataChecked(table, data){
	var index = getTableCheckedIndex(table);
	if(index == -1)return;
	deleteTableRow(table, index);
	addRow(table, data, index);
	checkTableRow(table, index);
}

//编辑表中已经选中的行，赋上新值，并排序
function setTreeDataChecked(table, data, isTree){
	deleteTableDataChecked(table);
	var index = addTreeRow(table, data, isTree);
	checkTableRow(table, index);
}

//得到表中已经选中的行数据
//返回多选选中的数组
function getTableDataChecks(table){
	var checkName = getCheckName(table);
	var checks = new Array();
	var array = getTableData(table);
	for(var i = 0; array[i]; i++){
		var object = array[i];
		if(object[checkName] == 'true')checks.push(object);
	}
	return checks;
}

//删除表中已经选中的多行
function deleteTableDataChecks(table){
	var checkName = getCheckName(table);
	var array = getTableData(table);
	for(var i = array.length - 1; array[i]; i--){
		var object = array[i];
		if(object[checkName] == 'true')deleteTableRow(table, i + 1);
	}
}

//模拟鼠标点击触发首行的选择元素
function clickTableFirstRow(table){
	table = getDomTable(table);
	if(table.rows.length > 1)clickTableRow(table, 1);
}

//模拟鼠标点击触发该行的选择元素
function clickTableRow(table, index){
	table = getDomTable(table);
	var checkName = getCheckName(table);
	var head = table.rows[0].cells;
	for(var i = 0; head[i]; i++){
		var name = head[i].getAttribute('name');
		if(name == null)continue;
		if(name == checkName)table.rows[index].cells[i].firstChild.click();
	}
}

//选中表中指定的行
function checkTableRow(table, index){
	var checkName = getCheckName(table);
	setTableValueByColName(table, index, checkName, 'true');
}

//不选中表中指定的行
function uncheckTableRow(table, index){
	var checkName = getCheckName(table);
	setTableValueByColName(table, index, checkName, 'false');
}

//选中表中给定数据的行
function checkTableData(table, data){
	var index = getRowIndex(table, data);
	if(index > -1)checkTableRow(table, index);
}

//选中表中给定数据的多行
function checkTableDatas(table, array){
	for(var i = 0; array[i]; i++){
		checkTableData(table, array[i]);
	}
}

//清除表中的所有数据
function cleanTable(table){
	table = getDomTable(table);
	var rows = table.rows;
	for(var i = rows.length - 1; i > 0; i--){
		table.deleteRow(i);
	}
}

//用给定的数据替换表中的现有数据
function setTableData(table, array){
	cleanTable(table);
	for(var i = 0; array[i]; i++){
		addLastRow(table, array[i]);
	}
}

//用给定的数据替换表中的现有数据并排序
function setTreeData(table, array, isTree){
	cleanTable(table);
	for(var i = 0; array[i]; i++){
		addTreeRow(table, array[i], isTree);
	}
}

//折叠选中的树节点
function foldTreeTable(cell){
	var index = cell.cellIndex;
	var row = cell.parentNode;
	var table = row.parentNode.parentNode;
	var checkName = getCheckName(table);
	var rows = table.rows;
	var head = rows[0].cells;
	
	var hasRoot = false;
	for(var i = 1; rows[i]; i++){
		var level = rows[i].getAttribute('level');
		if(level == undefined)continue;
		if(level != index)continue;
		for(var j = 0; j <= index; j++){
			var name = head[j].getAttribute('name');
			if(name == checkName)continue;
			var value = getCellValue(rows[i].cells[j]);
			var rowValue = getCellValue(row.cells[j]);
			if(value != rowValue)break;
		}
		if(j > index){
			hasRoot = true;
			rows[i].style.display = '';
			rows[i].cells[index].onclick = function(){unfoldTreeTable(this);};
			rows[i].cells[index].style.fontWeight = 'bold';
			rows[i].cells[index].style.background = 'url(/lhscm/lhscm/domain/conagree/images/fold.jpg) repeat-y left top';
			rows[i].cells[index].setAttribute('func', 'unfold');
		}
	}
	
	for(var i = 1; rows[i]; i++){
		var level = rows[i].getAttribute('level');
		if(level == undefined)continue;
		if(level <= index)continue;
		for(var j = 0; j <= index; j++){
			var name = head[j].getAttribute('name');
			if(name == checkName)continue;
			var value = getCellValue(rows[i].cells[j]);
			var rowValue = getCellValue(row.cells[j]);
			if(value != rowValue)break;
		}
		if(j > index){
			if(hasRoot){
				rows[i].style.display = 'none';
			}else{
				rows[i].cells[index].setAttribute('func', 'nofold');
			}
		}
	}
}

//展开选中的树节点
function unfoldTreeTable(cell){
	var index = cell.cellIndex;
	var row = cell.parentNode;
	var table = row.parentNode.parentNode;
	var checkName = getCheckName(table);
	var rows = table.rows;
	var head = rows[0].cells;
	var maxLevel = num(table.getAttribute('maxLevel'));
	
	for(var i = 1; rows[i]; i++){
		var level = rows[i].getAttribute('level');
		if(level == undefined)continue;
		if(level != index && level != (index + 1))continue;
		for(var j = 0; j <= index; j++){
			var name = head[j].getAttribute('name');
			if(name == checkName)continue;
			var value = getCellValue(rows[i].cells[j]);
			var rowValue = getCellValue(row.cells[j]);
			if(value != rowValue)break;
		}
		if(j > index){
			rows[i].style.display = '';
			if(level == index){
				rows[i].cells[index].onclick = function(){foldTreeTable(this);};
				rows[i].cells[index].style.fontWeight = 'normal';
				rows[i].cells[index].style.background = '';
				rows[i].cells[index].setAttribute('func', 'fold');
			}else if(level < maxLevel){
				rows[i].cells[index + 1].onclick = function(){unfoldTreeTable(this);};
				rows[i].cells[index + 1].style.fontWeight = 'bold';
				rows[i].cells[index + 1].style.background = 'url(/lhscm/lhscm/domain/conagree/images/fold.jpg) repeat-y left top';
				rows[i].cells[index + 1].setAttribute('func', 'unfold');
			}
		}
	}
}

//折叠所有树节点
function foldAllTreeTable(table){
	table = getDomTable(table);
	var checkName = getCheckName(table);
	var rows = table.rows;
	var head = rows[0].cells;
	var maxLevel = num(table.getAttribute('maxLevel'));
	for(var i = 1; rows[i]; i++){
		if(rows[i].style.display == 'none')continue;
		for(var j = 0; j < maxLevel; j++){
			var name = head[j].getAttribute('name');
			if(name == checkName)continue;
			var cell = rows[i].cells[j];
			if(cell.getAttribute('func') == 'fold'){
				foldTreeTable(cell);
				foldAllTreeTable(table);
				return;
			}
		}
	}
}

//展开所有树节点
function unfoldAllTreeTable(table){
	table = getDomTable(table);
	var checkName = getCheckName(table);
	var rows = table.rows;
	var head = rows[0].cells;
	var maxLevel = num(table.getAttribute('maxLevel'));
	for(var i = 1; rows[i]; i++){
		if(rows[i].style.display == 'none')continue;
		for(var j = 0; j < maxLevel; j++){
			var name = head[j].getAttribute('name');
			if(name == checkName)continue;
			var cell = rows[i].cells[j];
			if(cell.getAttribute('func') == 'unfold'){
				unfoldTreeTable(cell);
				unfoldAllTreeTable(table);
				return;
			}
		}
	}
}

//初始化树形表的点击事件
//通过setTreeData,addTreeRow等方法添加的表格无需调用此方法
function initTreeTable(table){
	table = getDomTable(table);
	var checkName = getCheckName(table);
	var rows = table.rows;
	var head = rows[0].cells;
	var maxLevel = num(table.getAttribute('maxLevel'));
	for(var i = 1; rows[i]; i++){
		for(var j = 0; head[j]; j++){
			var name = head[j].getAttribute('name');
			if(name == null)continue;
			if(name == checkName)continue;
			if(maxLevel < j)continue;
			var cell = rows[i].cells[j];
			var value = getCellValue(cell);
			if(value == undefined || value == '')continue;
			rows[i].setAttribute('level', j);
			if(maxLevel == j)continue;
			cell.style.cursor = 'hand';
			cell.onclick = function(){foldTreeTable(this);};
			cell.setAttribute('func', 'fold');
		}
	}
}

//初始化表的颜色与点击事件
function initTableEvents(table){
	table = getDomTable(table);
	var rows = table.rows;
	for(var i = 1; rows[i]; i++){
		rows[i].style.backgroundColor = (i % 2 == 0)?'#f8f8f8':'#ffffff';
		rows[i].onmouseover = function(){this.style.backgroundColor = '#f0eccc';};
		rows[i].onmouseout = function(){this.style.backgroundColor = (this.rowIndex % 2 == 0)?'#f8f8f8':'#ffffff';};
		//rows[i].onclick = function(){checkTableRow(table, this.rowIndex);};
	}
}
