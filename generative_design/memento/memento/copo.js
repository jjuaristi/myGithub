/*
  Declaración de propiedades
  
- Contenedor del copo en modo gráfico
  cpGraphic

- Parametros de las partículas que componen el copo
  part:   // Partícula viajera
  parts:  // Array con las partículas adicionadas
  rPart:  // Rádio de la partícula si fuese una circunferencia

- Parametros del copo
  cpBranchs: // Lo normal son 6 pero podemos crear copos de cualquier número de ramas
  cpRadius:  // Radio del copo

- Variables auxiliares
  theta:        // Ángulo entre ramas
  thetaPos:     // Angulo del vector de la partícula
  distToCenter: // Distancia al centro de la partícula
  memento:      // Objeto con el recuerdo asociado

*/

class Copo {
  constructor(_branchs, _radius, _memento) {
    // Inicializamos el número de ramas y el radio
    this.cpBranchs = _branchs;
    this.cpRadius = _radius;
    this.cpMemento = _memento;
    this.cpGraphic = createGraphics(_radius * 2, _radius * 2);

    this.rPart = this.cpRadius / 50; // <<<<<<< radio de la partícula
    this.theta = TAU / this.cpBranchs; // Ángulo entre ramas

    // Inicializamos el array de partículas
    this.parts = [];

    // Invocamos la generación
    this.genCopo();
  }

  /*
------------------------------------------------------------
   Procedimiento generador del copo
------------------------------------------------------------

------------------------------------------------------------
*/
  genCopo() {
    // Preparación de la sección del núcleo del copo
    // Semilla generada con la fecha
    randomSeed(this.cpMemento.seedA);
    // Longitud de la sección sobre el rádio
    let sectionOneLength = (this.cpRadius / 6) * 3;
    // Determinación del número de partículas viajeras para esta sección
    let tempDate = new Date(this.cpMemento.date);
    let particleCount =
      tempDate.getDate() * (tempDate.getDay() + 1) * (tempDate.getMonth() + 1);
    particleCount = int(map(particleCount, 1, 2604, 250, 300));
    // Invocación a la generación de la sección
    this.doSection(sectionOneLength, particleCount, 13);

    // Preparación de la sección media del copo
    // Semilla generada con el nombre
    randomSeed(this.cpMemento.seedB);
    // Longitud de la sección sobre el rádio
    let sectionTwoLength = (this.cpRadius / 6) * 5;
    // Determinación del número de partículas viajeras para esta sección
    particleCount = this.cpMemento.name.length * 2;
    // Invocación a la generación de la sección
    this.doSection(sectionTwoLength, particleCount, 5);

    // Preparación de la sección exterior del copo
    // Semilla generada con el recuerdo
    randomSeed(this.cpMemento.seedC);
    // Longitud de la sección sobre el rádio
    let sectionThreeLength = (this.cpRadius / 6) * 6;
    // Determinación del número de partículas viajeras para esta sección
    particleCount = this.cpMemento.memento.length / 35;
    // Invocación a la generación de la sección
    this.doSection(sectionThreeLength, particleCount, 1);

    //this.eje(); <<< Lo dejamos por si volvemos a usarlo

    // Invocación a la generación del objeto gráfico
    this.doGraphics();
  }

  // Función interna para generar las secciones.
  doSection(sectionLength, particleCount, step) {
    // copiamos el número de partículas que emplearemos
    let particleTotal = particleCount;

    do {
      // Posición inicial de la partícula
      this.thetaPos = 0;
      this.distToCenter = sectionLength;
      // A medida que lanzamos partículas las lanzamos desde más cerca del centro
      this.part = createVector(
        map(particleCount, 0, particleTotal, this.distToCenter, 1),
        this.thetaPos
      );

      do {
        // movemos la partícula un paso en su viaje
        this.part.x -= this.rPart;
        this.part.y += randomGaussian() * step;

        // Para evitar que supere la bisectriz lo constreñimos a ella
        this.thetaPos = this.part.heading();
        this.thetaPos = constrain(
          this.thetaPos,
          -this.theta / 2,
          this.theta / 2
        );

        // Creamos un nuevo vector para la nueva posición de la partícula
        this.magnitude = this.part.mag();
        this.part = p5.Vector.fromAngle(this.thetaPos);
        this.part.setMag(this.magnitude);

        // Seguimos hasta que la partícula llegue al final de su viaje
      } while (!this.finParticula());

      // Añadimos la partícula
      if (this.part.y > this.rPart / 4) this.parts.push(this.part);

      // Descontamos una partícula y seguimos hasta completar la cuenta regresiva
      particleCount--;
    } while (particleCount > 0);
  }

  /*
------------------------------------------------------------
  eje() <<< NO LA USAMOS POR EL MOMENTO
------------------------------------------------------------
  Dibuja el eje central de la rama
------------------------------------------------------------
*/
  eje() {
    let x = this.distToCenter;
    do {
      this.eje = createVector(x, 0);
      x -= this.rPart;
      this.parts.push(this.eje);
    } while (x > 0);
  }

  /*
------------------------------------------------------------
  doGraphics()
------------------------------------------------------------
  Dibuja el copo en el objeto cpGraphic
------------------------------------------------------------
*/
  doGraphics() {
    for (let i = 0; i < TAU; i += this.theta) {
      this.cpGraphic.push();
      this.cpGraphic.translate(
        this.cpGraphic.width / 2,
        this.cpGraphic.height / 2
      );
      this.cpGraphic.rotate(i);
      let cpColor = color("#ffffff");
      cpColor.setAlpha(64);
      this.cpGraphic.fill(cpColor);
      this.cpGraphic.noStroke();
      for (let p in this.parts)
        this.poligono(
          this.parts[p].x,
          this.parts[p].y,
          this.cpBranchs,
          this.rPart
        );
      for (let p in this.parts)
        this.poligono(
          this.parts[p].x,
          -this.parts[p].y,
          this.cpBranchs,
          this.rPart
        );
      this.cpGraphic.pop();
    }
  }

  /*
------------------------------------------------------------
  poligono()
------------------------------------------------------------
  Dibuja un poligono de nLados y xRadio en las coordenadas dadas
------------------------------------------------------------
*/
  poligono(xPos, yPos, lados, radio) {
    this.cpGraphic.push();
    this.cpGraphic.translate(xPos, yPos);
    this.cpGraphic.beginShape();
    for (let i = 0; i < lados; i++) {
      let theta = (TAU / lados) * i;
      let x = cos(theta) * radio;
      let y = sin(theta) * radio;
      this.cpGraphic.vertex(x, y);
    }
    this.cpGraphic.endShape(CLOSE);
    this.cpGraphic.pop();
  }


  /*
------------------------------------------------------------
  finParticula()
------------------------------------------------------------
  Función booleana que comprueba si una partícula ha llegado
  al centro o ha colisionado
------------------------------------------------------------
*/
  finParticula() {
    return this.colision() || this.centro();
  }

  /*
------------------------------------------------------------
  colision()
------------------------------------------------------------
  Función booleana que comprueba si una partícula ha
  colisionado con otra
------------------------------------------------------------
*/
  colision() {
    // Aquí hacemos un poco de trampas para solapar las partículas
    // La distancia de colisión sería de 2 veces el radio de la 
    // partícula, pero lo reducimos a 1.75
    for (let i = 0; i < this.parts.length; i++) {
      if (
        dist(this.parts[i].x, this.parts[i].y, this.part.x, this.part.y) <
        this.rPart * 1.75
      ) {
        return true;
      }
    }
    return false;
  }

  /*
------------------------------------------------------------
  centro()
------------------------------------------------------------
  Simple: Si está mas cerca del 0 que su radio, ha llegado
  al centro
------------------------------------------------------------
*/
  centro() {
    return this.part.x <= this.rPart;
  }

  /*
------------------------------------------------------------
  a2x()
------------------------------------------------------------
  Dado un ángulo en radianes y un radio obtenemos 
  la coordenada X
------------------------------------------------------------
*/
  a2x(a, r) {
    return cos(a) * r;
  }

  /*
------------------------------------------------------------
  a2y()
------------------------------------------------------------
  Dado un ángulo en radianes y un radio obtenemos 
  la coordenada Y
------------------------------------------------------------
*/
  a2y(a, r) {
    return sin(a) * r;
  }
}

  /*
------------------------------------------------------------
  showMemento()
------------------------------------------------------------
  Método para mostar un recuerdo en pantalla
------------------------------------------------------------
*/
function showMemento() {
  
  // Solo si está activada la visualización
  if (showMementoFlag) {
    
    // Ventana
    strokeWeight(1);
    let rectColor = color(mainColor);
    stroke(rectColor);
    rectColor.setAlpha(64);
    fill(rectColor);
    rectMode(CORNER);
    rect(562, 184, 290, 400);

    // Datos
    // Seleccionamos el canvas del DOM y obtenemos su posición...
    let myCanvas = document.querySelector("canvas");
    let box = myCanvas.getBoundingClientRect();
    // ...para ubicar el div que recibirá el recuerdo
    divContent.position(box.left + 562, box.top + 184);
    
    // Parsemaos la fecha
    let month = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    let memento = mementos[showMementoID];
    let mementoDate = new Date(memento.date);
    let dateString =
      mementoDate.getDate() +
      " de " +
      month[mementoDate.getMonth()] +
      " de " +
      mementoDate.getFullYear();
    
    // Creamos el contenido HTML con la fecha, el nombre y el recuerdo
    let mementoString =
      "<p>" +
      dateString +
      "</p><p><span>" +
      memento.name +
      "</span></p><p>" +
      memento.memento +
      "</p>";

    // Lo introducimos en el contenedor
    document.getElementById("myDiv").innerHTML = mementoString;
    // y lo mostramos
    divContent.show();

    // Por último mostramos el gráfico con el copo
    imageMode(CENTER);
    push();
    translate(310, height / 2);
    rotate(PI / 6);
    image(snowFlake.cpGraphic, 0, 0);
    pop();
    randomSeed();

  }
}
