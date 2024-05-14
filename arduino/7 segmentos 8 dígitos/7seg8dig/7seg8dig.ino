const int pinDATA = 2;
const int pinCLOCK = 4;
const int pinLATCH = 3;
const int numeroDigitos = 4;
const int pinDigito[numeroDigitos] = {5,6,7,8};

const byte ascii[] = {
  0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, // 0-9
  0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, // 10-19
  0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, // 20-29
  0x0, 0x0, 0b00000000, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, // 30-39
  0x0, 0x0, 0x0, 0x0, 0x0, // 40-44
  0b00000010, // 45 - -
  0b00000001, // 46 - .
  0x0, // 47
  0b11111100, // 48 - 0
  0b01100000, // 49 - 1
  0b11011010, // 50 - 2
  0b11110010, // 51 - 3
  0b01100110, // 52 - 4
  0b10110110, // 53 - 5
  0b00111110, // 54 - 6
  0b11100000, // 55 - 7
  0b11111110, // 56 - 8
  0b11100110, // 57 - 9
  0x0, 0x0, // 58-59
  0x0, 0x0, 0x0, 0x0, 0x0, // 60-64
  0b11101110, // 65 - A
  0b11111110, // 66 - B
  0b10011100, // 67 - C
  0x0, // 68
  0b10011110, // 69 - E
  0b10001110, // 70 - F
  0x0, // 71
  0b01101110, // 72 - H
  0b00001100, // 73 - I 
  0x0, 0x0, // 74-76
  0b00011100, // 77 - L
  0x0, // 78
  0b11101100, // 79 - N
  0b11111100, // 79 - O 
  0b11001110, // 80 - P
  0x0, 0x0,
  0b10110110, // 83 - S
  0x0, 0x0, 0x0, 0x0, 0x0, 0x0, // 84-89
  0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, // 90-96
  0b11111010, // 97 - a
  0b00111110, // 98 - b
  0b00011010, // 99 - c 
};

String texto = "HOLA PAPAEn";

void setup()
{
  Serial.begin(9600);          // Iniciamos el monitor en serie 
  for(int i=2; i<=8; i++) {    // inicializamos los pines
     pinMode(i, OUTPUT);
  }
  
}

//*************************************************************************
//*************************************************************************
void loop()
{
escribir (texto, 250);
}

//----------------------------------------------------------------------------------
// Función para escribir en pantalla
//----------------------------------------------------------------------------------
void escribir (String t, int vel) {
  String marquesina = "    "+t+"....";
  int ini=0;
  int fin=marquesina.length()-1;
  int tiempo = millis();
  
  for (int j= ini; j<=fin; j++) {
    do {
      for (int i=0; i<=3; i++) {
        mostrar (ascii[int(marquesina[j+i])], i);
      }
    } while (millis() < tiempo + vel);
    tiempo = millis();
  }
}

//----------------------------------------------------------------------------------
// Volcamos el byte recibido para presentar un simbolo
// en el display de 7 segmentos seleccionado
//----------------------------------------------------------------------------------
void mostrar (int dato, int digito) {
  // Ponemos todos los pines comunes de los dígitos en HIGH(deseleccionados) 
   for (int i=0; i<=3; i++) {
     digitalWrite (pinDigito[i], HIGH);
    };
    
  // Ponemos en LOW el que vamos a usar
  digitalWrite (pinDigito[digito], LOW);
  
  // volcamos el dato através del registro de desplazamiento
  digitalWrite (pinLATCH, HIGH);
  shiftOut(pinDATA, pinCLOCK, LSBFIRST, dato);
  digitalWrite (pinLATCH, LOW);
  digitalWrite (pinLATCH, HIGH);
  delay(4);
}

// Efecto updown 
void updown () {
  byte n[4] = {
    0b10000000,
    0b00000010,
    0b00010000,
    0b00000010};
  for (int i=0; i<4; i++) {
    mostrar (n[i], 1);
    delay(1000);
  }
}

// Efecto girar
void giro () {
  byte n = 0b10000000;
  for (int i=0; i<=5; i++) {
    mostrar (n, 1);
    delay(100);
    n >>= 1;
  }
}
