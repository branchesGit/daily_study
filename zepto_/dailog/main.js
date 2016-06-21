

require.config({ paths:{
		zepto:'../lib/src/zepto',
		fx: '../lib/src/fx',
		fx_methods:'../lib/src/fx_methods',
		event:'../lib/src/event'
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