const router = require("express").Router();
const { Todo } = require('../models/todo');
const todoController = require('../controller/todoController');

//get all todos
router.get('/', todoController.getAllTodos);

//get a todo with id
router.get("/:id", todoController.getTodo);

//get a todo with id
router.post("/", todoController.addTodo);



module.exports = router;