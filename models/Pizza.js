// only need to worry about the Schema constructor and model function
// don't need to import entire mongoose library
const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

// create Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);
// export the model
module.exports = Pizza;