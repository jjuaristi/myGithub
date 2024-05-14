int pausa=512;
void setup() {
  // put your setup code here, to run once:
pinMode (2, OUTPUT);
}

void loop() {
 digitalWrite(2,HIGH);
delay (analogRead(0));
 digitalWrite(2,LOW);
delay (analogRead(0));

}
