

require.config({ paths:{
		zepto:'../zepto/src/zepto',
		fx: '../zepto/src/fx',
		fx_methods:'../zepto/src/fx_methods',
		event:'../zepto/src/event'
	}, shim:{
		zepto:{
			exports: "Zepto"
		},
		fx:{
			deps:['zepto'],
			exports: 'Zepto'
		},
		fx_methods:{
			deps:['zepto'],
			exports: 'Zepto'
		},
		event:{
			deps:['zepto'],
			exports:'Zepto'
		}
	}
});

require(['dailog'], function(){
	//console.log($)
	$(".btn").click( function(){
		$(".brh-dailog").Dailog()
	});
})