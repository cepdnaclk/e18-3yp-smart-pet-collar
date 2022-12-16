const express = require("express");
const Pet = require("../models/Pet");
const User = require("../models/User");

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /devices.
const router = express.Router();

const user_id = "639b66fa02e35eb25ff4c774"; // temporary user id for testing (until we build authentication)

// get pet's overview data (latest vital, latest location)
router.get("/pet/overview", (req, res) => {
  User.findById(user_id, function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).send("Error fetching user!");
    } else {
      let vital, location;
      if (user.pet.vitals.length === 0) {
        vital = {
          heartRate: 0,
          temperature: 0,
        };
      } else {
        vital = user.pet.vitals.reduce((a, b) =>
          a.dateTime > b.dateTime ? a : b
        );
      }

      if (user.pet.locations.length === 0) {
        location = {
          latitude: 0,
          longitude: 0,
        };
      } else {
        location = user.pet.locations.reduce((a, b) =>
          a.dateTime > b.dateTime ? a : b
        );
      }

      const overview = {
        location: location,
        vital: vital,
      };
      res.json(overview);
    }
  }).populate("pet");
});

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

// get pet's all sleep
router.get("/pet/sleep", (req, res) => {
  User.findById(user_id, function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).send("Error fetching user!");
    } else {
      res.json(user.pet.sleeps);
    }
  }).populate("pet");
});

// get pet's vitals
router.get("/pet/vitals", (req, res) => {
  User.findById(user_id, function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).send("Error fetching user!");
    } else {
      res.json(user.pet.vitals);
    }
  }).populate("pet");
});

// get pet's locations 
router.get("/pet/locations", (req, res) => {
  User.findById(user_id, function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).send("Error fetching user!");
    } else {
      res.json(user.pet.locations);
    }
  }).populate("pet");
});

module.exports = router;
