const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const bcryptSalt = process.env.BCRYPT_SALT;

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

module.exports = router;
