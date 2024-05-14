const PROGMEM uint8_t encoder_DT = 2;
const PROGMEM uint8_t encoder_CLK = 4;
const PROGMEM uint8_t encoder_SW  = 3;

int ANTERIOR = 50;

volatile int POSICION = 50;

/* Variables para el pulsador */
uint32_t cambioPulsadorUltimo = 0;
uint32_t cambioPulsadorActual;
uint16_t pulsacionCorta = 500;
uint16_t pulsacionLarga = 1500;
uint16_t pausaPulsacion;
bool pulsadorHaCambiado = false;

void setup() {
  pinMode (encoder_DT, INPUT);
  pinMode (encoder_CLK, INPUT);
  //pinMode (encoder_SW, INPUT_PULLUP);

  Serial.begin (250000);

  attachInterrupt(digitalPinToInterrupt(encoder_DT), encoder, LOW);
  //attachInterrupt(digitalPinToInterrupt(encoder_SW), pulsador, CHANGE);

  Serial.println("Listo");
}

void loop() {
    if (POSICION != ANTERIOR) {
      Serial.println(POSICION);
      ANTERIOR = POSICION;
    }
  /*if (pulsadorHaCambiado) {
    pulsaciones()
  }*/
}
//void pulsaciones {}

void pulsador() {
  cambioPulsadorActual= millis();
  pulsadorHaCambiado = true;
}

void encoder() {
  static uint32_t ultimaInterrupcion = 0;
  uint32_t tiempoInterrupcion = millis();

  if (tiempoInterrupcion - ultimaInterrupcion > 5) {
    if (digitalRead(encoder_CLK) == HIGH) {
      POSICION ++;
    }
    else {
      POSICION --;
    }  

  POSICION = min(100, max(0, POSICION));

  ultimaInterrupcion = tiempoInterrupcion;
  }
}
