const express = require('express');
const app = express();
const people = require('./routes/people.js'); //To get all the functionality of people routes 
const auth = require('./routes/auth.js');

//Static assets setup to get site up and running
app.use(express.static('./methods-public'));

app.use('/api/people', people); //Telling NodeJS what to do with api/people route
app.use('/login', auth);

app.listen(3000, () => {
    console.log('Server is listening on port 3000....');
})