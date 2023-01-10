#define USE_ARDUINO_INTERRUPTS true    // Set-up low-level interrupts for most acurate BPM maths.
#include <PulseSensorPlayground.h>     // Includes the PulseSensorPlayground Library.  
#include <OneWire.h>
#include <DallasTemperature.h>
#include <BMI160Gen.h>

//Variables for gyro sensor
const int i2c_addr = 0x68;
unsigned long startTime = 0;  // time when the condition first becomes false
unsigned long totalTime = 0;  // total duration that the condition is false
int gx, gy, gz;         // raw gyro values


//Variables for pulse sensor

const int PulseWire = 0;       // PulseSensor PURPLE WIRE connected to ANALOG PIN 0
int Threshold = 520;           // Determine which Signal to "count as a beat" and which to ignore.
PulseSensorPlayground pulseSensor;  // Creates an instance of the PulseSensorPlayground object called "pulseSensor


//Variables for temperature sensor

#define ONE_WIRE_BUS 8
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);
// Pass our oneWire reference to Dallas Temperature. 
DallasTemperature sensors(&oneWire);
// arrays to hold device address
DeviceAddress insideThermometer;


//pulse sensor function
int getPulseReading() {
  pulseSensor.analogInput(PulseWire);  
  pulseSensor.setThreshold(Threshold);  
  return pulseSensor.getBeatsPerMinute();

}

//temperature sensor function
float getTemperature() {
  // call sensors.requestTemperatures() to issue a global temperature 
  // request to all devices on the bus
  sensors.requestTemperatures(); // Send the command to get temperatures
  // After we got the temperatures, we can print them here.
  // We use the function ByIndex, and as an example get the temperature from the first device only.
  float temperature = sensors.getTempCByIndex(0);
  return temperature;
}

//gyro sensor function
long getSleepTrack() {
  // read raw gyro measurements from device
  BMI160.readGyro(gx, gy, gz);

  if( (gx > -1000) && (gx < 1000) && (gy > -1000) && (gy < 1000) && (gz > -1000) && (gz < 1000) ) {
  
    if (startTime == 0) {
      // set start time if not already set
      startTime = millis()/1000;

    }
    else {
      // update total time
      totalTime = millis()/1000 - startTime;
    }
  }
  else {
    // condition is false
   
    Serial.println(totalTime);
    startTime = 0;
    totalTime = 0;
    return totalTime;    
   
  }
 
}

void setup() {  
  Serial.begin(9600);          // For Serial Monitor
  // Configure the PulseSensor object, by assigning our variables to it.
  // Start up the library
  sensors.begin();
  BMI160.begin(BMI160GenClass::I2C_MODE, i2c_addr);

  // Double-check the "pulseSensor" object was created and "began" seeing a signal.
  if (pulseSensor.begin()) {
    Serial.println("We created a pulseSensor Object !");  //This prints one time at Arduino power-up,  or on Arduino reset. 
  }
  //if (!sensors.getAddress(insideThermometer, 0)) Serial.println("Unable to find address for Device 0");
}


void loop() {

  float temperature = getTemperature();
  
  int myBPM = getPulseReading();  // Calls function on our pulseSensor object that returns BPM as an "int".

  long gyro = getSleepTrack();
   
  // if (pulseSensor.sawStartOfBeat()) {            // Constantly test to see if "a beat happened".
  //   Serial.print("BPM: ");                        // Print phrase "BPM: "
  //   Serial.println(myBPM);                        // Print the value inside of myBPM.
  // }

  // Serial.print("BPM: ");                        // Print phrase "BPM: "
  // Serial.println(myBPM);                        // Print the value inside of myBPM.

  // Serial.print("Temperature: ");
  // Serial.print(temperature);
  // Serial.println(" C");

  Serial.println(gyro);

  delay(1000);                    // considered best practice in a simple sketch
}