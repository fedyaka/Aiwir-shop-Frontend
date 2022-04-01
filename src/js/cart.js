$('document').ready(function(){
    loadCart();
});

function loadCart(){
    $.getJSON('js/goods.json', function(data){
        var outGoods = '';
        var outTotalSum = 0;
        for (var key in cart){
            outGoods += '<div class="cart__goods-cart">';

            outGoods += '<div class="cart__img-wrap">';
            outGoods += '<img src="' + data[key].image + '" alt="изображение товара">';
            outGoods += '</div>';

            outGoods += '<div class="cart__text-wrap">';
            outGoods += '<p class="cart__name subtitle">' + data[key].name + '</p>';
            outGoods += '<p class="cart__count text">Цена за шт: ' + data[key].cost + ' руб.<br><br>Количество: ' + cart[key] + 'шт.</p>';
            outGoods += '<a href="#" class="del-goods" data-art="' + key + '"><span class="cart__trash"></span></a>';
            outGoods += '</div>';

            outGoods += '</div>';

            outTotalSum += data[key].cost * cart[key];
        }
        if (outGoods == ''){
            outGoods+= 'Корзина пуста';
            $('.cart-null').html(outGoods);
        } else{
            $('.cart').html(outGoods);
        }
        outTotalSum += ' руб.'

        $('.payment__total-sum').html(outTotalSum);

        $('.del-goods').on('click', deleteGoods);
    });
}
 
function deleteGoods(){
    var articul = $(this).attr('data-art');
}