void poligono (float x, float y, float radius, float sides) {
  if (sides > 2) {
    beginShape();
    float theta = TAU / sides;
    for (int i = 0; i < sides; i++) {
      float vX = x + sin(theta * i) * radius;
      float vY = y + cos(theta * i) * radius;
      vertex (vX, vY);
    }
    endShape(CLOSE);
  }
}
