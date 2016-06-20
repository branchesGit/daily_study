define(['zepto','event', 'ajax', 'touch'], function($){
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

	$.fn.Menu = function( options ){
		settings = $.extend( {}, settings, options );
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
				/*
				if( _isVertical() ){
					$(this).on('click', subMenuCls, _handleSubMenuClick);
				} else {
					$(this).on('mouseover', ".subs", _onMouseOver);
					$(this).on('mouseout', ".subs", _onMouseOut);
				}*/
				$(this).find(subMenuCls).on('tap', _handleSubMenuClick);
				/*
				if(!_isVertical()){
					$(this).find(subMenuCls).on('touchstart',function(){
						$(this).closest("li").addClass("select");
					});

					$(this).find(subMenuCls).on('touchend',function(){
						$(this).closest("li").removeClass('select');
					});
				}*/

				//点击每一项时的处理方式
				var menuItemCls = "." + settings.menuItem;
				$(this).find(menuItemCls).on('tap', _handleMenuItem);
			});
		}
	}

var _onMouseOver = function(){
	var $ul = $($(this).find('ul')[0]);
	var dis = $ul.css("display");
	var removeCls,addCls;

	removeCls = settings.hiddenSubMenu ;
	addCls = settings.openSubMenu;
	$ul.removeClass(removeCls).addClass(addCls);
	$ul.prev().removeClass('title-' + removeCls).addClass('title-' + addCls);
};

var _onMouseOut = function(){
	var $ul =  $($(this).find('ul')[0]);
	var removeCls,addCls;
	removeCls = settings.openSubMenu;
	addCls = settings.hiddenSubMenu ;
	
	$ul.removeClass(removeCls).addClass(addCls);
	$ul.prev().removeClass('title-' + removeCls).addClass('title-' + addCls);
};

var _isVertical = function(){
	return settings.direction === 'vertical';
};

var _handleMenuItem = function(){
	var $gul = $(this).closest("." + settings.prefixCls);

	if( !_isSameMenu($(this), $gul) ){
		$gul.find("li").removeClass("select");
		_removeOpenSubMenu($gul);
	}

	var menuItemCls = "." + settings.menuItem,
		activeCls = settings.activeCls;
	var $menu = $(this).closest("." + settings.prefixCls);
	$menu.find(menuItemCls).removeClass(activeCls);
	$(this).addClass(activeCls);

	$(this).closest('li[data-level="1"]').addClass("select");

}
	
	var _removeOpenSubMenu = function( $elem ){
		if( !_isVertical() ){
			//$elem.find("li").removeClass("select");

			var $openMenus = $elem.find(".title-open");
			$openMenus.each(function(idx,menu){
				var $li = $(menu).parent();
				var removeCls = settings.openSubMenu,
					addCls = settings.hiddenSubMenu;

				var $ul = $($(this).parent().find('ul')[0]);
				$ul.removeClass(removeCls).addClass(addCls);
				$(menu).removeClass('title-' + removeCls).addClass('title-' + addCls);
			})
		}
	};

	var _isSameMenu = function( $elem, $parent){
		var $menus = $parent.find(".title-open");
		var elem = $elem[0];
		var bSame = false;

		$menus.each(function(idx,menu){
			if( menu === elem ){
				bSame = true;
				return false;
			}
		});

		return bSame;
	};

	var _handleSubMenuClick = function(){
		var $parent = $(this).closest("ul");

		if( !_isSameMenu( $(this), $parent ) ){
			_removeOpenSubMenu($parent);
		}

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
		
		if( level === 1 && !_isVertical() ){
			$ul.addClass("branches-horizontal");
		} 

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
		_isVertical() && $div.css("PaddingLeft", level * settings.oPaddingLeft + "px");

		if( obj.subs ){
			var subs = obj.subs;
			level++;

			$div.addClass(settings.subMenuCls).addClass("title-hidden");
			$li.append( _createUL( level,subs ) );
			$li.addClass("subs");
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