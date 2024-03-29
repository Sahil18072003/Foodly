require("dotenv").config();
const User = require("../Models/User-model");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Extract the JWT token from the Authorization header (Bearer token)
    const token = req.headers.authorization.split(" ")[1];

    // Check if the token is present
    if (!token) return res.status(401).json({ message: "Unauthorized access" });

    // Verify the token and retrieve user information from the database
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired" });
        } else {
          return res.status(403).json({ message: "Invalid token" });
        }
      }
      // Fetch user from the database, excluding the password
      req.user = await User.findById(decoded.userId).select("-password");

      // Attach the token to the request object
      req.token = token;

      // Continue to the next middleware
      next();
    });
  } catch (err) {
    console.log(err);

    // Handle unauthorized access
    return res.status(401).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyToken;
