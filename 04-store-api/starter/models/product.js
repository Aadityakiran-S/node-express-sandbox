const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product must have a name!']
    },
    price: {
        type: Number,
        required: [true, 'Product must have a price!']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 2.5
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enumm: {
            value: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
    }
});

module.exports = mongoose.model('Product', productSchema);