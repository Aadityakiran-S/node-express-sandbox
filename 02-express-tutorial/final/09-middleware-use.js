const express = require('express');
const morgan = require('morgan');
const logger = require('../logger.js');
const authorize = require('../authorize.js');

const app = express();


// app.use('/api', [authorize, logger]); //app.use() sets up middleware
app.use(morgan('tiny')); 
//Make sure you call it before you call get otherwise won't work
//NodeJS, order is important
//MIDDLEWARE FIRST  
// app.use(express.static('./public'));

//req => middleware => res
app.get('/', logger, (req, res) => {
    // logger(); //Do not call this function here, it's not required. CRAZY syntax, I know
    res.send('<h1>Home Page</h1>');
});

//Need to add logger since it only automatically adds to /api paths
app.get('/about', logger, (req, res) => {
    res.send('<h1>About Page</h1>');
})

//logger is applied to all paths that come after '/api' using .use() func
app.get('/api/products', (req, res) => {
    res.send('<h1>Products</h1>');
})

app.get('/api/items', (req, res) => {
    res.send(`<h1>Items with user ${JSON.stringify(req.user.name)}</h1>`);
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
})