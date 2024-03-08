const Restaurant = require("./../Models/Restaurant-model");
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

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

    let otp = Math.floor(100000 + Math.random() * 900000);

    await client.messages.create({
      body: `Your otp is ${otp}`,
      messagingServiceSid: process.env.ACCOUNT_SID,
      to: restaurantData.rescontact,
    });

    res
      .status(200)
      .send({ msg: "Form successfully submitted", restaurantData });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const addRestaurant2 = () => {};

const addRestaurant3 = () => {};

module.exports = {
  addRestaurant1,
  addRestaurant2,
  addRestaurant3,
};
