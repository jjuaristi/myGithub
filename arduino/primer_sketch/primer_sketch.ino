// Variables globales
int leds[3] = {7, 8, 9};
int selLed = 0;
int vel = 1;
bool cambiar = false;

void setup() {
  pinMode(7, OUTPUT);
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
  
  pinMode(2, INPUT);

  digitalWrite(leds[selLed], HIGH);
}

void loop() {
 /*if(digitalRead(2)){
    cambiar = !cambiar; 
  }
  
  if(cambiar) {
    digitalWrite(leds[selLed], LOW);
    cambiar = !cambiar;
    delay(500);
    if(selLed < 2){
      selLed++;
    } else {
      selLed = 0; 
    }
  digitalWrite(leds[selLed], HIGH);
  }
   
 /*if(digitalRead(2)){
    for (int  i=0;i<3;i++){
      digitalWrite(leds[i],HIGH);
      delay(50);
      digitalWrite(leds[i],LOW);  
    }
  }
  */
  digitalWrite(leds[selLed], LOW);
  if(selLed > 2 || selLed < 0) {
    vel = -vel;
  }
  selLed = selLed + vel;
  digitalWrite(leds[selLed], HIGH);
  delay (80);
}
