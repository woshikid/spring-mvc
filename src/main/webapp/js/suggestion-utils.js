function offsetLeft(e){
	var t = e.offsetLeft;
	while(e = e.offsetParent){
		t += e.offsetLeft;
	}
	return t;
}

function offsetTop(e){
	var t = e.offsetTop;
	while(e = e.offsetParent){
		t += e.offsetTop;
	}
	return t;
}

function _suggestion(){
	_suggestion.url = _context + '/select?id=';
	_suggestion.input = null;
	_suggestion.div = null;
	_suggestion.id = null;
	_suggestion.max = null;
	_suggestion.className = null;
	_suggestion.key = null;
	_suggestion.timer = null;
	_suggestion.index = -1;
	
	_suggestion.resize = function(){
		_suggestion.div.style.left = offsetLeft(_suggestion.input) + 'px';
		_suggestion.div.style.top = offsetTop(_suggestion.input) + _suggestion.input.offsetHeight + 'px';
		_suggestion.div.style.width = _suggestion.input.offsetWidth - 2 + 'px';
	};
	
	_suggestion.get = function(){
		_suggestion.resize();
		if(_suggestion.input.value == _suggestion.key)return;
		_suggestion.key = _suggestion.input.value;
		var query = _suggestion.url;
		if(_suggestion.id.startsWith('/') || _suggestion.id.startsWith('http')){
			query = _suggestion.id;
		}else{
			query += _suggestion.id;
		}
		if(query.indexOf('?') == -1){
			query += '?_key=' + encodeURIComponent(_suggestion.key) + '&_max=' + _suggestion.max;
		}else{
			query += '&_key=' + encodeURIComponent(_suggestion.key) + '&_max=' + _suggestion.max;
		}
		httpGet(query, _suggestion.show);
	};
	
	_suggestion.show = function(data){
		_suggestion.div.innerHTML = '';
		var ul = document.createElement('ul');
		ul.style.listStyle = 'none';
		ul.style.margin = '0px';
		ul.style.padding = '0px';
		_suggestion.div.appendChild(ul);
		for(var i = 0; data[i]; i++){
			var li = document.createElement('li');
			li.setAttribute('index', i);
			li.style.listStyle = 'none';
			li.style.padding = '0 4px';
			li.style.lineHeight = '19px';
			li.style.fontSize = '12px';
			if(_suggestion.className == null){
				li.style.background = '#fff';
			}else{
				li.className = _suggestion.className;
			}
			li.onmouseover = function(){
				_suggestion.index = parseInt(this.getAttribute('index'));
				_suggestion.hover();
			};
			if(data[i]['value'] == ''){
				li.innerHTML = value(data[i]['key']);
			}else{
				li.innerHTML = value(data[i]['key'] + ' (' + data[i]['value'] + ')');
			}
			ul.appendChild(li);
			li.setAttribute('data-key', data[i]['key']);
			if(_suggestion.input.readOnly)continue;
			li.onmousedown = function(){
				_suggestion.input.value = this.getAttribute('data-key');
				if(_suggestion.input.onchange)_suggestion.input.onchange();
			};
		}
		_suggestion.div.style.display = '';
		_suggestion.index = -1;
	};
	
	_suggestion.hover = function(){
		var li = _suggestion.div.getElementsByTagName('li');
		if(_suggestion.className == null){
			for(var i = 0; li[i]; i++)li[i].style.background = '#fff';
			li[_suggestion.index].style.background = '#ebebeb';
		}else{
			for(var i = 0; li[i]; i++)li[i].className = _suggestion.className;
			li[_suggestion.index].className = _suggestion.className + ':hover';
		}
	};
}
_suggestion();

function suggest(input, id, max, className){
	_suggestion.input = input;
	_suggestion.id = id;
	if(max == undefined){
		_suggestion.max = 10;
	}else{
		_suggestion.max = max;
	}
	_suggestion.className = className;
	if(_suggestion.div == null){
		_suggestion.div = document.createElement("div");
		_suggestion.div.id = "_suggestion";
		_suggestion.div.style.display = "none";
		_suggestion.div.style.position = "absolute";
		_suggestion.div.style.height = "auto";
		_suggestion.div.style.zIndex = 100007;
		_suggestion.div.style.margin = "0px";
		_suggestion.div.style.padding = "0px";
		_suggestion.div.style.border = "1px solid #817f82";
		_suggestion.div.style.background = "#fff";
		document.body.appendChild(_suggestion.div);
	}
	_suggestion.key = null;
	var patched = _suggestion.input.getAttribute('patched') == 'true';
	if(!patched){
		_suggestion.input.setAttribute('patched', 'true');
		_suggestion.input.setAttribute('old-value', _suggestion.input.value);
		_suggestion.input.setAttribute('autocomplete', 'off');
		var onchange = _suggestion.input.onchange;
		_suggestion.input.onchange = function(){
			if(_suggestion.input.getAttribute('free') != 'true'){
				var isKey = false;
				var lis = _suggestion.div.getElementsByTagName('li');
				for(var i = 0; lis[i]; i++){
					var key = lis[i].getAttribute('data-key');
					if(_suggestion.input.value == key)isKey = true;
				}
				if(!isKey)_suggestion.input.value = '';
			}
			
			if(!onchange)return;
			var dochange = onchange();
			if(dochange == false){//roll back
				_suggestion.input.value = _suggestion.input.getAttribute('old-value');
			}else{
				_suggestion.input.setAttribute('old-value', _suggestion.input.value);
			}
		};
	}
	_suggestion.timer = setInterval(_suggestion.get, 100);
	input.onblur = function(){
		clearInterval(_suggestion.timer);
		_suggestion.div.style.display = 'none';
	};
	input.onkeydown = function(e){
		if(_suggestion.div.style.display == 'none')return;
		e = e || window.event;
		var code = e.keyCode || e.which || e.charCode;
		if(code == 38 || code == 40){
			if(code == 38){
				_suggestion.index -= 1;
			}else{
				_suggestion.index += 1;
			}
			var li = _suggestion.div.getElementsByTagName('li');
			if(_suggestion.index >= li.length)_suggestion.index = 0;
			if(_suggestion.index < 0)_suggestion.index = li.length - 1;
			if(li.length == 0)_suggestion.index = -1;
			if(_suggestion.index > -1)_suggestion.hover();
		}else if(code == 13){
			var li = _suggestion.div.getElementsByTagName('li');
			if(_suggestion.index > -1 && _suggestion.index < li.length){
				if(!_suggestion.input.readOnly)li[_suggestion.index].onmousedown();
				_suggestion.input.blur();
			}
			return false;
		}
	};
}
