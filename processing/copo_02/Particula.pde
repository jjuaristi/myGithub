class Particula {
  PVector pos;
  float r = 3;
  float theta = PI / 3;
  float alpha;
  float distToCenter;
  float pTotal, pTarget, pCount, pOffset;

  Particula () {
    distToCenter = width/2;
    alpha = 0;
    pos = new PVector (a2x(alpha, distToCenter), a2y(alpha, distToCenter));
    pTotal = width*height;
    pTarget = pTotal * 0.01;
    pCount = 0;
    pOffset = sq(2 * PI * r);
    
  }

  void update() {
    do {
      //alpha += random(-PI/180, PI/180);
      alpha += random(-1,1)*theta/50;
      alpha = constrain(alpha, -theta/2, theta/2);
      distToCenter = distToCenter - 0.5;
      pos.x = a2x(alpha, distToCenter);
      pos.y = a2y(alpha, distToCenter);
    } while (!fin());
    pCount += pOffset;
    println("To: " + pTotal + " Ta:" + pTarget + " Of: "+ pOffset + " Co:" + pCount);
    if (pCount >= pTarget ) {
      println("Se acabó");
      //save("amaia.png");
      do {} while(!keyPressed);
      exit();
    }
  }

  void draw() {
    fill(255);
    noStroke();

    for (float i = 0; i < TAU; i += theta) {
      pushMatrix();
      rotate (i);
      for (Particula p : particulas) ellipse(p.pos.x, p.pos.y, p.r, p.r);
      for (Particula p : particulas) ellipse(p.pos.x, -p.pos.y, p.r, p.r);
      popMatrix();
    }
  }

  boolean fin() {
    return colision() || centro();
  }

  boolean colision () {
    for (int i = 0; i < particulas.size(); i++) {
      if (dist(particulas.get(i).pos.x, particulas.get(i).pos.y, pos.x, pos.y) < r) return true;
    }
    return false;
  }

  boolean centro() {
    return pos.x == 0;
  }

  float a2x (float a, float r) {
    return cos(a) * r;
  }

  float a2y (float a, float r) {
    return sin(a) * r;
  }
}
