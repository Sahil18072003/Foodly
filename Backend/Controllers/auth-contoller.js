const User = require("../Models/User-model");
const bcrypt = require("bcrypt");
const fetchUser = require("../Middlewares/fetchUser");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const passport = require("passport");
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

const expireTime = "0.5h";

const home = async (req, res) => {
  try {
    res.status(200).send("This is a home page using controllers");
  } catch (error) {
    console.log(error);
  }
};

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
      username: username,
      email: email,
      phone: phone,
      password: secPass,
    });
    console.log(userData);

    const data = {
      user: {
        id: userData.id,
      },
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET_TOKEN, {
      expiresIn: "0.5h",
    });

    res.status(200).json({
      msg: userData,
      token: await authToken,
      userId: userData._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

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
        expiresIn: "0.5h",
      });

      res.status(200).json({
        msg: "Login Successfully",
        token: await authToken,
        userId: userExists._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    console.log(error);
  }
};

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
        subject: "Reset Password OTP",
        text: `One time OTP: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).send("Internal Server error occured");
          // console.log(error);
        } else {
          res
            .status(200)
            .json({ msg: "Email Sent Succesfully", userid, otp: otp });
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
    console.log(userotp);
    const genotp = req.header("otp");
    console.log(genotp);
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

module.exports = {
  home,
  signup,
  login,
  googleCheck,
  googleLogin,
  forgotPassword,
  otpVerification,
  changePassword,
};
