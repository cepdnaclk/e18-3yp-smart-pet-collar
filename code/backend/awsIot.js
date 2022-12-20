// Dependencies
const awsIot = require("aws-iot-device-sdk");
const Device = require("./models/Device");
const Pet = require("./models/Pet");
//const sensor = require("node-dht-sensor");

function run() {
  const device = awsIot.device({
    clientId: "mqtt-explorer-839a6474",
    host: "a26wj855ybmd1h-ats.iot.ap-south-1.amazonaws.com",
    port: 8883,
    keyPath:
      "./cert/768405eda3d7783091d099fa7744d4a63308d4ed0f246ba50685abc54886a21f-private.pem.key",
    certPath:
      "./cert/768405eda3d7783091d099fa7744d4a63308d4ed0f246ba50685abc54886a21f-certificate.pem.crt",
    caPath: "./cert/AmazonRootCA1.pem",
  });

  // the function for the sync button 
  const sendData = () => {
    const obj = { type: "sync" };
    console.log("STEP - Requesting data from AWS  IoT Core");
    console.log(
      "---------------------------------------------------------------------------------"
    );

    if(obj["type"] == "sync"){
      device.publish("/device1/", JSON.stringify(obj));
    }
  };

  // when connected to broker, subscribe to topic
  device.on("connect", function () {
    device.subscribe("/device1/", function (err) {
      if (!err) {
        console.log("MQTT Connected");
      }
    });
    sendData();
  });

  // Set handler for the device, it will get the messages from subscribers topics.
  device.on("message", function (topic, payload) {
    const data = JSON.parse(payload.toString());

    if (data.type === "vitals") {
      addVital(data);
    } else if (data.type === "locations") {
      addLocation(data);
    } else if (data.type === "sleeps") {
      addSleep(data);
    }
  });

  device.on("error", function (topic, payload) {
    console.log("Error:", topic, payload.toString());
  });
}

function addVital(data) {
  Device.findById(data.device_id, (err, device) => {
    if (err) {
      console.log(err);
    }
    if (device) {
      Pet.findByIdAndUpdate(
        device.pet,
        {
          $push: {
            vitals: {
              dateTime: data.dateTime,
              temperature: data.temperature,
              heartRate: data.heartRate,
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
  Device.findById(data.device_id, (err, device) => {
    if (err) {
      console.log(err);
    }
    if (device) {
      Pet.findByIdAndUpdate(
        device.pet,
        {
          $push: {
            locations: {
              dateTime: data.dateTime,
              latitude: data.latitude,
              longitude: data.longitude,
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
  Device.findById(data.device_id, (err, device) => {
    if (err) {
      console.log(err);
    }
    if (device) {
      Pet.findByIdAndUpdate(
        device.pet,
        {
          $push: {
            sleeps: {
              startTime: data.startTime,
              duration: data.duration,
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

module.exports = { run };
