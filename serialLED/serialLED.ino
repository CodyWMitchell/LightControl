#include <Adafruit_NeoPixel.h>
#define LED_PIN 7

Adafruit_NeoPixel strip(150, LED_PIN, NEO_GRB + NEO_KHZ800);

const byte DATA_MAX_SIZE = 32;
char data[DATA_MAX_SIZE];   // an array to store the received data

void setup() {
  strip.begin();
  strip.show();
  strip.setBrightness(60);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
  String color=Serial.readString();
  
  for (int i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, strip.Color(color.substring(0, 3).toInt(), color.substring(3,6).toInt(), color.substring(6,9).toInt()));
  }
  strip.show();
  }
}
