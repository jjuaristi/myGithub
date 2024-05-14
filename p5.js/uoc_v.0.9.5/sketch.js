/*
************************************************************************
Notas PEC4
----------
No he podido dedicar el tiempo que me habría gustado a esta PEC pero he podido probar algunas cosas nuevas:

- He mejorado en el uso de las funciones seno y coseno para generar animaciones y he empezado a utilizar botones de HTML y a manipular el CSS de estos.

- He descubierto los sliders, aunque me ha sorprendido lo poco personalizables que son y no he sido capaz de modificarlos con el CSS. Tengo que seguir viendo el tema.

- He trabajado bastante con arrays para crear la simulación de grabación.

Al final el resultado es un poco una mezcla de cosas que había estado probando. Las especificaciones del ejercicio no me daban muchas opciones, quizás por la falta de tiempo y terminé uniendo un movimiento pendular que estaba tratando de hacer, con una explosión y una nevada de letras.

Para que el movimiento pendular pareciese más interesante, lo uní a una cuna de Newton y separé el movimiento en dos partes. Se puede acelerar o frenar el péndulo arrastrando el ratón para añadir o restar velocidad. También se pueden usar los controles en pantalla o los cursores para modificar la gravedad o el tamaño.

Quería que la explosión detonase al aplicar suficiente fuerza al péndulo, pero para evitar problemas lo ajusté a un tiempo y convertí las cuerdas en mechas, así o se detona manualmente con el botón en pantalla o el teclado, o detona al llegar la mecha al final.

Al detonar, se generan 300 fragmentos repartidos entre las letras de la palabra para que a los 3 segundos transicionar a una nevada donde los fragmentos frenan y entran en un bucle donde caen y vuelven a aparecer cambiados por la parte superior para simular una nevada infinita.

En la fase de nevada podemos arrastrar el ratón para simular el viento.

El fondo consta de un PNG transparente basado en la portada del libro "10 PRINT CHR$(205.5+RND(1)); : GOTO 10" al que aporto una animación en 4 fases rotando continuamente. Esta animación no la detengo nunca ni la incluyo en la grabación como fe de que no se trata de la grabación de un vídeo.

La segunda parte del fondo es un fondo de color desaturado y claro, para no interferir con las letras, que cambia aleatoriamente con cada golpe de péndulo. En la fase de nieve funde a blanco para dejar de ver el PNG, aunque sigue ahí. Esta parte del fondo si la almaceno en la grabación, sobre todo por apreciar el efecto de la nevada.

La parte que quizás me ha dado más trabajo ha sido la gestion de la grabación y reproducción. Creo que podría haberlo simplificado creando un gráfico y gestionándolo desde ahí, pero me ha faltado tiempo.

Y eso es todo. Me habría gustado tener algo más de tiempo y haber podido pensar algo mejor y mejorar el código, que además está algo desordenado.

Javier Juaristi
15 de diciembre de 2020 

************************************************************************
*/

// *********************************************************************
// Variables y constantes globales
// *********************************************************************

// Versiónn actual
const version = 'v.0.9.5.WIP';

// Variables globales para el tamaño del canvas
const canvasMinW = 500;
const canvasMinH = 500;
let canvasW, canvasH;

// Control de las fases de la animación
let faseAnima = 1;

// Instrucciones
const maxPalabra = 13; // Número de caracteres máximo
let txtPalabra; // La palabra que usaremos
let tiempoTecla; // Tiempo de la última tecla pulsada
const frecTecla = 120; // milisegundos repetición tecla de borrado

// Variables globales para la tipografía de la animación
let fuente; // Fuente para la palabra
let fuenteSize; // Tamaño de la fuente
let fuenteMinSize; // Tamaño mínimo de la fuente
let fuenteColor; // Color de la fuente * Pendiente de uso * 

// Variables del péndulo
let penAng; // Ángulo
let penVel; // Velocidad
let penAce; // Aceleración
let penAmo; // Amortiguación
let penCue; // Cuerda
let penAngPre; // Angulo del fotograma anterior
let retardoChispas; // Retraso de las chispas para cada cuerda
let tiempoMecha; // Tiempo de mecha

// Variables para la explosión
const maxFragmentos = 250; // Máximo número de fragmentos
let fragmentos; // Fragmentos por caracter
let bum; // Array de fragmentos
let zeroX, zeroY; // Origen de coordenadas de los fragmentos
let friccion, gravedad; // Fuerzas que afectan a los fragmentos

// Variables de la nevada
let vientoX, vientoY; // Fuerza del viento por eje

// Variables para el fondo
let fondoPNG; // Variable para el PNG
let fondoW; // Columnas del mosaico de fondo
let fondoH; // Filas del mosaico de fondo
let numMosaicos; // Número de mosaicos
let rotaMosaico; // Array de rotaciones del mosaico
let fondoRitmo; // Ritmo de cambio de rotación
let colorFondo; // Color de fondo
let arrayFondo; // Array con colores de fondo
let brilloFondo; // Array con brillo de fondo
let cambiarFondo; // Momento de cambiar

// Gestión de la película
const tiempoPeliBum = 3; // 3 segundos de explosión antes de la nevada
const maxPeli = 60 * 60 // 1 minuto a 60FPS
let peli, posPeli, iniPeli, finPeli;

// Gestión del grabador y reproductor
let fasePausada, tiempoAtenuarControl, controlAlpha, reproduccionPausada;

// Controles en pantalla
let sliderControl, botParar, botPausarGrabacion, botonPausa, botReiniciar, botEmpezar, botFuenteMenos, botFuenteMas, botGravedadMas, botGravedadMenos, botBum, botReproducir, botonPlay;


// *********************************************************************
// preload()
// Carga de assets
// *********************************************************************
function preload() {
  fuente = loadFont('assets/UOCSans-Bold.otf');
  fondoPNG = loadImage('assets/fondo.png');
}

// *********************************************************************
// setup()
// Mínimos ajustes globales
// Creación de slider de reproducción y botones de control
// *********************************************************************
function setup() {
  colorMode(HSL);
  imageMode(CENTER);
  windowResized();

  sliderControl = createSlider(0, 0, 0);
  sliderControl.attribute('id', 'sliderControl')

  botParar = createButton('Parar');
  botParar.mousePressed(pararGrabacion);

  botPausarGrabacion = createButton('Pausa')
  botPausarGrabacion.mousePressed(pausarGrabacion);
  botPausarGrabacion.attribute('id', 'botonPausa')
  botonPausa = document.getElementById("botonPausa")

  botReiniciar = createButton('Reset')
  botReiniciar.mousePressed(reiniciar);

  botFuenteMas = createButton('→');
  botFuenteMas.mousePressed(fuenteMas);

  botFuenteMenos = createButton('←');
  botFuenteMenos.mousePressed(fuenteMenos);

  botGravedadMenos = createButton('↓');
  botGravedadMenos.mousePressed(gravedadMenos);

  botGravedadMas = createButton('↑');
  botGravedadMas.mousePressed(gravedadMas);

  botBum = createButton('×');
  botBum.mousePressed(explota);

  botEmpezar = createButton('Empezar');
  botEmpezar.mousePressed(empezar);

  botReproducir = createButton('Play');
  botReproducir.mousePressed(reproducir);
  botReproducir.attribute('id', 'botonPlay')
  botonPlay = document.getElementById("botonPlay")
}

// *********************************************************************
// *********************************************************************
// *********************************************************************
// draw()
// Está dividido en fases de animación
// *********************************************************************
// *********************************************************************
// *********************************************************************
function draw() {

  // Fase 0. Reiniciar -------------------------------------------------
  if (faseAnima == 0) {
    inicializarTodo();
    faseAnima = 1;
  }

  // Dibujamos el fotograma --------------------------------------------
  dibujarFondo();
  dibujaPeli(posPeli);
  dibujaControles();


  // Fases Animación
  switch (faseAnima) {

    case 1: // Instrucciones antes de la animación --------------------
      instrucciones();
      break;

    case 2: // Animación pendulo --------------------------------------

      // A empujar
      if ((penAng < 0.01 && penAng > -0.01) && (penVel < 0.0001 && penVel > -0.0001)) {
        fill(20);
        noStroke();
        textSize(60);
        textStyle(BOLD)
        textAlign(CENTER, CENTER)
        text('¡¡EMPUJA!!', width / 2, height * 0.75)
      }

      // Si se acaba la mecha vamos a explotar
      if (posPeli > tiempoMecha) {
        faseAnima = 4
      }

      // Para el cambio de fondo. Parte 1
      penAngPre = penAng;

      // Movimiento pendular
      penAce = (-penGra / penCue) * sin(penAng)
      penVel += penAce;
      // Evitamos que de la vuelta
      let penAngCalc = penAng + penVel;
      penAng = abs(penAngCalc) < PI * 0.75 ? penAngCalc : penAng;
      penVel *= penAmo;

      // Para el cambio de fondo. Parte 2
      if ((penAng > 0 && penAngPre < 0) || (penAng < 0 && penAngPre > 0)) {
        cambiarFondo = true;
      }

      // Guardo el fondo
      guardarFondo();

      // Recorrido por las partículas
      for (let j = 0; j < txtPalabra.length; j++) {
        for (let i = 0; i < fragmentos; i++) {
          // Guardo la nueva posición del fragmento
          guardaFotograma(j, i);

          // Ajuste por si ha cambiado el tamaño de letra
          ajusteFuente(j, i);

          if (penAng < 0) {
            // Ajuste letra final
            bum[txtPalabra.length - 1][i].a = 0
            bum[txtPalabra.length - 1][i].x = bum[txtPalabra.length - 1][i].xOri
            bum[txtPalabra.length - 1][i].y = zeroY - penCue
            if (j == 0) {
              bum[j][i].a = -penAng
              bum[j][i].x = bum[j][i].xOri + sin(penAng) * penCue
              bum[j][i].y = (cos(penAng) * penCue) - penCue
            }
          } else {
            // Ajuste letra inicial
            bum[0][i].a = 0
            bum[0][i].x = bum[0][i].xOri
            bum[0][i].y = zeroY - penCue
            if (j == txtPalabra.length - 1) {
              bum[j][i].a = -penAng
              bum[j][i].x = bum[j][i].xOri + sin(penAng) * penCue
              bum[j][i].y = (cos(penAng) * penCue) - penCue
            }
          }
        } // For i
      } // For j

      // Una vez almacenado, avanzamos el fotograma
      posPeli++;
      break;

    case 4: // Inicialización de la explosión --------------------------

      // Guardo el fondo porque se guarda un fotograma
      guardarFondo();

      // Recorrido por las partículas para inicializar los fragmentos
      for (let j = 0; j < txtPalabra.length; j++) {
        for (let i = 0; i < fragmentos; i++) {

          // Guardo la nueva posición del fragmento
          guardaFotograma(j, i)

          // Nuevos valores para los fragmentos
          let velocidad = abs(floor(randomGaussian(80, 50)));
          let angulo = (TWO_PI / fragmentos) * i;
          let rota = random(PI * 0.1, -PI * 0.1)
          bum[j][i].vX = (cos(angulo) * velocidad) / 4;
          bum[j][i].vY = (sin(angulo) * velocidad) / 4;
          bum[j][i].a = angulo;
          bum[j][i].r = rota;
          bum[j][i].s = bum[j][i].s * random(0.5, 1)
          bum[j][i].b = false;
        }
      }

      // Una vez almacenado, avanzamos el fotograma
      posPeli++;

      // Inicializamos el contador de duración de la explosión
      iniPeli = millis();

      // Y cambiamos de fase
      faseAnima = 5;
      break;

    case 5: // Animación de la explosión -------------------------------

      // Si no ha pasado el tiempo de visualización de la explosión...
      if (millis() < iniPeli + tiempoPeliBum * 1000) {

        // Guardo el fondo
        guardarFondo();

        // Recorrido por las partículas
        for (let j = 0; j < txtPalabra.length; j++) {
          for (let i = 0; i < fragmentos; i++) {

            // Guardo la nueva posición del fragmento
            guardaFotograma(j, i)

            // Y modifico su posición añadiendo la velocidad
            bum[j][i].x += bum[j][i].vX
            bum[j][i].y += bum[j][i].vY

            // Modificamos el ángulo
            bum[j][i].a += bum[j][i].r

            // Aplicamos la fricción en sentido opuesto a la aceleración
            if (bum[j][i].vX > 0) {
              bum[j][i].vX -= friccion;
            } else {
              bum[j][i].vX += friccion;
            }

            // La gravedad siempre empuja hacia abajo
            bum[j][i].vY += gravedad;

            // Comprobar rebotes eje X
            if (bum[j][i].x < -zeroX) {
              bum[j][i].x = -zeroX;
              bum[j][i].vX = -bum[j][i].vX * 0.6;
            }
            if (bum[j][i].x > width - zeroX) {
              bum[j][i].x = width - zeroX;
              bum[j][i].vX = -bum[j][i].vX * 0.6;
            }

            if (bum[j][i].y > height - zeroY) {
              bum[j][i].y = height - zeroY;
              bum[j][i].vY = -bum[j][i].vY * 0.3;
            }
            if (bum[j][i].y < -zeroY) {
              bum[j][i].y = -zeroY;
              bum[j][i].vY = -bum[j][i].vY * 0.8;
            }

          }
        }

        // Una vez almacenado, avanzamos el fotograma
        posPeli++;

      } else {
        // Hemos llegado al límite de tiempo de la explosión 
        // y cambiamos a la nevada
        faseAnima = 7;
      }
      break;

    case 7: // Nevada ------------------------------------------------

      // Si no hemos llegado al límite de grabación
      if (posPeli < maxPeli) {

        // Guardo el fondo
        guardarFondo();

        // Recorrido por las partículas
        for (let j = 0; j < txtPalabra.length; j++) {
          for (let i = 0; i < fragmentos; i++) {

            // Guardo la nueva posición del fragmento
            guardaFotograma(j, i)

            // Leemos el copo
            let copoLetra = bum[j][i].l
            let copoX = bum[j][i].x
            let copoY = bum[j][i].y
            let copoSize = bum[j][i].s

            // Ajustamos las velocidades verticales
            let copoVy = bum[j][i].vY
            if (copoVy < map(copoSize, fuenteMinSize, fuenteSize, 0.5, 1.5, true)) {
              bum[j][i].vY += 0.1;
              copoVy = bum[j][i].vY
            }
            if (copoVy > map(copoSize, fuenteMinSize, fuenteSize, 0.5, 1.5, true)) {
              bum[j][i].vY -= 0.1;
              copoVy = bum[j][i].vY
            }

            // Ajustamos las velocidades horizontales
            let copoVx = bum[j][i].vX
            if (copoVx < -0.5) {
              bum[j][i].vX += 0.1;
              copoVx = bum[j][i].vX
            }
            if (copoVx > 0.5) {
              bum[j][i].vX -= 0.1;
              copoVx = bum[j][i].vX;
            }

            // Ajustamos la velocidad de rotación
            let copoRot = bum[j][i].a;
            let copoVelRot = bum[j][i].r;
            if (copoVelRot < -PI / 45 || copoVelRot > PI / 45) {
              bum[j][i].r = random(-PI / 45, PI / 45);
              copoVelRot = bum[j][i].r;
            }

            let copoCol = bum[j][i].c;

            // Rotación
            bum[j][i].a += copoVelRot;
            // Posición Y
            bum[j][i].y += copoVy;
            bum[j][i].y += vientoY * map(copoSize, fuenteSize * 0.5, fuenteSize, 2, 1, true)
            //copo[i].velY += copoAy;
            // Posición X
            bum[j][i].x += copoVx
            bum[j][i].x += vientoX * map(copoSize, fuenteSize * 0.5, fuenteSize, 2, 1, true)

            // Sopla el viento
            if (mouseIsPressed) {
              vientoX += movedX / 10000;
              vientoY += movedY / 10000;
            }
            if (abs(vientoX) > 0) {
              vientoX *= 0.99995;
            }
            if (abs(vientoY) > 0) {
              vientoY *= 0.99995;
            }

            // Comprobamos si ha salido por abajo o por arriba
            if (bum[j][i].y < -height / 2 - copoSize || bum[j][i].y > height / 2 + copoSize) {
              // Lo pasamos al otro lado del canva
              bum[j][i].y = bum[j][i].y < -height / 2 - copoSize ? height / 2 + copoSize : -height / 2 - copoSize;
              // Y cambiamos el fragmento para que no se note
              bum[j][i].l = random(txtPalabra.split(''));
              let minSize = 2;
              let maxSize = 18;
              let size = random(minSize, maxSize);
              bum[j][i].s = size;
              bum[j][i].vY = map(size, minSize, maxSize, 0.5, 1.5, true);
              bum[j][i].vX = random(0.5, -0.5);
              bum[j][i].a = random(0, TWO_PI);
              bum[j][i].r = random(-PI / 45, PI / 45);
            }

            // Comprobamos si ha salido por los lados
            if (bum[j][i].x < -width / 2 - copoSize || bum[j][i].x > width / 2 + copoSize) {
              // Lo pasamos al otro lado del canva
              bum[j][i].x = bum[j][i].x < -width / 2 - copoSize ? width / 2 + copoSize : -width / 2 - copoSize;
              // Y cambiamos la letra para que no se note
              bum[j][i].l = random(txtPalabra.split(''));
            }
          }
        }
        // Una vez modificadas las partículas, avanzamos el fotograma
        posPeli++;
      } else {
        // Hemos llegado al minuto de peli o detenido la grabación
        pararGrabacion();
      }
      break;

    case 10: // Reproducción de la película ----------------------------
      if (reproduccionPausada) {
        posPeli = sliderControl.value()
      } else {
        posPeli = posPeli < finPeli ? posPeli + 1 : posPeli
        sliderControl.value(posPeli)
      }
      if (posPeli == finPeli) {
        reproduccionPausada = true
      }
      break;
  }
}


// *********************************************************************
// inicializarTodo()
// Al reiniciar inicialiamos todos los valores
// *********************************************************************
function inicializarTodo() {
  // Palabra por defecto
  txtPalabra = 'UOC'

  // Origen global
  zeroX = width / 2;
  zeroY = height / 2;

  // Control de reproducción
  sliderControl.hide();
  reproduccionPausada = true;

  // Inicizar péndulo **************************************************
  // La gravedad  del pédulo es diferente de la de la explosión
  // para poder interactuar con ella
  penGra = 0.9 // Gravedad
  penCue = height / 2; // Longitud de la cuerda
  penAng = 0; // Angulo del pédulo
  penVel = 0; // Velocidad del pédulo
  penAce = 0; // Aceleración del péndulo
  penAmo = 0.995; // Amortiguación del péndulo

  // Inicializar fondo aleatorio ***************************************
  colorFondo = 0; // Empezamos con fondo rojo
  brilloFondo = 85;
  cambiarFondo = false; // El cambio lo marca el golpe de péndulo
  fondoRitmo = 2000; // Ritmo rotación-pausa

  // Cálculo del número de mosaicos
  fondoW = ceil(width / 50);
  fondoH = ceil(height / 50);
  numMosaicos = fondoW * fondoH;

  // Generamos un array con las rotaciones aleatorias de los mosaicos
  // para que no cambien constantemente y no usar una semilla
  rotaMosaico = [];
  for (let i = 0; i < numMosaicos; i++) {
    rotaMosaico.push(round(random(3)));
  }

  // Array que almacenará los colores de fondo
  arrayFondo = [];

  // Valores iniciales para la fuente *********************************
  fuenteSize = 18;
  fuenteColor = 50;

  // La nevada empieza sin viento **************************************
  vientoX = 0;
  vientoY = 0;

  // Instrucciones. Control tiempo repetición tecla de borrado
  tiempoTecla = millis();

  // Inicializamos la animación
  inicializarAnimacion();
}

// *********************************************************************
// inicializarAnimacion()
// Aquí inicializamos todo lo que tiene que ver con la animación
// que vamos a almacenar. El fondo es independiente de la animación
// por lo que no se invoca aquí.
// *********************************************************************
function inicializarAnimacion() {
  inicializarChispas();
  inicializarBum();
  inicializarPeli();
}


// *********************************************************************
// inicializarChispas()
// Solo almacenamos el retardo de la chispa en cada cuerda.
// Durante la reproducción siempre están activas 
// *********************************************************************
function inicializarChispas() {
  retardoChispas = [];
  for (let i = 0; i < txtPalabra.length; i++) {
    retardoChispas[i] = random(1, 1.15);
  }
}

// *********************************************************************
// inicializarBum()
// Inicializamos el array de fragmentos y otras variables que les
// afectarán durante la explosión
// *********************************************************************
function inicializarBum() {
  // Inicialización variables explosión
  friccion = 0.01;
  gravedad = 0.1;
  tiempoMecha = 600; // 10 segundos * 60 fotogramas
  fuenteMinSize = fuenteSize * 0.3

  // Inicializo el array
  // Un elemento por letra
  bum = new Array(txtPalabra.length);

  // Y el número de fragmentos lo reparto entre las letras
  fragmentos = Math.round(maxFragmentos / txtPalabra.length);

  // Ahora letra por letra
  for (let j = 0; j < txtPalabra.length; j++) {
    // Creo los array de fragmentos en cada letra
    bum[j] = new Array(fragmentos);
    // Y defino las variables que comparten los fragmentos de la misma letra
    let separa = fuenteSize * 1.5; // Separación entre letras
    let xIni = (-(txtPalabra.length / 2 - 0.5) * separa) + separa * j; // xInicial
    // E inicializo cada fragmento en la posición inicial
    for (let i = 0; i < fragmentos; i++) {
      bum[j][i] = {
        xOri: xIni,
        x: xIni,
        y: 0,
        vX: 0,
        vY: 0,
        a: 0,
        r: 0,
        s: fuenteSize,
        c: fuenteColor,
        l: txtPalabra.substring(j, j + 1),
        b: true
      }
    }
  }
}

// *********************************************************************
// inicializarPeli()
// Inicializamos el array que contendrá la película de los fragmentos
// *********************************************************************
function inicializarPeli() {
  // Inicializo el array para la película
  peli = new Array(txtPalabra.length);

  // Ahora letra por letra
  for (let j = 0; j < txtPalabra.length; j++) {
    // Creo los array que almacenarán la posición de cada fragmento
    peli[j] = new Array(fragmentos);

    // E inicializo con la primera posición de la película de cada fragmento
    for (let i = 0; i < fragmentos; i++) {
      peli[j][i] = new Array(0);
      peli[j][i].push(bum[j][i]);
    }
  }

  // Inicializo la posición de la peli
  posPeli = 0;
}


// ********************************************************************
// Grupo de funciones para gestionar el control de grabación
// y reproduccion de la película
// ********************************************************************
function pararGrabacion() {
  finPeli = posPeli;
  sliderControl.remove();
  sliderControl = createSlider(1, posPeli, finPeli);
  sliderControl.style('width', '300px');
  sliderControl.position(width / 2 - 150, 30);
  sliderControl.attribute('id', 'sliderControl');
  faseAnima = 10;
}
// ********************************************************************
function pausarGrabacion() {
  if (faseAnima != 99) {
    fasePausada = faseAnima;
    faseAnima = 99;
  } else {
    faseAnima = fasePausada;
  }
}
// ********************************************************************
function reproducir() {
  if (!reproduccionPausada) {
    reproduccionPausada = true
  } else {
    reproduccionPausada = false
  }
}
// *********************************************************************
function reiniciar() {
  faseAnima = 0;
}
// *********************************************************************
function empezar() {
  if (faseAnima == 1 && txtPalabra.length > 2) {
    faseAnima = 2; // Empezamos
    tiempoAtenuarControl = millis(); // Set tiempo atenuación
    botEmpezar.hide();
  }
}
// *********************************************************************
function fuenteMenos() {
  if (faseAnima == 1 && fuenteSize > 14) {
    fuenteSize--;
    inicializarAnimacion();
  }
  if (faseAnima == 2 && fuenteSize > 14) {
    fuenteSize--;
  }
}
// *********************************************************************
function fuenteMas() {
  if (faseAnima == 1 && fuenteSize < 36) {
    fuenteSize++;
    inicializarAnimacion();
  }
  if (faseAnima == 2 && fuenteSize < 36) {
    fuenteSize++;
  }
}
// *********************************************************************
function ajusteFuente(j, i) {
  let separa = fuenteSize * 1.5; // Separación entre letras
  let xOri = (-(txtPalabra.length / 2 - 0.5) * separa) + separa * j;
  bum[j][i].xOri = xOri;
  bum[j][i].s = fuenteSize;
}
// *********************************************************************
function gravedadMenos() {
  if (faseAnima == 1 || faseAnima == 2) {
    penGra = penGra > 0.1 ? ((penGra * 10 - 1) / 10).toFixed(1) : 0.1;
  }
}
// *********************************************************************
function gravedadMas() {
  if (faseAnima == 1 || faseAnima == 2) {
    penGra = penGra < 3 ? ((penGra * 10 + 1) / 10).toFixed(1) : (3).toFixed(1);
  }
}
// *********************************************************************
function explota() {
  if (faseAnima == 2) {
    faseAnima = 4;
  }
}


// ***********************************************************************
// dibujaControles()
// La usamos para dar velocidad al péndulo 
// ***********************************************************************
function dibujaControles() {

  // En fases 0 y 1 no se muestran los controles de grabación
  if (faseAnima < 2) {
    sliderControl.hide();
    botParar.hide();
    botPausarGrabacion.hide();
    botReiniciar.hide();
    botReproducir.hide();
  }

  // En fase 2 se muestran los controles de tamaño de fuente, 
  // gravedad y ¡Bum!, en la esquina inferior derecha
  if (faseAnima == 2) {

    // Ajuste de los botones con CSS
    botFuenteMenos.attribute('style', 'position: absolute; left: ' + (width - 100) + 'px; width: 24px; height: 24px; top: ' + (height - 100) + 'px; background-color: #444444; outline: none; border: none; border-radius: 20px; font-size: 12px; font-family: Roboto; color: #FFFFFF; cursor: pointer');

    botFuenteMas.attribute('style', 'position: absolute; left: ' + (width - 100 + 56) + 'px; width: 24px; height: 24px; top: ' + (height - 100) + 'px; background-color: #444444; outline: none; border: none; border-radius: 20px; font-size: 12px; font-family: Roboto; color: #FFFFFF; cursor: pointer');

    botGravedadMenos.attribute('style', 'position: absolute; left: ' + (width - 100 + 28) + 'px; width: 24px; height: 24px; top: ' + (height - 100 + 28) + 'px; background-color: #444444; outline: none; border: none; border-radius: 20px; font-size: 12px; font-family: Roboto; color: #FFFFFF; cursor: pointer');

    botGravedadMas.attribute('style', 'position: absolute; left: ' + (width - 100 + 28) + 'px; width: 24px; height: 24px; top: ' + (height - 100 - 28) + 'px; background-color: #444444; outline: none; border: none; border-radius: 20px; font-size: 12px; font-family: Roboto; color: #FFFFFF; cursor: pointer');

    botBum.attribute('style', 'position: absolute; left: ' + (width - 100 + 28) + 'px; width: 24px; height: 24px; top: ' + (height - 100) + 'px; background-color: #444444; outline: none; border: none; border-radius: 20px; font-size: 12px; font-family: Roboto; color: #FFFFFF; cursor: pointer');

  } else {

    // En el resto de fases se ocultan estos botones de control
    botBum.hide();
    botFuenteMas.hide();
    botFuenteMenos.hide();
    botGravedadMas.hide();
    botGravedadMenos.hide();
  }

  // Excepto en las fases 0, 1 y 10, 
  // se muestran los controles de reproducción
  if (faseAnima != 0 && faseAnima != 1 && faseAnima != 10) {

    let anchoControl = 604;

    // Gestión de atenuación de los controles
    if (millis() > tiempoAtenuarControl + 3000) {
      controlAlpha = '22';
    } else {
      controlAlpha = '66';
    }
    // Comprobar si estamos sobre el control
    if (mouseX > width / 2 - anchoControl / 2 && mouseX < width / 2 + anchoControl / 2 && mouseY > 25 && mouseY < 55) {
      controlAlpha = 66;
      tiempoAtenuarControl = millis();
    }

    // Modificamos los atributos de los botones y los visualizamos
    // al cambiar su estilo CSS
    let elementosAlpha = controlAlpha == '22' ? '33' : 'FF'

    // Ajuste de los botones con CSS
    botParar.attribute('style', 'position: absolute; left: ' + (width / 2 + 200) + 'px; top: 31px; background-color: #00000000; outline: none; border: 1px solid #FFFFFF' + elementosAlpha + '; border-radius: 20px; font-size: 12px; font-family: Roboto; color: #FFFFFF' + elementosAlpha + '; cursor: pointer');

    botReiniciar.attribute('style', 'position: absolute; left: ' + (width / 2 + 250) + 'px; top: 31px; background-color: #FF0000' + elementosAlpha + '; outline: none; border: 1px solid #FF0000' + elementosAlpha + '; border-radius: 20px; font-size: 12px; font-family: Roboto; color: #FFFFFF' + elementosAlpha + '; cursor: pointer');

    botPausarGrabacion.attribute('style', 'position: absolute; left: ' + (width / 2 - 228) + 'px; top: 31px; width: 70px; background-color: #00000000; outline: none; border: 1px solid #FFFFFF' + elementosAlpha + '; border-radius: 20px; text-align: left; font-size: 12px; font-family: Roboto; color: #FFFFFF' + elementosAlpha + '; cursor: pointer');

    // Fondo de los controles
    rectMode(CENTER);
    fill('#000000' + controlAlpha);
    noStroke();
    rect(width / 2, 40, anchoControl, 30, 15);

    // Punto de grabación
    if (faseAnima == 99) {
      fill('#FFFFFF' + elementosAlpha);
      botonPausa.innerHTML = 'Grabar'
    } else {
      fill('#FF0000' + elementosAlpha);
      botonPausa.innerHTML = 'Pausar'
    }
    circle(width / 2 - 168, 40, 10)

    // Textos
    fill('#FFFFFF' + elementosAlpha);
    textFont('Roboto');
    textStyle(NORMAL)
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Grabando', width / 2 - anchoControl / 2 + 12, 40);
    text('1 min.', width / 2 + 160, 40);

    // Linea de máximo tiempo de grabación
    stroke('#FFFFFF' + elementosAlpha);
    strokeWeight(4);
    line(width / 2 - 150, 40, width / 2 + 150, 40);

    // Línea de grabación
    stroke('#FF0000' + elementosAlpha);
    line(width / 2 - 150, 40, map(posPeli, 0, maxPeli, width / 2 - 150, width / 2 + 150), 40);
  }

  if (faseAnima == 10) {

    // Ocultamos los botones que no utilizamos
    botParar.hide();
    botPausarGrabacion.hide();

    let anchoControl = 440;

    // Ajuste de los botones con CSS
    botReproducir.attribute('style', 'position: absolute; left: ' + (width / 2 - 210) + 'px; top: 31px; width: 50px; text-align: center; background-color: #00000000; outline: none; border: 1px solid #FFFFFF; border-radius: 20px; font-size: 12px; font-family: Roboto; color: #FFFFFF; cursor: pointer');

    botReiniciar.attribute('style', 'position: absolute; left: ' + (width / 2 + 160) + 'px; top: 31px; width: 50px; text-align: center; background-color: #FF0000; outline: none; border: 1px solid #FF0000; border-radius: 20px; font-size: 12px; font-family: Roboto; color: #FFFFFF; cursor: pointer');

    // Fondo de los controles
    rectMode(CENTER);
    fill('#000000');
    noStroke();

    // Mostramos el slider que controla la reproducción 
    sliderControl.show();

    rectMode(CENTER);
    fill('#00000088');
    rect(width / 2, 40, anchoControl, 30, 15);

    // Boton de reproduccion
    if (reproduccionPausada) {
      fill('#FF0000');
      botonPlay.innerHTML = 'Play'
    } else {
      fill('#FF0000');
      botonPlay.innerHTML = 'Pausa'
    }


  }
}


// *********************************************************************
// mouseDragged()
// La usamos para dar velocidad al péndulo
// *********************************************************************
function mouseDragged() {
  if (faseAnima == 2) {
    penVel += map(movedX, -width * 0.4, width * 0.4, -0.03, 0.03);
  }
}


// *********************************************************************
// guardaFotograma
// *********************************************************************
function guardaFotograma(indLetra, indFrag) {
  peli[indLetra][indFrag].push({
    xOri: bum[indLetra][indFrag].xOri,
    x: bum[indLetra][indFrag].x,
    y: bum[indLetra][indFrag].y,
    vX: bum[indLetra][indFrag].vX,
    vY: bum[indLetra][indFrag].vY,
    a: bum[indLetra][indFrag].a,
    r: bum[indLetra][indFrag].r,
    s: bum[indLetra][indFrag].s,
    c: bum[indLetra][indFrag].c,
    l: bum[indLetra][indFrag].l,
    b: bum[indLetra][indFrag].b
  })
}


// *********************************************************************
// guardaFotograma
// *********************************************************************
function guardarFondo() {
  arrayFondo.push({
    col: colorFondo,
    bri: brilloFondo
  });
}


// *********************************************************************
// dibujaPeli
// Dibuja un fotograma de la película
// *********************************************************************
function dibujaPeli(f) {
  for (let j = 0; j < txtPalabra.length; j++) {
    for (let i = 0; i < fragmentos; i++) {
      // Dibujo de las partículas en el fotograma concreto
      push();
      translate(zeroX, zeroY) // Nos vamos al origen
      translate(peli[j][i][f].x, peli[j][i][f].y);
      rotate(peli[j][i][f].a);
      textFont(fuente)
      textAlign(CENTER, CENTER);
      textSize(peli[j][i][f].s);
      if (peli[j][i][f].b) {
        // Bolas y Chispas ****************************
        // Posición de la chispa
        let distChispa = map(posPeli, 0, tiempoMecha, -penCue, -(fuenteSize * 1.5) / 2, true) * retardoChispas[j]
        // Mecha quemada
        stroke(0);
        strokeWeight(0.4)
        line(0, distChispa, 0, -penCue);
        // mecha límpia
        stroke(240);
        line(0, 0, 0, distChispa);
        // Vamos a la chispa
        push();
        translate(0, distChispa)
        rotate(random(TAU))
        // Color chispa
        stroke(round(random(0, 60)), 100, 50)
        // Chispa
        line(4, 0, randomGaussian(4, 3), 0);
        pop();
        // La bola
        noStroke();
        fill(peli[j][i][f].c);
        circle(0, 0, peli[j][i][f].s * 1.5);
        fill(255)
        text(peli[j][i][f].l, 0, -peli[j][i][f].s * 0.1);
      } else {
        noStroke();
        fill(peli[j][i][f].c);
        text(peli[j][i][f].l, 0, -peli[j][i][f].s * 0.1);
      }
      pop();
    }
  }
}



// ********************************************************************
// keyPressed()
// Controles de teclado
// ********************************************************************
function keyPressed() {
  switch (faseAnima) {

    case 1: // Tiempo de espera e instrucciones
      switch (keyCode) {
        case 13: // Enter
          empezar();
          break;
        case 37: // Izquierda
          fuenteMenos();
          break;
        case 39: // Derecha
          fuenteMas();
          break;
        case 38: // Flecha arriba
          gravedadMas();
          break;
        case 40: // Flecha abajo
          gravedadMenos();
          break;
      }
      break;

    case 2: // Péndulo
      switch (keyCode) {

        case 38: // Flecha arriba
          gravedadMas();
          break;
        case 40: // Flecha abajo
          gravedadMenos();
          break;
        case 37: // Izquierda
          fuenteMenos();
          break;
        case 39: // Derecha
          fuenteMas();
          break;
        case 82: // [R]einiciar
          reiniciar();
          break;
        case 88: // e[X]plotar
          explota();
          break;
        case 13: // Enter. Detener grabación
          pararGrabacion();
          break;
        case 32: // Espacio. Play/Pausa
          pausarGrabacion();
          break;
      }
      break;

    case 5: // Explosión
    case 7: // Nevada
    case 99: // Pausa
      switch (keyCode) {
        case 13: // Enter. Detener grabación
          pararGrabacion();
          break;
        case 32: // Espacio. Play/Pausa
          pausarGrabacion();
          break;
        case 82: // [R]eset
          faseAnima = 0;
          break;
      }
      break;

    case 10:
      switch (keyCode) {
        case 82: // [R]eset
          faseAnima = 0;
          break;
        case 37: // Izquierda. Retroceder
          posPeli = posPeli > 1 ? posPeli - 1 : posPeli
          sliderControl.value(posPeli)
          break;
        case 39: // Derecha. Avanzar
          posPeli = posPeli < finPeli ? posPeli + 1 : posPeli
          sliderControl.value(posPeli)
          break;
        case 32: // Espacio. Play/Pausa
          reproducir();
          break;
      }
      break;

  }
}


// *********************************************************************
// instrucciones
// *********************************************************************
function instrucciones() {
  
  // Ajustamos los botones con CSS
  botEmpezar.attribute('style', 'position: absolute; left: ' + (width / 2 - 50) + 'px; width: 100px; height: 30px; top: ' + (height / 2 + 155) + 'px; background-color: #444444; outline: none; border: none; border-radius: 20px; font-size: 12px; font-family: Roboto; color: #FFFFFF; cursor: pointer');
  
  botFuenteMenos.attribute('style', 'position: absolute; left: ' + (width / 2 - 340 / 4 - 40) + 'px; width: 24px; height: 24px; top: ' + (height / 2 - 10) + 'px; background-color: #444444; outline: none; border: none; border-radius: 20px; font-size: 12px; font-family: Roboto; color: #FFFFFF; cursor: pointer');
  
  botFuenteMas.attribute('style', 'position: absolute; left: ' + (width / 2 - 340 / 4 + 16) + 'px; width: 24px; height: 24px; top: ' + (height / 2 - 10) + 'px; background-color: #444444; outline: none; border: none; border-radius: 20px; font-size: 12px; font-family: Roboto; color: #FFFFFF; cursor: pointer');
  
  botGravedadMenos.attribute('style', 'position: absolute; left: ' + (width / 2 + 340 / 4 - 40) + 'px; width: 24px; height: 24px; top: ' + (height / 2 - 10) + 'px; background-color: #444444; outline: none; border: none; border-radius: 20px; font-size: 12px; font-family: Roboto; color: #FFFFFF; cursor: pointer');
  
  botGravedadMas.attribute('style', 'position: absolute; left: ' + (width / 2 + 340 / 4 + 16) + 'px; width: 24px; height: 24px; top: ' + (height / 2 - 10) + 'px; background-color: #444444; outline: none; border: none; border-radius: 20px; font-size: 12px; font-family: Roboto; color: #FFFFFF; cursor: pointer');
  
  botBum.attribute('style', 'position: absolute; left: ' + (width / 2 - 12) + 'px; width: 24px; height: 24px; top: ' + (height / 2 - 10) + 'px; background-color: #888; outline: none; border: none; border-radius: 20px; font-size: 12px; font-family: Roboto; color: #FFFFFF;');

  // La mancha
  noStroke();
  fill('#FFFFFFDD')
  rectMode(CENTER)
  rect(width / 2, height / 2, 340, 420, 20)

  // Encabezado
  textFont('Roboto');
  textAlign(CENTER);
  fill(20);
  textSize(30);
  textStyle(BOLD)
  text('RETO4', width / 2, height / 2 - 170);
  textSize(12);
  textLeading(18)
  textStyle(NORMAL);
  text('LETRAS Y MOVIMIENTOS\n© 2020 Javier Juaristi | ' + version, width / 2, height / 2 - 135);

  // Entrada de texto
  textSize(14);
  text('Escribe un texto de entre 3 y 13 letras', width / 2, height / 2 - 90);

  // Controles
  textStyle(BOLD)
  text('Tamaño', width / 2 - 340 / 4, height / 2 - 22);
  text(fuenteSize, width / 2 - 340 / 4, height / 2 + 4);

  text('¡BUM!', width / 2, height / 2 - 22);

  text('Gravedad', width / 2 + 340 / 4, height / 2 - 22);
  text(penGra, width / 2 + 340 / 4, height / 2 + 4);

  // Instrucciones
  rectMode(CENTER)
  textStyle(NORMAL)
  text('Ahora y durante la fase de péndulo puedes cambiar el tamaño de fuente y la gravedad con los botones en pantalla o los cursores. Para mover el péndulo arrastra el ratón.\nDurante la fase de la nevada de letras puedes arrastrar el ratón para generar viento.', width / 2, height / 2 + 85, 300, 160)
  //text('[D]etonar [R]einiciar', width / 2, height / 2 + 130)

  entrarPalabra(width / 2, height / 2 - 60);
  if (txtPalabra.length < 3) {
    stroke('#CC0000');
    strokeWeight(4);
    rectMode(CENTER);
    noFill();
    rect(width / 2, height / 2 - 60, 290, 35, 8)
    noStroke();
    textSize(10);
    fill('#CC0000');
    textAlign(CENTER)
    text('Mínimo 3 caracteres', width / 2, height / 2 - 60);
  }
}

// ********************************************************************
// entrarPalabra
// Entrada de texto.
// Ahora se que podría cambiarla por un input, pero no se si pasará
// como con el slider y no podré manipular el CSS.
// Tengo que probar.
// ********************************************************************
function entrarPalabra(entraX, entraY) {
  rectMode(CENTER);
  fill(60);
  noStroke();
  rect(entraX, entraY - 1, 290, 35, 8)
  fill(240);
  textSize(20);
  textAlign(LEFT, CENTER)

  // Cursor parpadeando
  let t = millis() % 1000
  let texto = t < 250 || (t > 500 && t < 750) ? txtPalabra : txtPalabra + '_'
  // Escribir palabra
  noStroke();
  text(texto, entraX - 135, entraY)

  // Borrar caracter
  if (keyIsPressed) {
    if (keyCode == 8 && txtPalabra.length > 0 && millis() > tiempoTecla + frecTecla) {
      tiempoTecla = millis();
      txtPalabra = txtPalabra.substring(0, txtPalabra.length - 1);
      inicializarAnimacion();
    }
  }
}

// *********************************************************************
// keyTyped
// La utilizo en combinación con entrarPalabra
// *********************************************************************
function keyTyped() {
  if (faseAnima == 1 && txtPalabra.length < maxPalabra && keyCode != 13) {
    txtPalabra += key.toUpperCase();
    inicializarAnimacion();
  }
}

// *********************************************************************
// dibujarFondo
// *********************************************************************
function dibujarFondo() {

  if (faseAnima == 10 || faseAnima == 99) {
    colorFondo = arrayFondo[posPeli - 1].col
    brilloFondo = arrayFondo[posPeli - 1].bri
  } else {
    // Si toca cambiar de color
    if (cambiarFondo) {
      // Avanzamos entre 25 y 45 grados
      colorFondo = colorFondo + round(random(25, 45));
      // Si pasa de 360, hemos dado una vuelta
      colorFondo = colorFondo > 360 ? colorFondo - 360 : colorFondo;
      // Desactivamos el cambio de color de fondo
      cambiarFondo = false;
    }
    // Aplicamos el color con poca saturación y mucho brillo (tono pastel)
    if (faseAnima == 7) {
      if (brilloFondo < 100) {
        brilloFondo += 0.1;
      }
    } else {
      brilloFondo = 85;
    }
  }
  background(colorFondo, 25, brilloFondo);

  // El mosaico
  let contaMosaicos = numMosaicos - 1
  for (let i = 0; i < fondoH; i++) {
    for (let j = 0; j < fondoW; j++) {
      let ms = fondoRitmo;
      let m = millis();
      let mMod = m % (ms * 4);
      let rotaMas;
      if (mMod < ms) {
        rotaMas = 0;
      } else if (mMod < ms * 2) {
        rotaMas = (HALF_PI / ms) * (mMod - ms)
      } else if (mMod < ms * 3) {
        rotaMas = HALF_PI;
      } else {
        rotaMas = (HALF_PI / ms) * (mMod - ms * 2)
      }

      push();
      translate(25 + j * 50, 25 + i * 50);
      rotate(rotaMosaico[contaMosaicos] * HALF_PI + rotaMas);
      contaMosaicos--;
      image(fondoPNG, 0, 0)
      pop();
    }
  }
}

// ********************************************************************
// windowResized
// ********************************************************************
function windowResized() {
  canvasW = windowWidth > canvasMinW ? windowWidth : canvasMinW;
  canvasH = windowHeight > canvasMinH ? windowHeight : canvasMinH;
  resizeCanvas(canvasW, canvasH);

  // Al redimensionar reiniciamos todo
  faseAnima = 0;
}