// Contenedor para la hoja que ira a imprenta
Hoja miHoja;

// Contenedor para el parsing del CSV
String[][] ventas;

/*
  Aunque no es necesario ponemos la pantalla en full screen
  para visualizar las etiquetas mientras se generan.
  Esto junto a la activación de la retícula sirve de ayuda
  durante el proceso de programar el diseño
*/ 
void settings() {
  // En caso de tener más de un monitor se puede elegir en que monitor mostrar la preview
  fullScreen(1);
}

void setup() {
  // Leemos el archivo con el listado de ventas para el que habrá que generar las etiquetas
  ventas = leerCSV(archivoCSV);
}

void draw() {
  // Generamos la hoja para el registro correspondiente
  // empleando el frameCount como contador
  miHoja = new Hoja(ventas[frameCount-1], marcas);

  // Mostramos la hoja con la etiqueta
  fitScreen(miHoja.hoja);
  
  // Guardamos la hoja con la etiqueta en formato TIFF
  miHoja.hoja.save(dir+raizArchivo+nf(Integer.valueOf(ventas[frameCount-1][0]), 3) + ".tif");

  // Aprovechando que se procesa un registro por frame
  // comprobamos si ha acabado la lista de ventas
  // y en caso afirmativo terminamos el programa
  if (frameCount == ventas.length) exit();

}
