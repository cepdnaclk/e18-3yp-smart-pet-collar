const express = require("express");
const { authenticateToken } = require("../auth/jwt");
const Pet = require("../models/Pet");
const User = require("../models/User");
const Vaccination = require("../models/Vaccination");

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /devices.
const router = express.Router();

// get pet's overview data (latest vital, latest location)
router.get("/pet/overview", authenticateToken, (req, res) => {
  User.findById(req.user.user_id, function (err, user) {
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
router.get("/pet/vaccinations", authenticateToken, (req, res) => {
  User.findById(req.user.user_id, function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).send("Error fetching user!");
    } else {
      res.json(user.pet.vaccinations);
    }
  }).populate({
    path: "pet",
    populate: {
      path: "vaccinations",
    },
  });
});

// get pet's all sleep data
router.get("/pet/sleeps", authenticateToken, (req, res) => {
  User.findById(req.user.user_id, function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).send("Error fetching user!");
    } else {
      res.json(user.pet.sleeps);
    }
  }).populate("pet");
});

// get pet's vitals
router.get("/pet/vitals", authenticateToken, (req, res) => {
  User.findById(req.user.user_id, function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).send("Error fetching user!");
    } else {
      res.json(user.pet.vitals);
    }
  }).populate("pet");
});

// get pet's locations
router.get("/pet/locations", authenticateToken, (req, res) => {
  User.findById(req.user.user_id, function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).send("Error fetching user!");
    } else {
      res.json(user.pet.locations);
    }
  }).populate("pet");
});

// create vaccination record
router.post("/pet/vaccinations", authenticateToken, (req, res) => {
  const newVaccination = {
    name: req.body.name,
    scheduledDate: req.body.scheduledDate,
    status: "pending",
  };

  Vaccination.create(newVaccination, function (err, vaccination) {
    if (err) {
      console.log(err);
      res.status(400).send("Error creating vaccination!");
    } else {
      User.findById(req.user.user_id, function (err, user) {
        if (err) {
          console.log(err);
          res.status(400).send("Error fetching user!");
        } else {
          user.pet.vaccinations.push(vaccination._id);
          user.pet.save();
          res.json(vaccination);
        }
      }).populate("pet", "vaccinations");
    }
  });
});

// edit vaccination record
router.put("/pet/vaccinations/:id", authenticateToken, (req, res) => {
  Vaccination.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      scheduledDate: req.body.scheduledDate,
      completedDate: req.body.completedDate,
      label: req.body.label,
      status: req.body.status,
    },
    { new: true },
    function (err, vaccination) {
      if (err) {
        console.log(err);
        res.status(400).send("Error updating vaccination!");
      } else {
        res.json(vaccination);
      }
    }
  );
});

// delete vaccination record
router.delete("/pet/vaccinations/:id", authenticateToken, (req, res) => {
  User.findById(req.user.user_id, function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).send("Error fetching user!");
    } else {
      user.pet.vaccinations.pull(req.params.id);
      user.pet.save();
    }
  }).populate("pet", "vaccinations");

  Vaccination.findByIdAndDelete(req.params.id, function (err, vaccination) {
    if (err) {
      console.log(err);
      res.status(400).send("Error deleting vaccination!");
    } else {
      res.json(null);
    }
  });
});

module.exports = router;
