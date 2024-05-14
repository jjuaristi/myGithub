/*
  ----------------------------------------------------------------------------------------------
 Javier Juaristi
 El mercado creativo de La Volta nos encarga el 27 cartel
 Diseño Generativo
 Octubre 2022
 ---------------------------------------------
 mi_cartel_generativo
 Glitchy Facade
 versión 7
 ----------------------------------------------------------------------------------------------
 */

// ==========================
// Configuración de la salida
// ==========================
// Medidas en cm de la hoja
// Inicialmente un DIN A3
float anchoHoja = 29.7;
float altoHoja = 42;
// Resolución en dpi
int resolucion = 300;
// Lo que mide una pulgada en cm
float inch = 2.54;
// Tamaño archivo salida
int anchoCartel = ceil(anchoHoja / inch * resolucion);
int altoCartel = ceil(altoHoja / inch * resolucion);
// El espacio reservado al faldón se puede ajustar proporcionalmente
float faldon = altoCartel * 0.07; // 7%
// Espacio vertical diponible para el cartel
float altoDisponible = altoCartel - faldon;
// Imagen de salida
PGraphics cartel;


// ====================
// Carga de la imágenes
// ====================
// Contenedores de imágenes: Partes de las fachadas y contenido del cartel
PImage[] nubes;
PImage[] altos;
PImage[] medios;
PImage[] bajos;
PImage[] copy;
// Imagen estática con los participantes y patrocinadores
PImage imagenEstatica;

// =============================
// Parámetros para la generación
// =============================
int columnasMin = 3;
int columnasMax = 7;
int columnas, filas;
color colorFondo;
int colorH = 0;
int colorS = 0;
int colorB = 95;

// ========================
// Tipografía para el texto
// ========================
String fuenteLaVolta = "NeutraText DemiAlt.otf";


// En el setup() cargamos la imágenes y ajustamos el modo de color
void setup() {
  // Activamos el modo de pantalla completa para la previsualización de los carteles
  fullScreen(1);
  
  // ----------------------------------------------------------------------------
  // Cargamos la imágenes con el código proveniente de la plantilla
  // ----------------------------------------------------------------------------
  // cargaImgenes(carpeta, extensión);
  nubes  = cargaImagenes("nubes", ".png");
  altos = cargaImagenes("altos", ".png");
  medios = cargaImagenes("medios", ".png");
  bajos = cargaImagenes("bajos", ".png");
  copy = cargaImagenes("copy", ".png");

  // Carga una sola imagen
  // Imagen con banner de patrocinadores y texto estático
  // loadImage("ruta a la imagen")
  imagenEstatica = loadImage("static/0.png");
  // -------------------------------------------------------------------------------

  // Ajustamos el modo de color
  colorMode(HSB, 360, 100, 100);
  //Y el color de fondo
  colorFondo = color(colorH, colorS, colorB);

  // Creamos la imagen que contendrá los carteles
  cartel = createGraphics(anchoCartel, altoCartel);
}

// En el draw() generamos las diferentes capas que conformarán cada cartel
// Trabajamos sobre la imagen cartel
void draw () {
  // Empezamos a dibujar añadiendo el fondo con el color base que hemos elegido
  cartel.beginDraw();
  cartel.background(colorFondo);

  // Generamos la fachada
  fachada();

  // Para el copy he conservado la idea del proyecto original y tan solo he añadido mi nombre 
  // Ajustamos las filas y columnas a mano para adaptarnos al código prestado
  columnas = 2;
  filas = 3;
  float anchoCelda = anchoCartel/columnas;
  float altoCelda = altoDisponible/filas;
  float[][] copyPosiciones = {
    {0, 0}, {anchoCartel/2, 0},
    {anchoCartel/2, altoDisponible/3},
    {0, altoDisponible/3 * 2}, {anchoCartel/2, altoDisponible/3 * 2},
  };

  // Añadimos el copy con el código prestado ligeramente modificado ------------------------------------
  pintaImagenesNoRepe(copy, copyPosiciones, anchoCelda, altoCelda);

  // Texto Autoría y contador carteles
  cartel.textAlign(CENTER);
  // Color de fuente
  cartel.fill(#111111);
  // Preparamos el texto para el contador de carteles
  String contador = "00" + frameCount;
  contador = contador.substring(contador.length()-3);
  // pintaTexto(mensaje, fuente, size, altoLinea, posX, posY, rotacion en grados)
  pintaTexto(" Javier Juaristi | PEC 2.  El mercado creativo de La Volta nos encarga el 27 cartel | Diseño Generativo | Grado en Diseño y creación digitales | UOC | Octubre 2022 | Cartel Nº "
    + contador + "/ 300", fuenteLaVolta, 50, 50, anchoCartel - 60, altoCartel/2, -90);
  // ----------------------------------------------------------------------------------------------------

  // Por último colocamos a los participantes y patrocinadores
  cartel.image(imagenEstatica, 0, 0);
  cartel.endDraw();

  // ----------------------------------------------------------------------------
  // Código proveniente de la plantilla
  // ----------------------------------------------------------------------------
  // exportaCarteles(total, prefijo, extensión);
  exportaCarteles(10, "cartel_", ".jpg");
}
