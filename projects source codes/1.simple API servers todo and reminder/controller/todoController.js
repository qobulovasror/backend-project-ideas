const { Todo, TodoValidate } = require("../models/todo");
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
    const todo = await Todo.find();
    res.json(categories);
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

module.exports = {
  getAllTodos,
  getTodo,
};
