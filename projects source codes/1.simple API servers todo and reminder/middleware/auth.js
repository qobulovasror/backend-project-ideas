const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token)
        return res.status(401).send("Token yuq");
    try{
        const decoded = jwt.verify(token,config.get('jwtAuthToken'));
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(400).send('Yokin yaroqsiz');
    }
}