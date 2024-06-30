const express = require('express');      //require is keyword used to import module from server and express handles the request/response part
const cors = require('cors');       //after importing 'cors' we have to tell the api to use it, here order matters, we have the cors policy before the end points i.e. before Routes
const connectMongoDB = require('./config/db');
const todoRoutes = require('./routes/todo');
require('dotenv').config();


const app = express();       // express() is a constructor function which creates a express application with the help of which we can handle all the rquest and response
app.use(express.json());     // .use() is method to handle all the middleware(functions that our app should alongwith creating this particular object), here with .use(), we are telling our application to use json parser for incoming and outgoind data

//Connect Database
connectMongoDB();

//CORS Policy : policy set on server to say, where the API call can originate from
//We have to set cors policy before API hits endpoint, so we define it before Routes
app.use(cors({      // we pass an object to the cors function and in this object, we pass the list of origins that are allowed 
    origin: [
        'http://localhost:3000'     //For us, the origin is our client url(localhost:3000) that is where the API call is originating from, as we checked in Network section of inspect of our react client
    ],
    credentials: true
}));  

//Routes
app.use('/api/todo', todoRoutes);       //we have base route here that is calling todoRoutes

//Define Port
const PORT = process.env.PORT || 8000;           // telling our application that server should listen to port 8000

                             
app.listen(PORT, () => { 
    console.log(`Todo app server is listening on port ${PORT}`);    // .listen() method takes two arguments, 1st is port and 2nd is callback function which logs the port
}); 

//anything that is defined under 'scripts' of package.json should be run using 'npm run key_name'
//Only get calls can be fetched in the browser itself
//We use Postman to test out APIs to test whether the response and the request that we are getting are proper or not
//With Postman, we do not interact directly with the database, we use api to fetch the data from the database
//we have organised/restructured our backend in a modular format where : model is being called by the controller, the controller is being called by the routes, the routes are being called by app.use()
