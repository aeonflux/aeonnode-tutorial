const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String
    },
    slug: {
        type: String
    }
})

module.exports = mongoose.model('category', CategorySchema)
