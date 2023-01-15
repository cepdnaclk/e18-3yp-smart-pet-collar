import paho.mqtt.client as mqtt

import time as t
import json
import datetime
import random

MQTT_SERVER = ""
MQTT_USERNAME = ""
MQTT_PASSWORD = ""

def sync_data(client, userData, message):
    j2 = json.loads(message.payload)
    if j2["type"] == "sync":
        sendData()


def sendData():
    temperature = round(random.uniform(20, 40), 2)
    heartRate = round(random.uniform(60, 100), 2)
    message_vital = {"device_id": "639b588cfba69d57d680e6eb", "type": "vitals", "temperature": temperature,
                     "heartRate": heartRate, "dateTime": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
    message_location = {"device_id": "639b588cfba69d57d680e6eb", "type": "locations", "dateTime": datetime.datetime.now(
    ).strftime("%Y-%m-%d %H:%M:%S"), "longitude": 7.2525, "latitude": 80.591}

    client.publish("/device1/", json.dumps(message_vital), 1)
    client.publish("/device1/", json.dumps(message_location), 1)

    print("Published: '" + json.dumps(message_vital) +
          "' to the topic: " + "'/device1/'")
    print("Published: '" + json.dumps(message_location) +
          "' to the topic: " + "'/device1/'")

# create client object
client = mqtt.Client()

# set callback for message received
client.on_message = sync_data

# set username and password
client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)

# connect to broker
client.connect(MQTT_SERVER, 1883, 120)

# subscribe to topic
client.subscribe("/device1/")

print('MQTT Connected')

# start loop to process incoming messages
client.loop_forever()

# print('Begin Publish')

# while (True):
#     message_vital = {"device_id":"639b588cfba69d57d680e6eb", "type" : "vitals", "temperature":20.1, "heartRate":100.1, "dateTime":datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

#     message_location = {"device_id":"639b588cfba69d57d680e6eb", "type" : "locations", "dateTime":datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") ,"longitude": 7.2525, "latitude": 80.591 }

#     message_sleep = {"device_id":"639b588cfba69d57d680e6eb", "type" : "sleeps", "startTime":datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") ,"duration": 100}

#     client.publish("/device1/", json.dumps(message_vital), 1)
#     client.publish("/device1/", json.dumps(message_location), 1)
#     client.publish("/device1/", json.dumps(message_sleep), 1)

#     print("Published: '" + json.dumps(message_vital) + "' to the topic: " + "'/device1/'")
#     print("Published: '" + json.dumps(message_location) + "' to the topic: " + "'/device1/'")
#     print("Published: '" + json.dumps(message_sleep) + "' to the topic: " + "'/device1/'")

#     t.sleep(1000)

# print('Publish End')
