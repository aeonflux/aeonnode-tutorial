const
    encryptor = require('simple-encryptor'),
    bcrypt = require('bcryptjs');

module.exports = {

    encrypt: value => {

        if (!value) return;

        const result = encryptor.encrypt(value).replace(/\+/g, '_').replace(/\=/g, '__')

        return result;
    },

    decrypt: token => {

        if (!token) { return; }

        token = token.replace(/\__/g, '=').replace(/\_/g, '+');

        const result = encryptor.decrypt(token);

        return result;
    },

    toHash: (password, callback) => {

        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(password, salt, (err, hash) => {

                callback(hash);
            })
        });
    },

    compare: (leftValue, rightValue, callback) => {

        bcrypt.compare(leftValue, rightValue, callback);
    }
}
