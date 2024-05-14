#include "sprites.h"

// Adafruit -----------------------------------------------------------------------------
#include <Adafruit_GFX.h>
#include <Adafruit_NeoMatrix.h>
#include <Adafruit_NeoPixel.h>

#ifndef PSTR
#define PSTR // Make Arduino Due happy
#endif

#define PIN 6

Adafruit_NeoMatrix matrix = Adafruit_NeoMatrix(16, 16, PIN,
  NEO_MATRIX_TOP     + NEO_MATRIX_LEFT +
  NEO_MATRIX_COLUMNS + NEO_MATRIX_ZIGZAG,
  NEO_GRB            + NEO_KHZ800);
// -------------------------------------------------------------------------------------

// DS1302 -----------------------------------------------------------------------------
// CONNECTIONS:
// DS1302 CLK/SCLK --> 5
// DS1302 DAT/IO --> 4
// DS1302 RST/CE --> 2
// DS1302 VCC --> 3.3v - 5v
// DS1302 GND --> GND

#include <ThreeWire.h>  
#include <RtcDS1302.h>

ThreeWire myWire(4,5,2); // IO, SCLK, CE
RtcDS1302<ThreeWire> Rtc(myWire);

// -------------------------------------------------------------------------------------

const uint16_t colores[] = {
  matrix.Color(0, 0, 0),       // 0 negro
  matrix.Color(255, 255, 255), // 1 blanco
  matrix.Color(255, 255, 33),  // 2 amarillo 
  matrix.Color(148, 148, 0),   // 3 amarillo oscuro
  matrix.Color(222, 0, 0),     // 4 rojo
  matrix.Color(33, 33, 255),   // 5 azul oscuro
  matrix.Color(255, 181, 181), // 6 salmón
  matrix.Color(222, 222, 222), // 7 gris
  matrix.Color(222, 148, 74)   // 8 marrón
  };


uint8_t fase = 0;
uint16_t frame = 0;
uint16_t fps = 1000/10;

uint8_t modo = 1; // 0 - Reloj | 1 - Pac-Man | 2 - luz noche
uint8_t modoMax = 2;
uint8_t pinBtModo = 8;

const uint8_t numEstrellas = 60;
int8_t estrellas[numEstrellas][2];
uint8_t maxBrilloEstrellas = 90;
float brilloEstrellas = maxBrilloEstrellas;
uint32_t lastFrame;
bool sube = true;

void setup() {
  //Serial.begin(9600);
  pinMode(pinBtModo, INPUT);

  // Inicialización de la matriz de LEDs
  matrix.begin();
  
  matrix.setTextColor(colores[7]);
  matrix.setTextSize(0);
  matrix.setTextWrap(false);

  // Estrellas
  lastFrame = millis();
  for (uint8_t i = 0; i<numEstrellas; i++) {
    estrellas[i][0] = random(16); // X
    estrellas[i][1] = random(0, 16); // Y
  }

  // Reloj =============================
Serial.begin(57600);

    Serial.print("compiled: ");
    Serial.print(__DATE__);
    Serial.println(__TIME__);

    Rtc.Begin();

    RtcDateTime compiled = RtcDateTime(__DATE__, __TIME__);
    //printDateTime(compiled);
    Serial.println();

    if (!Rtc.IsDateTimeValid()) 
    {
        // Common Causes:
        //    1) first time you ran and the device wasn't running yet
        //    2) the battery on the device is low or even missing

        Serial.println("RTC lost confidence in the DateTime!");
        Rtc.SetDateTime(compiled);
    }

    if (Rtc.GetIsWriteProtected())
    {
        Serial.println("RTC was write protected, enabling writing now");
        Rtc.SetIsWriteProtected(false);
    }

    if (!Rtc.GetIsRunning())
    {
        Serial.println("RTC was not actively running, starting now");
        Rtc.SetIsRunning(true);
    }

    RtcDateTime now = Rtc.GetDateTime();
    if (now < compiled) 
    {
        Serial.println("RTC is older than compile time!  (Updating DateTime)");
        Rtc.SetDateTime(compiled);
    }
    else if (now > compiled) 
    {
        Serial.println("RTC is newer than compile time. (this is expected)");
    }
    else if (now == compiled) 
    {
        Serial.println("RTC is the same as compile time! (not expected but all is fine)");
    }
  
// ===================================================================
 
}

void loop() {
  
  chkBrillo();
  
  chkBotones ();
  
  switch (modo) {
    case 0: // Reloj
      reloj();
      break;
    case 1: // Pacman
      aniPacMan();
      break;
    case 2: // luz noche
      luznoche();
      break;
      
  }
  
}
void chkBrillo () {
  //matrix.setBrightness(map(analogRead(0),0,1023,5,127));
  matrix.setBrightness(50);
}

void chkBotones () {
  if (digitalRead(pinBtModo) == LOW) { // está en pull upp (siempre high)
    while (digitalRead(pinBtModo) == LOW) {
    // Nos quedamos aquí mientras esté pulsado el botón
    };
    modo++;
    modo = modo > modoMax? 0 : modo;
  }
}
void todoBlanco() {
  //matrix.fillRect(0,0,16,16,colores[1]);
}
void luznoche() {
  matrix.clear();
  
  matrix.setBrightness(brilloEstrellas);

  switch (sube) {
    case true:
      if (brilloEstrellas < maxBrilloEstrellas) {
        todoBlanco();
        for(uint8_t i=0; i< numEstrellas; i++) {
          matrix.drawPixel(estrellas[i][0], estrellas[i][1], matrix.Color(0,0, i*5));
        }
      brilloEstrellas+= 0.1;
      } else {
        sube = false;
        brilloEstrellas-=0.1;
      }
      break;
    case false:
      if(brilloEstrellas > 0) {
        todoBlanco();
        for(uint8_t i=0; i< numEstrellas; i++) {
          matrix.drawPixel(estrellas[i][0], estrellas[i][1], matrix.Color(0,0, i*5));
        }
        brilloEstrellas-=0.1;
      } else {
        for(uint8_t i=0; i< numEstrellas; i++) {
          estrellas[i][0] += random(-1,2);
          estrellas[i][1]++;
          if(estrellas[i][0] > 15 || estrellas[i][0] <0 || estrellas[i][1] > 15) {
            estrellas[i][0] = random(16);
            estrellas[i][1] = random(0);
          }
        }
        sube = true;
      }
      break;
  }
  
  matrix.show();
}

void reloj() {
  RtcDateTime now = Rtc.GetDateTime();

    mostrarHora(now);

    if (!now.IsValid())
    {
        // Common Causes:
        //    1) the battery on the device is low or even missing and the power line was disconnected
        Serial.println("RTC lost confidence in the DateTime!");
    }

}

#define countof(a) (sizeof(a) / sizeof(a[0]))

void mostrarHora(const RtcDateTime& dt){
  matrix.clear();

  String hora = String(dt.Hour());
  hora = hora.length()==1? "0"+hora : hora;
  String minuto = String(dt.Minute());
  minuto = minuto.length()==1? "0"+minuto : minuto;


  printNum(hora.substring(0,1).toInt(),2,2);
  printNum(hora.substring(1,2).toInt(),9,2);
  printNum(minuto.substring(0,1).toInt(),2,9);
  printNum(minuto.substring(1,2).toInt(),9,9);

  //centesimas (dt.Second());
  
  segundos (dt.Second());
  
  matrix.show();
}

void segundos(uint8_t s) {
  if (s<16) {
    matrix.drawPixel(s,0,colores[5]);
  } else if (s<31) {
    matrix.drawPixel(15,s-15,colores[5]);
  } else if (s<46) {
    matrix.drawPixel(15-(s-30),15,colores[5]);
  } else {
    matrix.drawPixel(0,60-s,colores[5]);
  }
}

void centesimas(uint8_t ss) {
  double c = millis()%100;
  int s = map(c,0,99,ss-4,ss); 
  if (s<16) {
    matrix.drawPixel(s,0,matrix.Color(0, 0, 127-c/10));
  } else if (s<31) {
    matrix.drawPixel(15,s-15,matrix.Color(0, 0, 127-c/10));
  } else if (s<46) {
    matrix.drawPixel(15-(s-30),15,matrix.Color(0, 0, 127-c/10));
  } else {
    matrix.drawPixel(0,60-s,matrix.Color(0, 0, 127-c/10));
  }
}

void printNum (int c, uint8_t x, uint8_t y) {
  for (uint8_t i=0; i<5; i++) {
    uint8_t fila = pgm_read_byte (&numero[c][i]);
    for (uint8_t j=5; j>0; j--) {
      if(bitRead(fila, 5-j)) {
        matrix.drawPixel(x+j-1,y+i,matrix.Color(90, 90, 90));
      }
    }
  }
}


void aniPacMan() {
  matrix.clear();

  switch (fase) {
    case 0:
      matrix.setCursor(16-frame, 4);
      matrix.print("PAC-MAN  1980 NAMCO    ");
      if (frame == 159) {
        fase = 1;
      }
    break;
    case 1:
      puntos();
      pacmanAni();
      if (frame == 159 + 32) {
        fase = 2;
      }
      break;
     case 2:
      puntos();
      fantasmaAni();
      if (frame == 159 + 32 + 32) {
        fase = 3;
      }
      break;
     case 3:
      puntos();
      cerezaAni();
      if (frame == 159 + 32 + 32 + 32) {
        fase = 3;
      }
      break;
       
  }
  matrix.show();
  delay(fps);
  
  frame++;
   if (frame >= 160+32+32+32) {
    frame = 0;
    fase = 0;
  };

  
}

void puntos() {
  for (int i = 5-frame%6; i <= 15; i+=6) {
    matrix.fillRect(i,7,2,2,colores[6]);
    
  }
}

void cerezaAni() {
  int cerPos = 32 - frame%32;
  for (uint8_t i=2; i<=12; i++) {
    for (uint8_t j=0; j<=15; j++) {
      if ((16-cerPos+j >=0) && (16-cerPos+j) <= 11) {
//        if (cereza[(i-2)*12+(16-cerPos+j)] != 0) {
        matrix.drawPixel(j,i,colores[pgm_read_byte (&cereza[(i-2)*12+(16-cerPos+j)])]);
//        }
      }
    }
  }
}

void fantasmaAni() {
  int fanPos = frame%32;
  for (uint8_t i=2; i<=12; i++) {
    for (uint8_t j=0; j<=15; j++) {
      if ((16-fanPos+j >=0) && (16-fanPos+j) <= 11) {
        matrix.drawPixel(j,i,colores[pgm_read_byte(&fantasma[frame%2][(i-2)*12+(16-fanPos+j)])]);
      }
    }
  }
}

void pacmanAni() {
  int pacPos = frame%32;
  for (uint8_t i=2; i<=12; i++) {
    for (uint8_t j=0; j<=15; j++) {
      if ((16-pacPos+j >=0) && (16-pacPos+j) <=11) {
        if (pgm_read_byte (&pacman[frame%3][(i-2)*12+(16-pacPos+j)]) != 0) {
        matrix.drawPixel(j,i,colores[pgm_read_byte (&pacman[frame%3][(i-2)*12+(16-pacPos+j)])]);
        }
      }
    }
  }
}
