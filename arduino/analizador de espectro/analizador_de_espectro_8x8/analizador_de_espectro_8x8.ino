/*
   Programa Analizador de Espectro de Audio
   Implementación de biblioteca "arduinoFFT" para el control FFT
   Implementación de matriz de Leds 8x8 con MAX7219
   Pines de conexión:
      CLK pin 11
      CS  pin 10
      DIN pin 12
      ADC pin A0
   Autor: Electgpl
*/

#include "LedControl.h"
#include "arduinoFFT.h"

const uint16_t samples = 16;
uint16_t k = 0;
double vReal[samples];
double vImag[samples];
uint8_t alturas[] = {1,3,7,15,31,63,127,255};

arduinoFFT FFT = arduinoFFT();
LedControl lc = LedControl(12,11,10,1);

void setup(){
   pinMode(A0, INPUT);
//   Serial.begin(9600);
   lc.shutdown(0,false);
   lc.clearDisplay(0);
}

void loop(){
  lc.setIntensity(0,map(analogRead(1),0,1023,0,15));
   for(int i=0; i<samples; i++){
      vReal[i] = analogRead(A0);
      vImag[i] = 0;
   }
//   long sum = 0;
//    for(int i=0; i<100; i++)
//    {
//       sum += analogRead(0);
//    }
//    sum = sum/100;
//   Serial.println(sum);
   
   FFT.Windowing(vReal, samples, FFT_WIN_TYP_RECTANGLE, FFT_FORWARD);
   FFT.Compute(vReal, vImag, samples, FFT_FORWARD);
   FFT.ComplexToMagnitude(vReal, vImag, samples);

   k = (samples/2)-1;

   for(uint16_t j = 0; j < (samples/2); j++){
    lc.setRow(0,k,alturas[map((byte)vReal[j],0,256,0,7)]);

       if(k>0)
          k--;
   }
}
