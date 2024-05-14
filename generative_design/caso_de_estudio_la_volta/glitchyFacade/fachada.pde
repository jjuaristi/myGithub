/*
  La función fachada genera una retícula aleatoria en función de los parametros configurados
 y preserva un espacio para los patrocinadores en el faldón del cartel
 */
void fachada () {

  // Creamos la retícula aleatoria
  columnas = round(random(columnasMin, columnasMax));

  // Calculamos el ancho de una columna
  float anchoColumna = anchoCartel / columnas;

  // Confiamos en que todas las imágenes tienen el mismo tamaño
  float ratio = altos[0].width / altos[0].height;

  // Con el ratio calculamos el alto de una fila
  float altoFila = anchoColumna / ratio;

  // ¿Cuantas filas caben?
  int filas = floor(altoDisponible / altoFila);

  // Calculamos el ato del edificio y el restante será para cielo
  float altoEdificio = altoFila * float(filas);
  float cielo = altoDisponible - altoEdificio;

  //Inicializamos la posicion posY de las filas
  float posY = cielo - altoFila;
  
  /*
    El cálculo del origen incluyendo el cielo puede simplificarse de forma muy sencilla,
    sin embargo lo dejo como lo tenía antes de incorporar el cielo para clarificar el proceso.
  */

  // Y un contador de filas
  int fila=0;

  // También un contenedor para la imagen elegida para trocear
  PImage paraTrocear;

  // println("columnas: "+columnas+" - filas: "+filas);

  do {
    for (int posX = 0; posX < columnas; posX++) {
      
      // Seleccionamos los elementos en función de su posición
      if (fila == 0) {
        // nubes
        paraTrocear = nubes[floor(random(nubes.length))];
      } else if (fila == 1) {
        // altos
       paraTrocear = altos[floor(random(altos.length))];
      } else if (fila == filas) {
        // Bajos
        paraTrocear = bajos[floor(random(bajos.length))];
      } else {
        // Medios
        paraTrocear = medios[floor(random(medios.length))];
      }

      // println("fila: "+ fila +" - Columna: " + posX + " - imagen; " + paraTrocear + " - " + altos[posX]);

      // Añadimos la imagen a su espacio en la retícula
      // Una de cada dos imágenes irá troceada
      // Las nubes no se trocean
      if (floor(random(0, 2)) == 0 && fila != 0) {
        cartel.image(trocear(paraTrocear), posX*anchoColumna, posY, anchoColumna, altoFila);
      } else {
        // Las imágenes que no van troceadas las aclaramos con un tinte blanco al 80% de transparencia
        // e igualar la luminosidad con las imágenes troceadas
        cartel.tint(255,60);
        cartel.image(paraTrocear, posX*anchoColumna, posY, anchoColumna, altoFila);
        cartel.noTint();
      }
    }
    
    //Actualizamos las posiciones
    posY += altoFila;
    fila++;
    
  } while (fila <= filas);
}
