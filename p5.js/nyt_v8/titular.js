class Titular {
  constructor(_titular, _fuente) {
    this.x = mouseX;
    this.y = mouseY;
    this.rot = 0;
    this.vel = TAU / 120;
    this.titular = _titular + ' · ';
    this.fuente = _fuente;
    this.fs = fuentePx / 2;
    this.largo = this.fuente.textBounds(this.titular, 0, 0, this.fs).w;
    this.r = this.largo / TAU;
    //this.update();
    //this.dibujar();
  }
  
  setFuente (_fuente) {
    this.fuente = _fuente;
  }
  
  setTitular(_titular) {
    this.titular = _titular  + ' · ';
  }

  update() {
    this.fs = fuentePx / 2;
    this.x = mouseX;
    this.y = mouseY;
    this.largo = this.fuente.textBounds(this.titular, 0, 0, this.fs).w;
    this.r = this.largo / TAU;
    this.rot -= this.vel
  }

  dibujar() {
    this.fs = fuentePx / 2;
    let arco = 0;
    push();
    translate(this.x, this.y);
    stroke('#ffffffCC');
    strokeWeight(22);
    noFill();
    textAlign(LEFT,BOTTOM)
    circle(0, 0, this.r * 2 + this.fs);
    for (let i = 0; i < this.titular.length; i++) {
      push();
      rotate(this.rot + arco/this.r)
      translate(this.r, 0);
      rotate(HALF_PI)
      fill(0);
      noStroke();
      textFont(this.fuente);
      textSize(this.fs);
      text(this.titular.substring(i, i + 1), 0, 0)
      arco = this.fuente.textBounds(this.titular.substring(0, i + 1), 0, 0, this.fs).w
      pop();
    }
    pop();
  }
}