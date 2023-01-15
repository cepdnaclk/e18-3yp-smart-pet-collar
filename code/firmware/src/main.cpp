#define USE_ARDUINO_INTERRUPTS true  // Set-up low-level interrupts for most acurate BPM maths.
#include <BMI160Gen.h>
#include <DallasTemperature.h>
#include <OneWire.h>
#include <PulseSensorPlayground.h>
#include <SoftwareSerial.h>
#include <TinyGPSPlus.h>

// GLobal variables for device
#define DEVICE_ID "639b588cfba69d57d680e6eb"  // device ID

// Variables for gyro sensor
#define i2c_addr 0x68
unsigned long startTime = 0;  // time when the condition first becomes false
unsigned long totalTime = 0;  // total duration that the condition is false
int gx, gy, gz;               // raw gyro values

// Variables for pulse sensor
#define PulseWire 0                 // PulseSensor PURPLE WIRE connected to ANALOG PIN 0
#define Threshold 520               // Determine which Signal to "count as a beat" and which to ignore.
PulseSensorPlayground pulseSensor;  // Creates an instance of the PulseSensorPlayground object called "pulseSensor

// Variables for temperature sensor
#define ONE_WIRE_BUS 8
OneWire oneWire(ONE_WIRE_BUS);        // Setup a oneWire instance to communicate with any OneWire devices
DallasTemperature sensors(&oneWire);  // Pass our oneWire reference to Dallas Temperature.
DeviceAddress insideThermometer;      // arrays to hold device address

TinyGPSPlus gps;  // The TinyGPSPlus object

// Software serial for A9G
#define RXPin 6
#define TXPin 5
static const uint32_t GPSBaud = 115200;
SoftwareSerial ss(RXPin, TXPin);  // The serial connection to the GPS device

String mqtt_command;
String temp_json_str;

// initialize pulse sensor
void init_pulse() {
    // Double-check the "pulseSensor" object was created and "began" seeing a signal.
    if (pulseSensor.begin()) {
        Serial.println("Pulse sensor initialized!");
    }
    pulseSensor.analogInput(PulseWire);
    pulseSensor.setThreshold(Threshold);
}

// initialize temp sensor
void init_temp() {
    sensors.begin();  // init temp sensor
    if (!sensors.getAddress(insideThermometer, 0)) {
        Serial.println("Unable to find address for Device 0");
    } else {
        Serial.println("Temp sensor initialized !");
    }
}

// pulse sensor function
int getPulseReading() {
    return pulseSensor.getBeatsPerMinute();
}

// temperature sensor function
float getTemperatureReading() {
    sensors.requestTemperatures();                   // Send the command to get temperatures
    float temperature = sensors.getTempCByIndex(0);  // get the temperature from the first device.
    return temperature;
}

// gyro sensor function
long getSleepTrack() {
    BMI160.readGyro(gx, gy, gz);  // read raw gyro measurements from device

    // if not moving
    if ((gx > -1000) && (gx < 1000) && (gy > -1000) && (gy < 1000) && (gz > -1000) && (gz < 1000)) {
        if (startTime == 0) {
            // set start time if not already set
            startTime = millis() / 1000;
        } else {
            // update total time
            totalTime = millis() / 1000 - startTime;
        }
        return 0;
    } else {
        // condition is false
        if (totalTime == 0) {
            return 0;
            // do nothing
        }

        unsigned long totalTimeTemp = totalTime;
        startTime = 0;
        totalTime = 0;

        return totalTimeTemp;
    }
}

void init_a9g() {
    ss.begin(GPSBaud);  // Begin A9G serial

    // check A9G connection
    Serial.println("Starting...");
    ss.println("\r");
    ss.println("AT\r");
    delay(1000);

    // set the network registration status
    ss.println("AT+CREG=2\r");
    delay(6000);

    // attach network
    ss.println("AT+CGATT=1\r");
    delay(6000);

    // set netowrk param
    ss.println("AT+CGDCONT=1,\"IP\",\"PPWAP\"\r");
    delay(6000);

    // Activate the PDP
    ss.println("AT+CGACT=1,1\r");
    delay(6000);

    ss.println("AT+MQTTCONN=\"ADD_IP_HERE\",1883,\"petsmart-8\",120,0,\"USERNAME\",\"PASSWORD\"");
    delay(6000);

    ss.println("AT+GPS=1\r");
    delay(1000);

    // location
    ss.println("AT+GPSRD=10\r");
    delay(100);

    Serial.println("A9G initialized!");
}

void setup() {
    Serial.begin(9600);  // For Serial Monitor

    BMI160.begin(BMI160GenClass::I2C_MODE, i2c_addr);
    init_pulse();
    init_temp();
    init_a9g();
}

void loop() {
    smartDelay(8000);

    // Generate vitals AT+MQTT command for A9G
    mqtt_command = "AT+MQTTPUB=\"/device1/\",\"";

    temp_json_str = "{\"d_id\":\"";
    temp_json_str += DEVICE_ID;
    temp_json_str += "\",\"type\":\"v\",\"t\":";
    temp_json_str += String(getTemperatureReading(), 1);
    temp_json_str += ",\"h\":";
    temp_json_str += getPulseReading();
    temp_json_str += "}";
    temp_json_str.replace("\"", "*");

    mqtt_command += temp_json_str;
    mqtt_command += "\",0,0,0\r";
    ss.print(mqtt_command);
    ss.print("\r");
    // Serial.println(mqtt_command);
    Serial.println("Hello1");

    // delay(1000);

    // Generate locations AT+MQTT command for A9G
    mqtt_command = "AT+MQTTPUB=\"/device1/\",\"";

    temp_json_str = "{\"d_id\":\"";
    temp_json_str += DEVICE_ID;
    temp_json_str += "\",\"type\":\"l\",\"lng\":";
    temp_json_str += String(gps.location.lng(), 6);
    temp_json_str += ",\"lat\":";
    temp_json_str += String(gps.location.lat(), 6);
    temp_json_str += "}";
    temp_json_str.replace("\"", "*");

    mqtt_command += temp_json_str;
    mqtt_command += "\",0,0,0\r";
    ss.print(mqtt_command);
    ss.print("\r");
    Serial.println("Hello2");

    // delay(1000);

    long sleepDuration = getSleepTrack();
    if (sleepDuration != 0) {
        // Generate sleeps AT+MQTT command for A9G
        mqtt_command = "AT+MQTTPUB=\"/device1/\",\"";

        temp_json_str = "{\"d_id\":\"";
        temp_json_str += DEVICE_ID;
        temp_json_str += "\",\"type\":\"s\",\"d\":";
        temp_json_str += sleepDuration;
        temp_json_str += "}";
        temp_json_str.replace("\"", "*");

        mqtt_command += temp_json_str;
        mqtt_command += "\",0,0,0\r";
        ss.print(mqtt_command);
        ss.print("\r");
        // Serial.println(mqtt_command);
        Serial.println("Hello3");

        // delay(1000);
    }
}

static void smartDelay(unsigned long ms) {
    unsigned long start = millis();
    do {
        while (ss.available())
            gps.encode(ss.read());
    } while (millis() - start < ms);
}
