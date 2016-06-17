define(['zepto','event', 'ajax'], function($){
	var settings = {
		url: './data.json',
		direction: 'vertical',
		oPaddingLeft: 24
	};

	$.fn.Menu = function(){

		_loadMenuData();

		if( settings.loadedData ){
			var list = settings.oData;
			var level = 1;

			this.each(function(){
				$(this).append( _createUL( level, list ) );
			});

			/*
			this.on('click', '.sub-menu', function(){
				var $ul = $($(this).find('ul')[0]);
				var dis = $ul.css("display");
				dis = dis === "block" ? "none" : "block";
				$ul.css("display",dis);
			});*/
			
		}

	}

	var _createUL = function( level, list ){
		var $ul = $("<ul data-level=\"" + level + "\"></ul>");
		
		if( level !== 1){
			$ul.css("display","none");
		}

		$.each( list, function( idx, obj ){
			$ul.append( _createLI(level, idx, obj) )
		});

		return $ul;
	};

	var _createLI = function( level, index, obj ){
		var $li = $('<li data-index="' + (++index) + '" data-level="' + level +'"></li>');
		var $div = $('<div>' + obj.label + '</div>');
		$li.append( $div );
		$div.css("PaddingLeft", level * settings.oPaddingLeft + "px");

		if( obj.subs ){
			var subs = obj.subs;
			level++;

			$li.addClass("sub-menu")
			$li.append( _createUL( level,subs ) );
		}

		return $li;
	};

	var _loadMenuData = function(){
		var url = settings.url;
		url = url.indexOf("?") !== -1 ? 
				url.replace("?", "?timeStamp=" + (+new Date)) : url + "?timeStamp=" + (+new Date);
		
		$.ajax({
			url: url,
			async: false,
			dataType: 'json',
			data: settings.data || {},
			success: _loadDataSuccess,
			error: _loadDataError
		})
	};

	var _loadDataSuccess = function( data ){
		settings.oData = data;
		settings.loadedData = true;
	};

	var _loadDataError = function( data ){
		settings.oData = null;
		settings.loadedData = false;
	}
})