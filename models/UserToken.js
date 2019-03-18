const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UserTokenSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    access: {
        type: String,
        required: [true, 'Required']
    },
    token: {
        type: String,
        required: [true, 'Required']
    }
})

module.exports = mongoose.model('usertoken', UserTokenSchema)

