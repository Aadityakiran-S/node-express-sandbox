const express = require('express');
const { products } = require('./data');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href ="api/products">products</a>');
})
//Basic API route with no parameters
app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image }
    })

    res.json(newProducts);
})
//Basic route Parameters
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
    Review ID: ${req.params.reviewID}`);
})
//Query string parameters
app.get('/api/v1/query', (req, res) => {
    const {search, limit} = req.query;
    console.log(req.query);
    //#region  Spheal on deep copy and spread operator
    //Spread operator creates a deep copy of the previous array.
    //Meaning that if you change the array 'sortedProducts' then
    //no change will occur to the prodcts array. BUT if you distort
    //an object inside sortedProducts, that will reflect in products as well
    //since only the array is cloned and not the objects within them
    //#endregion
    let sortedProducts = [...products]; 
    if(search){ //If search exists in query
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if(sortedProducts.length == 0){
        // res.status(200).send(`Your query didn't match any results`);
        res.status(200).json({succuss: true, data: []});
        console.log('No products to return');
        return;
    }
    res.status(200).json(sortedProducts);
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
})