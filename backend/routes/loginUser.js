const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

router.post(
  "/loginUser",
  body("email").isEmail(),
  body("password", "incorrect Password").isLength({ min: 5 }),

  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ results: result.array() });
    }
    let email = req.body.email;

    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try Logging With Proper Credentials" });
      }
      const compaPassw = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!compaPassw) {
        return res
          .status(400)
          .json({ errors: "Try Logging With Proper password" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const token = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken: token });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

// router.get("/loginUser", async (req, res) => {
//   let hack = await User.find();
//   console.log(hack);
// });

module.exports = router;
