const {User, authValidate} = require('../models/user');
const bcrypt = require('bcrypt');

async function postUser(req, res) {
    try{
        const {error} = authValidate(req.body);
        if(error) 
            return res.status(401).send(error.details[0].message);
        let user = await User.findOne({email: req.body.email});
        if(!user)
            return res.status(400).send("Email yok parol xato");
        const isValidPwd = await bcrypt.compare(req.body.password, user.password)
        if(!isValidPwd)
            return res.status(400).send("Email yok parol xato");
        const token = user.generateAuthToken();
        res.header("x-auth-token", token).send(true);
    }
    catch(error){
        res.status(500).json({ error: `Failed to fetch user: ${error}` });
    }
}

module.exports = {
    postUser
}