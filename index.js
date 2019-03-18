const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send({ message: 'This is Aeon Node' });

})

//Environment Variables
//PRODUCTION environment - heroku
//DEVELOPMENT environment - default
const PORT = process.env.PORT || 5000;


app.listen(PORT);