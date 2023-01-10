#include <Arduino.h>
#include <BMI160Gen.h>
#include <unity.h>

const int i2c_addr = 0x68;


void setUp(void) {
    // set stuff up here
    // Initialize the temperature sensor library
    sensors.begin();
    BMI160.begin(BMI160GenClass::I2C_MODE, i2c_addr);
}

void tearDown(void) {
    // clean stuff up here
}

void test_bmi160_sensor_connection(void) {
    // Check that the temperature sensor is present on the OneWire bus
    TEST_ASSERT_EQUAL(1, sensors.getDeviceCount());
}

void test_bmi160_sensor_reading(void) {
    
    int gx, gy, gz;         // raw gyro values

    // read raw gyro measurements from device
    BMI160.readGyro(gx, gy, gz);

    // Check gx, gy and gz values that the gyro is in immobile
    TEST_ASSERT_TRUE((gx > -1000) && (gx < 1000));
    TEST_ASSERT_TRUE((gy > -1000) && (gy < 1000));
    TEST_ASSERT_TRUE((gz > -1000) && (gz < 1000));
}

void setup() {
    UNITY_BEGIN();  // IMPORTANT LINE!
    RUN_TEST(test_bmi160_sensor_connection);
}

void loop() {
    RUN_TEST(test_bmi160_sensor_reading);
    UNITY_END();  // stop unit testing
}
