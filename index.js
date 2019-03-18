
const express = require("express"),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    app = express(),
    { development } = require('./environment/env.json');


mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/AeonNode')

app
    .use(cookieParser())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .all('*', (request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')
        response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
        response.header(
            'Access-Control-Allow-Headers',
            'Content-Type, ' + development.TOKEN_KEY
        )
        response.header('Access-Control-Expose-Headers', development.TOKEN_KEY)
        response.header('Content-Type', 'application/json; charset=utf-8')
        next()
    })

require('./middleware/registerEndpoints')(app)

app.use((err, request, response, next) => {
    if (err) {
        const { status } = err
        let { data } = err

        if (status === 422) {
            const { errors } = err
            data = { errors }
        }

        return response.status(status || 500).send(data)
    }

    next()
})

// handles root response
app.get('/', (request, response) => {
    response.send({ message: 'Welcome to Aeon Node Api' });
})


// handles 404 requests
app.use((request, response, next) => {
    response.status(404).end()
})


//Environment variables
//STAGING environment - Heroku
//Development - default
var port = process.env.PORT || 5000

app.listen(5000, () => {
    mongoose.connect(development.MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true
    })

    mongoose.connection
        .once('open', () => {
            console.log(`Started on port ${development.PORT}`)
            console.log('mongodb open')
        })
        .on('error', error => {
            console.warn('Warning', error)
        })
})

