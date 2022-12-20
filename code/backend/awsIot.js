// Dependencies
const awsIot = require("aws-iot-device-sdk");
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

  // when connected to broker, subscribe to topic
  device.on("connect", function () {
    device.subscribe('/device1/', function (err) {
      if (!err) {
          console.log("MQTT Connected");
      }
    })
  });

  // Set handler for the device, it will get the messages from subscribers topics.
device.on('message', function (topic, payload) {
    console.log('message', topic, payload.toString());
});

device.on('error', function (topic, payload) {
    console.log('Error:', topic, payload.toString());
});

  // when a new msg arrives on mqtt
  // mqttClient.on('message', function (topic, message) {
    
  //   try {
  //       // MQTT msg  format
  //       // id,temp,humidity,rainSensor,lightSensor,airQualitySensor
  //       const splitted = message.toString().split(",");
  //       const id = splitted[0];
  //       const temp = splitted[1];
  //       const humidity = splitted[2];
  //       const rain = splitted[3];
  //       const light = splitted[4];
  //       const air = splitted[5];

  //       // console.log(splitted)
  //       new SensorData({
  //           'dateTime': helper.getDateTime(),
  //           'location': "hanthana",
  //           'device_id': id,
  //           'topic': "test",
  //           'temperature': temp,
  //           'humidity': humidity,
  //           'isRaining': rain,
  //           "lightIntensity": light,
  //           "airQuality": air
  //       }).save();
  //   } catch (error) {
  //       console.log("Error parsing JSON: " + error);
  //   }

  // })

}

module.exports = { run };
