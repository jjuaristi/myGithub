#include <IRremote.h>

int SENSOR = 8;
IRrecv irrecv (SENSOR);
decode_results codigo;

void setup() {
  Serial.begin(9600);
  irrecv.enableIRIn();
}

void loop() {
  if (irrecv.decode(&codigo)) {
    Serial.println(codigo.value, HEX);
    irrecv.resume();
  }
  delay (100);
}
