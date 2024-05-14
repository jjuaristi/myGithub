#include <Adafruit_GFX.h>
#include <Adafruit_NeoMatrix.h>
#include <Adafruit_NeoPixel.h>

#ifndef PSTR
 #define PSTR // Make Arduino Due happy
#endif

#define PIN 6

Adafruit_NeoMatrix matrix = Adafruit_NeoMatrix(16, 16, PIN,
  NEO_MATRIX_TOP     + NEO_MATRIX_LEFT +
  NEO_MATRIX_COLUMNS + NEO_MATRIX_ZIGZAG,
  NEO_GRB            + NEO_KHZ800);

const uint16_t colores[] = {
  matrix.Color(0, 0, 0),       // 0 negro
  matrix.Color(255, 255, 255), // 1 blanco
  matrix.Color(254, 0, 0),     // 2 rojo 
  matrix.Color(254, 203, 146)  // 3 beige
  };


uint16_t champi[] = {
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,1,1,2,2,1,1,0,0,0,0,0,
  0,0,0,1,1,1,2,2,2,2,1,1,1,0,0,0,
  0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,
  0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,
  0,1,2,2,2,2,1,1,1,1,2,2,2,2,1,0,
  0,1,1,2,2,2,1,1,1,1,2,2,2,1,1,0,
  0,1,1,2,2,2,1,1,1,1,2,2,2,1,1,0,
  0,1,2,2,2,2,1,1,1,1,2,2,2,2,1,0,
  0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
  0,2,2,2,0,0,0,0,0,0,0,0,2,2,2,0,
  0,0,0,0,3,3,0,3,3,0,3,3,0,0,0,0,
  0,0,0,3,3,3,0,3,3,0,3,3,3,0,0,0,
  0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0,
  0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
};

int br = 0;
int dir = 1;

void setup() {
  matrix.begin();
}

void loop() {
  matrix.clear();
  matrix.setBrightness(br);  
  dibuChampi();
  if (br==0) { 
    delay(500);
  }
  dir = (dir == 1 && br < 150)? 1 : -1;
  dir = (dir == -1 && br > 0)? -1 : 1;
  br += dir;
  matrix.show();
}

void dibuChampi() {
  for (uint8_t f = 0; f < 16; f++) {
    for (uint8_t c = 0; c < 16; c++) {
      matrix.drawPixel (c, f, colores[champi[f*16+c]]);
    }
  }
}
