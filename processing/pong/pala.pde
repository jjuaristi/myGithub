// Pos Y pala izq = 90;
// Pos Y pala der = width - 90 = 660

class Pala {
  int y;
  int x;

  Pala (int _x, int _y) {
    x = _x == 0 ? 90 : 560;
    y = _y;
  }

  void update(PVector p) {
    if(x==90 && p.x < width*0.65) {
      y += y > p.y ? - 3 :  3;
    }
    if(x==560 && p.x > width*0.35) {
      y += y > p.y ? - 3 :  3;
    }
    if (y < 16) {
      y = 16;
    }
    if (y > height - 16) {
      y = height - 16;
    }
    
    
  }
  
  void draw() {
    rectMode(CENTER);
    rect(x, y, 8, 32);
  }
  
  void setY (int _y) {
  y = _y;
  }
}
