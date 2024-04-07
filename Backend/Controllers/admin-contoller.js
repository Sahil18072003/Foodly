var jwt = require("jsonwebtoken");
const User = require("../Models/User-model");
const UserContact = require("../Models/Contact-model");
const Comment = require("../Models/Comment-Model");
const Restaurant = require("../Models/Restaurant-model");
const transporter = require("../Configuration/nodemailerConfig");
const { ObjectId } = require("mongodb");

// Get All User data in admin page
const getUserDetails = async (req, res) => {
  try {
    // Attempt to find a user record
    const data = await User.find(req.body);

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

// Delete User From Admin
const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });

    if (result) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "No user found for deletion" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error occured");
  }
};

// Delete All Comments of With User delete by Admin
const deleteAllComments = async (req, res) => {
  try {
    const result = await Comment.deleteMany({ uid: req.params.id });

    if (result) {
      res.status(200).json({ message: "All comments deleted successfully" });
    } else {
      res.status(404).json({ message: "No comments found for deletion" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server error occurred");
  }
};

// Delete All Restaurants of With User delete by Admin
const deleteAllRestaurants = async (req, res) => {
  try {
    const result = await Restaurant.deleteMany({ ownerid: req.params.id });

    if (result) {
      res.status(200).json({ message: "All restaurants deleted successfully" });
    } else {
      res.status(404).json({ message: "No restaurants found for deletion" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server error occurred");
  }
};

// Get All Restaurant data in admin page
const getAllRestaurantDetails = async (req, res) => {
  try {
    // Attempt to find a Restaurant record
    const data = await Restaurant.find(req.body);

    // Check if data exists
    if (data) {
      res.send(data);
    } else {
      // If no data found, send a custom error response
      res.status(404).send("Restaurant record not found");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error occured");
  }
};

// Delete One Restaurant From Admin
const deleteRestaurant = async (req, res) => {
  try {
    const result = await Restaurant.deleteOne({ _id: req.params.id });

    // Check if data exists
    if (result) {
      res.status(200).json({ message: "Restaurant deleted successfully" });
    } else {
      res.status(404).json({ message: "No restaurant found for deletion" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error occured");
  }
};

// Get User Conatact data in admin page
const getUserContact = async (req, res) => {
  try {
    // Attempt to find a user contact record
    const data = await UserContact.find({});
    // Check if data exists
    if (data) {
      // Send the data as a response
      res.send(data);
    } else {
      // If no data found, send a custom error response
      res.status(404).send("User contact record not found");
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching user contact:", error);
    // Send an error response
    res.status(500).send("Internal Server error occurred");
  }
};

// Send email function
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: to,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

// Create restaurant page API
const createResPage = async (req, res) => {
  try {
    const { _id, isrespagecreated } = req.body;

    // Validate request body
    if (!_id || typeof isrespagecreated !== "boolean") {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const existingRestaurant = await Restaurant.findOne({ _id });

    if (!existingRestaurant) {
      return res.status(400).json({ message: "Restaurant not found" });
    }

    const result = await Restaurant.updateOne(
      { _id },
      { $set: { isrespagecreated: isrespagecreated } }
    );

    const userExists = await User.findOne({
      _id: new ObjectId(existingRestaurant.ownerid),
    });

    // Define email subject and text
    const emailSubject = isrespagecreated
      ? "FOODLY | Foodly Page Creation Confirmation"
      : "FOODLY | Foodly Page Creation Request Status";
    const emailText = isrespagecreated
      ? `Dear User, Your restaurant page with ID ${existingRestaurant._id} creation request on FOODLY has been processed. Thank you for choosing FOODLY for your online presence.`
      : `We regret to inform you that we couldn't process the request to create your restaurant's FOODLY page with ID ${existingRestaurant._id} at this time. Please try again later.`;

    // Send email
    await sendEmail(userExists.email, emailSubject, emailText);

    if (result.acknowledged) {
      const updatedRestaurant = await Restaurant.findOne({ _id });
      return res.status(202).json({ updatedRestaurant });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to update the restaurant page" });
    }
  } catch (error) {
    console.error("Error creating restaurant page:", error);
    res.status(500).send("Internal Server error occurred");
  }
};

// Document verification api
const documentVerification = async (req, res) => {
  try {
    const { _id, isdocverified } = req.body;

    // Validate request body
    if (!_id || typeof isdocverified !== "boolean") {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const existingRestaurant = await Restaurant.findOne({ _id });

    if (!existingRestaurant) {
      return res.status(400).json({ message: "Restaurant not found" });
    }

    const result = await Restaurant.updateOne(
      { _id },
      { $set: { isdocverified: isdocverified } }
    );

    const userExists = await User.findOne({
      _id: new ObjectId(existingRestaurant.ownerid),
    });

    // Define email subject and text
    const emailSubject = isdocverified
      ? "FOODLY | Document Verification Completed"
      : "FOODLY | Document Verification Pending";
    const emailText = isdocverified
      ? `Dear User, Your restaurant's documents with ID ${existingRestaurant._id} have been successfully verified on FOODLY. Thank you for ensuring compliance with our requirements.`
      : `We regret to inform you that we couldn't verify your restaurant's documents with ID ${existingRestaurant._id} on FOODLY at this time. Please try again later.`;

    // Send email
    await sendEmail(userExists.email, emailSubject, emailText);

    if (result.acknowledged) {
      const updatedRestaurant = await Restaurant.findOne({ _id });
      return res.status(202).json({ updatedRestaurant });
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching restaurant:", error);
    // Send an error response
    res.status(500).send("Internal Server error occurred");
  }
};

// Delivery activation api
const deliveryActivation = async (req, res) => {
  try {
    const { _id, isactivedelivery } = req.body;

    // Validate request body
    if (!_id || typeof isactivedelivery !== "boolean") {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const existingRestaurant = await Restaurant.findOne({ _id });

    if (!existingRestaurant) {
      return res
        .status(400)
        .json({ message: "Error: Restaurant doesn't exist." });
    }

    const result = await Restaurant.updateOne(
      { _id },
      { $set: { isactivedelivery: isactivedelivery } }
    );

    const userExists = await User.findOne({
      _id: new ObjectId(existingRestaurant.ownerid),
    });

    // Define email subject and text
    const emailSubject = isactivedelivery
      ? "FOODLY | Delivery Activation Completed"
      : "FOODLY | Delivery Activation Pending";
    const emailText = isactivedelivery
      ? `Dear User, Delivery services for your restaurant with ID ${existingRestaurant._id} on FOODLY have been successfully activated. Thank you for choosing to expand your services with FOODLY.`
      : `We regret to inform you that we couldn't activate delivery services for your restaurant with ID ${existingRestaurant._id} on FOODLY at this time. Please try again later.`;

    // Send email
    await sendEmail(userExists.email, emailSubject, emailText);

    if (result.acknowledged) {
      const updatedRestaurant = await Restaurant.findOne({ _id });
      return res.status(202).json({ updatedRestaurant });
    } else {
      return res.status(500).json({ message: "Can't active delivery." });
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching restaurant:", error);
    // Send an error response
    res.status(500).send("Internal Server error occurred");
  }
};

// Menu digitisation api
const menuDigitisation = async (req, res) => {
  try {
    const { _id, ismenudigitisation } = req.body;

    // Validate request body
    if (!_id || typeof ismenudigitisation !== "boolean") {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const existingRestaurant = await Restaurant.findOne({ _id });

    if (!existingRestaurant) {
      return res.status(400).json({ message: "Restaurant not found" });
    }

    const result = await Restaurant.updateOne(
      { _id },
      { $set: { ismenudigitisation: ismenudigitisation } }
    );

    const userExists = await User.findOne({
      _id: new ObjectId(existingRestaurant.ownerid),
    });

    // Define email subject and text
    const emailSubject = ismenudigitisation
      ? "FOODLY | Menu Digitisation Completed"
      : "FOODLY | Menu Digitisation Pending";
    const emailText = ismenudigitisation
      ? `Dear User, Your restaurant's menu with ID ${existingRestaurant._id} has been successfully digitized on FOODLY. Thank you for enhancing your customer experience with FOODLY.`
      : `We regret to inform you that we couldn't digitize your restaurant's menu with ID ${existingRestaurant._id} on FOODLY at this time. Please try again later.`;

    // Send email
    await sendEmail(userExists.email, emailSubject, emailText);

    if (result.acknowledged) {
      const updatedRestaurant = await Restaurant.findOne({ _id });
      return res.status(202).json({ updatedRestaurant });
    } else {
      return res.status(500).json({ message: "Can't menu digitisation." });
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching restaurant:", error);
    // Send an error response
    res.status(500).send("Internal Server error occurred");
  }
};

// Bank details verification api
const bankDetailsVerification = async (req, res) => {
  try {
    const { _id, isbankdetailsverified } = req.body;

    // Validate request body
    if (!_id || typeof isbankdetailsverified !== "boolean") {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const existingRestaurant = await Restaurant.findOne({ _id });

    if (!existingRestaurant) {
      return res.status(400).json({ message: "Restaurant not found" });
    }

    const result = await Restaurant.updateOne(
      { _id },
      { $set: { isbankdetailsverified: isbankdetailsverified } }
    );

    const userExists = await User.findOne({
      _id: new ObjectId(existingRestaurant.ownerid),
    });

    const emailSubject = isbankdetailsverified
      ? "FOODLY | Bank Details Verification Completed"
      : "FOODLY | Bank Details Verification Pending";
    const emailText = isbankdetailsverified
      ? `Dear User, Your restaurant's bank details with ID ${existingRestaurant._id} have been successfully verified on FOODLY. Thank you for ensuring smooth financial transactions with FOODLY.`
      : `We regret to inform you that we couldn't verify your restaurant's bank details with ID ${existingRestaurant._id} on FOODLY at this time. Please try again later.`;

    // Send email
    await sendEmail(userExists.email, emailSubject, emailText);

    if (result.acknowledged) {
      const updatedRestaurant = await Restaurant.findOne({ _id });
      return res.status(202).json({ updatedRestaurant });
    } else {
      return res.status(500).json({ message: "Can't verified bank details." });
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching restaurant:", error);
    // Send an error response
    res.status(500).send("Internal Server error occurred");
  }
};

module.exports = {
  getUserContact,
  getUserDetails,
  deleteUser,
  deleteAllComments,
  deleteAllRestaurants,
  getAllRestaurantDetails,
  deleteRestaurant,
  createResPage,
  documentVerification,
  deliveryActivation,
  menuDigitisation,
  bankDetailsVerification,
};
