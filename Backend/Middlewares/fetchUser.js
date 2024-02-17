const userSchema = require("../Models/User-model");
var jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  // Get the user from the JWT token and add id to req object
  const token = req.header("auth-token");
  //   console.log(token);
  if (!token) {
    res.status(401).send({ error: "Please authentication using valid token." });
  }
  try {
    const data = jwt.verify(token, JWT_SECRETE_TOKEN);
    // console.log(data);
    req.user = data.user;
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authentication using valid token." });
  }
};

module.exports = fetchuser;
