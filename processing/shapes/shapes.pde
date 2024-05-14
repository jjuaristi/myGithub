int lados = 16;
float tecla;
void setup() {
  size (1000, 1000);
  tecla = millis();
}

void draw() {
  background(200);
  fill (128);
  noStroke();
  
  //poligono ( width / 2, height/2, 300, lados);
  
  //estrella ( width / 2, height/2, 300, 100, lados);
  
  asterisco ( width / 2, height/2, 300, 200, lados);
  
  
 
  pushMatrix();
  translate(width/2, height/2);
  ejes();
  rotate(TAU/lados);
  ejes();
  popMatrix();

  if (keyPressed && millis() > tecla) {
  lados ++;
  tecla = millis() + 500;
  }

}
