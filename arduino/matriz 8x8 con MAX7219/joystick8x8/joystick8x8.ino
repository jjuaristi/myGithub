#include <LedControl.h>

LedControl lc = LedControl(11,13,10,1);

int palaUnoX = 0;
int palaUnoY = 3;

int palaDosX = 7;
int palaDosY = 3;

float pelotaX = 4;
float pelotaY = 4;
float pelotaVel = 0.1;
int pelotaDirX, pelotaDirY;


int matriz[64] = {
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0
};

void setup() {
  Serial.begin(9600);
  lc.shutdown(0,false);
  lc.setIntensity(0,4);
  lc.clearDisplay(0);
}

void loop() {
  matriz[int(pelotaX)*8+int(pelotaY)] = 0;
 // pelotaX = (map (analogRead(0), 0, 1023, 0, 80))/10 ;
 // pelotaY = (map (analogRead(1), 0, 1023, 0, 80))/10 ;
  pelotaDirX = map (int(analogRead(0)/100), 0, 10, -1, 1) ;
  pelotaDirY = map (int(analogRead(1)/100), 0, 10, 1, -1) ;
  pelotaX += pelotaVel*pelotaDirX;
  pelotaY += pelotaVel*pelotaDirY;
  if (pelotaX > 7) {
    pelotaX = 0;
  }
    if (pelotaX < 0) {
    pelotaX = 7;
  }
    if (pelotaY > 7) {
    pelotaY = 0;
  }
    if (pelotaY < 0) {
    pelotaY = 7;
  }
  matriz[int(pelotaX)*8+int(pelotaY)] = 1;
  dibujaMatriz();
}

void dibujaMatriz () {
  for(int fila = 0; fila < 8; fila++) {
    for(int columna = 0; columna <8; columna++) {
      lc.setLed(0,fila, columna, matriz[fila*8+columna]);
    }
  }
}
