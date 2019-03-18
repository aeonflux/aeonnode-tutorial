const router = require('express').Router(),
    mongoose = require('mongoose'),
    Category = require('../../models/Category');


// Retrieve all categories
router.get('/', (request, response) => {
    Category.find({}, function (err, categories) {
        if (!err) {
            response.send({
                result: "SUCCESS",
                body: categories,
                message: "Successfuly retrieved " + categories.length + " categories"
            });
        } else {
            response.send({
                result: "FAIL",
                body: err,
                message: 'Failed to retrieve categories'
            })
        }
    });
})


// Create a category
router.post('/', (request, response) => {
    const { body } = request;
    const category = new Category(body);


    category.save(function (err, result) {
        if (!err) {
            response.send({
                result: "SUCCESS",
                body: category,
                message: "Successfuly created a category"
            });
        } else {
            response.send({
                result: "FAIL",
                body: err,
                message: 'Failed to create a category'
            })
        }
    })
})


// Update Category Details
router.patch('/:id', (request, response) => {
    const id = request.params.id;
    const { body } = request;


    Category.findOneAndUpdate(id, { $set: body }, { new: true }, function (err, article) {
        if (!err) {
            response.send({
                result: "SUCCESS",
                body: article,
                message: "Successfuly updated category"
            });
        } else {
            response.send({
                result: "FAIL",
                body: err,
                message: 'Failed to update category'
            })
        }
    })
})



// Delete Category 
router.delete('/:id', (request, response) => {
    const id = request.params.id;

    Category.findByIdAndDelete(id, function (err, result) {
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

