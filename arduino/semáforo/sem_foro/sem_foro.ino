int persona_rojo = 9;
int persona_verde = 8;
int coche_rojo = 7;
int coche_ambar = 6;
int coche_verde = 5;

void setup() {
  // put your setup code here, to run once:
pinMode (persona_rojo, OUTPUT);
pinMode (persona_verde, OUTPUT);
pinMode (coche_rojo, OUTPUT);
pinMode (coche_ambar, OUTPUT);
pinMode (coche_verde, OUTPUT);
// Apagamos todos los LED por si alguno está encendido
digitalWrite (coche_rojo, LOW);
digitalWrite (coche_ambar, LOW);
digitalWrite (coche_verde, LOW);
digitalWrite (persona_rojo, LOW);
digitalWrite (persona_verde, LOW);
}

void loop() {
  // primero el semáforo se pone verde
  digitalWrite (coche_verde, HIGH);
  digitalWrite (persona_rojo, HIGH);
  delay (10000);
  digitalWrite (coche_verde, LOW);
  digitalWrite (coche_ambar, HIGH);
  delay (3000);
  digitalWrite (coche_ambar, LOW);
  digitalWrite (coche_rojo, HIGH);
  digitalWrite (persona_rojo, LOW);
  digitalWrite (persona_verde, HIGH);
  delay (5000);
  digitalWrite (persona_verde, LOW);
  delay (500);
  digitalWrite (persona_verde, HIGH);
  delay (500);
  digitalWrite (persona_verde, LOW);
  delay (500);
  digitalWrite (persona_verde, HIGH);
  delay (500);
  digitalWrite (persona_verde, LOW);
  delay (500);
  digitalWrite (persona_verde, HIGH);
  delay (500);
  digitalWrite (persona_verde, LOW);
  delay (500);
  digitalWrite (persona_verde, HIGH);
  delay (500);
  digitalWrite (persona_verde, LOW);
  digitalWrite (coche_rojo, LOW);
}
