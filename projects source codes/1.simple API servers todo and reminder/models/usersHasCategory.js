const Joi = require('joi');
const mongoose = require('mongoose');

const UsersHasCategorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        requried: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        requried: true
    },
});

const UsersHasCategory = mongoose.model('UsersHasCategory', UsersHasCategorySchema, 'usersHasCategory');

const usersHasCategoryVali = (req) =>{
    const userCateValiSchema = Joi.object({
        userId: Joi.string().requred(),
        categoryId: Joi.string().requred(),
    });
    return userCateValiSchema.validate(req);
}


module.exports.UsersHasCategory = UsersHasCategory;
module.exports.usersHasCategoryVali = usersHasCategoryVali;