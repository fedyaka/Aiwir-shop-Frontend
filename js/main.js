$(function(){
	$('.slider_illustration_inner').slick({
		lazyLoad: 'ondemand',
		prevArrow: '<button type="button" class="slick-prev-ill slick-btn-ill"><span class="icon-caret-left icon-ill"></span></button>',
		nextArrow: '<button type="button" class="slick-next-ill slick-btn-ill"><span class="icon-caret-right icon-ill"></span></button>'
	});


	$('.pushmenu').on('click', function() {
		$('.pushmenu').toggleClass('pushmenu_active');
		$('.menu-list').toggleClass('menu_active');
		$('.content').toggleClass('content_active');
	});
});

