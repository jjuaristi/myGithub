/*
 La red la componen 31 elementos de 4x8 px
 con 30 espacios de 4x8 px
 La pantalla tiene 488 px de altura
 >>> (31 + 30) * 8 = 488
*/
void red() {
  rectMode(CENTER);
  int posX = width/2;
  for (int i = 0; i < 31; i++) {
    rect (posX, i * 16, 4, 8);
  }
}
