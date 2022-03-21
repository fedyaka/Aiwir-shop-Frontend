$(function(){
	$('.slider-illustration__inner').slick({
		lazyLoad: 'ondemand',
		prevArrow: '<button type="button" class="slick-prev-ill slick-btn-ill"><span class="icon-caret-left icon-ill"></span></button>',
		nextArrow: '<button type="button" class="slick-next-ill slick-btn-ill"><span class="icon-caret-right icon-ill"></span></button>'
	});


	$('.menu__pushmenu').on('click', function() {
		$('.menu__pushmenu').toggleClass('menu__pushmenu_active');
		$('.menu-list').toggleClass('menu-list_active');

		$('.content').toggleClass('content_active');
	});
});

