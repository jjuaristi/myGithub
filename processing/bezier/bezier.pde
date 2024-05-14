PVector p0, p1, p2, p3;
float delta = 0.01;

void setup() {
  size(1000, 1000);
  p0 = new PVector(0, height/2);
  p1 = new PVector(width/2, 0);
  p2 = new PVector (width/2, height);
  p3 = new PVector (width, height/2);

  colorMode(HSB,360,100,100);
  stroke(255);
  noFill();
}

void draw() {
  background (0);

  if (keyPressed) {
    p2.x = mouseX;
    p2.y = mouseY;
  } else {
    p1.x = mouseX;
    p1.y = mouseY;
  }
  
  beginShape();
  for (float t = 0; t <= 1.00001; t += delta) {
    PVector v = cubic (p0, p1, p2, p3, t);
  stroke(300+10*t,100,100,80);
  strokeWeight(4);
  line(p0.x,p0.y,v.x,v.y);
  line(p3.x,p3.y,v.x,v.y);
    point (v.x, v.y);
  }
  endShape();
} // <<<<<<<<< end draw()

PVector lineal(PVector p0, PVector p1, float t) {
  float x = lerp (p0.x, p1.x, t);
  float y = lerp (p0.y, p1.y, t);

  return new PVector (x, y);
}

PVector quadratic (PVector p0, PVector p1, PVector p2, float t) {
  PVector v1 = lineal(p0, p1, t);
  PVector v2 = lineal(p1, p2, t);
  float x = lerp (v1.x, v2.x, t);
  float y = lerp (v1.y, v2.y, t);

  return new PVector (x, y);
}

PVector cubic(PVector p0, PVector p1, PVector p2, PVector p3, float t) {
  PVector v1 = quadratic (p0, p1, p2, t);
  PVector v2 = quadratic(p1, p2, p3, t);
  float x = lerp (v1.x, v2.x, t);
  float y = lerp (v1.y, v2.y, t);
  strokeWeight(1);

  return new PVector (x, y);
}
