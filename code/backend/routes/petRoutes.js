const express = require("express");
const Pet = require("../models/Pet");
const User = require("../models/User");

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /devices.
const router = express.Router();

const user_id = "639b66fa02e35eb25ff4c774"; // temporary user id for testing (until we build authentication)

// get pet's all vaccinations
router.get("/pet/vaccinations", (req, res) => {
  User.findById(user_id, function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).send("Error fetching user!");
    } else {
      res.json(user.pet.vaccinations);
    }
  }).populate("pet");
});

module.exports = router;
