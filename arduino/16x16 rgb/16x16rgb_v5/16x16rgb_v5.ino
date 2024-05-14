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

// RTC DS1302 --------------------------------------------------------------------------
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
  matrix.Color(222, 148, 74)  // 8 marrón
  };

const uint8_t PROGMEM pacman[3][132] = {
  {
    0,0,0,3,2,2,2,3,0,0,0,0,
    0,0,2,2,2,2,2,2,2,0,0,0,
    0,2,2,2,2,2,2,2,0,0,0,0,
    3,2,2,2,2,2,2,0,0,0,0,0,
    2,2,2,2,2,2,0,0,0,0,0,0,
    2,2,2,2,2,0,0,0,0,0,0,0,
    2,2,2,2,2,2,0,0,0,0,0,0,
    3,2,2,2,2,2,2,0,0,0,0,0,
    0,2,2,2,2,2,2,2,0,0,0,0,
    0,0,2,2,2,2,2,2,2,0,0,0,
    0,0,0,3,2,2,2,3,0,0,0,0
  },
  {
    0,0,0,3,2,2,2,3,0,0,0,0,
    0,0,2,2,2,2,2,2,2,0,0,0,
    0,2,2,2,2,2,2,2,2,2,0,0,
    3,2,2,2,2,2,2,2,2,2,3,0,
    2,2,2,2,2,2,2,3,0,0,0,0,
    2,2,2,2,2,0,0,0,0,0,0,0,
    2,2,2,2,2,2,2,3,0,0,0,0,
    3,2,2,2,2,2,2,2,2,2,3,0,
    0,2,2,2,2,2,2,2,2,2,0,0,
    0,0,2,2,2,2,2,2,2,0,0,0,
    0,0,0,3,2,2,2,3,0,0,0,0
  },
  {
    0,0,0,3,2,2,2,3,0,0,0,0,
    0,0,2,2,2,2,2,2,2,0,0,0,
    0,2,2,2,2,2,2,2,2,2,0,0,
    3,2,2,2,2,2,2,2,2,2,3,0,
    2,2,2,2,2,2,2,2,2,2,2,0,
    2,2,2,2,2,2,2,2,2,2,2,0,
    2,2,2,2,2,2,2,2,2,2,2,0,
    3,2,2,2,2,2,2,2,2,2,3,0,
    0,2,2,2,2,2,2,2,2,2,0,0,
    0,0,2,2,2,2,2,2,2,0,0,0,
    0,0,0,3,2,2,2,3,0,0,0,0
  }
};

const static uint8_t fantasma[2][132] = {
  {
    0,0,0,0,4,4,4,0,0,0,0,0,
    0,0,4,4,4,4,4,4,4,0,0,0,
    0,4,4,4,4,4,4,4,4,4,0,0,
    0,4,4,1,1,1,4,1,1,1,0,0,
    4,4,4,1,1,5,4,1,1,5,4,0,
    4,4,4,1,1,1,4,1,1,1,4,0,
    4,4,4,4,4,4,4,4,4,4,4,0,
    4,4,4,4,4,4,4,4,4,4,4,0,
    4,4,4,4,4,4,4,4,4,4,4,0,
    4,4,4,4,4,4,4,4,4,4,4,0,
    4,4,0,0,4,4,4,0,0,4,4,0
    },
  {
    0,0,0,0,4,4,4,0,0,0,0,0,
    0,0,4,4,4,4,4,4,4,0,0,0,
    0,4,4,4,4,4,4,4,4,4,0,0,
    0,4,4,1,1,1,4,1,1,1,0,0,
    4,4,4,1,1,5,4,1,1,5,4,0,
    4,4,4,1,1,1,4,1,1,1,4,0,
    4,4,4,4,4,4,4,4,4,4,4,0,
    4,4,4,4,4,4,4,4,4,4,4,0,
    4,4,4,4,4,4,4,4,4,4,4,0,
    4,4,4,4,4,4,4,4,4,4,4,0,
    4,0,0,4,4,0,4,4,0,0,4,0
    }
};

uint8_t cereza[132] = {
  0,0,0,0,0,0,0,0,0,0,8,8,
  0,0,0,0,0,0,0,0,8,8,8,8,
  0,0,0,0,0,0,8,8,0,8,0,0,
  0,0,0,0,0,8,0,0,0,8,0,0,
  0,0,4,4,8,0,0,0,8,0,0,0,
  0,4,4,4,8,4,0,0,8,0,0,0,
  0,4,4,4,4,4,0,4,8,4,0,0,
  0,4,1,4,4,0,4,4,8,4,4,0,
  0,0,4,4,4,0,4,4,4,4,4,0,
  0,0,0,0,0,0,4,1,4,4,4,0,
  0,0,0,0,0,0,0,4,4,4,0,0
};

uint8_t fase = 0;
uint16_t frame = 0;
uint16_t fps = 1000/10;

uint8_t modo = 1; // 0 - Reloj | 1 - Pac-Man

void setup() {
//  Serial.begin(9600);
  // Inicialización de la matriz de LEDs
  matrix.begin();
  matrix.setBrightness(40);
  matrix.setTextColor(colores[7]);
  matrix.setTextSize(0);
  matrix.setTextWrap(false);

  // Inicialización del reloj en tiempo real
  // Creo que solo necesito inicializar el reloj porque se ajustará mediante botones
  Serial.begin(57600);

    Serial.print("compiled: ");
    Serial.print(__DATE__);
    Serial.println(__TIME__);

    Rtc.Begin();

    RtcDateTime compiled = RtcDateTime(__DATE__, __TIME__);
    // printDateTime(compiled);
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
}

void loop() {
  switch (modo) {
    case 0: // Reloj
      reloj();
      break;
    case 1: // Pacman
      aniPacMan();
      break;
  }
  
}

void reloj() {
  matrix.clear();
  
    RtcDateTime now = Rtc.GetDateTime();

    //printDateTime(now);
    //Serial.println();
    matrix.setCursor(2, 1);
      matrix.print(F("23\n54"));

//    if (!now.IsValid())
//    {
//        // Common Causes:
//        //    1) the battery on the device is low or even missing and the power line was disconnected
//        Serial.println("RTC lost confidence in the DateTime!");
//    }

  matrix.show();
    delay(100); // ten seconds
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
        matrix.drawPixel(j,i,colores[cereza[(i-2)*12+(16-cerPos+j)]]);
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
        matrix.drawPixel(j,i,colores[fantasma[frame%2][(i-2)*12+(16-fanPos+j)]]);
      }
    }
  }
}

void pacmanAni() {
  int pacPos = frame%32;
  for (uint8_t i=2; i<=12; i++) {
    for (uint8_t j=0; j<=15; j++) {
      if ((16-pacPos+j >=0) && (16-pacPos+j) <=11) {
        if (pacman[frame%3][(i-2)*12+(16-pacPos+j)] != 0) {
        matrix.drawPixel(j,i,colores[pacman[frame%3][(i-2)*12+(16-pacPos+j)]]);
        }
      }
    }
  }
}
