void estrella (float x, float y, float radA, float radB, float puntas) {
  if (puntas > 2) {
    beginShape();
    float theta = TAU / puntas;
    for (int i = 0; i < puntas; i++) {
      float aX = x + sin(theta * i) * radA;
      float aY = y + cos(theta * i) * radA;
      vertex (aX, aY);
      float bX = x + sin((theta * i) + theta / 2) * radB;
      float bY = y + cos((theta * i) + theta / 2) * radB;
      vertex (bX, bY);
    }
    endShape(CLOSE);
  }
}
