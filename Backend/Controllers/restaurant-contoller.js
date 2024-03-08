const Restaurant = require("./../Models/Restaurant-model");
const User = require("../Models/User-model");

const addRestaurant1 = async (req, res) => {
  try {
    const {
      resname,
      resadd,
      rescontact,
      reslandline,
      ownercontact,
      ownername,
      owneremail,
    } = req.body;

    const restaurantData = await Restaurant.create({
      resname,
      resadd,
      rescontact,
      reslandline,
      ownercontact,
      ownername,
      owneremail,
    });

    res
      .status(200)
      .send({ msg: "Form successfully submitted", restaurantData });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const sendOtp = async (req, res) => {
  try {
    const phone = req.body.rescontact;

    let otp = Math.floor(100000 + Math.random() * 900000);

    await client.messages
      .create({
        body: `Your Otp is ${otp}`,
        from: process.env.Phone_No,
        to: phone,
      })
      .then(() => res.status(200).json({ msg: "Message Sent Successfully" }))
      .done();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
};

const addRestaurant2 = () => {};

const addRestaurant3 = () => {};

module.exports = {
  addRestaurant1,
  sendOtp,
  addRestaurant2,
  addRestaurant3,
};
