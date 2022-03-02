const { Pizza } = require('../models');

//create all of the route functions as methods of the pizzaController object
const pizzaController = {
    // get all pizzas

    getAllPizza(req, res) {
        Pizza.find({})
            .populate({
                path: 'comments',
                // - in front of the field indicates that we don't want it to be returned
                select: '-__v'
            })
            // remove the __v property from the pizza results as well
            .select('-__v')
            // sort in DESC order by the _id value
            // a timestamp value is hidden inside the MongoDB ObjectId
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one pizza by id
    // destructure params out of req
    // because that's the only data we need for this request to be fulfilled
    // get one pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create pizza
    // destructure the body out of the Express.js req object
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // update pizza by id
    updatePizza({ params, body }, res) {
        // by setting 3rd parameter to true, we're instructing Mongoose to return 
        // the new version of the document
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = pizzaController;