
int estado = LOW;

void setup() {
  pinMode(2, INPUT);
  pinMode(3, OUTPUT);
  Serial.begin(9600);
  Serial.print ("hello world");
}

void loop() {
  if (digitalRead(2) == HIGH) {
    estado = !estado;
    digitalWrite(3, estado);
  }
  delay (250);
}
