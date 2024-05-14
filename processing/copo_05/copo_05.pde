Copo miCopo;
boolean nuevoCopo = true;
float next=0;

void setup() {
  //size (300, 300, PDF, "copo.pdf");
  size (600, 600);
  //fullScreen(2);
  background(0);
  noStroke();
  fill(255);
}

void draw() {

  pushMatrix();
  translate (width/2, height/2);
  if (nuevoCopo) {
    miCopo = new Copo(6, height/2, 0.15);
    nuevoCopo = false;
    next = millis() + 3500;
  }
  if (next > millis()) {
   // background(128, 1);
    //rect(0,0,20,20);
    //println("ALPHA");
  }
  if (next < millis()) {
    //saveFrame("cops/copo_####.png");
    background(0);
    nuevoCopo = true;
  }
  popMatrix();
}
