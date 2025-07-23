const { response } = require("express");
const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log(token)
  if (!token) {
    return res.status(401).json({ message: "Acess denied. No token Provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log(decoded)
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalic token" });
  }
};

module.exports = jwtMiddleware;
