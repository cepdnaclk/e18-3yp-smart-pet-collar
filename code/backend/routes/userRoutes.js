const express = require("express");
const Device = require("../models/Device");
const Pet = require("../models/Pet");
const User = require("../models/User");

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /devices.
const router = express.Router();

const user_id = "639b66fa02e35eb25ff4c774"; // temporary user id for testing (until we build authentication)

// register a device under a user
router.post("/me/device", (req, res) => {
  Device.findById(req.body.deviceId, function (err, device) {
    if (err) {
      console.log(err);
      res.status(400).send("Error fetching device!");
    } else {
      if (device.pin === req.body.pin) {
        // add device to user if the pin is correct
        User.findByIdAndUpdate(
          user_id,
          { device: device },
          { new: true },
          function (err, user) {
            if (err) {
              console.log(err);
              res.status(400).send("Error adding device to user!");
            } else {
              res.json(user);
            }
          }
        );
      } else {
        res.status(400).send("Incorrect device credentials!");
      }
    }
  });
});

// create user's pet
router.post("/me/pet", (req, res) => {
  const newPet = {
    name: req.body.name,
    species: req.body.species,
    breed: req.body.breed,
    sex: req.body.sex,
    dateOfBirth: req.body.dateOfBirth,
    weight: req.body.weight,
  };

  Pet.create(newPet, function (err, pet) {
    if (err) {
      console.log(err);
      res.status(400).send("Error creating pet!");
    } else {
      User.findByIdAndUpdate(
        user_id,
        { pet: pet },
        { new: true },
        function (err, user) {
          if (err) {
            console.log(err);
            res.status(400).send("Error adding pet to user!");
          } else {
            res.json(pet);
          }
        }
      );
    }
  });
});

module.exports = router;
