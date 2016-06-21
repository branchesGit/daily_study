require({
	paths:{
		'zepto': '../lib/src/zepto',
		'event':'../lib/src/event',
		'ajax': '../lib/src/ajax',
		'touch':'../lib/src/touch'
	},

	shim:{
		'zepto':{
			exports: '$'
		},

		'event':{
			deps:['zepto'],
			exports: '$'
		},
		'ajax':{
			deps:['zepto'],
			exports: '$'
		},
		'touch':{
			deps:['zepto'],
			exports: '$'
		}
	}
});

require(['menu'], function(){
	$(function(){
		//$(".brh-menu").Menu();
		$(".brh-menu").Menu({"direction":"horizontal"});
	})
});



