const mongoose = require('mongoose');   // we are not directly interacting with MongoDB database using direct methods but through node js server and mongoose

//model - functions which directly interact with Database
const todoSchema = new mongoose.Schema({   // new mongoose.Schema() is used to define a schema to tell the mongoose to create a particular schema in the database for all the todos that we'll create so that if user enter some value that is not valid so it should throw an error
    title: {
        type: String,
        required: [true, 'Title is required'] // if i don't get the title then error will be thrown as 'Title is required'
    },
    description: {
        type: String
    },
    done: {
        type: Boolean
    }
})

module.exports = mongoose.model("todo", todoSchema);