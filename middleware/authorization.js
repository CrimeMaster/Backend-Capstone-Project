const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authorization = (req, res, next) => {
  const { jwttoken } = req.headers;
  if (!jwttoken) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const user = jwt.verify(jwttoken, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(408).json({ message: "unauthorized user" });
  }
};

module.exports = authorization;