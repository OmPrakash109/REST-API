//We seperated out the connection part from server.js to db.js and exported it there
const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGO_URI;

const connectMongoDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("Successfully connected to MongoDB");
    } catch (err) {
        console.log('Error connecting to MongoDB:', err.message);
        process.exit(1);  //stop the program/server immediately if any error occurs
    }
}

module.exports = connectMongoDB;