define(['zepto'], function($){
	var _options = {
		nav:"branches-tab-nav"
	};

	$.fn.Tab = function( options ){
		_options = $.extend( {}, _options, options );

		this.each(function(){
			var elem = this;

			_wrapperUL( elem );

		});
	};

	var _wrapperUL = function( elem ){
		var $ul = $($(elem).find("ul")[0]);
		var $div = $('<div class="' + _options.nav + '"></div>')
	}
});