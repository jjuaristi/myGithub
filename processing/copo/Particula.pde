class Particula {
  PVector pos;
  float r = 4;
  float theta = PI / 6;
  float alpha;
  float distToCenter;

  boolean fin = false;
  Particula () {
    alpha = random(0, theta);
    distToCenter = width/2;
    pos = new PVector (a2x(alpha, distToCenter), a2y(alpha, distToCenter));
  }

  void update() {
    do {
      alpha += random(-PI/180, PI/180);
      alpha = constrain(alpha, 0, theta);
      distToCenter --;
      pos.x = a2x(alpha, distToCenter);
      pos.y = a2y(alpha, distToCenter);
    } while (!fin());
  }

  void draw() {
    fill(255);
    noStroke();
    pushMatrix();

    for (float i = 0; i < TAU; i += theta) {
      rotate (i);
      for (Particula p : particulas) ellipse(p.pos.x, p.pos.y, p.r, p.r);
      for (Particula p : particulas) ellipse(p.pos.x, -p.pos.y, p.r, p.r);
    }
    popMatrix();
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
