class Asteroide extends Sprite {
  
  float [][] asteroides = {
  {0,-2,2,-4,4,-2,3,0,4,2,0,4,-4,2,-4,-3,-2,-4},
  {-2,-4,0,-3,2,-4,4,-2,2,-1,4,2,2,4,-1,3,-2,4,-4,2,-3,0,-4,-2},
  {-1,-4,2,-4,4,-1,4,1,2,4,0,4,0,1,-2,4,-4,1,-2,0,-4,-1},
  {-2,-4,1,-4,4,-2,4,-1,1,0,4,2,2,4,1,3,-2,4,-4,1,-4,-2,-1,-2}
  };
  
  float[] talla = {1,0.5,0.25};
  
  float[] asteroide;;
  Asteroide(float _asteroideW, float _x, float _y) {
    super(_asteroideW, _x, _y);
    asteroide = asteroides[floor(random(4))];
    this.setSize(_asteroideW * talla[floor(random(3))]);
    
  }
  void draw() {
    super.update();
    super.draw(asteroide); 
  }
}
