const mongoose = require('mongoose');
const Joi = require('joi');

const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        unique: true
    },
    status: {
        type: String,
        required: true,
        enum: ['complate', 'todo', 'fail', "none"]
    },
    didline: {
        type: Date
    }, 
    subitem: {
        title: {
            type: String,
            maxlength: 100
        },
        subItemStatus:{
            typr: String,
            enum: ['complate', 'todo', 'fail']
        }
    }, 
    dateCreated: {
        type: Date,
        default: new Date()
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        requried: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        requried: true
    }
});


const Todo = mongoose.model("Todo", TodoSchema, "todo");

const todoValidate = (todo)=>{
    const todoValidateSchema = Joi.object({
        name: Joi.string().required().min(3).max(100),
        status: Joi.string().required(),
        dateCreated: Joi.date().default(new Date()),
        subitem: Joi.object({
            title: Joi.string().max(100),
            subItemStatus: Joi.string()
        }),
        categoryId: Joi.string().required(),
        userId: Joi.string().required()
    });
    return todoValidateSchema.validate(todo);
}

module.exports.todoValidate = todoValidate;
module.exports.Todo = Todo;