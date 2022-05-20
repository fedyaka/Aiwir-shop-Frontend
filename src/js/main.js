var cart = {}; //Корзина

$('document').ready(function(){
	// Слайдер на главной странице
	$('.slider-illustration__inner').slick({
		lazyLoad: 'ondemand',
		prevArrow: '<button type="button" class="slick-prev-ill slick-btn-ill"><span class="icon-caret-left icon-ill"></span></button>',
		nextArrow: '<button type="button" class="slick-next-ill slick-btn-ill"><span class="icon-caret-right icon-ill"></span></button>'
	});
	//Слайдер в заказах
	$('.slider-illustration-examples__inner').slick({
		lazyLoad: 'ondemand',
		prevArrow: '<button type="button" class="slick-prev-ill slick-btn-ill"><span class="icon-caret-left icon-ill"></span></button>',
		nextArrow: '<button type="button" class="slick-next-ill slick-btn-ill"><span class="icon-caret-right icon-ill"></span></button>'
	});

	// Отзывчивое меню
	$('.menu__pushmenu').on('click', function() {
		$('.menu__pushmenu').toggleClass('menu__pushmenu_active');
		$('.menu__list').toggleClass('menu__list_active');

		$('.content').toggleClass('content_active');
	});

	// Колличество товара в мини-корзине
	checkCart();
	showCountGoodsCart();
});


//МЕТОДЫ ДЛЯ ТОВАРОВ

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

//Запись в модальное окно данные о товаре
function openDesc(){
	var id = $(this).attr('data-id');

	fetch("http://localhost:0080/shop/" + id)
	.then(data =>{
		return data.json();
	})
	.then(data =>{
		console.log(data);
		var out = '';
		out += '<a href="##" class="modal-close"></a>';

		out += '<section class="goods-desc">';

		out += '<div class="goods-desc__image-wrap">';
		if (data.image == null){
			out += '<img src="goods.jpg" alt="">';
		} else {
			out += '<img src="' + data.image + '" alt="">';
		}
		out += '</div>';

		out += '<div class="goods-desc__desc">';
		out += '<p class="goods-desc__title subtitle">' + data.name + '</p>';
		out += '<hr>';
		out += '<p class="goods-desc__text text">' + data.description + '</p>';
		out += '<p class="goods-desc__price">' + data.cost + ' руб.</p>';
		out += '<button class="goods-desc__add-to-cart" data-id="'+ id + '">В корзину</button>';
		out += '</div>';

		out += '<a href="##" class="goods-desc__close">X</a>'

		out += '</section>';
	
		$('.modal-container').html(out);
		$('.goods-desc__add-to-cart').on('click', addToCart);
	})
}

function addToCart(){
	//Добавление товара в корзину 
	var id = $(this).attr('data-id');
	if (cart[id] != undefined){
		cart[id]++;
	} else {
		cart[id] = 1;
	}
	setLocalStorage();
}

function setLocalStorage(){
	localStorage.setItem('cart', JSON.stringify(cart));
	showCountGoodsCart();
}