// only need to worry about the Schema constructor and model function
// don't need to import entire mongoose library
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema({
        pizzaName: {
            type: String,
            required: true,
            trim: true
        },
        createdBy: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            required: true,
            enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
            default: 'Large'
        },
        toppings: [],
        comments: [{
            // tell Mongoose to expect an ObjectId and to tell it that its data comes from the Comment model
            type: Schema.Types.ObjectId,
            // tells the Pizza model which documents to search to find the right comments
            ref: 'Comment'
        }]
    }, {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // set id to false because this is a virtual that Mongoose returns, and we don’t need it
        id: false
    }

);

// get total count of comments and replies on retrieval
// As .reduce() walks through the array, it passes the accumulating total 
// and the current value of comment into the function, with the return of the 
//function revising the total for the next iteration through the array.
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);
// export the model
module.exports = Pizza;