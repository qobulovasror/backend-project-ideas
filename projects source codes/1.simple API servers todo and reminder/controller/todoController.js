const { Todo, todoValidate } = require("../models/todo");
const { User } = require('../models/user');
const { Category } = require('../models/category');
const objectId = require('mongoose').Types.ObjectId;
const categoryController = require('./categoryController'); 

async function getAllTodos(req, res) {
  try {
    const userId = req.body.userId;
    if(!userId) 
      return res.status(401).json({"error": "userId is required"});
    if(!objectId.isValid(userId)) 
      return res.status(401).json({"error": "userId must be of type objectId"});
    const categories = await categoryController.getCategories(userId)
    var categoryIds = categories.map(category => category._id);

    const todo = await Todo.aggregate([
      { $match: { categoryId: { $in: categoryIds } } },
      { $group: { _id: "$categoryId", document: { $push: "$$ROOT" } } }
    ]);
    res.json({"todos": todo, "categories": categories});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
}

async function getTodo(req, res) {
  try {
    const todo = await Todo.find(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
}

async function addTodo(req, res){
  try{
    const {error} = todoValidate(req.body);
    if(error)
      return res.status(400).send(error.details[0].message);
    const userId = await User.findById(req.body.userId);
    if(!userId)
      return res.status(401).send("userId is not fount");
    const categoryId = await Category.findById(req.body.categoryId);
    if(!categoryId)
      return res.status(401).send("categoryId is not fount");
    let todo = new Todo({
      name: req.body.name,
      status: req.body.status,
      didline: (req.body.didline)? req.body.didline : "",
      subitem: req.body.subitem,
      categoryId: categoryId,
      userId: userId
    })
    todo = await todo.save();
    res.send(todo)
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch todos: ${error}` });
  }
}

module.exports = {
  getAllTodos,
  getTodo,
  addTodo
};
