define(['zepto','fx', 'fx_methods','event'], function($){

	var settings = {
		oClose: true,
		oTitle: 'branches title',
		oCls: 'branches-dailog branches-blue', 
		oTleSyl: 'text-align:center',
		oCover: true,
		content:'This is a dailog which the author is branches! This is a dailog which the author is branches!',
		ensures:[],
		cancels: []
	};

	var coverId = 1;

	$.fn.Dailog = function( options ){
		settings = $.extend( {}, settings, options );
		//插入遮罩层
		_handleCoverLayer( this );
		
		this.each(function(){
			$(this).append( _title() );
			$(this).append( _content() );
			$(this).append( _footer() );
		});

		_animate( this );
		var self = this;

		this.DailogAddEnsure( function(){_remove(self)} );
		this.DailogAddCancel( function(){_remove(self)} );

		this.on("click",".brh-close",function(){
			_remove(self);
		});

		this.on("click", ".ensure", function(){
			var ensures = settings.ensures;
			var i = 0, len = ensures.length;

			for( ; i < len; i++ ){
				ensures[i]();
			}
		});

		this.on("click", ".cancel", function(){
			var cancels = settings.cancels;
			var i = 0, len = cancels.length;

			for( ; i < len; i++ ){
				cancels[i]();
			}
		});
	}

	//移除对话框所有的信息
	$.fn.removes = function(){
		var layerId = this.attr("data-coverId");
		layerId = "#" + layerId;

		$(layerId).remove();
	};

	$.fn.removeElems = function(){
		this.children().remove();
		this.attr("style",'').removeClass(settings.oCls).removeAttr('data-coverid');
	}

	var _remove = function( $elem ){
		$elem.removes();
		$elem.removeElems();
	}

	$.fn.DailogAddEnsure = function( fn ){
		var ensures = settings.ensures ||( settings.ensures = [] );
		ensures[ensures.length++] = fn;
	};

	$.fn.DailogAddCancel = function( fn ){
		var cancels = settings.cancels ||( settings.cancels = [] );
		cancels[cancels.length++] = fn;
		
	};

	var _animate = function( $elem ){
		var mw = $(window).width(),
			mh = $(window).height(),
			w = $elem.width(),
			h = $elem.height();

		var l = ( mw - w ) / 2 ,
			t = ( mh - h ) / 2 ;
		l = l < 0 ? 0 : l;
		t = t < 0 ? 0 : t;

		$elem.css({"left": l + 'px', "top": t + 'px', "height": '0'});
		$elem.animate({'opacity':"1","height": h + 'px'}, 200, 'ease-in');
	};

	var _handleCoverLayer = function( $elem ){
		var cverId = 'branches' + coverId;
		coverId++;
		 
		$elem.addClass( settings.oCls ).attr("data-coverId", cverId);

		$(document.body).append('<div class="cover-layer" id="' + cverId + '"></div>');
	};	

	var _title = function(){
		var $div = $('<div class="brh-title"></div>'),
			span_tl = '<span style="width:100%;display:block;' + settings.oTleSyl + '">' 
					+ settings.oTitle + '</span>';

		$div.append( span_tl );

		if( settings.oClose ){
			$div.append('<span class="brh-close">+</span>');
		}

		return $div;
	};

	var _content = function(){
		var content = settings.content,
			$div = $('<div class="brh-content"></div>'),
			$span = $('<span>' + content + '</span>');

		$div.append($span);

		return $div;
	};

	var _footer = function(){
		var $div = $('<div class="brh-footer"></div>'),
			$ensure = $('<span class="ensure">确定</span>'),
			$cancel = $('<span class="cancel">关闭</span>');

		$div.append( $ensure ).append( $cancel );

		return $div;
	};

})