$('document').ready(function(){
    loadTopGoods();
});

function loadTopGoods(){
	// $.getJSON('js/goods.json', function(data){
	// 	var out = '';
	// 	for(var key in data){
	// 		out += '<div class="goods">';
			
	// 		out += '<a href="#goods-desc" class="open-desc" data-id="' + key + '">';
	// 		out += '<div class="goods__image"><img src="' + data[key]['image'] + '" alt="image goods"></div>';
	// 		out += '</a>';

	// 		out += '<div class="goods__text">';
	// 		out += '<a href="#goods-desc" class="open-desc" data-id="' + key + '">' + data[key]['name'] + '</a>';
	// 		out += '<hr>';
	// 		out += '<p>' + data[key]['cost'] + 'руб</p>';
	// 		out += '</div>';

	// 		out += '</div>';
	// 	}
	// 	$('.top-goods__row').html(out);
	// 	$('.open-desc').on('click', openDesc);
	// });

	fetch('http://localhost:0080/shop/' + 0 + '/' + 6)
	.then(data =>{
		return data.json();
	})
	.then(data =>{
		var out = '';
		for(var key in data){
			out += '<div class="goods">';
			
			out += '<a href="#goods-desc" class="open-desc" data-id="' + data[key]['id'] + '">';
			if (data[key]['image'] == null){
                out += '<div class="goods__image"><img src="goods.jpg" alt="image goods"></div>';
            } else{
				out += '<div class="goods__image"><img src="' + data[key]['image'] + '" alt="image goods"></div>';
			}
			out += '</a>';

			out += '<div class="goods__text">';
			out += '<a href="#goods-desc" class="open-desc" data-id="' + data[key]['id'] + '">' + data[key]['name'] + '</a>';
			out += '<hr>';
			out += '<p>' + data[key]['cost'] + 'руб</p>';
			out += '</div>';

			out += '</div>';
		}
		$('.top-goods__row').html(out);
		$('.open-desc').on('click', openDesc);
	});
}