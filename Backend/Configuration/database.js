const mongoose = require("mongoose");

// const MongooseURI = "mongodb://0.0.0.0:27017/foodly"

const URI = process.env.MONGOOSEURI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("You are connected with database successfull.");
  } catch (error) {
    console.error("Sorry, Your database connection failed.");
    process.exit(0);
  }
};

module.exports = connectDb;
