const mongoose = require('mongoose');
const Joi = require('joi');

const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    status: {
        type: String,
        required: true,
        enum: ['complate', 'todo', 'fail']
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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
    }
});


const Todo = mongoose.model("Todo", TodoSchema, "todo");

const TodoValidate = (todo)=>{
    const TodoValidateSchema = Joi.object({
        name: Joi.string().required().min(3).max(100),
        status: Joi.string().required(),
        dateCreated: Joi.date().default(new Date()),
        subitem: Joi.object({
            title: Joi.string().max(100),
            subItemStatus: Joi.string()
        })
    });
    return TodoValidateSchema.validate(todo);
}

module.exports.TodoValidate = TodoValidate;
module.exports.Todo = Todo;