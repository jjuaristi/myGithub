float sinVal;
int toneVal;
 
 
void setup() {
 
  pinMode(8, OUTPUT);
 
}
 
void loop() {
 
  for (int x=0; x<180; x++) {
 
  // pasamos de grados a radianes
 
  sinVal = (sin(x*(3.1412/180)));
 
  // Generamos el tono, o mejor dicho la frecuencia
 
  toneVal = 2000+(int(sinVal*1000));
 
  tone(8, toneVal,2);
 
 
  }
 
}
