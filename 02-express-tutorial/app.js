const express = require('express');
const { products } = require('./data');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href ="api/products">products</a>');
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image }
    })

    res.json(newProducts);
})
//Route Parameters
app.get('/api/products/:productID', (req, res) => {
    console.log(req.params);

    const { productID } = req.params;
    const singleProduct = products.find(
        (product) => product.id === Number(productID));

    //Given Product ID doesn't exist
    if (!singleProduct) {
        res.status(404).send(`Product with ID ${productID} DNE`);
    }
    else {
        res.json(singleProduct);
    }
})
//More complicated route params
app.get('/api/products/:productID/reviews/:reviewID', (req, res) =>{
    console.log(req.params);
    res.send(`Product ID: ${req.params.productID} \n 
    Review ID: ${String(req.params.reviewID)}`);
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
})