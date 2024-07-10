const express = require('express');
const todoRouter = express.Router();
const todoController = require("../controllers/todo"); // todoController hold the entire file information of todo.js in the controllers folder as every async methods are exported individually

todoRouter.get('/', todoController.getAllTodos);   // works the same way as .get(), is taking two parameters, 1st is the end point after base url like after '/api/todo' and 2nd is that we are calling async function using . oprator after importing it from controllers folder, async callback function has two parameters (req, res) - req:request and res:response and we can have same end points with different methods also


todoRouter.post('/', todoController.createTodo);                // router. will have parameter that is there after base url /api/todo in server.js

todoRouter.patch('/:id', todoController.updateTodo);            // /:id is sort of variable which expects a value, and it will get the value of req.params that we wrote in update and delete part of api in controllers

todoRouter.delete('/:id', todoController.deleteTodo);           // and we pass this /:id parameter to - url of options of delete and update api calls method in TODO.js folder of client

module.exports = todoRouter;