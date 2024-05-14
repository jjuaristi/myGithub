void poligono (float _x, float _y, float _lados, float _radio) {
  float xPos = _x;
  float yPos = _y;
  float lados = _lados;
  float radio = _radio;
  pushMatrix();
  translate(xPos,yPos);
  beginShape();
  for (int i=0; i < lados; i++) {
    float alpha = TAU/lados*i;
    float x = cos(alpha) * radio;
    float y = sin(alpha) * radio;
    vertex(x, y);
  }
  endShape(CLOSE);
      popMatrix();
}
