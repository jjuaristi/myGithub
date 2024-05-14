// Es una versión fallida de engranajes
// Habrá que rehacerla

void asterisco (float x, float y, float radA, float radB, float dientes) {
  if (dientes > 2) {
    beginShape();
    float theta = TAU / dientes;
    for (int i = 0; i < dientes; i++) {
      float aX = x + sin(theta * i) * radA;
      float aY = y + cos(theta * i) * radA;
      vertex (aX, aY);
      float bX = x + sin((theta * i) + theta / 3) * radB;
      float bY = y + cos((theta * i) + theta / 3) * radB;
      vertex (bX, bY);
      float cX = x + sin((theta * i) + theta / 3) * radB;
      float cY = y + cos((theta * i) + theta / 3) * radB;
      vertex (cX, cY);
      float dX = x + sin((theta * i) + (theta / 3) * 2) * radA;
      float dY = y + cos((theta * i) + (theta / 3) * 2) * radA;
      vertex (dX, dY);
    }
    endShape(CLOSE);
  }
}
