const products = [
    {id: 1, title: 'Notebook', price: 1000,img: 'https://cspromogame.ru//storage/upload_images/avatars/897.jpg'},
    {id: 2, title: 'Mouse', price: 20,img: 'https://cspromogame.ru//storage/upload_images/avatars/897.jpg'},
    {id: 3, title: 'Keyboard', price: 200,img: 'https://cspromogame.ru//storage/upload_images/avatars/897.jpg'},
    {id: 4, title: 'Gamepad', price: 50,img: 'https://cspromogame.ru//storage/upload_images/avatars/897.jpg'},
    
];

const renderProduct = (item) => {
    
    return `<div class="product-item">
                <img src="${item.img}">
                <h3>${item.title}</h3> 
                <p>${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = (list=products) => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join(''); 




renderPage();