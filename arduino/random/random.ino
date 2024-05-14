// Variables globales
int leds[3] = {7, 8, 9};
int selLed = 0;
int vel = 1;
int retardo = 500;
bool cambiar = false;

void setup() {
  pinMode(7, OUTPUT);
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
  
  pinMode(2, INPUT);
}

void loop() {
 if(digitalRead(2)){
    cambiar = !cambiar; 
  }
  
  if(cambiar) {
    // Seleccionamos un número al azar
    selLed = random(0,3);
    cambiar = !cambiar;
    
    // Fase de suspense y resultado
    for(int i = 0; i < selLed + 80; i++) {
      digitalWrite(leds[selLed], LOW);
      delay(25);
      if(selLed == 2 || selLed == 0) {
        vel = -vel;
      }
      selLed = selLed + vel;
      digitalWrite(leds[selLed], HIGH);
      delay(25);
    }
  }
}
