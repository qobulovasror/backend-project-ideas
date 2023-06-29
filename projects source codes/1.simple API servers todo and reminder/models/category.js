const mongoose = require('mongoose');
const Joi = require('joi');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
        minlength: 3,
        maxlength: 50,
    },
    icon: {
        type: String,
        default: 'none',
    }
});

const Category = mongoose.model('Category', CategorySchema, 'category');

const categoryValidate = (category)=> {
    const categoryValidateSchema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        icon: Joi.string(),
        userId: Joi.string().required()
    });
    return categoryValidateSchema.validate(category)
}

module.exports = {
    categoryValidate,
    Category
};