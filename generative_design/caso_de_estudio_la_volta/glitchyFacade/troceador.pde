/*
  La función trocear recibe una imagen y devuelve otra de las mismas dimensiones pero 
  troceada en tiras descentradas, ligeramente solapadas, rotadas y tintadas.
*/
PImage trocear(PImage imagenBase) {

  // Preparamos el gráfico donde trocearemos la imagen con las mismas dimensiones que la imagen base
  // En versiones anteriores aumentaba el ancho de la imagen en función del porcentaje de descentrado
  // y calculaba el ratio de la nueva imagen para conservar las proporciones.
  // En esta versión, por simplicidad, y dado que las imágenes empleadas en los médios tienen suficiente aire
  // he prescindido de dichos ajustes
  PGraphics imagenTroceada = createGraphics(imagenBase.width, imagenBase.height);

  // Empezamos a trocear la imagen
  imagenTroceada.beginDraw();

  // Inicializamos la posición Y de la tira en la imagen
  float posY = 0;

  // Elegimos un color de tinte base para la imagen troceada
  float tinteBase = random(361);

  // El bucle hara tiras de diferentes tamaños hasta completar la imagen
  // Las tiras estarán descentradas y rotadas
  do {

    // Primero elegimos al azar el grosor de la tira entre dos porcentajes relativos a la altura.
    // Por ejemplo: entre un 5% y un 15% de la altura de la imagen
    float altoTrozo = random(imagenBase.height * 0.02, imagenBase.height * 0.15);

    // En segundo lugar, el descentrado para la tira
    // Podemos elegir entre dos valores aleatorios ...
    //float descentrado = imagenBase.width * (random (-8,8)/100);
    // ... o emplear randomGaussian() para un resultado más radical
    float descentrado = imagenBase.width * randomGaussian()*0.03;

    // En tercer lugar, la rotación que le aplicaremos
    float rotacion = randomGaussian()*0.02;

    // Por último preparamos una objeto PGraphics para alojar la tira
    // Añadimos un pequeño porcentaje extra para hacer un efecto de solapado
    float solape = 10;
    PGraphics trozo = createGraphics(imagenBase.width, round(altoTrozo*(1 + solape/100)));

    // Generamos la tira colocando la imagen base en contenedor trozo
    // La coordenada posY comienza en 0, así que la primera tira solo mostrará una porción de la parte superior de la imagen base
    // En la siguiente iteración, posY se decrementará según el alto de la tira anterior
    // para tomar la siguiente porcion
    // y así sucesivamente hasta completar la imagen
    trozo.beginDraw();
    trozo.image(imagenBase, 0, posY);
    trozo.endDraw();
    
    // Dibujamos la imagen troceada
    
    // Guardamos el entorno de la imagen troceada
    imagenTroceada.push();
    
    // Nos traladamos al centro de la imagen
    imagenTroceada.translate(trozo.width/2, 0);
    
    // para aplicar la rotación
    imagenTroceada.rotate(rotacion);
    
    // Volvemos al punto 0
    imagenTroceada.translate(-trozo.width/2, 0);

    // Teñimos la tira que vamos a aplicar con un tono ligeramente diferente en función de la anchura de la tira
    color tinte = color(tinteBase+map(altoTrozo, 0, imagenBase.height, -180, 180), 40, 100);
    imagenTroceada.tint(tinte, 60);
    
    // Añadimos la tira a la imagen troceada
    imagenTroceada.image(trozo, descentrado, -posY);
    
    // Desactivamos el tintado
    imagenTroceada.noTint();
    
    // Restauramos el entorno de la imagen troceada
    imagenTroceada.pop();
    
    // Incrementamos la coordenada posY para seleccionar la siguiente tira
    posY -= altoTrozo;
    
  } while ((-1*posY) < imagenBase.height);

  // Terminamos de dibujar
  imagenTroceada.endDraw();

  // La función devuelve un objeto de tipo PImage con la imagen troceada
  return imagenTroceada;
}
