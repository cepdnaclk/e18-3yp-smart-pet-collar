#define USE_ARDUINO_INTERRUPTS true  // Set-up low-level interrupts for most acurate BPM maths.
#include <ArduinoJson.h>
#include <BMI160Gen.h>
#include <DallasTemperature.h>
#include <OneWire.h>
#include <PulseSensorPlayground.h>

// GLobal variables for device
int DELAY = 2000;                               // global delay for sensor readings
String DEVICE_ID = "639b588cfba69d57d680e6eb";  // device ID

// JSon Buffer
StaticJsonDocument<128> outputMessage;

// Variables for gyro sensor
const int i2c_addr = 0x68;
unsigned long startTime = 0;  // time when the condition first becomes false
unsigned long totalTime = 0;  // total duration that the condition is false
int gx, gy, gz;               // raw gyro values

// Variables for pulse sensor
const int PulseWire = 0;            // PulseSensor PURPLE WIRE connected to ANALOG PIN 0
int Threshold = 520;                // Determine which Signal to "count as a beat" and which to ignore.
PulseSensorPlayground pulseSensor;  // Creates an instance of the PulseSensorPlayground object called "pulseSensor

// Variables for temperature sensor
#define ONE_WIRE_BUS 8
OneWire oneWire(ONE_WIRE_BUS);        // Setup a oneWire instance to communicate with any OneWire devices
DallasTemperature sensors(&oneWire);  // Pass our oneWire reference to Dallas Temperature.
DeviceAddress insideThermometer;      // arrays to hold device address

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

        long int totalTimeTemp = totalTime;
        startTime = 0;
        totalTime = 0;

        return totalTimeTemp;
    }
}

void setup() {
    Serial.begin(9600);  // For Serial Monitor

    // BMI160.begin(BMI160GenClass::I2C_MODE, i2c_addr);
    init_pulse();
    init_temp();
}

void loop() {
    float temperature = getTemperatureReading();
    int myBPM = getPulseReading();  // Calls function on our pulseSensor object that returns BPM as an "int".
    long sleepDuration = getSleepTrack();

    // if (pulseSensor.sawStartOfBeat()) {            // Constantly test to see if "a beat happened".
    //   Serial.print("BPM: ");                        // Print phrase "BPM: "
    //   Serial.println(myBPM);                        // Print the value inside of myBPM.
    // }

    String mqtt_command = "";
    String temp_json_str = "";

    // Json object for vital reading
    outputMessage.clear();
    outputMessage["device_id"] = DEVICE_ID;
    outputMessage["type"] = "vitals";
    outputMessage["temperature"] = temperature;
    outputMessage["heartRate"] = myBPM;
    // outputMessage["dateTime"]="2021-05-01T12:00:00.000Z";

    // Generate AT+MQTT command for A9G
    mqtt_command = "AT+MQTTPUB=\"/device1/\",\"";
    temp_json_str = "";
    serializeJson(outputMessage, temp_json_str);
    temp_json_str.replace("\"", "*");
    mqtt_command += temp_json_str;
    mqtt_command += "\",0,0,0";
    Serial.println(mqtt_command);

    // Json object for location reading
    outputMessage.clear();
    outputMessage["device_id"] = DEVICE_ID;
    outputMessage["type"] = "locations";
    outputMessage["longitude"] = 7.2525;
    outputMessage["latitude"] = 80.591;
    // outputMessage["dateTime"]="2021-05-01T12:00:00.000Z";

    // Generate AT+MQTT command for A9G
    mqtt_command = "AT+MQTTPUB=\"/device1/\",\"";
    temp_json_str = "";
    serializeJson(outputMessage, temp_json_str);
    temp_json_str.replace("\"", "*");
    mqtt_command += temp_json_str;
    mqtt_command += "\",0,0,0";
    Serial.println(mqtt_command);

    if (sleepDuration != 0) {
        // Json object for sleep reading
        outputMessage.clear();
        outputMessage["device_id"] = DEVICE_ID;
        outputMessage["type"] = "sleeps";
        outputMessage["duration"] = sleepDuration;
        // outputMessage["startTime"]="2021-05-01T12:00:00.000Z";

        // Generate AT+MQTT command for A9G
        mqtt_command = "AT+MQTTPUB=\"/device1/\",\"";
        temp_json_str = "";
        serializeJson(outputMessage, temp_json_str);
        temp_json_str.replace("\"", "*");
        mqtt_command += temp_json_str;
        mqtt_command += "\",0,0,0";
        Serial.println(mqtt_command);
    }

    delay(DELAY);  // considered best practice in a simple sketch
}
