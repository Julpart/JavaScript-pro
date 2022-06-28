const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use('/', express.static('./public'));

app.get('/api/products', (req, res) => {
    fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
        if (err) res.send({ result: 0, text: err });
        else res.send(data);
    });
});


app.get('/api/cart', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) res.send({ result: 0, text: err });
        else res.send(data);
    });
});

app.post('/api/cart', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) res.send({ result: 0, text: err });
        else {
            const cart = JSON.parse(data);
            cart.contents.push(req.body);

            fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
                if (err) res.send({ result: 0, text: err });
                else res.send({ result: 1 });
            });
        }
    });
});

app.put('/api/cart/:id/:q', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) res.send({ result: 0, text: err });
        else {
            const cart = JSON.parse(data);
            const find = cart.contents.find((good) => {
                return good.id_product === +req.params.id;
            });
            find.quantity += +req.params.q;
            fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
                if (err) res.send({ result: 0, text: err });
                else res.send({ result: 1 });
            });
        }
    });
});

app.delete('/api/cart/:id', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) res.send({ result: 0, text: err });
        else {
            
            const cart = JSON.parse(data);
            const find = cart.contents.find((good) => {
                return good.id_product === +req.params.id;
            });
            cart.contents.splice(cart.contents.indexOf(find), 1);

            fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
                if (err) res.send({ result: 0, text: err });
                else res.send({ result: 1 });
            });
        }
    });
});

const port = 5555;
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
