/// 858x525 screen resolution
// 650x488 

Pala palaA, palaB;
Pelota miPelota;
void setup() {
  size(650, 488);
  // Añadimos un resize por un bug en el ajuste inicial de la ventana
  windowResize(650, 488); 
  // Blancoy negro
  noStroke();
  fill(#FFFFFF);
  miPelota = new Pelota (-2);
  palaA = new Pala(0, floor(random(height)));
  palaB = new Pala(1, floor(random(height)));
}
void draw() {
  background (0,50);
  miPelota.draw();
  
  palaA.draw();
  palaB.draw();
  miPelota.update();
  palaA.update(miPelota.pos);
  palaB.update(miPelota.pos);
  red();
}
