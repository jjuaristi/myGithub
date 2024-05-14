class Nave extends Sprite {
  float [] nave = {-40, 32, 56, 0, -40, -32, -24, -16, -24, 16};

  Nave(float _naveW, float _x, float _y) {
    super(_naveW, _x, _y);
  }
  void draw() {
    super.draw(nave); 
  }
}
