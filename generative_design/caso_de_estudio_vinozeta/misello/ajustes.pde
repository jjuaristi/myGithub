// Constante con la equivalencia de una pulgada en centímetros
final float INCH = 2.54;

// nombre del archivo CSV que contiene los datos
String archivoCSV = "DZG_test_processing.csv";

/*
  Array con las dimensiones de las etiqueta en pares de volumen en litros /anchoCM
  ---------------------------------------------------------------------------------
  Como la etiqueta se genera en base a una retícula constructiva, incorporar una
  nueva botella tan implica añadir un nuevo par de datos con el volumen de la botella
  y el ancho requerido para su etiqueta

*/
float[] etiWidths = {0.75, 16, 1.5, 17.4, 3, 19.6};

/*
  Resolución de salida de la hoja generada en DPI.
  --------------------------------------------------------------------------------
  En la impresión offset se emplea habitualmente una lineatura de 150 lpi aunque
  hay imprentas que también imprimen a 200 lpi. 
  Para un resultado óptimo en el ripeado PostScript se debería ajustar la 
  resolución de salida al doble de la lineatura (dpi = lpi * 2)
  En este caso se ajusta a 300 dpi para una impresión convencional a 150 lpi
  ---------------------------------------------------------------------------------
  Nota: En realidad si se tratarse de una impresión en escala de gris para una impresión
        offset convencional, lo ideal sería proporcionar una salida de 600 dpi.
  ---------------------------------------------------------------------------------
  Nota 2: En el proyecto entregado finalmente, la imagen se podría considerar un arte de línea,
          una imagen de 1 bit de profundidad, y se podría entregar con una resolución de 1200 dpi
          o algún múltiplo superior en función del imageseter de destino.
  ---------------------------------------------------------------------------------          
  Nota 3: En cualquier caso el resultado final, al tratarse de una cantidad muy pequeña y variable, 
          su destino sera una impresión digital, así que la mejor opción sin mayor información por
          parte del impresor, será proporcionar un archivo de 300 dpi
*/
float etiDPI = 300;

// Flag para activar la generación de las marcas de imprenta
boolean marcas = true;

// Ajustes para las marcas de impresión
float margen =   1.5; //cm
float sangre =   0.3; //cm
float corte =    1.0; // cm
// ... La información del documento se puede desactivar a petición del impresor
boolean notas = true;
float notasH =     0.2; // cm
// ... La escala de densitómetro se puede desactivar a petición del impresor
boolean densi = true;
int[] densiVal = {0, 5, 25, 50, 75, 95, 100};
float densiWH = 0.7; // cm

// Ajustes archivo salida
// Directorio de salida, ...
String dir = "etiquetas/";
// ... nombre base para los archivos y ...
String raizArchivo = "eti_";
// ... extensión de salida.
// El formato TIF es un estándar en las artes gráficas
// A diferencia del JPG, se trata de un formato con compresión sin pérdidas 
String ext = ".tif";

// Activación de la retícula
// Se empleó durante el desarrollo
  boolean verReticula = false; 
