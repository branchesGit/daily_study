require.config({
	paths:{
		'zepto': '../lib/src/zepto',
		'event': '../lib/src/event',
		'touch': '../lib/src/touch'
	},
	shim:{
		'zepto':{
			exports: '$'
		},
		'event':{
			deps:['zepto'],
			exports: '$'
		},
		'touch':{
			deps:['zepto'],
			exports: '$'
		}
	}
});

require(["tab"], function(){
	$(function(){
		$(".tabs").Tab();
	})
})