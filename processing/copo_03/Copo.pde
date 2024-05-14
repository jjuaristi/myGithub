class Copo {
  // Parametros de las partículas que componen el copo
  PVector part;
  ArrayList<PVector> parts;
  float rPart;

  // Parametros del copo
  float cpBranchs;
  float cpSize;
  float cpCover;

  // Variables auxiliares
  float alpha; // Ángulo entre ramas
  float alphaPos; // variación
  float distToCenter; // Distancia al centro de la partícula
  float cTotal, cTarget, cCount, cOffset;

  Copo (float _branchs, float _size, float _cover) {
    cpBranchs = _branchs;
    cpSize = _size;
    cpCover = _cover;

    rPart = cpSize / 100; // <<<<<<<<<<<<<<<<<<<<<<<< radio de la partícula
    alpha = TAU / cpBranchs; // Ángulo entre ramas
    println(rPart+":"+alpha);

    parts = new ArrayList<PVector>();

    // Control de la cobertura
    cTotal = sq(PI * cpSize);
    cTarget = cTotal * cpCover;
    cCount = 0;
    cOffset = sq(TAU * rPart); // <<<<<<<<<<<<<< ¿Cuanto cubre una particula

    // Invocar l ageneración
    genCopo();
  }

  void genCopo () {
    do {

      part = new PVector (a2x(alpha, distToCenter), a2y(alpha, distToCenter));
      
      alphaPos = 0;
      //alphaPos = map(parts.size(), 0, cpBranchs * 2000, alpha/2, TAU/60);
      
      distToCenter = cpSize/2;
      
      do {
        part.x = a2x(alphaPos, distToCenter);
        part.y = a2y(alphaPos, distToCenter);
        float delta = TAU/120; // 3 grados
        alphaPos += random(-delta, delta); // <<<<<<<<<<<<<<<<<<<<<<< Delta
        alphaPos = constrain(alphaPos, 0, alpha/2);
        distToCenter = distToCenter - 0.5; // <<<<<<<<<<<<<<<<<<<<<<<< Paso
      } while (!finParticula());

      // Añadimos la partícula
      parts.add(part);

      // Comprobamos la cobertura
      cCount += cOffset;
      //println("To: " + cTotal + " Ta:" + cTarget + " Of: "+ cOffset + " Co:" + cCount);
    } while (!finCopo());
    this.show();
    println (parts.size()*2*cpBranchs);
  }



  void show() {
    fill(255);
    noStroke();

    for (float i = 0; i < TAU; i += alpha) {
      pushMatrix();
      rotate (i);
      for (PVector p : parts) ellipse(p.x, p.y, rPart*2, rPart*2);
      for (PVector p : parts) ellipse(p.x, -p.y, rPart*2, rPart*2);
      popMatrix();
    }
  }

  boolean finCopo() {
    return cCount >= cTarget; // || part.x >= cpSize - rPart;
  }

  boolean finParticula() {
    return colision() || centro();
  }

  boolean colision () {
    for (int i = 0; i < parts.size(); i++) {
      if (dist(parts.get(i).x, parts.get(i).y, part.x, part.y) < rPart*2) return true;
    }
    return false;
  }

  boolean centro() {
    return part.x <= 0;
  }

  float a2x (float a, float r) {
    return cos(a) * r;
  }

  float a2y (float a, float r) {
    return sin(a) * r;
  }
}
