$(function(){
	$(".arrows").on("tap",  function(){
		
	})

	var $pages = $(".page");
	var index = 0, len = $pages.length;

	$pages.each(function(){
		$(this).height( clientH() );
	})

	function clientH(){
		return $(window).height();
	}

	$(document).swipeUp(function(){
		index++;
		index = index < len ? index : 0;

		var top = 0 - index * clientH();
		top += 'px';

		
		$(".pages").animate({top:top}, 1000,'linear',function(){
			$pages.removeClass("current");
			$($pages[index]).addClass("current");
		})
	})
})