class Copo {
  // Parametros de las partículas que componen el copo
  PVector part;              // Partícula viajera
  ArrayList<PVector> parts;  // Array con las partículas adicionadas
  float rPart;               // Rádio de la partícula si fuese una circunferencia

  // Parametros del copo
  float cpBranchs; // Lo normal son 6 pero podemos crear copos de cualquier número de ramas
  float cpRadius;    // Radio del copo
  float cpCover;   // Cobertura total del copo si se tratase de circunferencias

  // Variables auxiliares
  float alpha;        // Ángulo entre ramas
  float alphaPos;     // ????? ¿Lo necesito? variación
  float distToCenter; // ????? ¿Distancia o rádio? Distancia al centro de la partícula

  // VAriables de cobertura de la superficie
  float cTotal;  // Superficie de la circunferencia que circunscribe al copo
  float cTarget; // Superficie a cubrir calculado a partir del procentaje recibido como parámetro
  float cCount;  // Acumulador de la superficie cubierta
  float cOffset; // Cantidad teórica cubierta con cada partícula adicionada si fuese una circunferencia

  /*
  -------------------------------------------------------------------------------------
   Constructor
   -------------------------------------------------------------------------------------
   */
  Copo (float _branchs, float _radius, float _cover) {

    // Inicializamos el número de ramas, el radio y la cobertura
    cpBranchs = _branchs;
    cpRadius = _radius;
    cpCover = _cover;

    rPart = cpRadius / 50;   // <<<<<<<<<<<<<<<<<<<<<<<< radio de la partícula ¿Añadir parámetro con ratio?
    alpha = TAU / cpBranchs;  // Ángulo entre ramas

    // Inicializamos el array de partículas
    parts = new ArrayList<PVector>();

    // Control de la cobertura
    cTotal = PI * sq(cpRadius); // Superficie total de la circunferencia que circunscribe el copo
    cTarget = cTotal * cpCover; // Superficie a cupbir
    cCount = 0;                 // Puesta a cero del acumulador de superficie cubierta
    cOffset = PI * sq(rPart);   // Superficie de la partícula si fuese una circunferencia

    // Invocamos la generación
    genCopo();
  }

  /*
  -------------------------------------------------------------------------------------
   Procedimiento generador del copo
   -------------------------------------------------------------------------------------
   Creo que debería cambiar el viaje del copo
   En lugar de lanzarlo desde el vértice del eje, lanzarlo desde un punto aleatorio
   de la hipotenusa del triangulo formado por medio ángulo entre ramas
   En ese caso las partículas viajarían con un ángulo de ¿90º? con respecto al eje
   ¿Habría que tener en cuenta este factor a la hora de dibujar la partícula?
   -------------------------------------------------------------------------------------
   */
  void genCopo () {
    do {

      alphaPos = 0; // >>>>>>>>>>>>>> cambiamos a Y >>>>>>>>>>>> Empezar aquí para reconstruir el viaje
      distToCenter = cpRadius;
      part = new PVector(distToCenter, alphaPos);

      do {
        //part.setMag(part.mag()-rPart);
        part.x -= rPart;
        part.y += randomGaussian () * (rPart*2);

        //println(part.x+"--"+part.y);


        alphaPos = part.heading();
        alphaPos = constrain(alphaPos, -alpha/2, alpha/2);
        float magnitude = part.mag();
        part = PVector.fromAngle(alphaPos);
        part.setMag(magnitude);
      } while (!finParticula());

      // Añadimos la partícula
      //  println(part.y+"--"+rPart/4);
      if (part.y > rPart/4) parts.add(part);

      // Comprobamos la cobertura
      cCount += cOffset;

      //  println("To: " + cTotal + " Ta:" + cTarget + " Of: "+ cOffset + " Co:" + cCount);
    } while (!finCopo());
    eje();
    this.show();
    //println (parts.size()*2*cpBranchs);
  }

  /*
  -------------------------------------------------------------------------------------
   eje(()
   -------------------------------------------------------------------------------------
   Dibuja el eje central de la rama
   */
  void eje() {
    float x = distToCenter;
    do {
      PVector eje = new PVector(x, 0);
      x -= rPart;
      parts.add(eje);
    } while (x > 0);
  }

  /*
  -------------------------------------------------------------------------------------
   show(()
   -------------------------------------------------------------------------------------
   Dibuja el copo
   */
  void show() {
    for (float i = 0; i < TAU; i += alpha) {
      pushMatrix();
      rotate (i);
      for (PVector p : parts) poligono (p.x, p.y, cpBranchs, rPart);
      for (PVector p : parts) poligono (p.x, -p.y, cpBranchs, rPart);
      popMatrix();
    }
  }

  boolean finCopo() {
    boolean fin = false;
    if (cCount >= cTarget) fin = true;
    return fin;// || part.x >= cpRadius - rPart;
  }

  boolean finParticula() {
    return colision() || centro();
  }

  boolean colision () {
    for (int i = 0; i < parts.size(); i++) {
      if (dist(parts.get(i).x, parts.get(i).y, part.x, part.y) < rPart*1.75) return true;
    }
    return false;
  }

  boolean centro() {
    return part.x <= rPart;
  }

  float a2x (float a, float r) {
    return cos(a) * r;
  }

  float a2y (float a, float r) {
    return sin(a) * r;
  }
}
