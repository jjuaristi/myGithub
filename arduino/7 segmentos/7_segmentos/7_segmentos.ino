const int pinDATA = 2;
const int pinCLOCK = 4;
const int pinLATCH = 3;

const byte simbolo[10] = {
  0b11111100, // 0
  0b01100000, // 1
  0b11011010, // 2
  0b11110010, // 3
  0b01100110, // 4
  0b10110110, // 5
  0b00111110, // 6
  0b11100000, // 7
  0b11111110, // 8
  0b11100110, // 9
};

void setup()
{
  // Iniciamos el monitor en seerie
  Serial.begin(9600);

  // Pines del 74HC595 (Registro de desplazamiento)
  pinMode(pinDATA, OUTPUT);
  pinMode(pinCLOCK, OUTPUT);
  pinMode(pinLATCH, OUTPUT);
   // Pruebas
  escribir (simbolo[8]);
 

}

void loop()
{
  giro();
}

// Efecto girar
void giro () {
  byte n = 0b10000000;
  for (int i=0; i<=5; i++) {
    escribir (n);
    delay(100);
    n >>= 1;
  }
}

// Volcamos el byte recibido para presentar un simbolo en el display de 7 segmentos
void escribir (int dato) {  
  digitalWrite (pinLATCH, LOW);
  shiftOut(pinDATA, pinCLOCK, LSBFIRST, dato);
  digitalWrite (pinLATCH, HIGH);
  
}
