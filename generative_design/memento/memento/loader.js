/*
  Sección de carga e instrucciones
*/
function loader() {
  // Animación
  let arcDiameter = 50;
  let arcColor = color(mainColor);
  let degrees = radians(frameCount % 360);

  noFill();
  textFont(defaultFont);

  // Mantenemos la animación de carga hasta qu finalice la carga de recursos
  // o al menos 5 segundos
  if (!mementosLoadedFlag || !fontLoadedFlag || millis() < 5000) {
    
    // Animación con arcos
    for (let i = 1; i < 4; i++) {
      arcColor.setAlpha(255 / i);
      stroke(arcColor);
      strokeWeight(4 * i);
      noFill();
      arc(
        width / 2,
        500,
        arcDiameter,
        arcDiameter,
        degrees * 2 * i,
        degrees * 6 * i
      );
      
      // Texto INICIALIZANDO
      textSize(24);
      textAlign(CENTER);
      fill(textColor);
      noStroke();
      text(
        "I N I C I A L I Z A N D O",
        width / 2,
        520 + arcDiameter
      );
    }
  } else {
    // Texto con instrucciones de uso
    textSize(18);
    textAlign(CENTER);
    fill(textColor);
    noStroke();

    text(
      "En la nevada, pulsa y arrastra el ratón para generar viento.\nHaz clic sobre un copo para ver el recuerdo que guarda.",
      width / 2,
      500
    );

    text("[ HAZ CLIC EN LA PANTALLA Y PULSA UNA TECLA PARA COMENZAR ]", width / 2, 570);
    if(isKeyPressed) introFlag = true;
  }

  // Texto introductorio

  textSize(18);
  textAlign(CENTER);
  fill(textColor);
  noStroke();
  text(
    "Al igual que dos copos de nieve que caen en la palma de tu mano no pueden ser iguales por más que iniciaran su viaje juntos, el ser humano juega a controlar su destino y la vida lo sacude con eventos al azar.\n\nCada recuerdo almacenado en las sinapsis de un ser humano es único. Es tan único que dos seres humanos íntimamente relacionados con un suceso guardarán un recuerdo ligera o ampliamente diferente del mismo, pero nunca idéntico.",
    220,
    160,
    584,
    200
  );

  textSize(14);
  text(
    "Mementos v0.1 | Javier Juaristi\nDiseño generativo | Grado en Diseño y Creacion Digitales | UOC",
    width / 2,
    height - 40
  );

  if (millis() > introTime * 1000) introFlag = true;
}

// Callback para la carga del JSON
function mementosLoaded() {
  // Creamos una copia de los recuerdos en forma de array para generar los copos
  copyMementos();

  // Damos por cargados los recuerdos
  mementosLoadedFlag = true;
}

// Función para copiar el JSON en un array
function copyMementos() {
  for (let i in mementos) mementosCopy.push(mementos[i]);
}

// Callbak para la fuente principal
function fontLoaded() {
  fontLoadedFlag = true;
}
