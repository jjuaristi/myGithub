Particula miParticula;

ArrayList<Particula> particulas;

void setup() {
  size (300, 300);
  miParticula = new Particula();
  particulas = new ArrayList<Particula>();
}

void draw() {
  background(0);
  pushMatrix();
  translate (width/2, height/2);
  miParticula.update();
  miParticula.draw();
  
  if (miParticula.fin()){
    particulas.add(miParticula);
    miParticula = new Particula();
  }

  
  popMatrix();
}
