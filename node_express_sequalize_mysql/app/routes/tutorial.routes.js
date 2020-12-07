module.exports = app => {
    const tutorials = require('../controllers/tutorial.controller')

    let router = require('express').Router();

    //Create new tutorial
    router.post('/', tutorials.create);

    //Fetch all Tutorials
    router.get('/', tutorials.findAll);

    //Fetch all published tutorials
    router.get('/published', tutorials.findAllPublished);

    //Fetch tutorial by id
    router.get('/:id', tutorials.findById);

    //Update tutorial by id
    router.put('/:id', tutorials.update);

    //Delete tutorial by id
    router.delete('/:id', tutorials.delete)

    //Delete all tutorials
    router.delete('/', tutorials.deleteAll)

    app.use('/api/tutorials', router)
}