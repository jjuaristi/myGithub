Copo miCopo;
boolean nuevoCopo = true;
float next=0;

void setup() {
  //size (300, 300, PDF, "copo.pdf");
  //size (800, 800);
  fullScreen(2);
  background(0);
}

void draw() {

  pushMatrix();
  translate (width/2, height/2);
  if (nuevoCopo) {
    miCopo = new Copo(floor(random(9)), height*.6, random (1.2, 2));
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
