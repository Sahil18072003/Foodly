const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const transporter = require("../Configuration/nodemailerConfig");
const User = require("../Models/User-model");
const UserContact = require("../Models/Contact-model");
const Comment = require("../Models/Comment-Model");

// Home Page
const home = async (req, res) => {
  try {
    res.status(200).send("This is a home page using controllers");
  } catch (error) {
    console.log(error);
  }
};

// Signup Page
const signup = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const secPass = await bcrypt.hash(password, salt);

    const userData = await User.create({
      email: email,
      phone: phone,
      password: secPass,
    });

    const data = {
      user: {
        id: userData.id,
      },
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET_TOKEN, {
      expiresIn: "10m",
    });

    // Sending the response first
    res.status(200).json({
      msg: "Signup Successfully",
      token: await authToken,
      user: userData,
    });

    // Now, sending the email
    var mailOptions = {
      from: process.env.Email_id,
      to: email, // Send email to the user's email address
      subject: "Foodly Account Registered",
      text: `Thank you for registering with our website.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // Handle email sending error
        res.status(500).send("Internal Server error occured");
        console.log(error);
      } else {
        // Handle email sent successfully
        res.status(200).json({ msg: "Email Sent Succesfully" });
        console.log("Email Sent Succesfully");
      }
    });
  } catch (error) {
    // Handle any other errors
    console.log(error);
    res.status(500).send("Internal Server error occurred");
  }
};

// Login Page
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).json({ msg: "Invalid Credentials." });
    }

    const user = await bcrypt.compare(password, userExists.password);

    if (user) {
      const data = {
        user: {
          id: userExists.id,
        },
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET_TOKEN, {
        expiresIn: "10m",
      });

      res.status(200).json({
        msg: "Login Successfully",
        token: await authToken,
        user: userExists,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    console.log(error);
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const userExists = await User.findOne({ email });

    if (userExists) {
      let otp = Math.floor(100000 + Math.random() * 900000);

      const userEmail = userExists.email;
      const userid = userExists._id;

      var mailOptions = {
        from: process.env.Email_id,
        to: userEmail,
        subject: "Reset Password OTP for login into Our Website",
        text: `Your one time otp is ${otp} valid for 5 minutes`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).send("Internal Server error occured");
          console.log(error);
        } else {
          res
            .status(200)
            .json({ msg: "Email Sent Succesfully", email, userid, otp: otp });
          console.log("Email Sent Succesfully");
        }
      });
    } else {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
};

// OTP verification for forget password
const otpVerification = (req, res) => {
  try {
    const userotp = req.body.otp;
    const genotp = req.header("otp");

    if (userotp !== genotp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    res
      .status(200)
      .json({ msg: "Valid OTP", userotp: userotp, genotp: genotp });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error occured");
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const password = req.body.password;
    const conPassword = req.body.cpassword;

    const userId = req.header("id");

    if (password !== conPassword) {
      return res
        .status(400)
        .json({ msg: "Password and Confirm Password not matched" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { password: secPass } },
      { new: true }
    );

    res.status(200).json({
      msg: "Password reset successfully done.",
      user: user,
      userId: userId,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error occured");
  }
};

// Get User personal data
const getUserDetail = async (req, res) => {
  try {
    const { id } = req.body;

    // For example:
    const userDetails = await User.findById(id); // Assuming you're using Mongoose or similar ORM

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user details in the response
    return res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error in getUserDetail:", error);
    // Handle any errors that occur during the process
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Contact Page
const userContant = async (req, res) => {
  try {
    const { username, email, phone, message } = req.body;

    const usercontact = await UserContact.create({
      username: username,
      email: email,
      phone: phone,
      message: message,
    });

    const data = {
      user: {
        id: usercontact.id,
      },
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET_TOKEN, {
      expiresIn: "0.5h",
    });

    // Sending the response first
    res.status(200).json({
      msg: usercontact,
      token: await authToken,
      userId: usercontact._id.toString(),
    });
  } catch (error) {
    // Handle any other errors
    console.log(error);
    res.status(500).send("Internal Server error occurred");
  }
};

// dashboard activity
const dashboard = async (req, res) => {
  try {
  } catch {}
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  const { email } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    // Update the user's profile information
    let result = await User.updateOne({ email }, { $set: req.body });

    if (result.acknowledged) {
      let updatedUser = await User.findOne({ email });
      return res.status(202).json({ updatedUser });
    } else {
      return res.status(500).json({ message: "Failed to update user" });
    }
  } catch (error) {
    // Handle any other errors
    console.log(error);
    res.status(500).send("Internal Server error occurred");
  }
};

// Save User's comments
const saveComment = async (req, res) => {
  try {
    // Create new Comment
    let result = await Comment(req.body);

    result = await result.save();

    if (result) {
      return res.status(202).json({ result: "Comment saved" });
    } else {
      return res.status(500).json({ message: "Failed to create commet" });
    }
  } catch (error) {
    // Handle any other errors
    console.log(error);
    res.status(500).send("Internal Server error occurred");
  }
};

const showComment = async (req, res) => {
  try {
    // Retrieve comments
    let result = await Comment.find({});

    if (result.length > 0) {
      // If comments are found, send them
      res.status(200).json(result);
    } else {
      // If no comments are found, send a 404 status
      res.status(404).json({ message: "No comments found" });
    }
  } catch (error) {
    // Handle any errors
    console.log(error);
    res.status(500).send("Internal Server error occurred");
  }
};

// Delete Comments by User
const deleteOneComment = async (req, res) => {
  try {
    let result = await Comment.deleteOne({ _id: req.params.id });
    res.send(result);

    if (result.acknowledged) {
      return res.status(202).json({ result: "Comment deleted" });
    } else {
      return res.status(500).json({ message: "Failed to create commet" });
    }
  } catch (error) {
    // Handle any other errors
    console.log(error);
    res.status(500).send("Internal Server error occurred");
  }
};

module.exports = {
  home,
  signup,
  login,
  // googleCheck,
  // googleLogin,
  forgotPassword,
  otpVerification,
  changePassword,
  getUserDetail,
  userContant,
  dashboard,
  updateUserProfile,
  saveComment,
  showComment,
  deleteOneComment,
};
