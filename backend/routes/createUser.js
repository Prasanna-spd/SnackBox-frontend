const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const bcryptSalt = process.env.BCRYPT_SALT;
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Initialize passport
// router.use(passport.initialize());

// // Use passport session
// router.use(passport.session());
// passport.use(User.createStrategy());

router.post(
  "/createUser",
  body("email").isEmail(),
  body("name").isLength({ min: 5 }),
  body("password", "incorrect Password").isLength({ min: 5 }),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ results: result.array() });
    }

    const salt = await bcrypt.genSalt(bcryptSalt);
    let securePass = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: securePass,
        email: req.body.email,
        location: req.body.location,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/myOrders",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/home",
  passport.authenticate("google", {
    failureRedirect: "/login",
    // console.log("failed")
  }),
  function (req, res) {
    // Successful authentication, redirect secrets page.
    const dr = res.json();
    console.log(dr);
    console.log("Authentication success");
    const data = res.error();
    console.log(data);
    res.redirect("/home");
  }
);

module.exports = router;
