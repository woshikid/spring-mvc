function httpGet(url, callback){
	var async = typeof callback == "function";
	var http = new XMLHttpRequest();
	http.open("GET", url, async);
	http.setRequestHeader('If-Modified-Since', '0');
	http.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
	http.setRequestHeader('Accept', 'application/json;');
	if(async)http.onreadystatechange = function(){
		if(http.readyState != 4 || http.status != 200)return;
		callback(JSON.parse(http.responseText));
	};
	http.send();
	if(async)return;
	return JSON.parse(http.responseText);
}

function httpPost(url, params, callback){
	var async = typeof callback == "function";
	var http = new XMLHttpRequest();
	http.open("POST", url, async);
	http.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
	http.setRequestHeader('Accept', 'application/json;');
	if(async)http.onreadystatechange = function(){
		if(http.readyState != 4 || http.status != 200)return;
		callback(JSON.parse(http.responseText));
	};
	if(typeof params == 'object'){
		http.send(JSON.stringify(params));
	}else{
		http.send(params);
	}
	if(async)return;
	return JSON.parse(http.responseText);
}
