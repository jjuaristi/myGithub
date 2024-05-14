#include <LedControl.h>

LedControl lc = LedControl(11,13,10,1);

int palaUnoX = 0;
int palaUnoY = 3;

int palaDosX = 7;
int palaDosY = 3;

float pelotaX = 4;
float pelotaY = 4;
int pelotaVel = 1;
float pelotaDirX;
float pelotaDirY;

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
  randomSeed(analogRead(0));
  pelotaDirX = random(1,11);
  pelotaDirY = random(1,11);
  pelotaDirX /= 10;
  pelotaDirY /= 10;
  Serial.println(pelotaDirX);
  Serial.println(pelotaDirY);
}

void loop() {
  matriz[int(pelotaX)*8+int(pelotaY)] = 0;
  pelotaX += pelotaDirX;
  if(pelotaX > 7) {
    pelotaX = 7;
    pelotaDirX *= -1;
  }
  if(pelotaX < 0) {
    pelotaX = 0;
    pelotaDirX *= -1;
  }
  pelotaY += pelotaDirY;
    if(pelotaY > 7) {
    pelotaY = 7;
    pelotaDirY *= -1;
  }
  if(pelotaY < 0) {
    pelotaY = 0;
    pelotaDirY *= -1;
  }
  matriz[int(pelotaX)*8+int(pelotaY)] = 1;
  dibujaMatriz();
  delay(1000/30);
}

void dibujaMatriz () {
  for(int fila = 0; fila < 8; fila++) {
    for(int columna = 0; columna <8; columna++) {
      lc.setLed(0,fila, columna, matriz[fila*8+columna]);
    }
  }
}
