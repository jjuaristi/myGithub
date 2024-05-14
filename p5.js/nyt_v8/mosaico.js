class MosaicoTexto {
  constructor(_texto, _imagen, _fuente, _fuentePx, _densidad) {
    this.texto = _texto.split('');
    this.imagen = this.ajustarImagen(_imagen);
    this.fuente = _fuente;
    this.fuentePx = _fuentePx;
    this.densidad = _densidad;
    this.mosaico = [];
    this.update();
  }

  ajustarImagen(_img) {
    let origenW = _img.width;
    let origenH = _img.height;
    let destinoH = canvasWH;
    let destinoW = (canvasWH * origenW) / origenH;
    let exceso = round((max([destinoW, canvasWH]) - min([destinoW, canvasWH])) / 2);
    let iTemp = createImage(canvasWH, canvasWH);
    iTemp.copy(_img, 0, 0, origenW, origenH, -exceso, 0, canvasWH, canvasWH);
    return iTemp;
  }

  setTexto(_texto) {
    this.texto = _texto.split('');
  }

  setImagen(_imagen) {
    this.imagen = this.ajustarImagen(_imagen);
  }

  setFuente(_fuente) {
    this.fuente = _fuente;
  }

  setFontSize(_fuentePx) {
    this.fuentePx = _fuentePx;
  }

  setDensidad(_densidad) {
    this.densidad = _densidad;
  }

  update() {
    // Unos 170 ms
    // Solo se le llama cuando hay que generar un nuevo array
    //console.log(millis(), '++++++ inicio generar')
    // ponemos el array a 0
    this.mosaico = [];

    let imgW = this.imagen.width;
    let imgH = this.imagen.height;

    let fin = false;
    let iTxt = 0;
    let posX = 0;
    let posY = this.fuentePx;
    let fuenteSize = this.fuentePx;
    textFont(this.fuente, this.fuentePx);

    // Generamos el mosaico
    while (!fin) {
      let letra = this.texto[iTxt];
      let letraW = textWidth(letra);
      let pixelX = int(map(posX, 0, width, 0, imgW));
      let pixelY = int(map(posY - fuenteSize / 2, 0, height, 0, imgH));
      let c = color(this.imagen.get(pixelX, pixelY));
      c.setAlpha(200);
      let nuevaLetra = new letraMosaico(
        posX + random(-1, 1),
        posY + random(-1, 1),
        letra,
        c
      );
      this.mosaico.push(nuevaLetra);
      iTxt = iTxt < this.texto.length - 1 ? ++iTxt : 0;
      posX = posX < width ? posX + letraW * this.densidad : 0;
      posY = posX == 0 ? posY + this.fuentePx * this.densidad * 0.75 : posY;
      if (posX == 0) {}
      fin = posY > height ? true : false;
    }
    //console.log(millis(), '------- fin generar')
  }

  dibujar() { // 300/350 ms
    //console.log(millis(), '/////// inicio dibujar')
    textFont(this.fuente, this.fuentePx);
    noStroke();
    for (let i = 0; i < this.mosaico.length; i++) {
      this.mosaico[i].comportamientos()
      this.mosaico[i].update();
      fill(this.mosaico[i].color);
      text(this.mosaico[i].letra, this.mosaico[i].pos.x, this.mosaico[i].pos.y);
    }
    //console.log(millis(), '||||||||| fin dibujar')
  }
}

class letraMosaico {
  constructor(_x, _y, _letra, _color) {
    this.pos = createVector(_x, _y); // Posición actual de la partícula

    //this.pos = createVector(random(width), random(-height));
    //this.pos = createVector(_x, _y).add(p5.Vector.random2D().mult(random(width)))

    this.objetivo = createVector(_x, _y); // Posición fija de la partícula
    this.vel = p5.Vector.random2D();
    this.ace = createVector();
    this.velMax = 12;
    this.fuerMax = 1;
    this.letra = _letra;
    this.color = _color;
  }

  comportamientos() {
    let llegar = this.llegar(this.objetivo);

    let raton = createVector(mouseX, mouseY);
    let pulga = this.pulga(raton);

    llegar.mult(1);
    pulga.mult(5);

    this.aplicarFuerza(pulga);
    this.aplicarFuerza(llegar);
  }

  aplicarFuerza(_f) {
    this.ace.add(_f);
  }

  llegar(_objetivo) {
    let velDeseada = p5.Vector.sub(_objetivo, this.pos);
    let d = velDeseada.mag();
    let velocidad = this.velMax;
    if (d < 50) {
      velocidad = map(d, 0, 50, 0, this.velMax);
    }
    velDeseada.setMag(velocidad);
    let direccion = p5.Vector.sub(velDeseada, this.vel);
    direccion.limit(this.fuerMax);
    return direccion;
  }

  pulga(_objetivo) {
    let velDeseada = p5.Vector.sub(_objetivo, this.pos);
    let d = velDeseada.mag();
    if (d < 50) {
      velDeseada.setMag(this.velMax);
      velDeseada.mult(-0.8);
      let direccion = p5.Vector.sub(velDeseada, this.vel);
      direccion.limit(this.fuerMax);
      return direccion;
    } else {
      return createVector(0, 0);
    }
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.ace);
    this.ace.mult(0);
  }
}