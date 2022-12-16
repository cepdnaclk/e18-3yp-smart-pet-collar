var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://test.mosquitto.org", {
  clientId: "mqttjs01",
});

// when connected to broker, subscribe to topic
client.on('connect', function () {
    client.subscribe('test', function (err) {
        if (!err) {
            console.log("MQTT Connected");
        }
    })
})
