const express = require('express'); //require is keyword used to import module from server
const mongoose = require('mongoose');
const todo = require("./todo"); // imported todo to use the function created in todo
require('dotenv').config();

const app = express();       // express() is a constructor function which creates a express application with the help of which we can handle all the rquest and response
app.use(express.json());     // .use() is method to handle all the middleware(functions that our app should alongwith creating this particular object), here with .use(), we are telling our application to use json parser for incoming and outgoind data


//mongodb://url:port/?username={}?password={}/dbname
mongoose.connect(process.env.MONGO_URI) // mongoose.connect() is used to connect to mongoDB Database, it takes uri/connection string as argument also we can write which database it should particularly connect to,  as it has something to do with server, it is async function or promise so it returns a promise so to handle that we will write .then() and .catch() method
.then(() => {                                                   //as mongo creates database on the fly so we can directly write here /database_name also we have created empty collection in todoapp db just to make it visible under localhost
    console.log("Successfully connected to MongoDB");
})
.catch((err) => {
    console.log(`Error connecting to DB ${err.message}`)
});

const PORT = process.env.PORT || 8000;           // telling our application that server should listen to port 8000

//To handle errors in async functions, we put it inside a try-catch block
//In the todo collection, only store the data related to any todo or a task
app.get('/api/todo', async (req, res) => {            // .get() method takes two arguments 1st is end point that it'll hit like here it will be localhost:8000/api/todo and 2nd is async callback function with two parameters (req, res) - req:request and res:response and we can have same end points with different methods also

    try {
        const allTodos = await todo.find();             // as todo is an instance of mongoose model so it will have all the mongoose function which is mongoDB functions availabel for it like here we use .find() to list all the available documents in a collections and if we pass any parameter in the querry than it will documents based on that 
                                                        // also here we are awaiting till the promise of fetching all the todos from the database is executed
                                                        // async function will be halted till the function after await is done executing
        return res.status(200) .send(allTodos);        // after fetching data we also have add it to the response object and send it back with a proper status code
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(400).send({message: 'Error fetching todos'}); // user is not gonna get the actual error message, they'll get this custom error message
    }
});

app.post('/api/todo', async (req, res) => {   // we can have two end points to be same as the methods are different so they are treated as two different end points
    try {
        const newTodo = await todo.create(req.body)       // Mongoose uses .create() to create a new document/s and it takes a parameter 'req.body' which means whatever we send in body is in req.body, take that information and inset into the DB
        return res.status(201).send({newTodo});     // successful post status code : 201
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(400).send({message: 'Error creating a new todo'})
    }
});

app.patch('/api/todo/:id', async(req, res) => {      //For updating, we use .patch() and we need to give an id for it to patch so as to tell which document needs to be updated and we pass /:id as url parameter(works as a variable) and this id is stored in req.params so to access it, we can write req.params.id
    try{
        const updatedTodo = await todo.findByIdAndUpdate(req.params.id, req.body, {new: true}); // .findByIdAndUpdate() is used to find document by id and then update it, it takes two parameters, 1st is the id of the object/document that needs to be updated and 2nd is what value to update it with, also it can take 3rd argument  which is object {new : true} so that the const variable get the latest updated value
        return res.status(200).send({updatedTodo});
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(400).send({message: 'Error updating todo'});
    }
});  

app.delete('/api/todo/:id', async (req, res) => {
    try {  
        const deletedTodo = await todo.findByIdAndDelete(req.params.id);  //For deleting, we use .findByIdAndDelete() method which take 'req.params.id' as parameter
         return res.status(200).send(deletedTodo);
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return res.status(400).send({message: 'Error deleting todo'});
    }
})
   
   
                                
app.listen(PORT, () => { 
    console.log(`Todo app server is listening on port ${PORT}`);    // .listen() method takes two arguments, 1st is port and 2nd is callback function which logs the port
}); 

//anything that is defined under 'scripts' of package.json should be run using 'npm run key_name'
//Only get calls can be fetched in the browser itself
//We use Postman to test out APIs to test whether the response and the request that we are getting are proper or not
//With Postman, we do not interact directly with the database, we use api to fetch the data from the database