// in every CRUD methods, anything from async to last is considered as controller function
const todo = require("../models/todo");        // imported todo to use the function created in todo

//To handle errors in async functions, we put it inside a try-catch block
//In the todo collection, only store the data related to any todo or a task
exports.getAllTodos = async (req, res) => {           

    try {
        const allTodos = await todo.find();             // as todo is an instance of mongoose model so it will have all the mongoose function which is mongoDB functions availabel for it like here we use .find() to list all the available documents in a collections and if we pass any parameter in the querry than it will documents based on that 
                                                        // also here we are awaiting till the promise of fetching all the todos from the database is executed
                                                        // async function will be halted till the function after await is done executing
        return res.status(200).send(allTodos);        // after fetching data we also have add it to the response object and send it back with a proper status code
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(400).send({message: 'Error fetching todos'}); // user is not gonna get the actual error message, they'll get this custom error message
    }
}

exports.createTodo = async (req, res) => {   // we can have two end points to be same as the methods are different so they are treated as two different end points
    try {
        const newTodo = await todo.create(req.body)       // Mongoose uses .create() to create a new document/s and it takes a parameter 'req.body' which means whatever we send in body is in req.body, take that information and inset into the DB
        return res.status(201).send({newTodo});     // successful post status code : 201
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(400).send({message: 'Error creating a new todo'})
    }
}

exports.updateTodo = async(req, res) => {      //For updating, we use .patch() and we need to give an id for it to patch so as to tell which document needs to be updated and we pass /:id as url parameter(works as a variable) and this id is stored in req.params so to access it, we can write req.params.id
    try{
        const updatedTodo = await todo.findByIdAndUpdate(req.params.id, req.body, {new: true}); // .findByIdAndUpdate() is used to find document by id and then update it, it takes two parameters, 1st is the id of the object/document that needs to be updated and 2nd is what value to update it with, also it can take 3rd argument  which is object {new : true} so that the const variable get the latest updated value
        return res.status(200).send(updatedTodo);
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(400).send({message: 'Error updating todo'});
    }
}

exports.deleteTodo = async (req, res) => {
    try {  
        const deletedTodo = await todo.findByIdAndDelete(req.params.id);  //For deleting, we use .findByIdAndDelete() method which take 'req.params.id' as parameter
         return res.status(200).send(deletedTodo);
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(400).send({message: 'Error deleting todo'});
    }
}