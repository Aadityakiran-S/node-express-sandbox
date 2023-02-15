const mongoose = require('mongoose');

const connectString = 'mongodb+srv://aadityakiran_s:MongoDB123@nodeexpressprojects.makop0m.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectString,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => console.log('CONNECTED TO DB....'))
    .catch((err) => console.log(err));