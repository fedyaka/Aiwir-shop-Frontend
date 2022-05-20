$('document').ready(function(){
    loadShop();
});

var page = 0;
var size = 20;

function loadShop(){

	fetch('http://localhost:0080/shop/' + page + '/' + size)
	.then(data =>{
		return data.json();
	})
	.then(data =>{
		var out = '';

		for(var key in data){

			out += '<div class="goods">';
                
			out += '<a href="#goods-desc" class="open-desc" data-id="' + data[key]['id'] + '">';
			if (data[key]['image'] == null){
				out += '<div class="goods__image"><img src="goods.jpg" alt="image goods"></div>'
			}else{
				out += '<div class="goods__image"><img src="' + data[key]['image'] + '" alt="image goods"></div>'
			}
			out += '</a>';

			out += '<div class="goods__text">';
			out += '<a href="#goods-desc" class="open-desc" data-id="' + data[key]['id'] + '">' + data[key]['name'] + '</a>';
			out += '<hr>';
			out += '<p>' + data[key]['cost'] + 'руб</p>';
			out += '</div>';

			out += '</div>';
		}

		$('.shop').html(out);
	 	$('.open-desc').on('click', openDesc);
	})
}




// function addToCart(){
// 	//Добавление товара в корзину 
// 	var id = $(this).attr('data-id');
// 	if (cart[id] != undefined){
// 		cart[id]++;
// 	} else {
// 		cart[id] = 1;
// 	}
// 	setLocalStorage();
// }
// function setLocalStorage(){
// 	localStorage.setItem('cart', JSON.stringify(cart));
// 	showCountGoodsCart();
// }