require.config({
	paths:{
		'zepto': '../lib/src/zepto'
	},
	shim:{
		'zepto':{
			exports: '$'
		}
	}
});

require(["tip"], function(){
	$(function(){
		$(".tip").Tip();
	})
})