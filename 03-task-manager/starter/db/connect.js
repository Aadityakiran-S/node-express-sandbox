const mongoose = require('mongoose');

const connectString = '';

mongoose.connect(connectString,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => console.log('CONNECTED TO DB....'))
    .catch((err) => console.log(err));
