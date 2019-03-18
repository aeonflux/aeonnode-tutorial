const router = require('express').Router(),
    mongoose = require('mongoose'),
    Article = require('../../models/Article');


// Retrieve all articles
router.get('/', (request, response) => {
    Article.find({}, function (err, articles) {
        if (!err) {
            response.send({
                result: "SUCCESS",
                body: articles,
                message: "Successfuly retrieved " + articles.length + " article/s"
            });
        } else {
            response.send({
                result: "FAIL",
                body: err,
                message: 'Failed to retrieve article/s'
            })
        }
    });
})


// Create an article
router.post('/', (request, response) => {
    const { body } = request;
    const article = new Article(body);


    article.save(function (err, result) {
        if (!err) {
            response.send({
                result: "SUCCESS",
                body: article,
                message: "Successfuly created an article"
            });
        } else {
            response.send({
                result: "FAIL",
                body: err,
                message: 'Failed to create a article'
            })
        }
    })

})

// Update Article Details
router.patch('/:id', (request, response) => {
    const id = request.params.id;
    const { body } = request;


    Article.findOneAndUpdate(id, { $set: body }, { new: true }, function (err, article) {
        if (!err) {
            response.send({
                result: "SUCCESS",
                body: article,
                message: "Successfuly updated article"
            });
        } else {
            response.send({
                result: "FAIL",
                body: err,
                message: 'Failed to update article'
            })
        }
    })
})

// Delete Article 
router.delete('/:id', (request, response) => {
    const id = request.params.id;

    Article.findByIdAndDelete(id, function (err, result) {
        console.log(result);
        if (!err) {
            response.send({
                result: "SUCCESS",
                message: "Successfuly deleted article"
            });
        } else {
            response.send({
                result: "FAIL",
                message: 'Failed to deleted article'
            })
        }
    })
})


module.exports = router;

