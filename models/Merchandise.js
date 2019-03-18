const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const MerchandiseSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    image: {
        type: String
    },
    author: {
        type: String,
    },
    datePosted: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('merchandise', MerchandiseSchema)
