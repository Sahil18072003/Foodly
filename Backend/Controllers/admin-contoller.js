var jwt = require("jsonwebtoken");
const User = require("../Models/User-model");
const UserContact = require("../Models/Contact-model");
const Comment = require("../Models/Comment-Model");
const Restaurant = require("../Models/Restaurant-model");

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

    if (result.deletedCount > 0) {
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

    if (result.deletedCount > 0) {
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

module.exports = {
  getUserContact,
  getUserDetails,
  deleteUser,
  deleteAllComments,
  deleteAllRestaurants,
  getAllRestaurantDetails,
  deleteRestaurant,
};
