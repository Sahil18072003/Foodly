require("dotenv").config();

const User = require("../Models/User-model");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get the user from the JWT token and add id to req object
  const token = req.header("auth-token");
  //   console.log(token);
  if (!token) {
    res.status(401).send({ error: "Please authentication using valid token." });
  }
  try {
    const data = jwt.verify(token, JWT_SECRETE_TOKEN, async (err, decode) => {
      if (err) return res.status(403).json({ message: "Forbidden access" });

      // Fetch user from the database, excluding the password
      req.user = await User.findById(decode.userId).select("-password");

      // Attach the token to the request object
      req.token = token;

      // Continue to the next middleware
      next();
    });
    // console.log(data);

    req.user = data.user;
    // console.log(req.user);
  } catch (error) {
    // console.log(error);

    // Handle unauthorized access
    res.status(401).send({ error: "Please authentication using valid token." });
  }
};

module.exports = verifyToken;
