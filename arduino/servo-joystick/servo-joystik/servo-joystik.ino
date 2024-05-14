#include <Servo.h>      // incluye libreria de Servo

Servo servo1;     // crea objeto

int PINSERVO = 2;   // pin 2 conectado a señal del servo
int PULSOMIN = 1000;    // pulso minimo en microsegundos
int PULSOMAX = 2000;    // pulso maximo en microsegundos
int VALORPOT;     // variable para almacenar valor leido en entrada A0
int ANGULO;     // valor de angulo a cargar en el servo

int POT = 0;      // potenciometro en entrada analogica A0

void setup()
{
  // Iniciamos el monitor en seerie
  Serial.begin(9600);
  
  servo1.attach(PINSERVO, PULSOMIN, PULSOMAX);  // inicializacion de servo
// las entradas analogicas no requieren inicializacion
}

void loop()
{
  VALORPOT = analogRead(POT);     // lee valor de entrada A0
  Serial.println(VALORPOT);
  ANGULO = map(VALORPOT, 0, 1023, 0, 180);  // con funcion map convierte rango de 0 a 1023
            // a rango de angulo de 0 a 180
  Serial.println(ANGULO);
  servo1.write(ANGULO);       // envia al servo el valor del angulo
  delay(20);          // demora para que el servo llegue a posicion
}
