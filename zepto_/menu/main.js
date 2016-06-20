require({
	paths:{
		'zepto': '../zepto/src/zepto',
		'event':'../zepto/src/event',
		'ajax': '../zepto/src/ajax',
		'touch':'../zepto/src/touch'
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
	$(".menu").click(function(){
		$(".brh-menu").Menu({"direction":"horizontal"});
	//	$(".brh-menu").Menu();
	})
});



