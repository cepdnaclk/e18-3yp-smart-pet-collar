---
layout: home
permalink: ./index.html

# Please update this with your repository name and title
repository-name: e18-3yp-smart-pet-collar
title: Smart Pet Collar
---

# SMART PET COLLAR

---

## TEAM
-  E/18/181, Lakshitha Konara, [e18181@eng.pdn.ac.lk](mailto:name@email.com)
-  E/18/297, Piumal Rathnayake, [e18297.pdn.ac.lk](mailto:name@email.com)
-  E/18/402, Chathura Wimalasiri, [e18402.pdn.ac.lk](mailto:name@email.com)


## CONTENT
1. [PROBLEM STATEMENT](#problem-statement)
2. [SOLUTION](#solution )
3. [SYSTEM OVERVIEW](#system-overview)
4. [LINKS](#links)


---

## PROBLEM STATEMENT

If your pet is missing, you will look for it. You will try many options, such as asking your neighbors, waiting until they come back home, osting notices of nearby places, or searching everywhere. se options are not good or efficient. We need an efficient solution for this matter.

## SOLUTION
##### ***SMART PET COLLAR***
We proposed a solution that is a smart pet belt. It is a wearable and waterproof device. herefore, you need to wear it on your pet and connect it to your PC or mobile phone. Simply put, you can easily obtain corresponding details.

## SYSTEM OVERVIEW
##### ***HIGH-LEVEL SYSTEM OVERVIEW***
This is the high-level architecture diagram of our system. Inside this device, we have a microcontroller and several sensors and other modules. Since this is a wearable device for pets, we can’t use a direct power supply. So we use a rechargeable battery, so the user can charge it once every few days. One of the main features of this system is tracking the pet’s location. For that, we use a GPS module, which can get location data through GPS satellites. For monitoring health, we get body temperature data and pulse data using a temperature sensor and a pulse sensor. We get the data related to orientation and movement using a gyroscope sensor. We use that data for the sleep monitoring feature. We also include a speaker with this device, so it can be used to implement a sound-based pet training feature. Finally, this has a GSM/GPRS module, to connect to the internet. So the device can send the data taken from the sensor to the cloud server.

What if the device lost network connectivity at some point? To address that issue, we wanted temporary storage. So the device can store the data temporarily and send it to the server when the network is restored. On the right side of the figure, we have the user and the application UI. Frontend. It can communicate with the backend and the database through the API. To connect the device with the backend cloud server, we will be using a MQTT broker. So we can set up a subscription for the device and share the sensor data and control signals through the MQTT protocol. We don’t pass real-time data to the server in regular mode. Every sensor's data will have a certain delay between two consecutive measurements. For example, the location data will only be sent once every 15 minutes.
#### ***TECHNOLOGY STACK***
- ExpressJS: Express is a node js web application framework that provides broad features for building web and mobile applications. It is used to build a single page, multipage, and hybrid web application.

- MongoDB: MongoDB is a document database used to build highly available and scalable internet applications. With its flexible schema approach, it's popular with development teams using agile methodologies.

- Eclipse Mosquitto: The MQTT protocol provides a lightweight method of carrying out messaging using a publish/subscribe model.

- AWS: AWS is designed to allow application providers, ISVs, and vendors to quickly and securely host your applications – whether an existing application or a new SaaS-based application.
## HARDWARE DESIGN
## PROTOTYPE

## LINKS

- [Project Repository](https://github.com/cepdnaclk/e18-3yp-smart-pet-collar)
- [Project Page](https://projects.ce.pdn.ac.lk/3yp/e18/smart-pet-collar/)
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)


