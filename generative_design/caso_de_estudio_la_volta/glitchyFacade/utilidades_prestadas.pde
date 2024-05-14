/*
 =====================================
 Cargar Imágenes
 =====================================
 */

// Carga las imágenes y guarda en el contendor
public PImage[] cargaImagenes(String carpeta, String extension) {
  // Crea un contenedor de imágenes para guardarlas
  PImage[] misImagenes;
  int imageCount = 0;
  // Importa las imágenes de medios y guárdalas en un array
  File direccion = new File(sketchPath(""), "data/" + carpeta);
  String[] contenidoCarpeta = direccion.list();
  // --------------------------------------------------------------------------------------
  // Tuve un problema con archivos ocultos del sistema
  // Esta línea me permite ver que no vuelve a pasar
  // --------------------------------------------------------------------------------------
      println(direccion.list());
  // --------------------------------------------------------------------------------------

  misImagenes = new PImage[contenidoCarpeta.length];
  for (int i = 0; i < contenidoCarpeta.length; i++) {
    if (contenidoCarpeta[i].charAt(0) == '.') continue;
    else if (contenidoCarpeta[i].toLowerCase().endsWith(extension)) {
      File childFile = new File(direccion, contenidoCarpeta[i]);
      misImagenes[imageCount] = loadImage(childFile.getPath());
      imageCount++;
    }
  }
  return misImagenes;
}

/*
===============================================
 Se baraja el array contenedor de imágenes
 y se dipujan una vez cada una en un buclew for
 ===============================================
 */
void pintaImagenesNoRepe(PImage[] contenedorImagenes, float[][] contenedorPosiciones, float anchoImagen, float altoImagen) {
  int[] miContenedor = new int[contenedorImagenes.length - 1];
  for (int i = 0; i < contenedorImagenes.length - 1; i = i + 1) {
    miContenedor[i] = i;
  }
  IntList il = new IntList(miContenedor);
  il.shuffle();
  miContenedor = il.array();

  for (int i = 0; i < contenedorImagenes.length - 1; i = i + 1) {
    float posX = contenedorPosiciones[i][0];
    float posY = contenedorPosiciones[i][1];
    // --------------------------------------------------------------------------------------------------------
    // Modificamos la llamada a image() para ejecutarla sobre el contenedor del cartel ------------------------
    // --------------------------------------------------------------------------------------------------------
    cartel.image(contenedorImagenes[miContenedor[i]], posX, posY, anchoImagen, altoImagen);
  }
}

/*
===========================================
 Textos
 ===========================================
 */
void pintaTexto(String mensaje, String fuente, float size, float altoLinea, float posX, float posY, float grados) {
  PFont miTipo = createFont("fonts/" + fuente, 40);
  cartel.textFont(miTipo, size);
  cartel.textLeading(altoLinea);
  cartel.pushMatrix();
  cartel.translate(posX, posY);
  cartel.rotate(radians(grados));
  cartel.text(mensaje, 0, 0);
  cartel.popMatrix();
}

/*
 =====================================
 Exportación
 =====================================
 */

void exportaCarteles(int numCarteles, String prefijo, String extension) {
  // Exporta a jpg
  if (frameCount <= numCarteles) {
    // Puedes cambiar el prefijo "cartel_" por otro que quieras
    // los símbolos de "###" sirven para numerar las copias, cada uno es una cifra
    cartel.save(prefijo + frameCount + extension);

    // --------------------------------------------------------------------------------------
    // He añadido una previsualización de los carteles --------------------------------------
    // --------------------------------------------------------------------------------------
    imageMode(CENTER);
    float ratioCartel = float(cartel.width) / (cartel.height);
    float altoPreview = displayHeight * 0.9;
    float anchoPreview = altoPreview * ratioCartel;
    image(cartel, displayWidth/2, displayHeight/2, anchoPreview, altoPreview);
    // --------------------------------------------------------------------------------------

    println("Cartel" + " " + frameCount + "/" + numCarteles);
  }
  // Si has terminado de exportar cierra el programa
  else {
    println("EXPORTING COMPLETE!");
    println("Carteles guardados en la carpeta de este Sketch");
    exit();
  }
}
