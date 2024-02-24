const bcrypt = require("bcrypt");
const fetchUser = require("../Middlewares/fetchUser");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const passport = require("passport");
const User = require("../Models/User-model");
const UserContact = require("../Models/Contact-model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refeshToken, profile, done) {
      console.log("Sahil Dharaviya");
      User.findOne({ googleId: profile.id })
        .then((user) => {
          if (!user) {
            user = new User({
              googleId: profile.id,
            });
            user
              .save()
              .then(() => done(null, user))
              .catch((err) => done(err));

            //found user
          } else {
            done(null, user);
          }
        })
        .catch((err) => done(err));
    }
  )
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.Email_id,
    pass: process.env.Email_password,
  },
});

const expireTime = "10s";

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
    const { username, email, phone, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const userData = await User.create({
      // username: username,
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
      expiresIn: "10s",
    });

    // Sending the response first
    res.status(200).json({
      msg: userData,
      token: await authToken,
      userId: userData._id.toString(),
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
        expiresIn: 10,
      });

      res.status(200).json({
        msg: "Login Successfully",
        token: await authToken,
        userId: userExists._id.toString(),
        email: userExists.email,
        phone: userExists.phone,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    console.log(error);
  }
};

// Google Check
const googleCheck = async (req, res) => {
  try {
    let mail = req.body.email;
    let result = await User.findOne({ email: mail });
    // console.log("gc", result);
    if (result) {
      // console.log("hi");
      result = result.toObject();
      jwt.sign(
        { result },
        fetchUser,
        { expiresIn: expireTime },
        (err, token) => {
          if (err) {
            res.send("Token Expired or something went wrong");
          } else {
            res.send({ result, token });
          }
        }
      );
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log(error);
  }
};

// Google Login
const googleLogin = async (req, res) => {
  try {
    let data = new User(req.body);
    let result = await data.save();
    result = result.toObject();
    jwt.sign({ result }, fetchUser, { expiresIn: expireTime }, (err, token) => {
      if (err) {
        res.send("Token Expired or something went wrong");
      } else {
        res.send({ result, token });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// const googleCheck = async (req, res) => {
//   try {
//     console.log("Google check");
//     passport.authenticate("google", { scope: ["profile"] });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const googleLogin = async (req, res) => {
//   try {
//     console.log("Google login");
//     passport.authenticate("google", { failureRedirect: "/login" }),
//       function (req, res) {
//         // Successful authentication, redirect home.
//         res.redirect("/");
//       };
//   } catch (error) {
//     console.log(error);
//   }
// };

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
          // console.log(error);
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

// OTP verification
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
    console.log(password);

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

// Get User data in admin page
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
    const data = await User.deleteOne({ _id: req.params.id });
    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error occured");
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
      return res
        .status(400)
        .json({ message: "Error: user doesn't exist Please Signin First" });
    }

    // Update the user's profile information
    let result = await User.updateOne({ email }, { $set: req.body });
    if (result.acknowledged) {
      let updatedUser = await User.findOne({ email });
      return res.status(202).json({ updatedUser });
    } else {
      return res.status(500).json({ message: "Can't update the user" });
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
  googleCheck,
  googleLogin,
  forgotPassword,
  otpVerification,
  changePassword,
  userContant,
  getUserContact,
  getUserDetails,
  deleteUser,
  dashboard,
  updateUserProfile,
};
