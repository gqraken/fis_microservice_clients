const jwt = require('jsonwebtoken');
require('dotenv').config();
const TOKEN = (process.env.TOKEN_SECRET || "fdgdfgdfgdfglkñjewlklekjwrljlkjsadlfkniu023984093840293lkhjkldf");

module.exports =  async function (req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied');

    try{

        if(TOKEN!=token){
            // Verify token
            const verified = jwt.verify(token,TOKEN);
            req.user = verified;
        }
        
        next();
        // Verify token


    } catch(err){
        res.status(400).send({ msg: 'Error checking token: ', err: err});
    }
}
