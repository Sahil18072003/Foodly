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

module.exports = {
  addFood,
};
