require.config({
	paths:{
		"zepto": "../lib/src/zepto",
		'event': '../lib/src/event',
		'ajax': "../lib/src/ajax"
	},

	shim: {
		'zepto':{
			'exports': '$'
		},
		'event':{
			'deps': ['zepto'],
			'exports': '$'
		},
		'ajax': {
			'deps': ['zepto','event'],
			'exports': '$'
		}
	}
});


require(["menus"], function(){
	$(function(){
		$(".menus").Menus()
	});
});