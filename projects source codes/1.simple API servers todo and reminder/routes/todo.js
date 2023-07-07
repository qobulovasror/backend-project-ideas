const router = require("express").Router();
const { Todo } = require('../models/todo');
const todoController = require('../controller/todoController');
const auth = require("../middleware/auth");

//get all todos
router.get('/', auth, todoController.getAllTodos);

//get a todo with id
router.get("/:id", todoController.getTodo);

//get a todo with id
router.post("/", auth, todoController.addTodo);

router.put("/:id", auth, todoController.editTodo);

router.delete("/:id", auth, todoController.deleteTodo);



module.exports = router;