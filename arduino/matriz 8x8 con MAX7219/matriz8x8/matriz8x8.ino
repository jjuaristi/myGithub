#include <LedControl.h>

LedControl lc = LedControl(11,13,10,1);

boolean invaderA[64] = {
  0, 0, 1, 0, 0, 1, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0,
  0, 0, 1, 1, 1, 1, 0, 0,
  0, 1, 0, 1, 1, 0, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 0, 0, 1, 0, 1,
  0, 0, 0, 1, 1, 0, 0, 0
  };

boolean invaderB[64] = {
  0, 0, 1, 0, 0, 1, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0,
  1, 0, 1, 1, 1, 1, 0, 1,
  1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1,
  0, 0, 1, 1, 1, 1, 0, 0,
  0, 0, 1, 0, 0, 1, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0
  };

void setup() {
  lc.shutdown(0,false);
  lc.setIntensity(0,4);
  lc.clearDisplay(0);
}

void loop() {
  for(int fila = 0; fila < 8; fila++) {
    for(int columna = 0; columna <8; columna++) {
      lc.setLed(0,fila, columna, invaderA[fila*8+columna]);
    }
  }
  delay(200);

    for(int fila = 0; fila < 8; fila++) {
    for(int columna = 0; columna <8; columna++) {
      lc.setLed(0,fila, columna, invaderB[fila*8+columna]);
    }
  }
    delay(200);

}
