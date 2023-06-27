const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { displayData } = userController;

router.post(
  "/foodData",
  displayData
  //  (req, res) => {
  //   try {
  //     // console.log(global.food_items);
  //     res.send([global.food_items, global.foodCategory]);
  //   } catch (error) {
  //     console.error(error.message);
  //     res.send("Server Error");
  //   }
  // }
);

module.exports = router;
