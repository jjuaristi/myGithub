int led = 8;
int mic = 2;

void setup() {
  Serial.begin(9600);
  pinMode(led, OUTPUT);
  pinMode(mic, INPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
Serial.println(analogRead(mic));
}
