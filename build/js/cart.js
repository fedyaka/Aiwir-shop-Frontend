$('document').ready(function(){
    loadCart();
});

function loadCart(){

    var arrayId = [];

    for(var id in cart){
        arrayId.push(id);
    }

    fetch('http://localhost:0080/shop/allById', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'force-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(arrayId),
    })
    .then(response => response.json())
    .then(response =>{
        console.log(response);
        var outGoods = '';
        var outTotalSum = 0;

        for (var key in response){// В переменной key находится id массива response
            outGoods += '<div class="cart__goods-cart">';

            outGoods += '<div class="cart__img-wrap">';
            if (response[key]['image'] == null){
                outGoods += '<img src="goods.jpg" alt="изображение товара">';
            } else{
                outGoods += '<img src="' + response[key]['image'] + '" alt="изображение товара">';
            }

            outGoods += '</div>';

            outGoods += '<div class="cart__text-wrap">';
            outGoods += '<p class="cart__name">' + response[key]['name'] + '</p>';
            outGoods += '<p class="cart__count text">Цена: ' + response[key]['cost'] + ' руб.<br>Количество:</p>';
            outGoods += '<div class="cart__count-button">' +'<button class="minus" data-id="' + response[key]['id'] + '">-</button>' + cart[response[key]['id']] + '<button class="plus" data-id="' + response[key]['id'] + '">+</button>' + '</div>'
            outGoods += '</div>';

            outGoods += '<a href="#" class="del-goods" data-id="' + response[key]['id'] + '"><span class="cart__trash"></span></a>';

            outGoods += '</div>';

            outTotalSum += response[key]['cost'] * cart[response[key]['id']];
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
    })

    function deleteGoods(){
        var articul = $(this).attr('data-id');
        delete cart[articul];
        localStorage.setItem('cart', JSON.stringify(cart));
        showCountGoodsCart();
        loadCart();
    }
    function plusGoods(){
        var articul = $(this).attr('data-id');
        cart[articul]++;
        localStorage.setItem('cart', JSON.stringify(cart));
        showCountGoodsCart();
        loadCart();
    }
    function minusGoods(){
        var articul = $(this).attr('data-id');
        if (cart[articul] > 1){
            cart[articul]--;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        showCountGoodsCart();
        loadCart();
    }

    //отправка формы
    $('.create-order__form').submit(function(event){
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        var order = {
            name : formData.get('name'),
            surname : formData.get('surname'),
            phoneNumber : formData.get('phoneNumber'),
            address : formData.get('address'),
            description : formData.get('description'),
            cart
        };

        console.log(JSON.stringify(order));
        fetch('http://localhost:0080/shop/order', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(order),
        })
        .then(data => data.text())
        .then(data =>{
            console.log("возврат")
            console.log(data);  
        })

        cart = {}
        localStorage.setItem('cart', JSON.stringify(cart));
        showCountGoodsCart();
        loadCart();

        alert("Заявка оставлена, ожидайте звонка оператора! :)")


    })



}