const db = require('../models')

const Tutorial = db.tutorials;

const Op = db.Sequelize.Op;

//Create and save new tutorials
exports.create = (req, res) => {
    //Validate Request
    if (!req.body.title) {
        res.status(400).send({
            message: 'Title cannot be empty!'
        })
    }

    //Create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured while creating the tutorial.'
            })
        })

}

//Retieve all tutorials from the db
exports.findAll = (req, res) => {
    const title = req.query.title
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured while retrieving the tutorial.'
            })
        })

}

//Find a single tutorial by Id
exports.findById = (req, res) => {

    const id = req.params.id

    Tutorial.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Error retrieving tutorial with id ${id}.`
            })
        })

}

//Update tutorial by Id in request
exports.update = (req, res) => {

    const id = req.params.id
    console.log('id :>> ', id);

    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Tutorial was updated sucessfully.'
                })
            }
            else {
                res.send({
                    message: `Cannot update tutorial with id ${id}. Please try again.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Error updating tutorial with id ${id}.`
            })
        })


}

//Delete tutorial by Id in request
exports.delete = (req, res) => {

    const id = req.params.id

    Tutorial.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Tutorial was deleted sucessfully!'
                })
            }
            else {
                res.send({
                    message: `Cannot delete tutorial with id ${id}. Please try again.`
                })
            }
        })
        .catch(err => {
            res.send(500).send({
                message:
                    err.message || `Error deleting tutorial with id ${id}.`
            })
        })

}

//Deleta all tutorials from database
exports.deleteAll = (req, res) => {

    Tutorial.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({
            message: `${nums} tutorials were deleted sucessfully.`
        })
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured while deleting all tutorials.'
            })
        })

}

//Find all publised tutorials
exports.findAllPublished = (req, res) => {

    Tutorial.findAll({ where: { published: true } })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured while retrieving published tutorial.'
            })
        })
}