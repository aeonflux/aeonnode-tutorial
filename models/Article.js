const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const ArticleSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    image: {
        type: String,
    },
    author: {
        type: String
    },
    datePosted: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('article', ArticleSchema)
