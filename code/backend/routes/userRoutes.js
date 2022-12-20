const express = require("express");
const { generateAccessToken, authenticateToken } = require("../auth/jwt");
const Device = require("../models/Device");
const Pet = require("../models/Pet");
const User = require("../models/User");

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /devices.
const router = express.Router();

// signup user
router.post("/signup", (req, res) => {
  let newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password, // TODO: encrypt password
    email: req.body.email,
  };

  deviceId = req.body.device;
  devicePin = req.body.pin;

  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      res.status(400).send("User already exists!");
    } else {
      Device.findById(deviceId, function (err, device) {
        if (err || !device) {
          res.status(400).send("Error fetching device!");
        } else {
          if (device.pin === devicePin) {
            newUser = { ...newUser, device: device };
            User.create(newUser, function (err, user) {
              if (err) {
                console.log(err);
                res.status(400).send("Error creating user!");
              } else {
                const token = generateAccessToken({ user_id: user._id });
                user = { ...user._doc, token: token };
                res.status(201).json(user);
              }
            });
          } else {
            res.status(400).send("Incorrect device pin!");
          }
        }
      });
    }
  });
});

// login user
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err || !user) {
      res.status(400).send("Incorrect credentials!");
    } else {
      // TODO: use hashing and encryption
      if (user.password === req.body.password) {
        const token = generateAccessToken({ user_id: user._id });
        user = { ...user._doc, token: token };
        res.json(user);
      } else {
        res.status(400).send("Incorrect credentials!");
      }
    }
  });
});

// register a device under a user
router.post("/me/device", authenticateToken, (req, res) => {
  Device.findById(req.body.deviceId, function (err, device) {
    if (err) {
      console.log(err);
      res.status(400).send("Error fetching device!");
    } else {
      if (device.pin === req.body.pin) {
        // add device to user if the pin is correct
        User.findByIdAndUpdate(
          req.user.user_id,
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
        res.status(400).send("Incorrect pin!");
      }
    }
  });
});

// create user's pet
router.post("/me/pet", authenticateToken, (req, res) => {
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
        req.user.user_id,
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
      // Todo add pet to device
    }
  });
});

module.exports = router;
