require("dotenv").config();
const express = require("express");
const connectDb = require("./Configuration/database");
const { GOOGLE_AUTH_CONFIG } = require("./Configuration/authConfig.js");
const CLODINARY_CONFIG = require("./Configuration/cloudinaryConfig.js");
const authRoutes = require("./routes/auth-route");
const userRoutes = require("./routes/user-route");
const restaurantRoutes = require("./routes/restaurant-route");
const cors = require("cors");
const passport = require("passport");

const app = express();

const PORT = 5000;

app.use(cors());

// Enable CORS
app.use(
  cors({
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.json());

app.use(passport.initialize());

// Configure Google authentication
GOOGLE_AUTH_CONFIG();

// Configure Cloudinary
CLODINARY_CONFIG();

app.use("/auth", authRoutes);

app.use("/api/auth", userRoutes);

app.use("/api/res", restaurantRoutes);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
