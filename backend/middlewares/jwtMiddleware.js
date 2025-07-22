const { response } = require('express');
const jwt = require('jsonwebtoken');

const jwtMiddleware = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).json({message: "Acess denied. No token Provided"});
    }AbortController
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded //pases decoded user id
        next();
    } catch (error) {
        res.status(401).json({message:'Invalic token'})
    }
}

module.exports = jwtMiddleware;