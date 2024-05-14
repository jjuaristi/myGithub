int leds [3] = {6,5,3};
bool ledsState [3] = {0, 0, 0};
int pulsadores [3] = {13,12,11};
bool bucle = false;

void setup()
{ 
  for(int i=0;i++;i<3){
    pinMode(leds[i], OUTPUT);
    pinMode(pulsadores[i], INPUT);
  }
}
void loop()
{
  if(digitalRead(pulsadores[0])) {
    bucle = !bucle;
    delay(1000);
  }
 if(bucle) {
 for(int r = 0; r < 255; r += 5) {
  for(int g = 0; g < 255; g += 5) {
    for(int b = 0; b < 255; b += 5) {
      analogWrite(6, r);
      analogWrite(5, g);
      analogWrite(3, b);
    }
  }
 }
 bucle = false;
 analogWrite(6, 0);
      analogWrite(5, 0);
      analogWrite(3, 0);
}
}
