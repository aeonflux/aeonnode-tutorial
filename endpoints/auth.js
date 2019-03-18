const
    mongoose = require('mongoose'),
    _ = require('lodash'),
    router = require('express').Router(),
    User = require('../models/User');

mongoose.Promise = global.Promise;

const save = {

    'seller': (user, request, response) => {

        user.save().then(() => {

            return user.generateAuthToken();
        })
            .then(token => {

                const { emailAddress, role } = user;

                response.send({ token, emailAddress, role });
            });

    }
}

router
    .get('/', (request, response) => {
        response.send({ message: 'Welcome to Aeon Node API' });
    })

    .get('/me', (request, response) => {

        const { emailAddress, role } = request.xAuth.user;
        response.send({ emailAddress, role });
    })

    .post('/', (request, response) => {

        const { body } = request;

        const
            user = new User(body),
            { firstName, lastName, emailAddress, password, role } = user;

        save[role](user, request, response);
    })

    .post('/login', (request, response) => {

        const { emailAddress, password } = request.body;

        User.findByCredentials(emailAddress, password)
            .then(user => {
                console.log(user);
                user.generateAuthToken().then(token => {
                    const { emailAddress, role } = user;
                    response.send({ token, emailAddress, role });
                });
            })
            .catch(err => {
                response.status(401).send(err);
            });





    })



module.exports = router;
