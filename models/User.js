const //MongoDB Model
    mongoose = require('mongoose'),
    //MongoDB Setup (Port,MONGODB_URI, etc.)
    { development } = require('../environment/env.json'),
    //Field validation
    validator = require('validator'),
    //Encrypting/Decrypting Tokens or Data
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    cryptoSvc = require('../services/cryptingService'),
    //Model Usage
    UserToken = require('./UserToken')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailAddress: {
        type: String,
        unique: true,
        required: [true, 'Required'],
        trim: true,
        validate: [
            {
                validator: value => {
                    return validator.isEmail(value)
                },
                message: 'Not a valid email address'
            }
        ]
    },
    role: {
        type: String,
        required: [true, 'Required'],
    },
    password: {
        type: String,
        required: [true, 'Required'],
        minlength: [6, 'Must not be shorter than 6 characters']
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    }
})


UserSchema.methods.toJSON = function () {
    const user = this,
        userObject = user.toObject()

    return _.pick(userObject, [
        '_id',
        'emailAddress',
        'firstName',
        'lastName',
        'role'
    ])
}

UserSchema.methods.generateAuthToken = function () {
    const user = this,
        access = 'auth',
        token = jwt
            .sign({ _id: user._id.toHexString(), access }, development.JWT_SECRET)
            .toString()

    console.log('creating token')
    const userToken = new UserToken({ user: this._id, access, token })
    console.log(userToken)

    return userToken.save().then(() => {
        return token
    })
}


UserSchema.pre('save', function (next) {
    const user = this

    if (user.isModified('password')) {
        cryptoSvc.toHash(user.password, hash => {
            user.password = hash
            next()
        })
    } else {
        next()
    }
})

UserSchema.statics.findByCredentials = function (emailAddress, password) {

    const
        failMassage = 'Sign-in credentials are not recognised',
        User = this,
        result =

            User.findOne({ emailAddress })
                .then(user => {

                    if (!user) {

                        return Promise.reject({ message: failMassage });
                    }


                    return new Promise((resolve, reject) => {

                        cryptoSvc.compare(password, user.password, (err, res) => {

                            if (err) throw { status: 400, data: err };

                            if (res) {

                                resolve(user);
                            }
                            else {
                                reject({ status: 401, message: failMassage });
                            }
                        });
                    });
                });

    return result;


}

module.exports = mongoose.model('user', UserSchema)

