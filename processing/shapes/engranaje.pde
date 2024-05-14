void engranaje (float x, float y, float radA, float radB, float dientes) {
  float alfa = TAU / dientes;
  float fondo = (alfa * radB) / 3;
  float cabeza = fondo;
  float offset = (alfa * radA) - cabeza - fondo;
  float alfaCabeza = cabeza / radA;
  float alfaFondo = fondo / radB;
  float alfaOffset = (offset / radA) / 2;
    
  if (dientes > 2) {
    beginShape();
    float theta = TAU / dientes;
    for (int i = 0; i < dientes; i++) {
      float aX = x + sin(theta * i) * radA;
      float aY = y + cos(theta * i) * radA;
      vertex (aX, aY);
      stroke(#FF0000);
      strokeWeight(5);
      point (aX,aY);
      noStroke();
      float bX = x + sin((theta * i) + alfaCabeza) * radA;
      float bY = y + cos((theta * i) + alfaCabeza) * radA;
      vertex (bX, bY);
        stroke(#00FF00);
      strokeWeight(5);
      point (bX,bY);
      noStroke();
      float cX = x + sin((theta * i) + alfaCabeza + alfaOffset) * radB;
      float cY = y + cos((theta * i) + alfaCabeza + alfaOffset) * radB;
      vertex (cX, cY);
      float dX = x + sin((theta * i) + alfaCabeza + alfaOffset + alfaFondo) * radB;
      float dY = y + cos((theta * i) + alfaCabeza + alfaOffset + alfaFondo) * radB;
      vertex (dX, dY);
    }
    endShape(CLOSE);
  }
}
