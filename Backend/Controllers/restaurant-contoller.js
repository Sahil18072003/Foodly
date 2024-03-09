const Restaurant = require("./../Models/Restaurant-model");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

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

    // Initiate verification process
    const verification = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verifications.create({
        to: phone,
        channel: "sms",
      });

    console.log(verification);

    // Return success response
    res.status(200).json({
      msg: "Verification initiated successfully",
      resContact: phone,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occurred");
  }
};

const checkOtp = async (req, res) => {
  try {
    // Initiate verification process
    const otpCheck = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verificationChecks.create({ to: phone, code });

    console.log(otpCheck);

    // Return success response
    res.status(200).json({
      msg: "Verification Check successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occurred");
  }
};

const addRestaurant2 = () => {};

const addRestaurant3 = () => {};

module.exports = {
  addRestaurant1,
  sendOtp,
  checkOtp,
  addRestaurant2,
  addRestaurant3,
};
