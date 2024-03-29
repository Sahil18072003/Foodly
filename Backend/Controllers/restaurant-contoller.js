const Restaurant = require("./../Models/Restaurant-model");
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);

const accountSid = "AC93da62abfa57676bf4fee4f089ed40ef";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = "VA9e8da123bf52e5b61633d25f5aeeecb6";
const client = require("twilio")(accountSid, authToken);

const addRestaurant1 = async (req, res) => {
  try {
    const {
      resname,
      resadd,
      respincode,
      resstate,
      rescity,
      rescontact,
      reslandline,
      ownerid,
      ownercontact,
      ownername,
      owneremail,
    } = req.body;

    const restaurantData = await Restaurant.create({
      resname,
      resadd,
      respincode,
      resstate,
      rescity,
      rescontact,
      reslandline,
      ownerid,
      ownercontact,
      ownername,
      owneremail,
    });

    res.status(200).json({
      msg: "Form successfully submitted",
      restaurant: restaurantData,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(600).send({ error: "Internal server error" });
  }
};

const sendOtp = async (req, res) => {
  try {
    const phone = req.body.rescontact;

    client.verify.v2
      .services(verifySid)
      .verifications.create({ to: phone, channel: "sms" })
      .then((verification) => console.log(verification.status))
      .then(() => {
        const readline = require("readline").createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        readline.question("Please enter the OTP:", (otpCode) => {
          client.verify.v2
            .services(verifySid)
            .verificationChecks.create({ to: phone, code: otpCode })
            .then((verification_check) =>
              console.log(verification_check.status)
            )
            .then(() => readline.close());
        });
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

const addRestaurant2 = async (req, res) => {
  const {
    _id,
    rescategory,
    restypes,
    rescuisinetype,
    openingtime,
    closingtime,
    resdays,
  } = req.body;

  try {
    let existingRestaurant = await Restaurant.findOne({ _id });

    if (!existingRestaurant) {
      return res
        .status(400)
        .json({ message: "Error: Restaurant doesn't exist." });
    }

    let result = await Restaurant.updateOne(
      { _id },
      {
        $set: {
          rescategory: rescategory,
          restypes: restypes,
          rescuisinetype: rescuisinetype,
          openingtime: openingtime,
          closingtime: closingtime,
          resdays: resdays,
        },
      }
    );

    if (result.acknowledged) {
      let updatedRestaurant = await Restaurant.findOne({ _id });
      return res.status(202).json({ updatedRestaurant });
    } else {
      return res
        .status(500)
        .json({ message: "Can't update the restaurant type & timings" });
    }
  } catch (error) {
    // Handle any other errors
    console.log(error);
    res.status(500).send("Internal Server error occurred");
  }
};

const addRestaurant3 = async (req, res) => {
  const { _id, menuimg, resimg, foodimg } = req.body;

  try {
    let existingRestaurant = await Restaurant.findOne({ _id });

    if (!existingRestaurant) {
      return res
        .status(400)
        .json({ message: "Error: Restaurant doesn't exist." });
    }

    let result = await Restaurant.updateOne(
      { _id },
      {
        $set: {
          menuimg: menuimg,
          resimg: resimg,
          foodimg: foodimg,
        },
      }
    );

    if (result.acknowledged) {
      let updatedRestaurant = await Restaurant.findOne({ _id });
      return res.status(202).json({ updatedRestaurant });
    } else {
      return res
        .status(500)
        .json({ message: "Can't update the restaurant imgs" });
    }
  } catch (error) {
    // Handle any other errors
    console.log(error);
    res.status(500).send("Internal Server error occurred");
  }
};

module.exports = {
  addRestaurant1,
  sendOtp,
  checkOtp,
  addRestaurant2,
  addRestaurant3,
};
