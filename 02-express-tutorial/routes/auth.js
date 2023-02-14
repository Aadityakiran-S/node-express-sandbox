const express = require('express');
const router = express.Router();

//Middleware to parse from data in traditional form (x-www-form-urlencoded)
const urlencodedParser = express.urlencoded({extended: false});

//This is for traditional form (index.html)
//Data is passed in x-www-form-urlencoded so we need parse
router.post('/', urlencodedParser, (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`);
    }
    else {
        return res.status(401).send(`Please provide credentials`);
    }
})

module.exports = router; //This is boilerplate required for making middleware router work