// Dependencies
const mqtt = require("mqtt");
const Device = require("./models/Device");
const Pet = require("./models/Pet");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

/*
 * Using MQTT over TCP with mqtt and mqtts protocols
 * EMQX's mqtt connection default port is 1883, mqtts is 8883
 */
const url = process.env.MQTT_BROKER_URL;

// Create an MQTT client instance
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Authentication
  clientId: "pet_smart_device_1",
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

let client;
function run() {
  client = mqtt.connect(url, options);
  client.on("connect", function () {
    // Subscribe to a topic
    client.subscribe("/device1/", function (err) {
      if (!err) {
        console.log("MQTT Connected");
      }
    });
  });

  // Receive messages
  client.on("message", function (topic, message) {
    const data = JSON.parse(message.toString().replace(/\*/g, "\""));

    if (data.type === "v") {
      addVital(data);
    } else if (data.type === "l") {
      addLocation(data);
    } else if (data.type === "s") {
      addSleep(data);
    }
  });

  client.on("error", function (error) {
    console.log(error);
  });
}

function addVital(data) {
  Device.findById(data.d_id, (err, device) => {
    if (err) {
      console.log(err);
    }
    if (device) {
      Pet.findByIdAndUpdate(
        device.pet,
        {
          $push: {
            vitals: {
              dateTime: new Date(),
              temperature: data.t,
              heartRate: data.h,
            },
          },
        },
        (err, pet) => {
          if (err) {
            console.log(err);
          }
          if (pet) {
            console.log("Vitals added to pet");
          }
        }
      );
    }
  });
}

function addLocation(data) {
  Device.findById(data.d_id, (err, device) => {
    if (err) {
      console.log(err);
    }
    if (device) {
      Pet.findByIdAndUpdate(
        device.pet,
        {
          $push: {
            locations: {
              dateTime: new Date(),
              latitude: data.lat,
              longitude: data.lng,
            },
          },
        },
        (err, pet) => {
          if (err) {
            console.log(err);
          }
          if (pet) {
            console.log("Location added to pet");
          }
        }
      );
    }
  });
}

function addSleep(data) {
  Device.findById(data.d_id, (err, device) => {
    if (err) {
      console.log(err);
    }
    if (device) {
      Pet.findByIdAndUpdate(
        device.pet,
        {
          $push: {
            sleeps: {
              startTime: new Date(new Date().getTime() - data.duration * 60000),
              duration: data.d,
            },
          },
        },
        (err, pet) => {
          if (err) {
            console.log(err);
          }
          if (pet) {
            console.log("Sleep added to pet");
          }
        }
      );
    }
  });
}

function sendData() {
  const obj = { type: "sync" };
  console.log("STEP - Requesting data from AWS IoT Core");
  client.publish("/device1/", JSON.stringify(obj));
}

module.exports = { run, sendData };
