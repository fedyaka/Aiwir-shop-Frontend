var cart = {}; //Корзина

$('document').ready(function(){
	// Слайдер
	$('.slider-illustration__inner').slick({
		lazyLoad: 'ondemand',
		prevArrow: '<button type="button" class="slick-prev-ill slick-btn-ill"><span class="icon-caret-left icon-ill"></span></button>',
		nextArrow: '<button type="button" class="slick-next-ill slick-btn-ill"><span class="icon-caret-right icon-ill"></span></button>'
	});
	
	$('.slider-illustration-examples__inner').slick({
		lazyLoad: 'ondemand',
		prevArrow: '<button type="button" class="slick-prev-ill slick-btn-ill"><span class="icon-caret-left icon-ill"></span></button>',
		nextArrow: '<button type="button" class="slick-next-ill slick-btn-ill"><span class="icon-caret-right icon-ill"></span></button>'
	});



	// Отзывчивое меню
	$('.menu__pushmenu').on('click', function() {
		$('.menu__pushmenu').toggleClass('menu__pushmenu_active');
		$('.menu-list').toggleClass('menu-list_active');

		$('.content').toggleClass('content_active');
	});

	// Колличество товара в мини-корзине
	checkCart();
	showCountGoodsCart();
});

function checkCart(){
	//Проверка наличия корзины в localStorage
	var localCart = localStorage.getItem('cart');
	if (localCart != null){
		cart = JSON.parse(localCart);
	}
}

function showCountGoodsCart(){
	//Вывод колличества товара в шапке
	var out = 0;
	for (var key in cart){
		out += cart[key];
	}
	$('.menu__basket').html(out);
}