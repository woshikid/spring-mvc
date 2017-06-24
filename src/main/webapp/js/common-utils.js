var _context = '';

var _selfLocation;
function initSelfLocation(){
	var scripts = document.getElementsByTagName('script');
	var script = scripts[scripts.length - 1];
	_selfLocation = script.src;
	var index = _selfLocation.lastIndexOf('/');
	_selfLocation = _selfLocation.substring(0, index + 1);
}
initSelfLocation();

function include(path){
	var js = document.createElement("script");
	js.type = "text/javascript";
	js.src = path;
	document.getElementsByTagName("head")[0].appendChild(js);
}

function includeNow(path){
	var http = new XMLHttpRequest();
	http.open("GET", path, false);
	http.send();
	
	var js = document.createElement("script");
	js.type = "text/javascript";
	js.text = http.responseText;
	document.getElementsByTagName("head")[0].appendChild(js);
}

if(typeof JSON == 'undefined'){
	includeNow(_selfLocation + 'json2.js');
}

function describe(obj){
	var prop = '';
	var func = '';
	for(var p in obj){
		if(typeof obj[p] == "function"){
			func += p + '\t';
		}else{
			prop += p + "=" + obj[p] + '\t';
		}
	}
	return prop + '\n\n' + func;
}

String.prototype.gbkLength = function(){
	var gbk = this.match(/[^\x00-\xff]/ig);
	return this.length + (gbk==null?0:gbk.length);
};

String.prototype.utf8Length = function(){
	var utf8 = this.match(/[^\x00-\xff]/ig);
	return this.length + (utf8==null?0:utf8.length) * 2;
};

String.prototype.replaceAll = function(reg, s){
	return this.replace(new RegExp(reg, "gm"), s);
};

String.prototype.trim = function(){
	return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};

String.prototype.toNum = function(n){
	var f = parseFloat(this);
	if(isNaN(f))return 0;
	if(n == undefined)return f;
	return parseFloat(f.toFixed(n));
};

function num(v, n){
	var r = parseFloat(v);
	if(isNaN(r))r = 0;
	if(n == undefined)return r;
	return parseFloat(r.toFixed(n));
}

String.prototype.toFixed = function(n, d){
	var f = parseFloat(this);
	if(isNaN(f)){
		if(d == undefined){
			return this;
		}else{
			return d;
		}
	}
	return f.toFixed(n);
};

String.prototype.startsWith = function(str){
	return (this.match("^"+str)==str);
};

String.prototype.endsWith = function(str){
	return (this.match(str+"$")==str);
};

Array.prototype.contains = function(elem){
	for(var i = 0; this[i]; i++){
		if(this[i] == elem)return true;
	}
	return false;
};

function ArrayContains(array, elem){
	for(var i = 0; array[i]; i++){
		if(array[i] == elem)return true;
	}
	return false;
};

Date.prototype.format = function(format){
	var o = {
		"M+" : this.getMonth()+1,//month
		"d+" : this.getDate(),//day
		"h+" : this.getHours(),//hour
		"m+" : this.getMinutes(),//minute
		"s+" : this.getSeconds(),//second
		"q+" : Math.floor((this.getMonth()+3)/3),//quarter
		"S" : this.getMilliseconds()//millisecond
	};
	
	if(/(y+)/.test(format)){
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	
	for(var k in o){
		if(new RegExp("("+ k +")").test(format)){
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr(("" + o[k]).length));
		}
	}
	
	return format;
};

Date.prototype.addDays = function(day){
	this.setDate(this.getDate() + day);
	return this;
};

Date.prototype.addWeeks = function(week){
	this.addDays(week * 7);
	return this;
};

Date.prototype.addMonths = function(month){
	var day = this.getDate();
	this.setMonth(this.getMonth() + month);
	if(this.getDate() < day)this.setDate(0);
	return this;
};

Date.prototype.addYears = function(year){
	var month = this.getMonth();
	this.setFullYear(this.getFullYear() + year);
	if(this.getMonth() > month)this.setDate(0);
	return this;
};

function n(s){
	return (typeof s == 'string')?s:'';
}

function e(s){
	return (n(s) == '');
}

function d(s, v){
	return e(s)?v:s;
}

function nbsp(v){
	return d(v, '&nbsp;');
}

function js(s){
	s = n(s);
	s = s.replaceAll("\\", "\\\\");
	s = s.replaceAll("'", "\\'");
	s = s.replaceAll("\"", "\\\"");
	s = s.replaceAll("\r", "\\r");
	s = s.replaceAll("\n", "\\n");
	return s;
}

//html escape, used in <input name="value">
function value(s){
	s = n(s);
	s = s.replaceAll("&", "&amp;");
	s = s.replaceAll("\"", "&quot;");
	s = s.replaceAll("<", "&lt;");
	s = s.replaceAll(">", "&gt;");
	s = s.replaceAll("'", "&#39;");
	s = s.replaceAll(" ", "&#32;");
	s = s.replaceAll("\r", "");
	s = s.replaceAll("\n", "");
	return s;
}

//html escape, used in <textarea>value</textarea>
function content(s){
	s = n(s);
	s = s.replaceAll("&", "&amp;");
	s = s.replaceAll("\"", "&quot;");
	s = s.replaceAll("<", "&lt;");
	s = s.replaceAll(">", "&gt;");
	s = s.replaceAll("'", "&#39;");
	s = s.replaceAll(" ", "&#32;");
	return s;
}

//html escape, used in <tr><td>value</td></tr>
function td(s){
	return content(d(n(s).trim(), "　"));
}

//合并2个数据，将第2个数据中的元素覆盖到第1个数据中
function mergeData(data, object){
	for(var p in object){
		if(typeof(object[p]) != 'function'){
			data[p] = object[p];
		}
	}
	return data;
}
