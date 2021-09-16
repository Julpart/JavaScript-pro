class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allproducts = [];

        this.fetchGoods();
        this.render();
    }

    fetchGoods() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 1000, img: 'https://cspromogame.ru//storage/upload_images/avatars/897.jpg' },
            { id: 2, title: 'Mouse', price: 20, img: 'https://cspromogame.ru//storage/upload_images/avatars/897.jpg' },
            { id: 3, title: 'Keyboard', price: 200, img: 'https://cspromogame.ru//storage/upload_images/avatars/897.jpg' },
            { id: 4, title: 'Gamepad', price: 50, img: 'https://cspromogame.ru//storage/upload_images/avatars/897.jpg' },
        ];
    }

    sumGoods(){
        let sum=0;
        for (let product of this.goods) {
            sum = sum + product.price;
        }
        return sum;
    }



    render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObject = new ProductItem(product);

            this.allproducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }


}

class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = product.img;
    }

    render() {
        return `<div class="product-item">
                    <img src="${this.img}">
                    <h3>${this.title}</h3> 
                    <p>${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>`
    }
}


class BasketList{
    constructor(container = '#'){
        this.container=container;
        this.goods = [];//Список товаров
    }

    clearBasket(){}//Очистка корзины
    addItem(){}//Добавить товар в корзину
    deleteItem(){}//Удалить товар из корзины
    render(){}
    


}

class BasketItem{
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = product.img;
    }

    render(){};
}



const list = new ProductList();