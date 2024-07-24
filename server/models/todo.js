const mongoose = require('mongoose');   // we are not directly interacting with MongoDB database using direct methods but through node js server and mongoose

//model - functions which directly interact with Database and in models, we define schema means how our data is going to be saved in the database 

const todoSchema = new mongoose.Schema({   // new mongoose.Schema() is used to define a schema to tell the mongoose to create a particular schema in the database for all the todos that we'll create so that if user enter some value that is not valid so it should throw an error
    title: {
        type: String,
        required: [true, 'Title is required'] // if i don't get the title then error will be thrown as 'Title is required'
    },
    description: {
        type: String
    },
    // Time:DateTime,
    done: {
        type: Boolean
    }
})

module.exports = mongoose.model("todo", todoSchema); // Even though we already have Schema, we create model with mongoose.model() to set the schema to be collection and it takes two parameters, 
                                                        // 1st is the name that we give it to be called inside a database with (its a collection or table which'll be created inside the database that created on mongodb atlas or compass or we wrote the name of the collection after connection string to create the db on the fly) through which we'll interact with database from backend after importing it into controllers as const todoModels = require('../routes/todo)
                                                        //(like todoModels.find(), todoModels.create(req.body), todoModels.findByIdAndUpdate(req.params.id, req.body, {new: true}), todoModels.findByIdAndDelete(req.params.id )and 2nd is the name of the Schema that we created and finally we export it