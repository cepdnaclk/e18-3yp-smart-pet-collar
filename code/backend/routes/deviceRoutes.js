const express = require("express");
const Device = require("../models/Device");

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /devices.
const router = express.Router();

const user_id = "639b66fa02e35eb25ff4c774"; // temporary user id for testing (until we build authentication)

router.get("/devices", (req, res) => {
  Device.find({}, function (err, devices) {
    if (err) {
      console.log(err);
      res.status(400).send("Error fetching devices!");
    } else {
      res.json(devices);
    }
  });
});

module.exports = router;
