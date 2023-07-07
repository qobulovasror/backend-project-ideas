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
    res.status(500).json({ error: "Ma'lumotni olishda xatolik" });
  }
}

async function getTodo(req, res) {
  try {
    const todo = await Todo.find(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Ma'lumotni olishda xatolik" });
  }
}

async function addTodo(req, res){
  try{
    const {error} = todoValidate(req.body);
    if(error)
      return res.status(400).send(error.details[0].message);
    const userId = await User.findById(req.body.userId);
    if(!userId)
      return res.status(401).send("userId topilmadi");
    const categoryId = await Category.findById(req.body.categoryId);
    if(!categoryId)
      return res.status(401).send("categoryId topilmadi");
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
    res.status(500).json({ error: `Ma'lumotni olishda xatolik` });
  }
}

async function editTodo(req, res){
  try{
    const {error} = todoValidate(req.body);
    if(error)
      return res.status(400).send(error.details[0].message);
    const userId = await User.findById(req.body.userId);
    if(!userId)
      return res.status(401).send("userId topilmadi");
    const categoryId = await Category.findById(req.body.categoryId);
    if(!categoryId)
      return res.status(401).send("categoryId topilmadi");
    let todo = await Todo.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      status: req.body.status,
      didline: (req.body.didline)? req.body.didline : "",
      subitem: req.body.subitem,
      categoryId: categoryId
    })
    res.send("ma'lumot o'zgartirildi")
  } catch (error) {
    res.status(500).json({ error: `Ma'lumotni olishda xatolik ${error}` });
  }
}

async function deleteTodo(req, res){
  try{
    if(!objectId.isValid(req.params.id)) 
      return res.status(401).json({"error": "id objectId turida bo'lishi kerak"});
    let todo = await Todo.findByIdAndDelete(req.params.id);
    if(!todo)
      return res.status(404).send("Berilgan id'li todo yo'q")
    res.send("ma'lumot o'chirildi")
  } catch (error) {
    res.status(500).json({ error: "Ma'lumotni olishda xatolik" });
  }
}

module.exports = {
  getAllTodos,
  getTodo,
  addTodo,
  editTodo,
  deleteTodo
};
