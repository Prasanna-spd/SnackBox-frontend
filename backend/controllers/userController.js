require("dotenv").config();
const User = require("../models/user");
// const bcrypt = require("bcryptjs");
const { response } = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// const bcryptSalt = process.env.BCRYPT_SALT;

const forgetPasswordMail = async (name, mail, token) => {
  try {
    const transporter = nodemailer.createTransport("SMTP", {
      service: "Gmail",
      auth: {
        useremail: process.env.USER_EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: mail,
      subject: "For Reset Password",
      html: `<p>Hii ${name}. Please copy the link ${`http://localhost:5000/api/forgetPassword?token=${token}`} to reset the password</p>`,
    };
    transporter.sendMail(mailOptions, function (error, msg) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent :-", msg.response);
      }
    });
  } catch (error) {
    response.status(400).send({ success: false, msg: error.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const resetUser = await User.findOne({ email: email });

    if (resetUser) {
      let resetToken = crypto.randomBytes(32).toString("hex");
      //   const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
      const reset = await User.updateOne(
        { email: email },
        { $set: { token: resetToken } }
      );
      forgetPasswordMail(resetUser.name, email, resetToken);
      res.status(200).send({ success: true, msg: "Check your mail" });
    } else {
      res
        .status(200)
        .send({ success: true, msg: "This email does not exsist" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = { forgetPassword };
