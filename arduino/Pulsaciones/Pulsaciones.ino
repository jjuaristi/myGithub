const PROGMEM uint8_t encoder_SW  = 3;

/* variables lobales */
bool estado_SW;

void setup() {
  pinMode (encoder_SW, INPUT_PULLUP);
  estado_SW = digitalRead(encoder_SW);
  attachInterrupt(digitalPinToInterrupt(encoder_SW), pulsador, CHANGE);

  Serial.begin (9600);
  
}

void loop() {
  Serial.println("Listo");
  Serial.println(estado_SW);
  delay(3000);

}

void pulsador() {
  Serial.println("click");
}
