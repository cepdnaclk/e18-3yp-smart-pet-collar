
import time as t
import json
import AWSIoTPythonSDK.MQTTLib as AWSIoTPyMQTT

# Define ENDPOINT, CLIENT_ID, PATH_TO_CERTIFICATE, PATH_TO_PRIVATE_KEY, PATH_TO_AMAZON_ROOT_CA_1, MESSAGE, TOPIC, and RANGE
ENDPOINT = "a26wj855ybmd1h-ats.iot.ap-south-1.amazonaws.com"
CLIENT_ID = "testDevice"
PATH_TO_CERTIFICATE = "./cert/768405eda3d7783091d099fa7744d4a63308d4ed0f246ba50685abc54886a21f-certificate.pem.crt"
PATH_TO_PRIVATE_KEY = "./cert/768405eda3d7783091d099fa7744d4a63308d4ed0f246ba50685abc54886a21f-private.pem.key"
PATH_TO_AMAZON_ROOT_CA_1 = "./cert/AmazonRootCA1.pem"
MESSAGE = "Hello World"
TOPIC = "/device1/"
RANGE = 20

myAWSIoTMQTTClient = AWSIoTPyMQTT.AWSIoTMQTTClient(CLIENT_ID)
myAWSIoTMQTTClient.configureEndpoint(ENDPOINT, 8883)
myAWSIoTMQTTClient.configureCredentials(PATH_TO_AMAZON_ROOT_CA_1, PATH_TO_PRIVATE_KEY, PATH_TO_CERTIFICATE)

myAWSIoTMQTTClient.connect()
print('Begin Publish')
for i in range (RANGE):
    data = "{} [{}]".format(MESSAGE, i+1)
    message = {"message" : data}
    myAWSIoTMQTTClient.publish(TOPIC, json.dumps(message), 1) 
    print("Published: '" + json.dumps(message) + "' to the topic: " + "'/device1/'")
    t.sleep(0.1)
print('Publish End')
myAWSIoTMQTTClient.disconnect()