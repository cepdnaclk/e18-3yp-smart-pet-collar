#include <Arduino.h>
#include <DallasTemperature.h>
#include <OneWire.h>
#include <unity.h>

#define ONE_WIRE_BUS 2  // Pin where the DS18B20 is connected

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setUp(void) {
    // set stuff up here
    // Initialize the temperature sensor library
    sensors.begin();
}

void tearDown(void) {
    // clean stuff up here
}

void test_temperature_sensor_connection(void) {
    // Check that the temperature sensor is present on the OneWire bus
    TEST_ASSERT_EQUAL(1, sensors.getDeviceCount());
}

void test_temperature_reading(void) {
    // Request a temperature reading from the sensor
    sensors.requestTemperatures();
    // Check that the temperature reading is within a reasonable range (-40 to 125°C)
    TEST_ASSERT_TRUE(sensors.getTempCByIndex(0) > -40 && sensors.getTempCByIndex(0) < 125);

    // get 2 nearby temp values
    float temp1 = sensors.getTempCByIndex(0);
    float temp2 = sensors.getTempCByIndex(0);
    TEST_ASSERT_TRUE(abs(temp1 - temp2) < 0.1);
}

void test_temperature_difference(void) {
    // Request a temperature reading from the sensor
    sensors.requestTemperatures();

    // get 2 nearby temp values
    float temp1 = sensors.getTempCByIndex(0);
    float temp2 = sensors.getTempCByIndex(0);

    // Check that the temperature difference is within a reasonable range (0 to 0.1°C)
    TEST_ASSERT_TRUE(abs(temp1 - temp2) < 0.1);
}

void setup() {
    UNITY_BEGIN();  // IMPORTANT LINE!
    RUN_TEST(test_temperature_sensor_connection);
}

void loop() {
    RUN_TEST(test_temperature_reading);
    RUN_TEST(test_temperature_difference);
    UNITY_END();  // stop unit testing
}
