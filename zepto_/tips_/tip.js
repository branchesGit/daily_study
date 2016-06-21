define(['zepto'], function($){
	var settings = {
		triangleHeight: 8
	};

	$.fn.Tip = function( options ){
		settings = $.extend( {}, settings, options );

		this.each(function(){
			_createTip( $(this) );
		})
	}


	var _createTip = function( $elem ){
		var left = $elem.data("left"),
			top = $elem.data("top"),
			right = $elem.data("right"),
			bottom = $elem.data("bottom"),
			tip = $elem.data("tip"),
			width = $elem.data("width");

		if( $elem.css("position") === "static" ){
			$elem.css({"position":'relative'});
		}

		var $div = $('<div class="branches-tip" style="display:block;"></div>');
		var $i, $span;
		//左上 位置
		if( left && top ){
			$i = $('<i class="triangle-left-top"></i>');
			$span = $('<span class="branches-tip-content">' + tip + '</span>');
			if( width ){
				$span.css("width", width + 'px');
			} else {
				$span.css("white-space",'nowrap');
			}
 
			$div.append($span).append($i);
			$elem.append($div);

			var w = $span.width(),
				h = $span.height();

			var l = w / 2;
			l += 'px';
			$i.css({"left": l, 'bottom': 0 - settings.triangleHeight + 'px'});
			
			var t = h + settings.triangleHeight;
			t = 0 - t + 'px';

			var offsetL = ($elem.width() - w ) / 2 - settings.triangleHeight;
			h = h + settings.triangleHeight;

			$div.css({"left":offsetL + 'px', "top": t, "width": w + 'px', 'height': h + 'px'});
			$div.css("display",'none');
		}
	}
});