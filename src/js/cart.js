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
            outGoods += '<p class="cart__name">' + data[key].name + '</p>';
            outGoods += '<p class="cart__count text">Цена: ' + data[key].cost + ' руб.<br>Количество:</p>';
            outGoods += '<div class="cart__count-button">' +'<button class="minus" data-art="' + key + '">-</button>' + cart[key] + '<button class="plus" data-art="' + key + '">+</button>' + '</div>'
            outGoods += '</div>';

            outGoods += '<a href="#" class="del-goods" data-art="' + key + '"><span class="cart__trash"></span></a>';

            outGoods += '</div>';

            outTotalSum += data[key].cost * cart[key];
        }
        if (outGoods == ''){
            outGoods+= 'Корзина пуста';
            $('.cart-wrap').html('');
            $('.cart-null').html(outGoods);
        } else{
            $('.cart-wrap').html(outGoods);
            $('.cart-null').html('');
        }
        outTotalSum += ' руб.'

        $('.payment__total-sum').html(outTotalSum);

        $('.del-goods').on('click', deleteGoods);
        $('.plus').on('click', plusGoods);
        $('.minus').on('click', minusGoods);
    });

    function deleteGoods(){
        var articul = $(this).attr('data-art');
        delete cart[articul];
        localStorage.setItem('cart', JSON.stringify(cart));
        showCountGoodsCart();
        loadCart();
    }

    function plusGoods(){
        var articul = $(this).attr('data-art');
        cart[articul]++;
        localStorage.setItem('cart', JSON.stringify(cart));
        showCountGoodsCart();
        loadCart();
    }
    function minusGoods(){
        var articul = $(this).attr('data-art');
        if (cart[articul] > 1){
            cart[articul]--;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        showCountGoodsCart();
        loadCart();
    }
}