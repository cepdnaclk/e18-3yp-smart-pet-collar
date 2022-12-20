
import time as t
import json
import AWSIoTPythonSDK.MQTTLib as AWSIoTPyMQTT
import datetime

# Define ENDPOINT, CLIENT_ID, PATH_TO_CERTIFICATE, PATH_TO_PRIVATE_KEY, PATH_TO_AMAZON_ROOT_CA_1, MESSAGE, TOPIC, and RANGE
ENDPOINT = "a26wj855ybmd1h-ats.iot.ap-south-1.amazonaws.com"
CLIENT_ID = "testDevice"
PATH_TO_CERTIFICATE = "../.././cert/768405eda3d7783091d099fa7744d4a63308d4ed0f246ba50685abc54886a21f-certificate.pem.crt"
PATH_TO_PRIVATE_KEY = "../.././cert/768405eda3d7783091d099fa7744d4a63308d4ed0f246ba50685abc54886a21f-private.pem.key"
PATH_TO_AMAZON_ROOT_CA_1 = "../.././cert/AmazonRootCA1.pem"
#MESSAGE = "Hello World"
TOPIC = "/device1/"
RANGE = 20

myAWSIoTMQTTClient = AWSIoTPyMQTT.AWSIoTMQTTClient(CLIENT_ID)
myAWSIoTMQTTClient.configureEndpoint(ENDPOINT, 8883)
myAWSIoTMQTTClient.configureCredentials(PATH_TO_AMAZON_ROOT_CA_1, PATH_TO_PRIVATE_KEY, PATH_TO_CERTIFICATE)

myAWSIoTMQTTClient.connect()
print('Begin Publish')
for i in range (1):
    #data = "{} [{}]".format(MESSAGE, i+1)
    
    message_vital = {"device_id":"639b588cfba69d57d680e6eb", "type" : "vitals", "temperature":20.1, "heartRate":100.1, "dateTime":datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

    message_location = {"device_id":"639b588cfba69d57d680e6eb", "type" : "locations", "dateTime":datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") ,"longitude": 7.2525, "latitude": 80.591 }

    message_sleep = {"device_id":"639b588cfba69d57d680e6eb", "type" : "sleeps", "startTime":datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") ,"duration": 100}

    myAWSIoTMQTTClient.publish(TOPIC, json.dumps(message_vital), 1) 
    myAWSIoTMQTTClient.publish(TOPIC, json.dumps(message_location), 1) 
    myAWSIoTMQTTClient.publish(TOPIC, json.dumps(message_sleep), 1) 

    print("Published: '" + json.dumps(message_vital) + "' to the topic: " + "'/device1/'")
    print("Published: '" + json.dumps(message_location) + "' to the topic: " + "'/device1/'")
    print("Published: '" + json.dumps(message_sleep) + "' to the topic: " + "'/device1/'")

    t.sleep(2)

print('Publish End')
#myAWSIoTMQTTClient.disconnect()