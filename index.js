const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send({ message: 'This is Aeon Node' });

})

app.listen(7000);