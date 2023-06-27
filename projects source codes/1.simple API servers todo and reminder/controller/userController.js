const {User, userRequirestValidate} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');

async function getAllUsers(req, res){
    try {
        const user = await User.find();
        if(!user) 
            return res.status(404).send('User not fount');
        res.send(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
}

async function getUser(req, res) {
    try{
        const user = await User.findById(req.params.id);
        if(!user) 
            return res.status(404).send('User not fount');
        res.send(user);
    }
    catch(error){
        res.status(500).json({ error: "Failed to fetch user" });
    }
}

async function postUser(req, res) {
    try{
        const {error} = userRequirestValidate(req.body);
        if(error) 
            return res.status(401).send(error.details[0].message);
        let user = await User.findOne({email: req.body.email});
        if(user)
            return res.status(400).send("Bu email oldin ro'yxatdan o'tgan");
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(req.body.password,salt);
        user.password = hashPass;
        await user.save();
        res.send(_.pick(user,['name','email','roling']));
    }
    catch(error){
        res.status(500).json({ error: `Failed to fetch user: ${error}` });
    }
}

async function putUser(req, res) {
    try{
        let user = User.findById(req.params.id);
        if(!user) 
            return res.status(404).send('user not fount');
        const {error} = userRequirestValidate(req.body);
        if(error) 
            return res.status(401).send(error.details[0].message);
        user = await User.findOne({email: req.body.email});
        if(user)
            return res.status(400).send("Bu email oldin ro'yxatdan o'tgan");
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(req.body.password,salt);
        user.password = hashPass;
        await user.save();
        res.send(_.pick(user,['name','email','roling']));
    }
    catch(error){
        res.status(500).json({ error: "Failed to fetch user" });
    }
}



module.exports = {
    getAllUsers,
    getUser,
    postUser
}