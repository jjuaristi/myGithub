
function setup() {
  // Preparación del lienzo
  createCanvas(1024, 768);
  
  // Carga de recursos
  defaultFont = loadFont("assets/Roboto-Light.ttf", fontLoaded);
  snowFont = loadFont("assets/Montserrat-VariableFont_wght.ttf");
  mementos = loadJSON("assets/mementos.json", mementosLoaded);

  // Div para alojar los datos
  divContent = createDiv();
  divContent.id("myDiv");
  divContent.hide();
}

function draw() {
  background(backgroundColor);
  
  switch (stage) {
    case 0:
      loader();
      // Si todas las banderas están en alto, pasamos a la siguiente fase
      if (mementosLoadedFlag && fontLoadedFlag && introFlag) stage++;
      break;

    case 1:
      // La primera vez que entramos vamos a preparar el array de copos
      if (setupSnowFlag) setupSnow();
      // Que nieve
      letItSnow();
      break;

    case 2:
      // Aquí también nieva pero se muestra un recuerdo
      letItSnow();
      showMemento();
      break;

    case 3:
      /* Aquí iria en un futuro la introducción de datos
         para generar un nuevo copo
      */
      break;
  }
}
