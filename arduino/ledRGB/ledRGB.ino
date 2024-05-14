int leds [3] = {9,7,8};
bool ledsState [3] = {false,false,false};
int pulsadores [3] = {13,12,11};
void setup()
{ 
  for(int i=0;i++;i<3){
    pinMode(leds[i], OUTPUT);
    pinMode(pulsadores[i], INPUT);
  }
}
void loop()
{  
  // Valores para el ROJO
  if(digitalRead(pulsadores[0])){
    ledsState[0] = !ledsState[0];
    digitalWrite(leds[0],ledsState[0]);
    delay(2000);
  }
  
  // Valores para el VERDE
  if(digitalRead(pulsadores[1])){
    ledsState[1] = !ledsState[1];
    digitalWrite(leds[1],ledsState[1]);
    delay(2000);
  }
  
  // Valores para el AZUL
  if(digitalRead(pulsadores[2])){
    ledsState[2] = !ledsState[2];
    digitalWrite(leds[2],ledsState[2]);
    delay(2000);
  }
}
