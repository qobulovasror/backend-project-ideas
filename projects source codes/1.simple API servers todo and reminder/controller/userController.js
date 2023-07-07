const {User, userRequirestValidate} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');

async function getAllUsers(req, res){
    try {
        const user = await User
            .find()
            .select({password: 0});
        if(!user) 
            return res.status(404).send('User topilmadi');
        res.send(user);
    } catch (error) {
        res.status(500).json({ error: "ma'lumot olishda qatolik" });
    }
}

async function getUser(req, res) {
    try{
        const user = await User.findById(req.params.id).select({password: 0});
        if(!user) 
            return res.status(404).send('User topilmadi');
        res.send(user);
    }
    catch(error){
        res.status(500).json({ error: "ma'lumot olishda xatolik" });
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
        res.send(_.pick(user,['_id','name','email']));
    }
    catch(error){
        res.status(500).json({ error: `ma'lumot olishda xatolik: ${error}` });
    }
}

async function putUser(req, res) {
    try{
        let user = User.findById(req.params.id);
        if(!user) 
            return res.status(404).send('user topilmadi');
        const {error} = userRequirestValidate(req.body);
        if(error) 
            return res.status(401).send(error.details[0].message);
        const newPass = req.body.newPassword;
        let hashPass;
        if(newPass){
            const isValidPwd = await bcrypt.compare(req.body.password, user.password)
            if(!isValidPwd)
                return res.status(400).send("Oldingi parol xato kiritilgan");
            const salt = await bcrypt.genSalt();
            hashPass = await bcrypt.hash(req.body.newPass,salt);
        }else{
            hashPass = req.body.password;
        }
        user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            password: hashPass,
            role: req.body.role    
        },{new: true});
       
        if(!user)
            return res.status(404).send('Berilgan ID li ma\'lumot topilmadi');
        res.send(_.pick(user,['_id','name','email']));
    }
    catch(error){
        res.status(500).json({ error: "ma'lumot olishda xatolik" });
    }
}

const deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) 
            return res.status(404).send('user topilmadi');
        res.send("Foydalanuvchi ma'lumotlari o'chirildi");
    }
    catch(error){
        res.status(500).json({ error: "ma'lumot olishda xatolik" });
    }
}



module.exports = {
    getAllUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
}