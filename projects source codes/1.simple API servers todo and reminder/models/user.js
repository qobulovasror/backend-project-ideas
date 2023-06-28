const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength:[6,'Password must be at least 5 characters long']
    },
    role:{
        type: String,
        default: "user",
        enum: ["admin", "user"]
    } 
});

userSchema.methods.generateAuthToken = ()=>{
    let token = jwt.sign({_id : this._id}, config.get("jwtAuthToken"))
    return token;
}

const User = mongoose.model('User', userSchema, 'user');


const userRequirestValidate = (user)=>{
    const userValidateSchema = Joi.object({
        name: Joi.string().required().min(2).max(50),
        email: Joi.string().required().lowercase(),
        password: Joi.string().required().min(6),
        role: Joi.string().default("user")
    });
    return userValidateSchema.validate(user);
}

const authValidate = (req)=>{
    const userValidateSchema = Joi.object({
        email: Joi.string().required().min(4).max(35),
        password: Joi.string().required().min(6)
    });
    return userValidateSchema.validate(req);
}

module.exports = {
    User,
    userRequirestValidate,
    authValidate
}