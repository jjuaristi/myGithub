class Sprite {
  PVector pos, vel;
  float spriteSize;

  Sprite (float _spriteSize, float _x, float _y) {
    spriteSize = _spriteSize;
    pos = new PVector(_x,_y);
    vel = new PVector (random(-1,1), random(-1,1));

  }

  void update() {
    pos.add(vel);
    if (pos.x > width/2+spriteSize/2) {
      pos.x = -width /2;
    } else if(pos.x < -width/2-spriteSize/2) {
    pos.x = width/2;
    }
    if(pos.y > height/2+spriteSize/2) {
    pos.y = -height/2;
    } else if(pos.y< -height/2-spriteSize/2) {
    pos.y = height/2;
    }
  }
  
  void setSize (float newSize) {
  spriteSize = newSize;
  }

  void draw(float[] sprite) {
    //update();
    pushMatrix();
    translate(pos.x, pos.y);
    sprite = escalarSprite(sprite, spriteSize);
    beginShape();
    for (int i=0; i < sprite.length; i += 2) {
      vertex(sprite[i], sprite[i+1]);
    }
    endShape(CLOSE);
    popMatrix();
  }

  float[] escalarSprite(float[] sprite, float spriteW) {
    float[] spriteEscalado = new float [sprite.length];

    // Buscamos el maxX y maxY
    // inicializamos el maxX y minX
    float maxX = sprite[0];
    float minX = sprite[0];

    for (int i = 0; i < sprite.length; i += 2) {
      if (sprite[i] > maxX) {
        maxX = sprite[i];
      }
      if (sprite[i] < minX) {
        minX = sprite[i];
      }
    }

    // calulamos el ancho total de la sprite
    float originalW = maxX + abs(minX);
    // y la escala para conseguir el tamaño deseado
    float escala = spriteW / originalW;

    for (int i = 0; i < sprite.length; i ++) {
      spriteEscalado[i] = sprite[i] * escala;
    }

    return spriteEscalado;
  }
}
