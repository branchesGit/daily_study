require.config({
	paths:{
		'zepto': '../zepto/src/zepto'
	},
	shim:{
		'zepto':{
			exports: '$'
		}
	}
});

require(["tip"], function(){
	$(function(){
		$(".tabs").Tab();
	})
})