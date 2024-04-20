const { Console } = require("console");
const Food = require("./../Models/Food-model");

const addFood = async (req, res) => {
  try {
    const {
      resId,
      foodname,
      foodcategory,
      foodtype,
      servicetype,
      foodprice,
      fooddetails,
      foodimg,
    } = req.body;

    const foodData = await Food.create({
      resId,
      foodname,
      foodcategory,
      foodtype,
      servicetype,
      foodprice,
      fooddetails,
      foodimg,
    });

    res.status(200).json({
      msg: "Food added successfully",
      food: foodData,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(600).send({ error: "Internal server error" });
  }
};

// Get Food data in update page
const getOneFoodDetails = async (req, res) => {
  const { foodId } = req.body;

  try {
    // Attempt to find a user record
    const data = await Food.find({ _id: foodId });

    // Check if data exists
    if (data) {
      // Send the data as a response
      res.status(200).json({
        status: "success",
        data: { data} ,
      });
    } else {
      // If no data found, send a custom error response
      res.status(404).send("Food record not found");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error occured");
  }
};

// Get User data in update page
const getFoodDetails = async (req, res) => {
  const { resId } = req.body;

  try {
    // Attempt to find a user record
    const data = await Food.find({ resId: resId });

    // Check if data exists
    if (data) {
      // Send the data as a response
      res.send(data);
    } else {
      // If no data found, send a custom error response
      res.status(404).send("User record not found");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error occured");
  }
};

module.exports = {
  addFood,
  getOneFoodDetails,
  getFoodDetails,
};
