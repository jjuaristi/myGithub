/* ------------------------------------------------------------------------
 >>> leerCSV
 --------------------------------------------------------------------------
     Parsing del CSV que retorna un array bidimensional de strings
 -------------------------------------------------------------------------- */

String[][] leerCSV(String csv) {
  
  // Cargamos el archivo CSV en un array que contendrá una línea del CSV por elemento
  String[] registros = loadStrings("datos/" + csv);
  
  // Sabemos que cada línea del CSV contiene 4 datos: n/s, botella, comprador y añada
  // Creamos un contenedor para los datos
  String[][] datos = new String[registros.length][4];
  
  // Iteramos por el array obtenido del CSV
  for (int i = 0; i < registros.length; i++) {
  
    // Separamos el registro en los campos separados por comas
    String[] campos = split(registros[i], ',');
    
    // Añadimos los campos en su fila y columna
    for(int j = 0; j < campos.length; j++) {
      datos[i][j]= campos[j];
    }
  }
  return datos;
}

/* ------------------------------------------------------------------------
 >>> crearSemilla
 --------------------------------------------------------------------------
 Función para crear una semilla a partir del nombre del comprador
 -------------------------------------------------------------------------- */
int crearSemilla (String cadena) {

  // Inicializamos el valor de la semilla a cero
  int semilla = 0;

  // Sumamos el valor ASCII de cada caracter de la cadena de entrada
  for (int i = 0; i < cadena.length(); i++) {
    semilla += int(cadena.charAt(i));
  }

  // Con esta primera semilla elegimos un carácter aleatorio de la cadena...
  randomSeed(semilla);
  int randomPos = floor(random(cadena.length()));

  // ... y su valor ASCII
  int charAtPos = int(cadena.charAt(randomPos));

  // Por último multiplicamos la semilla por el valor ASCII del carácter
  // y elevamos el resultado por la posición;
  semilla = semilla * charAtPos;

  // Devolvemos una semilla
  return semilla;
}


/* ------------------------------------------------------------------------
 >>> cm2px
 --------------------------------------------------------------------------
 Función para convertir cm en pt(px) en base a los dpi de salida
 -------------------------------------------------------------------------- */
float cm2px(float cm, float dpi) {
  return (cm / INCH) * dpi;
}

/* ------------------------------------------------------------------------
 >>> punto2x
 >>> punto2Y
 --------------------------------------------------------------------------
 Funciones para con un ángulo y un radio obtener las coordenadas x e y
 -------------------------------------------------------------------------- */
float punto2x (float ang, float radio) {
  float x = cos(ang) * radio;
  return x;
}

float punto2y (float ang, float radio) {
  float y = sin(ang) * radio;
  return y;
}

/* ------------------------------------------------------------------------
 >>> fitScreen
 --------------------------------------------------------------------------
 La función recibe un PGraphics y comprueba si cabe en la pantalla disponible.
 Si cabe lo presenta centrado en la pantalla.
 Si no cabe lo ajusta para que encaje.
 
 * Nota: En la PEC anterior añadía unas líneas que hacían esto mismo para 
 previsualizar los carteles. En esta función he mejorado el código y lo he 
 generalizado para poder reutilizarlo.  
 -------------------------------------------------------------------------- */
void fitScreen (PGraphics graf) {
  // Preparamos un fondo gris oscuro como fondo para la preview
  background(#222222);
  float escalaX = width / float(graf.width);
  float escalaY = height / float(graf.height);
  float escala = escalaX <= escalaY ? escalaX : escalaY;
  escala = escala < 1 ? escala : 1;
  pushMatrix();
  imageMode(CENTER);
  translate(width/2, height/2);
  image(graf, 0, 0, graf.width * escala, graf.height * escala);
  popMatrix();
}
