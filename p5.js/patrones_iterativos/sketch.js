// ************************************************************ //
// En esta zona se definen las variables comunes
// a todos lo diseños.
// ************************************************************ //

// Tamaño inicial del canvas.  
var canvasWH = 550;

// Aquí definimos el número inicial de elementos por eje.
var reticulaAzulejo = 10;

// La escala determina las repeticiones del patrón en el canvas
var scalePattern = 0.5;

// Estado inicial de loop
var estaLoop = false;

// Estado mostrar ayuda
var mostrarAyuda = true;

// Semilla. La utilizo para no cambiar el diseño si es necesario
var semilla;

// Estado inicial de redibujado
var redibujarPatron = true;

// Inicializamos en el primer patrón a dibujar
var patronActual = 4;


// ************************************************************ //
// A continuación los patrones; nombre, descripción y paletas
// ************************************************************ //

// Nombres de los patrones a dibujar
var patrones = ['DISCO', 'MATRIX', 'YAYOY', 'PAC-MAN', 'BRICK'];

// Descripciones de los patrones
var patronDescripcion = [];

patronDescripcion[0] = 'Para el primer intento me inspiré en el patrón de ejemplo y después de varias pruebas decidí darle un toque de color a lo disco \u00b470s.';

patronDescripcion[1] = 'Inspirado en el aspecto del \u00ABcódigo\u00BB que aparece en las pantallas de la película Matrix, es una evolución de Disco, con una paleta de colores frios y una aleatoriedad más contenida.';

patronDescripcion[2] = 'Trabajé con Yayoy Kusama y sus puntos infinitos en la asignatura de color. Después de Matrix pensé que podía añadir una deformación aleatoria a las formas y simular alguno de sus patrones más conocidos.';

patronDescripcion[3] = 'La inspiración me vino del libro el libro \u00AB10 PRINT CHR$(205.5+RND(1)); : GOTO 10\u00BB donde se veía como el resultado del código generaba una especie de laberinto. Lo uní a Pac-Man y así quedó.';

patronDescripcion[4] = 'Quería hacer algo en blanco y negro y pensé en Bitelchus y las rayas. El resultado ha sido como una pared irregular de bloques, así que en lugar de Bitelchus le llamé Brick.';


// Paletas de color de los patrones. El primer color define el fondo
var colores = [];
// Disco
colores[0] = ['#000000', '#00e0ff', '#2ed900', '#faf202', '#ffbc00', '#ff000b', '#ec1d78', '#9d00ff', '#038eff'];
// Matrix
colores[1] = ['#000000', '#C5D1EB', '#92AFD7', '#5A7684', '#395B50', '#1F2F16'];
// Yayoy
colores[2] = ['255,200,0', '0,0,0', '255,0,0', '255 255,255', '0,0,255', '255,255,255', '0,0,0', '255,255,255', '255 255,255', '255,0,0'];
colores[3] = ['#000', '#00F', '#FFF', '#EF98B1', '#E51922', '#0FACE9', '#EB7E21', '#ebe20d'];
// Bitelchus
colores[4] = ['#000', '#FFF'];


// ************************************************************ //
// Aquí empiezan las variables auxiliares de cada diseño.
// Algunos patrones usan variables definidas en otros,
// así que la declaración es acumulativa.
// ************************************************************ //
// Disco
var colorAzar;
var sectorArcos;
var diametroArcos;
// Matrix
var figuraElegida;
// Yaoy
var diametroX;
var diametroY;
// Pac-Man
var estaPacman;
// Bitelchus
var descentradoX;
var descentradoY;
var distanciaDescentradoX;
var distanciaDescentradoY;
var centroX;
var centroY;
var segmentos;


function setup() {
  // Para evitar problemas, no he parametrizado el frame rate.
  // Si se desea, se puede cambiar aquí mismo.
  frameRate(4);
  noLoop();
}

function draw() {

  // ********************************************************** //
  // Preparación inicial de elementos comunes y excepciones.
  // ********************************************************** //

  // Para poder modificar el canvas primero calculamos...
  // el tamaño del elemento, que depende del canvas inicial y la retícula.
  var reticulaAzulejoSize = canvasWH / reticulaAzulejo;

  // También la reticula del canvas, que depende de la escala
  var reticulaCanvas = canvasWH / (canvasWH * scalePattern);

  // Ahora ya podemos ajustar el canvas
  resizeCanvas(canvasWH - (reticulaAzulejoSize / 2),
    canvasWH - (reticulaAzulejoSize / 2));

  // Para el redibujado de Pac-Man debo incializar la presencia de Pac-Man 
  // fuera del bulce y dentro del draw()
  estaPacman = false;

  // Controlo la semilla del random para poder simular el efecto de
  // aparición y desaparición del menú de ayuda.
  // Si no estamos en Loop y debemos redibujar, asignamos una nueva semilla
  if (!estaLoop) {
    if (redibujarPatron) {
      semilla = random(1000);
      redibujarPatron = false;
    }
    randomSeed(semilla); // Si no, conservamos la semilla.
  }

  // Ahora ya si, colocamos el fondo acorde al patrón seleccionado
  if (patronActual == 2) {
    // EXCEPCIÓN. En Yayoy no usé nomenclatura hexadecimal
    colorAzar = int(random(colores[patronActual].length / 2));
    background('rgb(' + colores[patronActual][colorAzar * 2] + ')');
  } else {
    background(colores[patronActual][0]);
  }


  // ********************************************************** //
  // Dibujado del mosaico con el patrón seleccionado.
  // ********************************************************** //

  // Estos 2 for anidados dibujan el mosaico de azulejos
  for (var fila = 0; fila < reticulaCanvas; fila++) {
    for (var columna = 0; columna < reticulaCanvas; columna++) {

      // Para lo que aplicamos escala y traslación al azulejo
      scale(scalePattern);
      translate(canvasWH * columna, canvasWH * fila);

      // Estós otros 2 for anidados dibujan el patrón del azulejo
      for (var reticulaH = 0; reticulaH < reticulaAzulejo; reticulaH++) {
        for (var reticulaV = 0; reticulaV < reticulaAzulejo; reticulaV++) {

          // Seleccionamos el patrón a dibujar
          switch (patronActual) {

            case 0: // Disco ***********************************

              // Círculos. Uno por cuadricula
              colorAzar = int(random(colores[patronActual].length));
              noStroke();
              fill(colores[patronActual][colorAzar]);
              circle(reticulaAzulejoSize * reticulaH,
                reticulaAzulejoSize * reticulaV,
                reticulaAzulejoSize * random(1));

              // Arcos. Dibujamos uno por fila
              if (reticulaV == 0) {
                noFill();
                colorAzar = int(random(colores[patronActual].length));
                stroke(colores[patronActual][colorAzar] + '88');
                strokeWeight(8);
                sectorArcos = int(random(5));
                diametroArcos = (canvasWH / reticulaAzulejo) * (reticulaH + 1);
                arc(canvasWH / 2,
                  canvasWH / 2,
                  diametroArcos,
                  diametroArcos,
                  HALF_PI * sectorArcos,
                  (HALF_PI * sectorArcos) + (PI * 1.25));
              }
              break;

            case 1: // Matrix **********************************

              // Seleccionamos una figura al azar
              figuraElegida = int(random(3));
              colorAzar = int(random(colores[patronActual].length));

              // Si el resultado es cero dejo un hueco a propósito

              if (figuraElegida == 1) {
                // Arcos
                noFill();
                stroke(colores[patronActual][colorAzar]);
                strokeWeight(reticulaAzulejoSize * 0.1);
                strokeCap(SQUARE);
                sectorArcos = int(random(5));
                diametroArcos = (reticulaAzulejoSize * 0.25) +
                  random(reticulaAzulejo * 0.75);
                arc(reticulaAzulejoSize * reticulaH,
                  reticulaAzulejoSize * reticulaV,
                  diametroArcos,
                  diametroArcos,
                  HALF_PI * sectorArcos,
                  (HALF_PI * sectorArcos) + (PI * 1.5));
              } else {
                // Puntos
                if (figuraElegida == 2) {
                  noFill();
                  stroke(colores[patronActual][colorAzar]);
                  strokeWeight(reticulaAzulejoSize * 0.25);
                  point(reticulaAzulejoSize * reticulaH,
                    reticulaAzulejoSize * reticulaV);
                }
              }
              break;

            case 2: // Yayoy  **********************************

              // Este patrón usa varias paletas
              fill('rgba(' +
                colores[patronActual][(colorAzar * 2) + 1] +
                ',' + random(0.8, 0.95) + ')');
              noStroke();
              // Guardamos el canvas
              push();
              // Desplazamos a la posición del siguiente circulo
              translate((reticulaH * reticulaAzulejoSize) +
                (reticulaAzulejoSize * random(-0.2, 0.2)),
                (reticulaV * reticulaAzulejoSize) +
                (reticulaAzulejoSize * random(-0.2, 0.2)));
              // añadimos algo de inclinación aleatoria
              shearX(random(-0.1, 0.1));
              // y un poco de rotación
              rotate(random(-0.3, 0.3));
              // Aplicamos deformaciones
              diametroY = reticulaAzulejoSize * random(0.1, 0.8);
              diametroX = diametroY * random(0.92, 0.95);
              // Dibujamos el punto
              ellipse(0, 0, diametroX, diametroY);
              // Restauramos el canvas al estado anterior
              pop();
              break;

            case 3: // Pac-Man *********************************

              // Guardamos el canvas
              push();
              translate(reticulaAzulejoSize * reticulaH,
                reticulaAzulejoSize * reticulaV)

              // Decidimos la figura
              figuraElegida = int(random(100));

              // Selección de figura en base a un porcentaje

              // Módulo vertical
              if (figuraElegida >= 0 && figuraElegida <= 29) {
                // Limpieza de pasillo
                fill(colores[patronActual][0]);
                rectMode(CENTER);
                rect(reticulaAzulejoSize / 2,
                  reticulaAzulejoSize / 2,
                  reticulaAzulejoSize * 0.7,
                  reticulaAzulejoSize * 1.3);
                // Paredes
                fill(colores[patronActual][1]);
                rectMode(CENTER);
                rect(0,
                  reticulaAzulejoSize / 2,
                  reticulaAzulejoSize * 0.3,
                  reticulaAzulejoSize * 1.3);
                rect(reticulaAzulejoSize,
                  reticulaAzulejoSize / 2,
                  reticulaAzulejoSize * 0.3,
                  reticulaAzulejoSize * 1.3);
                // Puntos
                strokeWeight(reticulaAzulejoSize * 0.1);
                stroke(colores[patronActual][2]);
                point(reticulaAzulejoSize / 2, 0);
                point(reticulaAzulejoSize / 2, reticulaAzulejoSize / 2);
                point(reticulaAzulejoSize / 2, reticulaAzulejoSize);
              } // Fin módulo vertical

              // Módulo horizontal
              if (figuraElegida >= 30 && figuraElegida <= 94) {
                // Limpieza de pasillo
                fill(colores[patronActual][0]);
                rectMode(CENTER);
                rect(reticulaAzulejoSize / 2,
                  reticulaAzulejoSize / 2,
                  reticulaAzulejoSize * 1.3,
                  reticulaAzulejoSize * 0.7);
                // Paredes
                fill(colores[patronActual][1]);
                rectMode(CENTER);
                rect(reticulaAzulejoSize / 2,
                  0,
                  reticulaAzulejoSize * 1.3,
                  reticulaAzulejoSize * 0.3);
                rect(reticulaAzulejoSize / 2,
                  reticulaAzulejoSize,
                  reticulaAzulejoSize * 1.3,
                  reticulaAzulejoSize * 0.3);
                // Puntos
                strokeWeight(reticulaAzulejoSize * 0.1);
                stroke(colores[patronActual][2]);
                point(0, reticulaAzulejoSize / 2);
                point(reticulaAzulejoSize / 2, reticulaAzulejoSize / 2);
                point(reticulaAzulejoSize, reticulaAzulejoSize / 2);
              } // Fin módulo horizontal

              // Fantasmas
              if (figuraElegida >= 95 && figuraElegida <= 97) {
                rectMode(CENTER);
                colorAzar = 3 + int(random(4));
                fill(colores[patronActual][colorAzar]);
                noStroke();
                // El cuerpo es un rectángulo redondeado
                rect(reticulaAzulejoSize / 2,
                  reticulaAzulejoSize / 2,
                  reticulaAzulejoSize * 0.4,
                  reticulaAzulejoSize * 0.55,
                  reticulaAzulejoSize,
                  reticulaAzulejoSize,
                  reticulaAzulejoSize * 0.1,
                  reticulaAzulejoSize * 0.1);
                // Ojos
                fill(colores[patronActual][2]);
                ellipseMode(CENTER);
                ellipse(reticulaAzulejoSize * 0.42,
                  reticulaAzulejoSize * 0.44,
                  reticulaAzulejoSize * 0.15,
                  reticulaAzulejoSize * 0.2);
                ellipse(reticulaAzulejoSize * 0.58,
                  reticulaAzulejoSize * 0.44,
                  reticulaAzulejoSize * 0.15,
                  reticulaAzulejoSize * 0.2);
                fill(colores[patronActual][0]);
                ellipse(reticulaAzulejoSize * 0.42,
                  reticulaAzulejoSize * 0.48,
                  reticulaAzulejoSize * 0.09,
                  reticulaAzulejoSize * 0.09);
                ellipse(reticulaAzulejoSize * 0.58,
                  reticulaAzulejoSize * 0.48,
                  reticulaAzulejoSize * 0.09,
                  reticulaAzulejoSize * 0.09);
              } // Fin de los fantasmas

              // Pac-Man
              if (figuraElegida >= 98 && figuraElegida <= 99) {
                // Ponemos los puntos
                strokeWeight(reticulaAzulejoSize * 0.1);
                stroke(colores[patronActual][2]);
                point(reticulaAzulejoSize / 2, reticulaAzulejoSize / 2);
                if (!estaPacman) {
                  // Y si no está dibujamos a Pac-Man
                  fill(colores[patronActual][7]);
                  noStroke();
                  arc(reticulaAzulejoSize / 2,
                    reticulaAzulejoSize / 2,
                    reticulaAzulejoSize * 0.55,
                    reticulaAzulejoSize * 0.55,
                    QUARTER_PI,
                    -QUARTER_PI);
                  estaPacman = true;
                }
              } // Fin de Pac-Man

              // Recuperamos el canvas
              pop();
              break;


            case 4: // Brick *******************************

              // Calculamos el descentrado en un +/- 25% del elemento
              descentradoX = random(-0.25, 0.25);
              descentradoY = random(-0.25, 0.25);
              segmentos = int(random(8, 11));
              distanciaDescentradoX = (reticulaAzulejoSize * descentradoX) / segmentos;
              distanciaDescentradoY = (reticulaAzulejoSize * descentradoY) / segmentos;
              
              // Añado un descentrado extra a todo el elemento
              centroX = reticulaAzulejoSize * reticulaH +
                (reticulaAzulejoSize / 2) * random(0.88, 1.13); 
              centroY = reticulaAzulejoSize * reticulaV +
                (reticulaAzulejoSize / 2) * random(0.88, 1.13);

              // Dibujamos las figuras
              rectMode(CENTER);
              ellipseMode(CENTER);
              noStroke();
              // Cuadrados
              for (var k = 0; k <= segmentos; k++) {
                fill(colores[patronActual][k % 2]);
                rect(centroX + (distanciaDescentradoX * k),
                  centroY + (distanciaDescentradoY * k),
                  (reticulaAzulejoSize / segmentos) * (segmentos - k));
              }
              break;

          } // Cierre switch patronActual

        } // Cierre for reticulaV
      } // Cierre for reticulaH

      // Fin del azulejo
      resetMatrix();
    } // Cierre for columna
  } // Cierre for fila


  // ********************************************************** //
  // Pantalla de instrucciones y ayuda.
  // ********************************************************** //

  if (mostrarAyuda) {
    noStroke();
    rectMode(CENTER);

    // Nombre del patrón en pantalla
    fill('#000000DD');
    rect(width / 2, height / 2 - 169, 300, 34);
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(BOLD);
    fill('#CCC');
    text(
      patrones[patronActual],
      width / 2, height / 2 - 167
    );

    // Descripción del patrón en pantalla
    fill('#FFFFFFDD');
    rect(width / 2, height / 2 - 102, 300, 96);
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(NORMAL);
    fill('#000');
    text(
      patronDescripcion[patronActual],
      width / 2, height / 2 - 102,
      260, 74
    );

    // Controles
    fill('#FFFFFFDD');
    rect(width / 2, height / 2 + 29, 300, 162);
    textAlign(LEFT, TOP);
    fill('#000');

    text(
      '[ 1 ] ' + patrones[0] + '\n\n' +
      '[ 2 ] ' + patrones[1] + '\n\n' +
      '[ 3 ] ' + patrones[2] + '\n\n' +
      '[ 4 ] ' + patrones[3] + '\n\n' +
      '[ 5 ] ' + patrones[4] + '\n\n',
      width / 2 - 130, height / 2 - 38
    );

    text(
      '[ Epacio ] Redibujar \n\n' +
      '[ L ] Loop ON/OFF \n\n' +
      '[ A ] Ayuda ON/OFF\n\n' +
      '[ G ] Guardar captura \n\n',
      width / 2, height / 2 - 38
    );

    // Parametros
    fill('#000000DD');
    rect(width / 2, height / 2 + 149, 300, 74);
    textAlign(CENTER, CENTER);
    fill('#FFF');

    text(
      '[ ← ] ' + reticulaAzulejo + ' [ → ] Elementos por eje \n ' +
      '[ ↑ ] ' + scalePattern + ' [ ↓ ] Escala \n' +
      '[ - ] ' + int(width) + ' px [ +] Canvas',
      width / 2, height / 2 + 149
    );
  }
}


// ************************************************************ //
// La siguiente función permite controlar los parametros 
// mediante pulsaciones de teclado
// ************************************************************ //

function keyPressed() {
  switch (keyCode) {

    case RIGHT_ARROW: // Aumentar elementos
      reticulaAzulejo++;
      draw();
      break;

    case LEFT_ARROW: // Disminuir elementos
      if (reticulaAzulejo > 2) {
        reticulaAzulejo--;
        draw();
      }
      break;

    case UP_ARROW: // Aumentar escala. Máximo 1
      if (scalePattern < 1) {
        scalePattern = int((scalePattern + 0.1) * 100) / 100;
        draw();
      }
      break;

    case DOWN_ARROW: // Disminuir escala. Minimo 0.1
      if (scalePattern > 0.1) {
        scalePattern = int((scalePattern - 0.1) * 100) / 100;
        draw();
      }
      break;

    case 65: // Ayuda ON/OFF
      if (mostrarAyuda) {
        mostrarAyuda = false;
      } else {
        mostrarAyuda = true;
      }
      draw();
      break;

    case 76: // Loop ON/OFF
      if (estaLoop) {
        noLoop();
        estaLoop = false;
      } else {
        loop();
        estaLoop = true;
      }
      draw();
      break;

    case 49: // Disco
    case 97:
    case 50: // Matrix
    case 98:
    case 51: // Yayoy
    case 99:
    case 52: // Pac-Man
    case 100:
    case 53: // Bitlechus
    case 101:
      if (keyCode >= 49 && keyCode < 97) {
        patronActual = keyCode - 49;
      } else {
        patronActual = keyCode - 97;
      }
      draw();
      break;

    case 32: // Espacio. Redibuja el patrón
      redibujarPatron = true;
      draw();
      break;

    case 71: // Guardar. Guarda captura del patron 
      saveCanvas(patrones[patronActual], 'png');

    case 109: // Reducir canvas -10
    case 189:
      canvasWH -= 10;
      draw();
      break;

    case 107: // Aumentar canvas +10
    case 187:
      canvasWH += 10;
      draw();
      break;

    default:
      return false;
  }

}