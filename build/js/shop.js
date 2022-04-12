$('document').ready(function(){
    loadGoods();
});

function loadGoods(){
	$.getJSON('js/goods.json', function(data){
		var out = '';
        for(var i = 0; i < 5; i++){
            for(var key in data){
                out += '<div class="goods">';
                
                out += '<a href="#goods-desc" class="open-desc" data-art="' + key + '">';
                out += '<div class="goods__image"><img src="' + data[key]['image'] + '" alt="image goods"></div>';
                out += '</a>';
    
                out += '<div class="goods__text">';
                out += '<a href="#goods-desc" class="open-desc" data-art="' + key + '">' + data[key]['name'] + '</a>';
                out += '<hr>';
                out += '<p>' + data[key]['cost'] + 'руб</p>';
                out += '</div>';
    
                out += '</div>';
            }
        }
		$('.shop').html(out);
		$('.open-desc').on('click', openDesc);
	});
}

//Запись в модальное окно данные о товаре
function openDesc(){
	var articul = $(this).attr('data-art');

	$.getJSON('js/goods.json', function(data){
		var out = '';
		for(var key in data){
			if (key == articul){
				out += '<a href="##" class="modal-close"></a>';

				out += '<section class="goods-desc">';

				out += '<div class="goods-desc__image-wrap">';
				out += '<img src="' + data[key].image + '" alt="">';
				out += '</div>';

				out += '<div class="goods-desc__desc">';
				out += '<p class="goods-desc__title subtitle">' + data[key].name + '</p>';
				out += '<hr>';
				out += '<p class="goods-desc__text text">' + data[key].description + '</p>';
				out += '<p class="goods-desc__price">' + data[key].cost + ' руб.</p>';
				out += '<button class="goods-desc__add-to-cart" data-art="'+ key+ '">В корзину</button>';
				out += '</div>';

				out += '<a href="##" class="goods-desc__close">X</a>'

				out += '</section>';
				break;
			}
		}
		$('.modal-container').html(out);
		$('.goods-desc__add-to-cart').on('click', addToCart);
	});
}

function addToCart(){
	//Добавление товара в корзину 
	var articul = $(this).attr('data-art');
	if (cart[articul] != undefined){
		cart[articul]++;
	} else {
		cart[articul] = 1;
	}
	setLocalStorage();
}
function setLocalStorage(){
	localStorage.setItem('cart', JSON.stringify(cart));
	showCountGoodsCart();
}