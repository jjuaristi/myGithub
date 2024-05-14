void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
Serial.println("Empezamos---------------------");


}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.println(millis()/1000);
  Serial.print("A");
  Serial.print("B");
  Serial.println("C");
  delay(1000);
}
