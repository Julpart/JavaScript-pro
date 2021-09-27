const API ='https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function getRequest(url) {

    return new Promise(function(resolve, reject) {
  
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
  
      xhr.onload = function() {
        if (this.status == 200) {
          resolve(this.response);
        } else {
          let error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };
  
      xhr.onerror = function() {
        reject(new Error("Network Error"));
      };
  
      xhr.send();
    });
  
  }

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allproducts = [];

        this.fetchGoods().then((data)=>{
            this.goods = data;
            this.render();

        });
        
    }

    fetchGoods() {
      return fetch(`${API}/catalogData.json`)
      .then(response => response.json())
      .catch((err) => console.log(err));
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
    constructor(product,img ='https://cspromogame.ru//storage/upload_images/avatars/897.jpg' ) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
        
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