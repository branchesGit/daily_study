define(['zepto','event', 'ajax'], function($){
	var settings = {
		url: './data.json',
		direction: 'vertical',
		oPaddingLeft: 24,
		prefixCls: 'branches-menu',
		subMenuCls: 'sub-menu',
		menuItem: 'menu-item',
		activeCls: 'active',
		openSubMenu: 'open',
		hiddenSubMenu:'hidden'
	};

	$.fn.Menu = function(){
		_loadMenuData();

		if( settings.loadedData ){
			var list = settings.oData;
			var level = 1;

			this.each(function(){
				$(this).addClass(settings.prefixCls);
				//垂直方向时，处理方式
				$(this).append( _createUL( level, list ) );
				//垂直时，子菜单的点击事件
				var subMenuCls = '.' + settings.subMenuCls;
				(settings.direction === "vertical") &&
				( $(this).on('click', subMenuCls, _handleSubMenuClick) );
				//点击每一项时的处理方式
				var menuItemCls = "." + settings.menuItem;
				$(this).on('click', menuItemCls, _handleMenuItem);
			});
		}
	}

var _handleMenuItem = function(){
	var menuItemCls = "." + settings.menuItem,
		activeCls = settings.activeCls;

	$(this).closest("." + settings.prefixCls).find(menuItemCls).removeClass(activeCls)
	$(this).addClass(activeCls);
}

	var _handleSubMenuClick = function(){
		var $ul = $($(this).parent().find('ul')[0]);
		var dis = $ul.css("display");
		var removeCls,addCls;

		if( $ul.hasClass(settings.openSubMenu) ){
			removeCls = settings.openSubMenu;
			addCls = settings.hiddenSubMenu;
		} else {
			removeCls = settings.hiddenSubMenu;
			addCls = settings.openSubMenu;
		}

		$ul.removeClass(removeCls).addClass(addCls);
		$(this).removeClass('title-' + removeCls).addClass('title-' + addCls);
	}

	var _createUL = function( level, list ){
		var $ul = $("<ul data-level=\"" + level + "\"></ul>");
		
		if( level !== 1){
			$ul.addClass(settings.hiddenSubMenu);
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

			$div.addClass(settings.subMenuCls).addClass("title-hidden");
			$li.append( _createUL( level,subs ) );
		} else {
			$li.addClass(settings.menuItem);
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