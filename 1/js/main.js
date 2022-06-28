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
    constructor(basket,container = '.products') {
        this.container = container;
        this.goods = [];
        this.allproducts = [];
        this.basket = basket;

        this.fetchGoods().then((data)=>{
            this.goods = data;
            console.log(this.goods);
            this.render();

        });

        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('buy-btn')){
              this.basket.addItem(e.target);
            }
          });

        
        
    }

    fetchGoods() {
      return fetch(`${API}/catalogData.json`)
      .then(response => response.json())
      .catch((err) => console.log(err));
    }

    sumGoods(){
        return this.allProducts.reduce((accum, item) => accum + item.price, 0);
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
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        
    }
    

    render() {
        return `<div class="product-item">
                    <img src="${this.img}">
                    <h3>${this.title}</h3> 
                    <p>${this.price}</p>
                    <button class="buy-btn" 
                    data-id="${this.id}"
                    data-name="${this.title}"
                    data-price="${this.price}"'>Купить</button>
                </div>`
    }



    
}


class BasketList{
    constructor(container = '.cart-products'){
        this.container=container;
        this.goods = [];
        this.allProducts = [];
        this.fetchGoods().then((data)=>{
            this.goods = data;
            console.log(this.goods);
            this.render();

        });

        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
          });
          document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('del-btn')){
              this.deleteItem(e.target);
            }
          })
    }

    fetchGoods() {
        return fetch(`${API}/getBasket.json`)
        .then(response => response.json())
        .catch((err) => console.log(err));
      }

    addItem(p){
        this.getJson(`${API}/addToBasket.json`)
      .then(data => {
        if(data.result === 1){
          let productId = +p.dataset['id'];
          let find = this.allProducts.find(product => product.id === productId);
          if(find){
            find.quantity++;
            this.update(find);
          } else {
            let product = {
              id: productId,
              price: +p.dataset['price'],
              title: p.dataset['name'],
              quantity: 1
            };
            this.goods = [product];
            this.render();
          }
        } else {
          alert('Error');
        }
      })
    }//Добавить товар в корзину
    deleteItem(p){
        this.getJson(`${API}/deleteFromBasket.json`)
      .then(data => {
        if(data.result === 1){
          let productId = +p.dataset['id'];
          let find = this.allProducts.find(product => product.id === productId);
          if(find.quantity > 1){ 
            find.quantity--;
            this.update(find);
          } else { 
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
          }
        } else {
          alert('Error');
        }
      })
    }//Удалить товар из корзины

    update(product){
        let block = document.querySelector(`.cart-item[data-id="${product.id}"]`);
        block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
    }
    render(){
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            let productObject = new BasketItem(product);
            

            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    getJson(url){
        return fetch(url ? url : `${API + this.url}`)
          .then(result => result.json())
          .catch(error => {
            console.log(error);
          })
      }
    }
    




class BasketItem{
    constructor(product,img ='https://cspromogame.ru//storage/upload_images/avatars/897.jpg') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
        this.quantity = product.quantity;
    }

    render(){
        return `<div class="cart-item" data-id="${this.id}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.title}</p>
            <p class="product-quantity">Количество: ${this.quantity}</p>
        <p class="product-single-price">${this.price} за ед.</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">${this.quantity*this.price} ₽</p>
            <button class="del-btn" data-id="${this.id}">&times;</button>
        </div>
        </div>`
    };
}



const list = new ProductList(new BasketList());



