class Pelota {
  PVector pos;
  PVector vel;
  int size;

  Pelota(float _velX) {
    pos = new PVector (width/2, height/2);
    vel = new PVector (ceil(random(2))* 2, 2);
    size = 8;
  }
  void update() {
    pos.add(vel);
    if(pos.y > palaA.y - 16 && pos.y < palaA.y +16 && pos.x <= 98 && pos.x>= 86) {
      vel.x *= -1;
    }
    if(pos.y > palaB.y - 16 && pos.y < palaB.y +16 && pos.x <= 564 && pos.x>= 552) {
      vel.x *= -1;
    }
    
    if (pos.x > width- size/2) {
      pos.x = width/2;
      vel.x *= -1;
    }
    if (pos.x < size/2) {
      pos.x = width/2;
      vel.x *= -1;
    }
    if (pos.y > height - size/2) {
      pos.y = height - size/2;
      vel.y *= -1;
    }
    if (pos.y < size/2) {
      pos.y = size/2;
      vel.y *= -1;
    }
  }
  void draw() {
    rectMode(CENTER);
    rect(pos.x,pos.y,size,size);
  }
  
}
