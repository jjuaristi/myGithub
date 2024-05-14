Copo miCopo;
boolean nuevoCopo = true;

void setup() {
  //size (300, 300, PDF, "copo.pdf");
  size (600, 600);
  background(0);
}

void draw() {

  pushMatrix();
  translate (width/2, height/2);
  if (nuevoCopo) {
    miCopo = new Copo(6, 600, random (1.2, 2));
    nuevoCopo = false;
  }

  if (keyPressed) {
    //saveFrame("cops/copo_####.png");
    background(0);
    nuevoCopo = true;
  }
  popMatrix();
}
