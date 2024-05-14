#include <Adafruit_NeoMatrix.h>
#ifndef PSTR
 #define PSTR
#endif

#define PIN 6

Adafruit_NeoMatrix matrix = Adafruit_NeoMatrix(16, 16, PIN,
  NEO_MATRIX_TOP     + NEO_MATRIX_LEFT +
  NEO_MATRIX_COLUMNS + NEO_MATRIX_ZIGZAG,
  NEO_GRB            + NEO_KHZ800);

const uint16_t colors[] = {
  matrix.Color(255, 0, 0), matrix.Color(0, 255, 0), matrix.Color(0, 0, 255) };
const uint16_t delayTime = 2000;

void setup() {
  matrix.begin();
  matrix.setBrightness(40);
}

void loop() {
  for (uint8_t i = 0; i<3; i++) {
    matrix.fillScreen(colors[i]);
    matrix.show();
    delay(delayTime);
  }
}
