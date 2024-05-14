Nave miNave;
int asteroides = 10;
Asteroide[] miAsteroide = new Asteroide[asteroides];
void settings() {
  size (screenW, screenH);
}

void setup() {
  //En 1979, las pantallas vectoriales de los arcade tenían una resolución efectiva de 1024 x 768
  noFill();
  stroke(#FFFFFF);
  
  miNave = new Nave(nl, 0, 0);
  for(int i=0; i < asteroides; i++) { 
  miAsteroide[i] = new Asteroide(nl*2.5, random(-width/2, width/2), random(-width/2, width/2));
  }
}

void draw () {
  translate(width/2, height/2);
  background(#00000022);


  miNave.draw();
 for(int i=0; i < asteroides; i++) {
  miAsteroide[i].draw();
 }
}
