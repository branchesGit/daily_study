define(['zepto', 'event', 'touch'], function($){
	var _options = {
		tab:'branches-tab',
		nav:"branches-tab-nav",
		nav_line: 'branches-tab-nav-line',
		select_index: 0,
		liWidths:[]
	};

	$.fn.Tab = function( options ){
		_options = $.extend( {}, _options, options );

		this.each(function(){
			var elem = this;
			$(this).addClass(_options.tab);
			_wrapperTab( elem );

			$(".branches-tab-nav").on("tap", 'li', _handleTap);

		});
	};

	//响应点击事件 
	var _handleTap = function(){
		var index = parseInt( $(this).data("index"), 10 );

		if( index !== _options.select_index ){
			_options.select_index = index;
			var $ul = $(this).closest("ul");
			$ul.find("li").removeClass("select");

			$(this).addClass("select");
			var $navElem = $(this).closest("div");
			var $line = $navElem.find('.' + _options.nav_line);
			
			var left = 0;
			if( index >= 0 ){
				for(var i = 0; i < index; i++ )
					left += _options.liWidths[i];
				left = index ? left + 1 : left;
				$line.css( {"left": left + 'px'} );
			}

			//处理内容
			var $rootElem = $(this).closest('.' + _options.tab);
			var $cnts = $rootElem.find(".cnt");

			$cnts.each(function(idx, cnt){
				if( index === idx ){
					$(cnt).css("display", 'block');
				} else {
					$(cnt).css("display",'none');
				}
			})
		}
	}
	//初始化
	var _wrapperTab = function( elem ){
		var $ul = $($(elem).find("ul")[0]);
		var $div = $('<div class="' + _options.nav  + '"></div>');
		var $line = $('<div class="' + _options.nav_line + '"></div>');
		$ul.before($div);
		$div.append( $ul ).append($line);
		var index = _options.select_index;

		//这里只有一层 ul>li 
		var $lis = $ul.find("li");
		var w, total = 0;
		$lis.each(function(idx,li){	
			$(li).data("index", idx);
			w = $(li).width();
			_options.liWidths[idx] = w;

			if( idx === index ){
				$(li).addClass("select");
				$line.width( w + 2);

				$line.css( {"left": total + 'px'} )
			}

			total += w;
			if( !idx ){
				$(li).addClass("first");
			}
		});

		$cnts = $(elem).find(".cnt");
		$cnts.each(function(idx,cnt){
			$(cnt).data('index', idx);
			if(idx !== index){
				$(cnt).css("display", 'none');
			}
		});
	}
});