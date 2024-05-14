/*
*******************************************************************
Notas PEC
---------
No había hecho algo así nunca y ha sido muy divertido, aunque a veces ha podido ser algo estresante, sobre todo cuando no encuentras un error.

El proceso has sido bastante sinuoso. Empecé dibujando a Six Eyes sobre un canva de 300x300 píxeles y pensé en hacer que los ojos mirasen al ratón, así que me puse a repasar trigonometría para hacer una función que calculase el angulo entre dos puntos. Después de haberlo conseguido pensé que no se me ocurrió mirar si P5 tenía algo así, y resultó que si. En fin, ya estaba hecho, así que he seguido con mi función.

Una vez conseguí que los ojos 'mirasen', pensé en que además podía hacer que se moviesen arrastrando los tentáculos... la cosa empezaba a expandirse.

No fue muy sencillo lo de los tentáculos y creo que alguna versión anterior me gustaba más, pero sobre esta última, aunque no me termina de convencer, tengo más control y podría haber seguido mejorándola de haber contado con algo más de tiempo.

Esto me exigió rediseñar el código por primera vez para tener todo más ordenado.

Con los ojos ya moviéndose, añadí la visita del vecino aprovechando que solo me exigía dibujarlo y marcarlo como objetivo de la mirada.

Aquí pensé en usar algún sonido para el saludo y descubrí como funcionaba la reproducción de sonidos en P5. Además modifique el paseo del vecino usando el reloj y la función seno para escalarlo y modificar su trayectoria haciendo que parezca que se acerca, reduce la velocidad y se aleja acelerando.

A todo esto, se me ocurrió utilizar alguno de los invasores de 8 bits que habíamos realizado en las PECs y creé el ataque de Space Invaders. Al principio solo les atacaba Six Eyes sin demasiado control. Me costó simular el efecto de la recreativa y cuando decidí que el usuario podría intervenir, me vi obligado a reescribir el código por segunda vez.

La intervención del usuario es lo que más guerra me ha dado con diferencia. Es lo último que he terminado de hacer dado la cantidad de interacciones implicadas, pero estoy contento con el resultado. Solo me queda pena de no haber tenido tiempo de hacer que los invasores atacasen y Six Eyes se defendiera de los disparos dividiendo sus ataques y destruyendo los misiles antes de ser alcanzado. O dejando que alguno le impacte y le chamusque un poco, que esto habría sido más sencillo.

En medio del ataque, lo dejé a un lado por que me estaba saturando y pensé que ya que seguía el cursor con la mirada, podría hacer que le lanzara una pelota para que la siga. Tras un poco más de mates para ver como realizar la trayectoria (en realidad desistí de hacer una simulación más realista), una pelea con el cálculo de la velocidad e incorporar un PNG, conseguí lo que quería pero no iba a hacer que Six Eyes saliera corriendo a por la pelotita (aunque lo pensé), así que se me ocurrió lo de los mensajes en bocadillo.

Esto de los mensajes parecía una tontería pero para poder hacer unos bocadillos aleatorios, necesitaba conocer cuantas líneas de texto debía acoger así que realicé una función que lo calculase. Les añadí además algo de balanceo con millis y seno. Lo del troleo con el susto lo añadí más tarde mientras iba escribiendo las frases que piensa Six Eyes cada vez que lanzamos la pelotita.

El código ya había crecido bastante y volvía reescribirlo para gestionar los eventos en base a estados y fases. Añadí la retícula del canva original sobre el que dibujé inicialmente a Six Eyes para orientarme con las coordenadas. En ese momento tenía las coordenadas originales, las escaladas y las que usaban los Space Invader, y me estaba enredando.

El panel del 'cerebro' de Six Eyes fue de mucha ayuda. Hasta entonces estaba usando la consola, pero poder ver determinadas variables en tiempo real ha sido clave para no quedar atascado.

Con el código ya mejor ordenado y tan solo a falta de arreglar los Space Invaders de forma definitiva, curioseando encontré la función erase() y tuve que hacer lo de el apagón. No pude resistirme.

Añadí la pantalla de bienvenida y las instrucciones, y lo dejé listo para entregar.

Bueno, en realidad tenía muchas ideas más que no pude empezar, así que voy a dejarlas anotadas aquí por si algún día pudiera retomarlo:

- Estirar un tentáculo y que rebotase como un muelle (esto es lo que más pena me da no haber podido hacerlo).

- Añadir una paleta de colorear para cambiar los colores con un selector y un pincel.

- Incorporar una entrada de texto o micrófono para que diga lo que queramos con un bocadillo y la voz distorsionada (esto no se como hacerlo pero quería investigar las funciones de audio de P5 o quizás con las capacidades lectoras del sistema).

- Un salvapantallas usando los diseños iterativos de la anterior PEC.

- Una lluvia de objetos que rebotan en Six Eyes.

- Un terremoto.

En fin, eso es todo. No puedo dedicarle más tiempo teniendo mas entregas que hacer de otras asignaturas. Lástima porque me lo estaba pasando muy bien.

Javier Juaristi

22 de noviembre de 2020

Rev.: Al final no he podido dejarlo así y he añadido rebote a la pelota, que se vean un monton de cosas dentro de Six Eyes y recortado el número de frases para el susto y he reducido el tamaño de la horda de invasores y aumentado la velocidad de simulación para que no dure tanto tiempo.

Que pena no haber tenido una semanita más ¯\_(ツ)_/¯

Javier Juaristi

24 de noviembre de 2020

**********************************************************************
*/

// *******************************************************************
// HISTORIAL DE VERSIONES
// ----------------------
// v.01 - Primer dibujo. 
//        Six Eyes ya mira.
// v.02 - Seguimiento de un objetivos v.01
// v.03 - Seguimiento de objetivos v.02
// v.04 - Rediseño del código.
//        Ha llegado el vecino.
// v.05 - Cambio array de ojo por objeto.
//        Mejora de tentáculos. 
//        Seguimiento v.03.
// v.06 - Ataque invasores.
//        ¡Busca la pelotita!
// v.07 - Six Eyes' brain.
//        Luces fuera.
//        Rediseño del código.
// v.08 - Instrucciones
//        Versión estable para entregar
// *******************************************************************

// Flags
let flags = true; // Activa el control de flags con el teclado
let verCanvaOriginal = false;
let verBezierTentaculos = false;
let cuerpo = true;
let variables = false;
let verHitBox = false;
let verControles = false;
let verBienvenida = true;

// Version actual
const version = 'v.0.8.3.WIP';

// Tamaño del canvas original ** NO TOCAR **
const canvasH = 300;

// Variables del canvas
let canvasW, canvasWescalado, canvasHescalado, escala;

// Paleta de color
const azulH = 201;
const azulS = 75;
const verdeH = 120;
const verdeS = 100;
const rojoH = 0;
const rojoS = 100;

// Colores solidos
let colBlanco, colNegro, colAzul, colVerde, colRojo;
// Colores transparentes
let colSombra, colRayosX;
// Colores de partes
let colFondo, colPiel, colOjo, colPupila, colReflejo;

// Posicion Six Eyes
let sixEyesXpos, sixEyexYpos;

// -------------------------------------------------------------------
let estadoSixEyes;
// ---------------
//  0 : Standby
//  1 : Pelotita
//  2 : Visita
//  3 : Ataque
//  4 : Apagon
//  5 : Asustar
//  ...
//  9 : Reiniciar
// -------------------------------------------------------------------

let ojitos = new Array(6);

ojitos[0] = {
  xNat: -75,
  yNat: -112,
  sNat: 38,
  xMin: -105,
  xPos: -75,
  xMax: -45,
  yMin: -90,
  yPos: -112,
  yMax: -132,
  xDesc: 0,
  yDesc: 0,
  estado: 0
};

ojitos[1] = {
  xNat: -45,
  yNat: -172,
  sNat: 38,
  xMin: -75,
  xPos: -45,
  xMax: -15,
  yMin: -110,
  yPos: -172,
  yMax: -192,
  xDesc: 0,
  yDesc: 0,
  estado: 0
};

ojitos[2] = {
  xNat: -15,
  yNat: -145,
  sNat: 38,
  xMin: -45,
  xPos: -15,
  xMax: 15,
  yMin: -122,
  yPos: -145,
  yMax: -165,
  xDesc: 0,
  yDesc: 0,
  estado: 0
};

ojitos[3] = {
  xNat: 15,
  yNat: -185,
  sNat: 38,
  xMin: -15,
  xPos: 15,
  xMax: 45,
  yMin: -122,
  yPos: -185,
  yMax: -205,
  xDesc: 0,
  yDesc: 0,
  estado: 0
};

ojitos[4] = {
  xNat: 45,
  yNat: -158,
  sNat: 38,
  xMin: 15,
  xPos: 45,
  xMax: 75,
  yMin: -110,
  yPos: -158,
  yMax: -178,
  xDesc: 0,
  yDesc: 0,
  estado: 0
};

ojitos[5] = {
  xNat: 75,
  yNat: -105,
  sNat: 38,
  xMin: 45,
  xPos: 75,
  xMax: 105,
  yMin: -90,
  yPos: -105,
  yMax: -125,
  xDesc: 0,
  yDesc: 0,
  estado: 0
};

let ojoGordo = {
  xNat: 0,
  yNat: -35,
  sNat: 75,
  xPos: 0,
  yPos: -35,
  xDesc: 0,
  yDesc: 0
};

let mirarAlgo, mirarX, mirarY;

// Parpado. Variables globales
let parpadeando, proximoParpadeo, cerrandoOjo, parpadoPos, ojoSombraPos;

// Pelotita. Variables globales
let fasePelotita, pelotitaX, pelotitaY, pelVelX, pelVelY, gravedad, friccion;


// Vecino. Variables globales     
let proximaVisita, faseVisita, velVecino, vecinoPosX, vecinoPosY, ejeVecino, saludoVecino, saludoSixEyes, adiosVecino, bocaAbierta;

// Invasores. Variables globales
let proximoAtaque, faseAtaque, iniAtaque, velCambio, pasCont, pasCambio;
let vPx, anchoHorda, altoHorda, escalaHorda, anchoSprite, altoSprite, setSprites, medV, medH, colDer, colIzq, hordaY, dirHorda, contHorda, pasoInv, targetFijado, targetUsuario, targetX, targetY, cambioTarget, velCPU, cicloCPU, controlMillis, timeMuerte, disparoEn, disparar, invX, invY, invXu, invYu, soloUno, timeSolo;
let hordaInvasores = new Array(5);
let estadoInvasor = new Array(5);
// 
estadoInvasor[0] = new Array(8);
estadoInvasor[1] = new Array(8);
estadoInvasor[2] = new Array(8);
estadoInvasor[3] = new Array(8);
estadoInvasor[4] = new Array(8);

let target = new Array(2);
let marcaUsuario = new Array(2);

let ratonX, ratonY;

let mensajeTXT, mensajeTime, mensajeDuracion, mensajeIni, mensajeFin, mensajeContador, semilla, altoFuenteTXT, interlineaTXT, anchoCajaTXT, altoCajaTXT;

let tiempoSusto, darSusto, faseAsustar;

let proximoApagon, primerApagon, faseApagon, faseApagonTime, oscuridad, linternaX, linternaY, interruptorX, interruptorY, sobreInterruptor, interruptorOn, pulsarOn, mensajeRayosX, rayosX, contaObjetos;

/* 'Hoy estamos un poquito torpes, ¡eh!',
  '¡Y allá va la bola! Ala majo, ve a buscarla',
  '¿Es un pájaro? ¿Es un avión?...',
  '¿En serio? ¿No vas a parar?',
  '¿Te estás quedando conmigo?',
  '¿Has visto alguna vez un perro con seis ojos en la cabeza',
  'Se de alguien que se aburre mucho...',
  '¿No tienes otra cosa que hacer?',
  'Venga... ya está bien',
  'Que paso, tio. ¡Que no!',*/

let frases = [
  '¡Ups! Se te ha caido la pelotita',
  '¡Vaya! Se te ha caido otra vez',
  'Hoy estamos un poquito torpes, ¡eh!',
  '¡Y allá va la bola! Ala majo, ve a buscarla',
  '¿Te estás quedando conmigo?',
  'Otra vez el cansino por aquí',
  '¡Ya está! !Se acabó! Me quedo con la pelotita',
  '...'
]


// ********************************************************************
// Sonidos
// ********************************************************************
let holaVecino, byeVecino, holaSixEyes;
let paso1, paso2, paso3, paso4, muereMaldito, laser1, laser2;
let sonidoSusto;
// ********************************************************************
// Fuentes
// ********************************************************************
let pressStart2P, fredokaOne;
// ********************************************************************
// Gráficos
// ********************************************************************
let sustoJPG, botonPNG, barbiePNG;
let quePelotita;
let rellenoSE = new Array;
let pelotitaPNG = new Array();
pelotitaPNG[0] = {
  PNG: '',
  file: 'pelotita.png',
  size: 30,
  frase: 'Una pelota de tenis. Capitan original al ataque'
};
pelotitaPNG[1] = {
  PNG: '',
  file: 'tierra.png',
  size: 30,
  frase: 'Tal y como está la cosa, mejor la tiramos y compramos una nueva'
};
pelotitaPNG[2] = {
  PNG: '',
  file: 'patito.png',
  size: 30,
  frase: 'Pa-to a-ven-tu-ras, cuack, cuack...'
};
pelotitaPNG[3] = {
  PNG: '',
  file: 'donut.png',
  size: 30,
  frase: 'No se que decir a eso'
};
pelotitaPNG[4] = {
  PNG: '',
  file: 'patito2.png',
  size: 30,
  frase: 'No se que decir a eso'
};
pelotitaPNG[5] = {
  PNG: '',
  file: 'vinilo.png',
  size: 50,
  frase: 'No se que decir a eso'
};



// ********************************************************************
// Precarga de assets
// ********************************************************************
function preload() {
  soundFormats('mp3', 'ogg', 'wav');
  holaVecino = loadSound('assets/neighbor_hello.mp3');
  byeVecino = loadSound('assets/neighbor_bye.mp3');
  holaSixEyes = loadSound('assets/sixEyes_hello.mp3');
  paso1 = loadSound('assets/fastinvader1.wav');
  paso2 = loadSound('assets/fastinvader2.wav');
  paso3 = loadSound('assets/fastinvader3.wav');
  paso4 = loadSound('assets/fastinvader4.wav');
  muereMaldito = loadSound('assets/invaderkilled.wav');
  laser1 = loadSound('assets/shoot1.wav');
  laser2 = loadSound('assets/shoot2.mp3');
  sonidoSusto = loadSound('assets/sonidoSusto.mp3')

  pressStart2P = loadFont('assets/PressStart2P-Regular.ttf');
  fredokaOne = loadFont('assets/FredokaOne-Regular.ttf');

  for (let i = 0; i < pelotitaPNG.length; i++) {
    pelotitaPNG[i].PNG = loadImage('assets/' + pelotitaPNG[i].file);
  }

  botonPNG = loadImage('assets/boton.png');
  sustoJPG = loadImage('assets/susto2.jpg');

}

// ********************************************************************
// ********************************************************************
// setup()
// Llama a windowResized() para el ajuste inicial de la ventana
// e inicializa las variables y los estados
// ********************************************************************
// ********************************************************************
function setup() {
  // Ajusto en canvas a toda la pantalla
  windowResized();

  // Paleta de colores
  colorMode(HSB);

  // Relleno Six Eyes
  let cX = canvasWescalado / 2;
  let cY = canvasHescalado;
  
  contaObjetos = 20;
  let conta = 0
  let maxObjetos = pelotitaPNG.length
  do {
    let objeto = int(random(0, maxObjetos));
    let d = pelotitaPNG[objeto].size
    let x = random(cX - 60, cX + 60)
    let y = random(cY, cY - 60)
    if (dist(x, y, cX, cY) < 90 - d / 2) {
      rellenoSE.push([objeto, x, y])
      conta++;
    }
  } while (conta < contaObjetos)



  colBlanco = color(0, 0, 100);
  colAzul = color(azulH, azulS, 100);
  colVerde = color(verdeH, verdeS, 100);
  colRojo = color(360, 100, 100);
  colNegro = color(0, 0, 0);

  colSombra = color(0, 0, 0, 0.5);
  colRayosX = color(0, 0, 100, 0.5)

  colFondo = colAzul;
  colPiel = colBlanco;
  colOjo = colAzul;
  colPupila = colNegro;
  colReflejo = colBlanco;



  // Estados inicial SixEyex
  estadoSixEyes = 0;

  // Estado inicial invasores
  for (let fInv = 0; fInv < estadoInvasor.length; fInv++) {
    estadoInvasor[fInv].fill(0);
  }

  // Inicializo temporizadores
  proximoParpadeo = millis() + round(random(2000, 10000));
  // Las primeras visitas son tempranas
  proximaVisita = millis() + round(random(20000, 40000));
  proximoApagon = millis() + round(random(30000, 60000));
  proximoAtaque = millis() + round(random(60000, 90000));

  // Mirada
  mirarAlgo = false;
  mirarX = 0;
  mirarY = 0;

  parpadeando = false;

  // faseAtaque = 0;

  // Apagón
  faseApagon = 0;
  primerApagon = true;
  mensajeRayosX = true;
  interruptorX = -100;
  interruptorY = -100;
  pulsarOn = false;
  rayosX = false;
  colRayosX = color(0, 0, 100, 0.5)


  // Mensajes
  mensajeContador = 0;
  mensajeTXT = '';
  mensajeTime = millis();
  mensajeDuracion = 3000;
  mensajeIni = 0;

  darSusto = false;
  faseAsustar = 0;

  quePelotita = 0;

}

// ********************************************************************
// ********************************************************************
// draw()
// He intentado reducir el draw al mínimo distribuyendo casi todo el 
// código en funciones.
// ********************************************************************
// ********************************************************************
function draw() {

  // Control de los temporizadores de Six Eyes

  // Reiniciar temporizadores si al volver a la normalidad había
  // pasado su tiempo de activación
  if (estadoSixEyes == 9) {
    proximoAtaque = millis() > proximoAtaque ? millis() + round(random(60000, 120000)) : proximoAtaque;
    proximaVisita = millis() > proximaVisita ? millis() + round(random(40000, 80000)) : proximaVisita;
    proximoApagon = millis() > proximoApagon ? millis() + round(random(60000, 120000)) : proximoApagon;
    // mensajeTXT = '';
    estadoSixEyes = 0;
  }

  // No te olvides de parpadear
  if (millis() > proximoParpadeo && !parpadeando && mensajeTXT == '') {
    parpadeando = true;
    cerrandoOjo = true;
  }

  // Tienes visita
  if (millis() > proximaVisita && estadoSixEyes == 0) {
    estadoSixEyes = 2;
    faseVisita = 1;
  }

  // Otro ataque
  if (millis() > proximoAtaque && estadoSixEyes == 0) {
    estadoSixEyes = 3; // Entramos en ataque
    faseAtaque = 1;
    iniAtaque = true;
  }

  // Se fué la luz
  if (millis() > proximoApagon && estadoSixEyes == 0) {
    estadoSixEyes = 4;
    faseApagon = 1;
  }

  // Después de controlar los temporizadores controlamos otros flags

  // Colores para los Rayos X
  if (rayosX) {
    colorPiel = colRayosX;
    colPupila = '#00000022';
    colReflejo = colRayosX;
    colSombra = '#00000011';
    colIris = '#41BCFF22';
  } else {
    colorPiel = colBlanco;
    colPupila = colNegro;
    colReflejo = colBlanco;
    colSombra = color(0, 0, 0, 0.5);
    colIris = estadoSixEyes == 3 ? colIris : colAzul;
  }

  // ¿A que mira Six Eyes?
  switch (estadoSixEyes) {

    case 1: // Pelotita
      mirarX = SEcoordX(pelotitaX);
      mirarY = SEcoordY(pelotitaY);
      break;

    case 2: // Visita
      mirarX = SEcoordX(vecinoPosX);
      mirarY = SEcoordY(vecinoPosY);
      break;

    case 3: // Ataque 

      break;

    case 4: // Apagón
      mirarX = SEcoordX(linternaX);
      mirarY = SEcoordY(linternaY);
      break;

    default: // Standby o cualquier caso no definido
      mirarAlgo = false;
  }

  // Con el control de temporizadores y flags,
  // pasamos a realizar el dibujo

  // El mostruo lo realicé inicialmente sobre una retícula
  // de 300x300, pero al avanzar, decidí que fuese escalable,
  // así que todo el dibujo se realiza a escala.

  // Escalamos para dibujar
  push();
  scale(escala);

  //  Lo primero el fondo
  dibFondo();

  // La invasión prepara el fondo y a Six Eyes para el ataque
  dibInvasion();

  // Después el botón para poder esconderlo la primera vez
  dibBoton();

  // Todo Six Eyes se dibuja con las coordenadas
  // canvasWescalado /2, 0, por lo que hay que tenerlo en cuenta
  // a la hora de las interacciones.
  // Las funciones SEcoordX y SEcoordY convierten las coordenadas
  // escaladas en coordenadas SE.
  // las coordenadas reales se convierten en coordenadas escaladas
  // dividiendolas entre la escala

  // Ahora los tentáculos
  dibTentaculos(sixEyexXpos, sixEyexYpos);

  // Y el cuerpo
  if (cuerpo) {
    dibCuerpo(sixEyexXpos, sixEyexYpos);
  }

  // El ojo gordo...
  dibOjoGordo(sixEyexXpos, sixEyexYpos);

  // ... con el párpado
  dibParpado(sixEyexXpos, sixEyexYpos);

  // Y los seis ojitos para terminar a SixEyes
  dibOjitos(sixEyexXpos, sixEyexYpos);

  // Ahora dibujamos el resto de elementos

  // La pelotita
  dibPelotita();

  // La visita
  dibVisita();

  // El ataque
  dibAtaque();

  // Los disparos
  dibDisparo();

  // El apagón
  dibApagon();

  // Los mensajes
  dibMensajeSixEyes();

  // El susto queda por encima de el resto de dibujos
  dibSusto();

  // Elementos de ayuda para mi

  // Una retícula para orientarme
  if (verCanvaOriginal) {
    canvaOriginal();
  }

  // Six Eyes' brain
  if (variables) {
    verVariables()
  }

  // Por último la versión
  verVersion();

  // Solo 
  if (verHitBox) {
    hitBox();
  }

  // Controles
  dibControles();

  // Bienvenida
  dibBienvenida();
  pop();

}

function dibBienvenida() {
  if (millis() < 10000 && verBienvenida) {
    background(colBlanco);
    let cH = canvasWescalado / 2;
    let tOut = ((10000 - millis()) / 1000).toFixed(1);
    textFont('monospace');
    textAlign(CENTER)
    noStroke();
    fill(colNegro)
    textSize(24)
    text('Six Eyes', cH, 80);
    textSize(6);
    text('© 2020 Javier Juaristi\n' + version + '\n' + tOut + 's', cH, 100);
    //text(tOut + 's', cH, 110)
    dibControles();
    textSize(8)
    text('[PULSA UNA TECLA PARA SEGUIR]', cH, 280)
    if (keyIsPressed) {
      verBienvenida = false;
    }
  } else {
    verBienvenida = false;
  }
}

function dibControles() {
  if (verControles || verBienvenida) {
    let cH = canvasWescalado / 2;
    noStroke();
    rectMode(CENTER);
    fill('#FFFFFFCC');
    rect(cH, 143, 280, 38)
    fill(colNegro);
    textFont('monospace');
    textAlign(CENTER);
    textSize(10)
    text('   Lanzar [A]taque | Llamar al [V]ecino' +
      '\n    Apagar [L]uces | Ver contr[O]les   ', cH, 140);
    textSize(8);
    if (flags) {
      fill('#FFFFFFCC');
      rect(cH, 202, 280, 35)
      fill(colNegro);
      text('Controles adicionales activados' +
        '\n[S]ix Eyes\' brain [C]anva original [T]entáculos [B]ody', cH, 200)
    }
  }
}


















// ********************************************************************
// hitBox()
// Usada para comprobar que funciona la diana
// ********************************************************************
function hitBox() {
  if (invXu != undefined && invYu != undefined) {
    strokeWeight(0.5)
    stroke('red')
    noFill();
    rect(invXu, invYu, 12 * vPx, 8 * vPx)
  }
}


// ********************************************************************
// dibFondo()
// ********************************************************************
function dibFondo() {
  if (estadoSixEyes != 3 || (estadoSixEyes == 3 && faseAtaque == 7)) {
    background(colFondo);
  }
}

// ********************************************************************
// dibInvasion()
// ********************************************************************
function dibInvasion() {
  if (estadoSixEyes == 3) {

    switch (faseAtaque) {

      case 1: // Inicialización del ataque

        // La horda
        escalaHorda = 0.01
        hordaInvasores[0] = [3, 3, 3, 3, 3, 3, 3, 3];
        hordaInvasores[1] = [1, 1, 1, 1, 1, 1, 1, 1];
        hordaInvasores[2] = [1, 1, 1, 1, 1, 1, 1, 1];
        hordaInvasores[3] = [2, 2, 2, 2, 2, 2, 2, 2];
        hordaInvasores[4] = [2, 2, 2, 2, 2, 2, 2, 2];

        // Velocidad cambio de color
        pasCambio = 180;
        velCambio = 1 / pasCambio;
        pasCont = 0;

        // Que mire hacia arriba a la izquierda a ver que pasa
        mirarX = 0;
        mirarY = -canvasHescalado;
        mirarAlgo = true;


        // Cambiamos de fase
        faseAtaque = 2;
        break;

      case 2: // Oscurecer y mensaje

        // Cambiamos los colores progresivamente
        colFondo = lerpColor(colAzul, colNegro, pasCont);
        colIris = lerpColor(colAzul, colVerde, pasCont);
        background(colFondo);

        // Mostramos el mensaje 
        textAlign(CENTER);
        textFont(pressStart2P);
        textSize(30);
        noStroke();
        fill('#FFFFFF');
        text('DIE HARD!', canvasWescalado / 2, canvasHescalado * 0.4);

        // Cambiamos de fase al alcanzar los ciclos 
        // establecidos en velCambio
        faseAtaque = pasCont >= 1 ? 3 : 2;
        pasCont += velCambio;
        break;

      case 3: // Desvanecido de Die Hard!
        // Vamos sumando capas de negro con transparencia
        background('#00000008');
        // Y cambiamos de fase al superar un 50% más de tiempo
        faseAtaque = pasCont >= 1.5 ? 4 : 3;
        pasCont += velCambio;
        break;

      case 4: // Llegada de la horda

        // Las caps transparentes generará el efecto de estela
        background('#00000033');

        // Variables para dibujar la horda
        // Debería crear una función para el dibujo de la horda
        vPx = 1.4074; // Escala del pixel con respecto a sixEyes 
        anchoSprite = 12;
        altoSprite = 8;
        setSprites = int(frameCount) % 50 == 0 ? 'A' : 'B';
        medV = 3;
        medH = 8;

        // Tengo que revisar esto
        anchoHorda = (anchoSprite * 8 + medV * 10) * vPx; // 162 vPx (aprox. 228 sEpx)
        altoHorda = (altoSprite * 5 + medH * 4) * vPx; // 72 vPx (aprox. 102 sEpx)

        // Posición de la horda
        colIzq = canvasWescalado / 2 - anchoHorda / 2 // sEpx
        colDer = colIzq + anchoHorda;
        hordaY = 24;

        push();
        scale(escalaHorda)
        for (let f = 0; f < 5; f++) {
          for (let c = 0; c < 8; c++) {
            invX = colIzq + (anchoSprite + medV) * c * vPx; // Escalamos
            invY = hordaY + (altoSprite + medH) * f * vPx; // a SEpx
            dibInvasor(hordaInvasores[f][c], invX, invY, abs(vPx))
          }
        }
        pop();
        escalaHorda += 0.02;

        faseAtaque = escalaHorda > 1 ? 5 : 4;

        break;


      case 5: // El ataque
        // Solo pongo el fondo aquí
        // El resto sucede en dibAtaque()
        background('#000');
        break;

      case 6: // Preparando el final
        pasCont = 0;
        faseAtaque = 7;
        break;

      case 7: // Vuelve la calma
        colFondo = lerpColor(colNegro, colAzul, pasCont);
        colIris = lerpColor(colVerde, colAzul, pasCont);

        if (pasCont > 1) {
          faseAtaque = 0
          estadoSixEyes = 9;
        }
        pasCont += velCambio;
        break;

      default:
        faseAtaque = 0;
    }
  }
}



// *********************************************************************
// dibAtaque
// *********************************************************************
function dibAtaque() {

  if (estadoSixEyes == 3 && faseAtaque == 5) {

    // Los sprites miden 12 x 8 Vpx
    // Está separados 3 Vpx en horizontal y 8 en vertical
    // La horda es de 11 x 5
    // Ancho de la horda = (11 inv x 12 Vpx) + (10 esp * 3Vpx) = 162 Vpx
    // Alto de la horda = (5 fil x 8 Vpx) + (4 esp * 8Vpx) = 72 Vpx
    // Inicialmente se desplazan a 1.25 FPS
    // A 60 FPS equivale a un paso cada 48 frames (frameCount%48)
    // Pero el cambio de velocidad en el juego original era debido a un bug.
    // Cuantos menos enemigos había que dibujar, menos tardaba el
    // procesador en hacerlo.
    // Se desplazará entre canvasWescalado/2-150 y canvasWescalado/2+150
    // Tengo 300Vpx de ancho y la horda ocupa el 76% (228)
    // El tamaño del Vpx es de 1.4074 px escalados


    // -------------------------------------------------------------------
    // La inicialización solo se ejecuta una vez por ataque
    // iniAtaque == true
    // -------------------------------------------------------------------
    if (iniAtaque) {
      iniAtaque = false;
      // Inicializamos el array de sprites de la horda
      hordaInvasores[0] = [3, 3, 3, 3, 3, 3, 3, 3];
      hordaInvasores[1] = [1, 1, 1, 1, 1, 1, 1, 1];
      hordaInvasores[2] = [1, 1, 1, 1, 1, 1, 1, 1];
      hordaInvasores[3] = [2, 2, 2, 2, 2, 2, 2, 2];
      hordaInvasores[4] = [2, 2, 2, 2, 2, 2, 2, 2];

      // Y los estados a 0 (vivo)
      for (let fInv = 0; fInv < estadoInvasor.length; fInv++) {
        estadoInvasor[fInv].fill(0);
      }

      vPx = 1.4074; // Escala del pixel con respecto a sixEyes
      anchoSprite = 12;
      altoSprite = 8;
      setSprites = 'A';
      medV = 3;
      medH = 8;
      anchoHorda = (anchoSprite * hordaInvasores[0].length + medV * (hordaInvasores[0].length - 1)) * vPx; // 162 vPx (aprox. 228 sEpx)
      altoHorda = (altoSprite * hordaInvasores.length + medH * (hordaInvasores.length - 1)) * vPx; // 72 vPx (aprox. 102 sEpx)
      colIzq = canvasWescalado / 2 - anchoHorda / 2 // sEpx
      colDer = colIzq + anchoHorda;
      hordaY = 24;
      //dirHorda = -1.5;
      dirHorda = -vPx * 2;
      // ------------------------------------
      targetFijado = false;
      targetUsuario = false;
      // Debería ser 1 frame cada 800 milisegundos
      // Pero lo he ajustado porque me presultaba un poco lento
      velCPU = 500;
      cicloCPU = 0
      controlMillis = millis() // Aquí se arrancan los ciclos virtuales
      contHorda = hordaInvasores.length * hordaInvasores[0].length; // Número de invasores

      disparar = false;
      cambioTarget = true;
      // ---------------------------------
      soloUno = false;
      timeSolo = millis() + 4000;
      cursor(CROSS);
    }

    // Aviso
    if (soloUno && millis() < timeSolo + 2000) {
      fill(colBlanco);
      textFont(pressStart2P);
      textAlign(CENTER);
      textSize(6);
      text('SOLO PUEDES FIJAR UN BLANCO', canvasWescalado / 2, 18)
    }

    // -------------------------------------------------------------------
    // Esta sección se ejecuta cada ciclo virtual de CPU
    // En la primera versión lo gestioné con el frameRate, un grave error
    // por la inestabilidad de los mismo.
    // En esta segunda versión voy a usar el reloj.
    // Si el Space Invaders empezaba a aporx. 1.25 FPS, tendré que 
    // ejecutar estos pasos cada 800 ms
    // -------------------------------------------------------------------

    if (millis() > controlMillis + velCPU) {
      // Nuevo control
      controlMillis = millis();
      // Incrementamos el contador de ciclos -- OK
      cicloCPU++;

      // Sonido pasos
      switch (pasoInv) {
        case 1:
          paso1.play();
          pasoInv = 2;
          break;
        case 2:
          paso2.play();
          pasoInv = 3;
          break;
        case 3:
          paso3.play();
          pasoInv = 4;
          break;
        case 4:
          paso4.play();
          pasoInv = 1;
          break;
        default:
          pasoInv = 1;
      }


      // Recorrido por la horda para decidir un target ---- OK

      // Si no hay objetivo marcado por Six Eyes o por el usuario...
      if (!targetFijado && !targetUsuario) {

        // ...recorremos el array buscando el próximo
        for (let f = 0; f < 5; f++) {
          for (let c = 0; c < 11; c++) {

            // Si [f,c] está vivo (0) y aun no se ha marcado un objetivo
            // ni por Six Eyes ni por el usuario,
            // entra en el sorteo
            if (estadoInvasor[f][c] == 0 && !targetFijado && !targetUsuario) {

              // Comienza el sorteo
              if (random(5) > 4) { // Le hatocado la lotería 20% prob.
                estadoInvasor[f][c] = 1; // Marcado por SixEyes
                target = [f, c];
                targetFijado = true;
                disparoEn = cicloCPU + round(random(1, 2));
              }
            } // Fin de la búsqueda de objetivo nuevo
          }
        }
      } else if (!targetFijado && targetUsuario) {

        // Si no hay un objetivo marcado por Six Eyes y el 
        // y el usuario ha marcado uno...
        // ... tomamos el objetivo del usuario y SixEyes lo adopta
        estadoInvasor[marcaUsuario[0]][marcaUsuario[1]] = 3;
        target = marcaUsuario;
        targetFijado = true;
        targetUsuario = false;
        disparoEn = cicloCPU + 1;
      }




      // Dejamos de disparar
      // Descontamos el invasor
      // Quitamos el flag al target para poder buscar  otro
      if (targetFijado && cicloCPU == disparoEn + 2) {
        estadoInvasor[target[0]][target[1]] = 5;
        disparar = false;
        contHorda--;
        targetFijado = false;
        velCPU -= 10; // Aceleración hasta llegar al triple de la inicial
      }

      // Explosión
      if (targetFijado && cicloCPU == disparoEn + 1) {
        hordaInvasores[target[0]][target[1]] = 4;
        estadoInvasor[target[0]][target[1]] = 4;
      }


      // Damos permiso para disparar
      if (targetFijado && cicloCPU == disparoEn) {
        targetX = colIzq + (((anchoSprite + medV) * target[1]) + 6) * vPx;
        targetY = hordaY + (((altoSprite + medH) * target[0]) + 4) * vPx;
        disparar = true;

        // Y miramos al objetivo
        mirarX = map(targetX, 0, canvasWescalado, -canvasWescalado / 2, canvasWescalado / 2, true);
        mirarY = map(targetY, 0, canvasHescalado, -canvasHescalado, 0, true);
        mirarAlgo = true;
      }

      // 1 - Desplazamos la horda para el próximo ciclo -------------- OK
      colIzq += dirHorda;
      colDer = colIzq + anchoHorda;

      // Y comprobamos si habremos superado los límites -------------- OK
      // Si hemos llegado al lado derecho, cambiamos de dirección
      if (colDer > (canvasWescalado / 2) + 150 && dirHorda > 0) {
        dirHorda = -dirHorda;
        hordaY += 4;
      }
      // Lo mismo si llegamos al lado izquierdo
      if (colIzq < (canvasWescalado / 2) - 150 && dirHorda < 0) {
        dirHorda = -dirHorda;
        hordaY += 4;
      }

      // Cambiamos el set de sprites a dibujar ----------------------- OK
      setSprites = setSprites == 'A' ? 'B' : 'A';

      // Si no quedan más enemigos se termina el ataque
      if (contHorda == 0) {
        faseAtaque = 6 // Fase 6 - Fin del ataque
        cursor(ARROW); // Devolvemos el cursor a su modo normal
        verHitBox = false;
      }
    }

    // La horda se dibuja fuera de los ciclos virtuales -------------- OK

    for (let f = 0; f < 5; f++) {
      for (let c = 0; c < 11; c++) {
        invX = colIzq + (anchoSprite + medV) * c * vPx; // Escalamos
        invY = hordaY + (altoSprite + medH) * f * vPx; // a SEpx

        // Si hay invasor en la posición, se dibuja
        if (estadoInvasor[f][c] < 5) {
          dibInvasor(hordaInvasores[f][c],
            invX, invY, abs(vPx),
            estadoInvasor[f][c])
        }
      }
    }
  }
}

// *********************************************************************
// Dibuja un invasor
// *********************************************************************
function dibInvasor(i, x, y, p, m) {

  // Arrays con los sprites
  var spriteA = [];
  var spriteB = [];
  // Invasor 0-A
  spriteA[0] = [
    0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0,
    1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0,
    0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0
  ];

  // Invasor 0-B
  spriteB[0] = [
    0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0,
    1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0
  ];

  // Invasor 1-A
  spriteA[1] = [
    0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0
  ];

  // Invasor 1-B
  spriteB[1] = [
    0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1
  ];

  // Invasor 2-A
  spriteA[2] = [
    0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0,
    0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0
  ];

  // Invasor 2-B
  spriteB[2] = [
    0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0
  ];

  // Invasor 3-A - Explosión
  spriteA[3] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0
  ];

  // Invasor 3-B - Explosión
  spriteB[3] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0
  ];


  var spriteCol = 12;
  var spriteFil = 8;
  var pxSize = p;
  var invader = setSprites == 'A' ? spriteA[i - 1] : spriteB[i - 1];
  var colorInvasor;
  /*
  switch (m) {
    case 2: // marcado por el usuario
      colorInvasor = 'red';
      break;
    case 3: // Adoptado
      colorInvasor = 'green';
      break;
    default:
      colorInvasor = 'white';
  }
  */
  colorInvasor = colBlanco;

  push();
  translate(x, y);
  fill(colorInvasor);
  noStroke();
  for (var f = 0; f < spriteFil; f++) {
    for (var c = 0; c < spriteCol; c++) {
      if (invader[(f * spriteCol) + c] == 1) {
        square(c * pxSize, f * pxSize, pxSize);
      }
    }
  }
  if (m == 2 || m == 3) {
    // Dibujamos una diana
    ellipseMode(CORNER);
    noFill();
    var trazo = m == 2 ? 0.5 * vPx : 1.5 * vPx;
    strokeWeight(trazo);
    var colDiana = m == 2 ? colVerde : colRojo;
    colDiana.setAlpha(0.5);
    stroke(colDiana);
    ellipse(vPx, -vPx, (anchoSprite - 2) * vPx, (anchoSprite - 2) * vPx);
    ellipseMode(CENTER);
    line(0, 0, anchoSprite * vPx, altoSprite * vPx);
    line(anchoSprite * vPx, 0, 0, altoSprite * vPx);
  }
  pop();
}

// *********************************************************************
// Disparo láser
// *********************************************************************
function dibDisparo() {
  //laser1.playMode('untilDone');
  //laser2.playMode('restart');
  if (disparar) {
    if (millis() % 150 < 20 && random() > 0.5) {
      laser2.play();
    }
    /*else if (millis() % 150 < 50 && random() > 0.7) {
         laser2.play();
       }*/

    for (let i = 0; i < ojitos.length; i++) {
      // alinearenadas de los ojitos
      var laserX = map(ojitos[i].xPos, -canvasWescalado / 2, canvasWescalado / 2, 0, canvasWescalado, true);
      var laserY = map(ojitos[i].yPos, -canvasHescalado, 0, 0, canvasHescalado, true);

      // Calculamos el angulo del rayo
      var angulo = ang(laserX, laserY, targetX, targetY);
      var distancia = dist(laserX, laserY, targetX, targetY);

      // Para dibujar el rayo guardamos las alinearenadas
      push();
      // Nos movemos al centro del ojito
      translate(laserX, laserY);
      // Y nos orientamos en dirección al objetivo
      rotate(angulo);

      // Usando el contador de frames ajusto el tiempo que dura
      // la animación del láser
      // if (frameCount % 60 > 15) {
      // if (millis() % 300 > 50 && millis() % 300 > 100) {
      if ((millis() % deltaTime > 0 && millis() % deltaTime < deltaTime * 0.25) || (millis() % deltaTime > deltaTime * 0.65 && millis() % deltaTime < deltaTime * 0.9)) {

        var pasosRay = distancia / 10;
        var sizeRay = distancia / 24;
        var desRay = pasosRay * random(0.8);
        var oriRay = distancia * parseFloat((millis() % 100 / 100).toFixed(1)) + desRay;
        var finRay = oriRay + sizeRay > distancia ? distancia - oriRay : oriRay + sizeRay;
        var strokeRay = map(oriRay, 0, distancia, 4, 2, true);
        //for (let i = 0; i < 3; i++) {
        var colorRay = ['lime', 'greenyellow', 'green'];
        stroke(random(colorRay));
        // strokeWeight(strokeRay - i);
        strokeWeight(strokeRay);
        if (random() > 0.2) {
          line(oriRay, 0, finRay, 0);
        }
        //}
      }
      pop();
    } // For recorrido ojitos
  } // if disparar
}

























// ********************************************************************
//  dibApagon()
// ********************************************************************
function dibApagon() {

  if (estadoSixEyes == 4) {

    switch (faseApagon) {

      case 1: // Fase 1 : Inicialización

        if (primerApagon) {
          interruptorX = canvasWescalado / 2;
          interruptorY = 215;
        } else {
          interruptorX = random(canvasWescalado);
          interruptorY = random(canvasHescalado);
        }

        interruptorOn = true;
        rayosX = false;
        faseApagonTime = millis();
        mirarAlgo = true;
        faseApagon = 2;
        break;

      case 2: // Mensaje

        oscuridad.background('black');
        image(oscuridad, 0, 0);
        mensajeTXT = '¡Apagón! Será mejor que busques el interruptor';
        mensajeTime = millis();
        mensajeIni = 1;
        faseApagon = 3;
        break;

      case 3: // Espera
        image(oscuridad, 0, 0);
        if (millis() > faseApagonTime + 3000) {
          faseApagon = 4;
        }
        break;

      case 4: // Inicializo el contador para el aviso de rayos X
        image(oscuridad, 0, 0);
        faseApagonTime = millis();
        faseApagon = 5;
        break;

      case 5: // Fase 2: ¡Busca el interruptor!
        if (millis() > faseApagonTime + 15000 && mensajeRayosX) {
          mensajeRayosX = false;
          mensajeTXT = 'Si no lo encuentras puedes probar los Rayos X pulsando la tecla X';
          mensajeTime = millis();
          mensajeIni = 1;
        }

        // Posición del cursor a escala
        linternaX = mouseX / escala;
        linternaY = mouseY / escala;
        // ¿Estamos sobre el interruptor?
        sobreInterruptor = dist(interruptorX, interruptorY, linternaX, linternaY) < 10;
        // Si estamos sobre el interruptor cambiamos el cursor
        // A no ser que sea la primera vez
        if (!primerApagon) {
          cursor(sobreInterruptor ? 'pointer' : 'auto');
        }
        // Y si además lo pulsamos; terminamos el apagón
        if (sobreInterruptor && mouseIsPressed) {
          faseApagon = 6;

          pulsarOn = false;
          interruptorOn = false;
          rayosX = false;
          if (primerApagon) {

            primerApagon = false;

            mensajeTXT = '¡Anda!  Que casualidad que estaba detrás de mi y has tenido que usar mis fantáxticos rayos XD';
            mensajeTime = millis();
            mensajeIni = 1;
          }
        }
        // Dibujo de la capa de oscuridad y la linterna
        oscuridad.background('black');
        oscuridad.ellipseMode(CENTER);
        oscuridad.noStroke();
        oscuridad.erase(10)
        for (let i = 12; i > 0; i--) {
          oscuridad.ellipse(linternaX, linternaY, 50 + i * 5, 50 + i * 5);
        }
        oscuridad.erase()
        oscuridad.ellipse(linternaX, linternaY, 50, 50);
        image(oscuridad, 0, 0);
        break;

      case 6:
        // if(millis()> mensajeTime + 3000) {
        faseApagon = 0;
        estadoSixEyes = 9;
        cursor(AUTO)
        // }
        break;
      default:
        return false;
    }
  }
}

// ********************************************************************
//  dibBoton()
// ********************************************************************
function dibBoton() {
  if (estadoSixEyes == 4) {
    noStroke();
    fill('red');
    //ellipse(interruptorX, interruptorY, 20, 20);
    imageMode(CENTER);
    image(botonPNG, interruptorX, interruptorY, 20, 20);

    for(let i = 0; i < contaObjetos; i++) {
      let indice = rellenoSE[i][0];

      let d = pelotitaPNG[indice].size;
      let x = rellenoSE[i][1];
      let y = rellenoSE[i][2];
      image(pelotitaPNG[indice].PNG, x, y, d,d);
    }
    
    
    /*let cX = canvasWescalado/2;
    let cY = canvasHescalado;
    contaObjetos = 20;
    let maxObjetos = pelotitaPNG.length
    randomSeed(12)
    do {
      let objeto = int(random(0,maxObjetos));
      let x = random (cX-60, cX+60)
      let y = random(cY, cY-60)
      let d = pelotitaPNG[objeto].size
      if (dist(x,y,cX,cY) < 90 - d/2){
        image(pelotitaPNG[objeto].PNG, x, y, d,d);
        contaObjetos--;
      }
    } while(contaObjetos > 0)
    randomSeed(random(50)) */
    imageMode(CORNER);
  }
}

// ********************************************************************
// dibCuerpo()
// ********************************************************************
function dibCuerpo(x, y) {
  push();
  translate(x, y);
  noStroke();
  rectMode(CENTER);
  fill(colorPiel);
  rect(0, 0, 180, 200, 90, 90, 0, 0);
  pop();
}

// ********************************************************************
// dibTentaculos()
// ********************************************************************
function dibTentaculos(x, y) {
  push();
  translate(x, y);

  for (let i = 0; i < ojitos.length; i++) {

    let p0x, p1x, p2x, p0y, p1y, p2y, c0x, c1x, c2x, c0y, c1y, c2y;
    let anchoTentaculo = 10;
    let uniRet = ojitos[i].sNat / 6; // Dada una retícula de 6x6 para el ojo

    let ojoX = ojitos[i].xPos;
    let ojoX1 = ojitos[i].xMin;
    let ojoX2 = ojitos[i].xMax;

    p0x = ojitos[i].xNat;
    p0y = ojitos[i].yMin + 40;
    c0x = ojitos[i].xNat;
    // c0y = ojitos[i].yMin + ((ojitos[i].yMin - ojitos[i].yPos) * 0.75);
    c0y = ojitos[i].yPos + ojitos[i].sNat;

    if (ojitos[i].xPos > p0x + uniRet) {
      p1y = ojitos[i].yPos - uniRet;
      p2y = ojitos[i].yPos + uniRet * 1.8;
    } else if (ojitos[i].xPos < p0x - uniRet) {
      p1y = ojitos[i].yPos + uniRet * 1.8;
      p2y = ojitos[i].yPos - uniRet;
    } else {
      p1y = ojitos[i].yPos + uniRet * 1.8;
      p2y = ojitos[i].yPos + uniRet * 1.8;
    }

    p1x = ojitos[i].xPos - uniRet * 1.3;
    p2x = ojitos[i].xPos + uniRet * 1.3;


    c1x = p0x + uniRet * 0.5;
    c1y = p1y + uniRet;
    c2x = p0x - uniRet * 0.5;
    c2y = p2y + uniRet;

    strokeWeight(anchoTentaculo);
    strokeJoin(ROUND);
    stroke(colorPiel);
    fill(colorPiel);
    beginShape();
    vertex(p0x, p0y);
    bezierVertex(c0x, c0y, c1x, c1y, p1x, p1y);
    vertex(p2x, p2y);
    bezierVertex(c2x, c2y, c0x, c0y, p0x, p0y);
    endShape();
    noStroke();

    // control de vectores
    if (verBezierTentaculos) {
      stroke('red');
      strokeWeight(anchoTentaculo / 4)
      point(p0x, p0y)
      point(p1x, p1y)
      point(p2x, p2y)
      stroke('grey');
      point(c1x, c1y)
      point(c2x, c2y)
      point(c0x, c0y)
      strokeWeight(1)
      line(p1x, p1y, c1x, c1y)
      line(p2x, p2y, c2x, c2y)
      line(p0x, p0y, c0x, c0y)
    }
  }
  pop();
}

// ********************************************************************
// dibOjitos()
// ********************************************************************
function dibOjitos(x, y) {

  let velOjoX, velOjoY, distX, distY;
  let acelOjo = 0.1;

  // Recorrido por el array de ojitos
  for (let i = 0; i < ojitos.length; i++) {

    if (mirarAlgo && estadoSixEyes != 3) {

      // Velodidad de desplazamiento
      distX = dist(mirarX, 0, ojitos[i].xPos, 0);
      distY = dist(mirarY, 0, ojitos[i].yPos, 0);
      velOjoX = distX * acelOjo;
      velOjoY = distY * acelOjo;

      // Componente X
      if (mirarX > 0 && ojitos[i].xPos < ojitos[i].xMax) {
        ojitos[i].xPos += velOjoX;
      } else if (mirarX < 0 && ojitos[i].xPos > ojitos[i].xMin) {
        ojitos[i].xPos -= velOjoX;
      }

      // Componente Y
      if (mirarY < ojitos[i].yPos &&
        ojitos[i].yPos > ojitos[i].yMax) {
        ojitos[i].yPos -= velOjoY;
      } else if (mirarY > ojitos[i].yPos &&
        ojitos[i].yPos < ojitos[i].yMin) {
        ojitos[i].yPos += velOjoY;
      }

      // Fin del desplazamiento de ojitos si está atento

    } else if (estadoSixEyes == 3) {

      // ¡Hay que protegerse!
      velocidadOjos = 1.5;

      // Componente X
      if (ojitos[i].xPos < ojitos[i].xNat) {
        ojitos[i].xPos += velocidadOjos;
      }
      if (ojitos[i].xPos > ojitos[i].xNat) {
        ojitos[i].xPos -= velocidadOjos;
      }

      // Componente Y     
      if (ojitos[i].yPos < ojitos[i].yMin + 5) {
        ojitos[i].yPos += velocidadOjos;
      }
      if (ojitos[i].yPos > ojitos[i].yMin + 5) {
        ojitos[i].yPos -= velocidadOjos;
      }

    } else {

      // Si no está atento a nada devolvemos los ojos a su sítio
      velocidadOjos = 1;

      // Componente X
      if (ojitos[i].xPos < ojitos[i].xNat) {
        ojitos[i].xPos += velocidadOjos;
      }
      if (ojitos[i].xPos > ojitos[i].xNat) {
        ojitos[i].xPos -= velocidadOjos;
      }

      // Componente Y     
      if (ojitos[i].yPos < ojitos[i].yNat) {
        ojitos[i].yPos += velocidadOjos;
      }
      if (ojitos[i].yPos > ojitos[i].yNat) {
        ojitos[i].yPos -= velocidadOjos;
      }
    }


    // dibujo de los ojos
    push();
    translate(x, y);
    dibOjo(ojitos[i]);
    pop();
  } // for i
}

// ********************************************************************
// dibOjoGordo()
// ********************************************************************
function dibOjoGordo(x, y) {
  push();
  translate(x, y);
  dibOjo(ojoGordo);
  pop();
}

// ********************************************************************
// dibParpado()
// ********************************************************************
function dibParpado(x, y) {
  push();
  translate(x, y);
  let posXa = ojoGordo.xNat;
  let posYa = ojoGordo.yNat;
  let ojoSize = ojoGordo.sNat;
  let puntoIzq = posXa - ojoSize * 0.5;
  let puntoDer = posXa + ojoSize * 0.5;
  let parpadoSombraAbierto = posYa - ojoSize * 0.15;
  let parpadoSombraCerrado = posYa + ojoSize * 0.4;
  let parpadoAbierto = posYa - ojoSize * 0.25
  let parpadoCerrado = parpadoSombraCerrado;
  let velocidadParpadeo = 6;

  // Valores para cuando no parpadea
  if (!parpadeando) {
    ojoSombraPos = parpadoSombraAbierto;
    parpadoPos = parpadoAbierto;
  }

  // Si está parpadeando
  // y cerrando el ojo
  if (parpadeando && cerrandoOjo) {
    ojoSombraPos += velocidadParpadeo;
    parpadoPos += velocidadParpadeo;
    if (ojoSombraPos > parpadoSombraCerrado) {
      parpadoPos = parpadoCerrado;
      cerrandoOjo = false;
    }
  }

  // o abriendo el ojo
  if (parpadeando && !cerrandoOjo) {
    ojoSombraPos -= velocidadParpadeo;
    parpadoPos -= velocidadParpadeo;
    if (ojoSombraPos < parpadoSombraAbierto) {
      parpadoPos = parpadoAbierto
      cerrandoOjo = true;
      // Una de cada 4 veces hará un parpadero doble 
      parpadeando = round(random(3)) == 0 ? true : false;
      proximoParpadeo = millis() + random(2000, 10000);
    }
  }

  // Ahora dibujamos la sombra
  noStroke();
  fill(colSombra);
  beginShape();
  vertex(puntoIzq, posYa);
  bezierVertex(puntoIzq + ojoSize * 0.3, ojoSombraPos,
    puntoDer - ojoSize * 0.3, ojoSombraPos,
    puntoDer, posYa);
  bezierVertex(puntoDer - ojoSize * 0.3, posYa - ojoSize * 0.4,
    puntoIzq + ojoSize * 0.3, posYa - ojoSize * 0.4,
    puntoIzq, posYa);
  endShape();

  // Y el párpado
  fill(colorPiel);
  beginShape();
  vertex(puntoIzq, posYa);
  bezierVertex(puntoIzq + ojoSize * 0.3, parpadoPos,
    puntoDer - ojoSize * 0.3, parpadoPos,
    puntoDer, posYa);
  bezierVertex(puntoDer - ojoSize * 0.3, posYa - ojoSize * 0.45,
    puntoIzq + ojoSize * 0.3, posYa - ojoSize * 0.45,
    puntoIzq, posYa);
  endShape();

  pop();
}

// ********************************************************************
// dibOjo()
// ********************************************************************
function dibOjo(elOjo) {
  // Asignamos variables para facilitar la lectura
  let posXa = elOjo.xPos;
  let posYa = elOjo.yPos;
  let posXb, posYb;
  let ojoSize = elOjo.sNat;
  let descentrado;

  // El ojo y el iris
  noStroke();
  fill(colorPiel);
  circle(posXa, posYa, ojoSize);
  fill(colIris);
  circle(posXa, posYa, ojoSize * 0.6);

  // Pupila
  let pupilaSize = ojoSize * 0.25;

  posXb = mirarX;
  posYb = mirarY;

  // Ángulo en el que mirar
  radianes = ang(posXa, posYa, posXb, posYb);
  push();
  // Nos movemos al centro del ojo
  translate(posXa, posYa);
  // Giramos en la dirección del punto de atención
  rotate(radianes);

  if (mirarAlgo) {
    // Si está mirando algo descentramos el ojo hasta el borde del iris
    descentrado = ojoSize * 0.16;
    //let distPos = dist(posXa, posYa, posXb, posYb)
    // descentrado = map(distPos, 0, ojoSize * 4, 0, ojoSize * 0.16, true);
  } else {
    descentrado = 0
  }

  translate(descentrado, 0);

  // Y dibujamos la pupila
  noStroke();
  fill(colPupila);
  circle(0, 0, pupilaSize);
  // <------------------------------ ¿Poner reflejo aquí? PROBAR
  pop();

  // Reflejo
  push();
  noStroke();
  translate(posXa, posYa); // Volvemos al centro del ojo
  fill(colReflejo);
  circle(-pupilaSize * map(posXb, 0, canvasW, 0.35, -0.35, true),
    -pupilaSize * 0.35,
    ojoSize * 0.12);
  pop();

}

// *********************************************************************
// ¡Mira la pelotita!
// *********************************************************************
function dibPelotita() {
  if (estadoSixEyes == 1) {

    switch (fasePelotita) {

      case 0: // Pelotita agarrada

        cursor('grabbing');
        pelotitaX = mouseX / escala;
        pelotitaY = mouseY / escala;
        // Dibujamos la pelotita
        push();
        translate(pelotitaX, pelotitaY)
        //rotate(pelotitaX/50% TWO_PI)
        imageMode(CENTER);
        image(pelotitaPNG[quePelotita].PNG, 0, 0, pelotitaPNG[quePelotita].size, pelotitaPNG[quePelotita].size);
        pop();
        mirarAlgo = true;
        break;

      case 1: // Inicialización del lanzamiento

        cursor('grab');
        pelVelY = map(movedY, height / 10, -height / 10, 15, -15, true);
        gravedad = 0.3;
        pelVelX = map(movedX, -width / 10, width / 10, -25, 25, true);
        friccion = 0.1;
        friccion = pelVelX < 0 ? friccion : pelVelX > 0 ? -friccion : 0;
        fasePelotita = 2; // Cambio de fase
        break;

      case 2: // Vuelo de la pelotita

        // dibujamos la pelotita

        push();
        translate(pelotitaX, pelotitaY)
        rotate(((pelotitaX / 20) % TWO_PI))
        imageMode(CENTER);
        image(pelotitaPNG[quePelotita].PNG, 0, 0, pelotitaPNG[quePelotita].size, pelotitaPNG[quePelotita].size);
        pop();



        // Calculamos la posición Y
        pelVelY += gravedad; // Aceleramos Y
        // Controlamos la velocidad Y (max: 10)
        pelVelY = pelVelY > 10 ? 10 : pelVelY;
        // Añadimos la velocidad a la posición Y
        pelotitaY += pelVelY;

        // Calculamos la velocidad X si aun tiene
        if (pelVelX != 0) {
          // Calculamos cual será la próxima velocidadX
          var calcVelX = pelVelX + friccion;
          // Como decelera, no debe invertirse
          if ((pelVelX > 0 && calcVelX < 0) || (pelVelX < 0 && calcVelX > 0)) {
            // Se va a inveritr la velocidad X
            // así que la dejamos en 0
            pelVelX = 0
          } else {
            // Como no se invierte
            // la tomamos
            pelVelX = calcVelX;
          }
        }
        // Añadimos la velocidad a la posición Y
        pelotitaX += pelVelX;

        // Comprobamos si la pelotita ha salido de los límites
        // para terminar con la fase de vuelo.
        // Le doy un margen a las salidas para que siga la pelotita
        // un rato más después de desaparecer.
        /* var salePorAba = pelotitaY > canvasHescalado * 1.5;
         var salePorArr = pelotitaY < -canvasHescalado * 0.5;
         var salePorIzq = pelotitaX < -canvasWescalado * 2;
         var salePorDer = pelotitaX > canvasWescalado * 3;*/

        var rPelotita = pelotitaPNG[quePelotita].size / 2;

        if (pelotitaX < rPelotita) {
          pelotitaX = rPelotita
          pelVelX *= -1;
          friccion *= -1;
        }
        if (pelotitaX > canvasWescalado - rPelotita) {
          pelotitaX = canvasWescalado - rPelotita
          pelVelX *= -1;
          friccion *= -1;
        }

        if (pelotitaY > canvasHescalado - rPelotita && abs(pelVelY) > 1) {
          pelVelY *= -0.8
          pelotitaY = canvasHescalado - rPelotita
        }
        if (pelotitaY < rPelotita) {
          pelVelY *= -0.8
          pelotitaY = rPelotita
        }
        //console.log(pelVelX.toFixed(1), pelVelY.toFixed(1), round(pelotitaY + pelVelY), round(canvasHescalado - rPelotita) - 2)

        if (abs(pelVelX) < 0.2 &&
          abs(pelVelY) < 0.2 &&
          round(pelotitaY + pelVelY) >= round(canvasHescalado - rPelotita) - 2) {
          // La pelotita se fue 
          // y cambiamos de fase
          pelVelX = 0;
          pelVelY = 0;
          gravedad = 0;
          friccion = 0;
          fasePelotita = 3;
        }
        break;

      case 3.5:

        break;

      case 3: // Vamos a decir lo que pensamos de la pelotita

        // Elegimos una frase del array empezando en 0
        mensajeTXT = frases[mensajeContador];

        // Y lanzamos el mensaje
        mensajeTime = millis();
        mensajeIni = 1;

        if (mensajeContador < frases.length - 1) {
          mensajeContador++;
        }

        quePelotita = quePelotita < pelotitaPNG.length - 1 ? quePelotita + 1 : 0;

        mirarAlgo = false;
        fasePelotita = 4;
        break;

      case 4: // Finalización
        // Esperamos que termine el mensaje para finalizar      
        if (millis() > mensajeTime + mensajeDuracion) {
          if (mensajeContador == frases.length - 1) {
            darSusto = true;
          }
          fasePelotita = 0;
          estadoSixEyes = 9;
          cursor('default')
        }
        break;
    }
  }
}

// *********************************************************************
// dibVisita()
// *********************************************************************
function dibVisita() {

  if (estadoSixEyes == 2) {

    switch (faseVisita) {

      case 1: // Inicialización

        vecinoPosX = -40;
        vecinoPosY = 20;
        //ejeVecino = frameCount;
        saludoVecino = true;
        adiosVecino = true;
        saludoSixEyes = true;
        velVecino = canvasWescalado / (6 * 60); // 6s x 60FPS
        mirarAlgo = true;
        faseVisita = 2;
        break;

      case 2: // Paseo del visitante

        // Baja y sube
        vecinoPosY += sin((vecinoPosX / velVecino) * (PI / 180)) * 0.25;

        // Y va de izquierda a derecha
        vecinoPosX += velVecino + sin((vecinoPosX / velVecino) * (PI / 90)) * 0.5;

        // Dibujamos al vecino mientras esté en pantalla
        if (vecinoPosX < canvasWescalado + 40) {
          dibVecino(vecinoPosX, vecinoPosY, bocaAbierta);

          // El vecino saluda al llegar al 15% del recorrido
          if (vecinoPosX > canvasWescalado * 0.15 && saludoVecino) {
            holaVecino.playMode('untilDone')
            holaVecino.play();
            saludoVecino = false;
          }

          // El vecino se despide al llegar al 85% del recorrido
          if (vecinoPosX > canvasWescalado * 0.85 && adiosVecino) {
            byeVecino.playMode('untilDone')
            byeVecino.play();
            adiosVecino = false;
          }

          // El vecino abre la boca por la zona donde habla
          // Esto estaría mejor ajustado con un temporizador
          // ajustado a la duraciónn del sonido
          if ((vecinoPosX > canvasWescalado * 0.15 && vecinoPosX < canvasWescalado * 0.25) || (vecinoPosX > canvasWescalado * 0.85 && vecinoPosX < canvasWescalado * 0.95)) {
            bocaAbierta = true;
          } else {
            bocaAbierta = false;
          }

          // Six Eyes saluda cuando el vecino va por le 35% de la visita
          if (vecinoPosX > canvasWescalado * 0.35 && saludoSixEyes) {
            proximoParpadeo = millis();
            holaSixEyes.play();
            saludoSixEyes = false;
          }

        } else {
          // Si ya salió de la pantalla, terminamos la visita
          faseVisita = 3;
        }
        break;

      case 3: // Finalización
        mirarAlgo = false;
        estadoSixEyes = 9;
        break;
    }

  }
}

// *********************************************************************
// dibVecino()
// *********************************************************************
function dibVecino(vx, vy, bc) {
  push();
  translate(vx, vy);
  scale(0.5 * sin(map(vecinoPosX, 0, canvasWescalado, PI * 0.9, 0.1, true)));
  // Aquí irá el vecino
  let colorZipZop = '#FF3399';
  ellipseMode(CENTER);
  noStroke()
  // Cabeza
  fill('#FFF');
  ellipse(0, -6.5, 80, 80);
  fill('#334C1A44');
  beginShape();
  vertex(-4.3, -46.3)
  bezierVertex(-42.4, -29.7, -42.4, 16.8, -4.3, 33.3);
  bezierVertex(-51.4, 25.8, -51.4, -40.4, -4.3, -46.3);
  endShape();
  // Ojo
  fill('#FF3399');
  ellipse(0, -21.5, 30, 30);
  fill('#000');
  ellipse(0, -21.5, 12.3, 12.3);
  fill('#FFF');
  ellipse(-5, -26.5, 4.8, 4.8);
  fill('#00000088')
  beginShape();
  vertex(0, -36.5);
  bezierVertex(-15.3, -32.4, -15.3, -10.3, 0, -6.5);
  bezierVertex(-19.8, -7.2, -19.8, -35.7, 0, -36.5);
  endShape();
  // Nave
  fill('#FF3399');
  beginShape();
  vertex(-60, 28);
  bezierVertex(-21.2, 16.9, 21.2, 16.9, 60, 28);
  bezierVertex(21.2, 52.4, -21.2, 52.4, -60, 28);
  endShape();
  fill('#00000088')
  beginShape();
  vertex(-60, 28);
  bezierVertex(-21.2, 38.2, 21.2, 38.2, 60, 28);
  bezierVertex(21.2, 52.4, -21.2, 52.4, -60, 28);
  endShape();

  if (!bc) {
    // Boca cerrada
    strokeWeight(2.3);
    stroke('#000')
    beginShape();
    vertex(-17, 9);
    bezierVertex(-7, 11.8, 7, 11.8, 17, 9);
    endShape();
    noStroke();
    fill('#FF3399');
    beginShape();
    vertex(6.4, 11);
    bezierVertex(8.9, 20.35, 18.4, 17.2, 16.3, 9.2);
    endShape();
  } else {
    // Boca abierta
    noStroke();
    fill('#000')
    ellipse(0, 9, 24, 18);
    fill('#FF3399');
    ellipse(0, 14, 17, 7.5);
  }
  pop();
}

// *********************************************************************
// dibMensajeSixEyes()
// *********************************************************************
function dibMensajeSixEyes() {
  if (mensajeTXT != '' && millis() < mensajeTime + mensajeDuracion) {
    // inicialización de valores ---------------------------------
    if (mensajeIni == 1) {
      mensajeIni = 0;

      // Inicializo una semilla
      semilla = random();

      // Para poder calcular el ancho y alto del bloque de texto
      // necesito definir lafuente y su tamaño.
      altoFuenteTXT = 10;
      interlineaTXT = 12;
      textFont(fredokaOne);
      textSize(altoFuenteTXT);

      // Ancho y alto inicial (máximo previsto)
      anchoCajaTXT = 150;
      altoCajaTXT = 0;
      // Separo el mensaje en caracteres
      var mensajeTroceado = mensajeTXT.split('');
      // Variables para contar el ancho en px y en número de líneas
      var wLetra, cLetra;
      var wMax = 0;
      var wLinea = 0;
      var wPalabra = 0;
      var contaLineas = 1;

      for (var i = 0; i < mensajeTroceado.length; i++) {

        // leemos el caracter
        cLetra = mensajeTroceado[i];

        // y su ancho en px
        // wLetra = pressStart2P.textBounds(cLetra, 0, 0).w;
        wLetra = textWidth(cLetra);

        // Lo sumamos al ancho de palabra
        wPalabra += wLetra;

        // Comprobamos si era un espacio en blanco,
        // o el último caracter.
        // En ambos casos implica el final de una palabra.
        if (cLetra == ' ' || i == mensajeTroceado.length - 1) {

          // Si sumando la palabra superamos el ancho de la caja
          if (wLinea + wPalabra > anchoCajaTXT) {

            // Saltamos de línea
            contaLineas++

            // Comprobamos si la línea acumulada supera el ancho máximo
            // que llevamos, y en caso afirmativo lo reemplazamos
            wMax = wLinea > wMax ? wLinea : wMax;

            // La nueva línea empieza con el ancho de la palabra que ha
            // bajado de línea
            wLinea = wPalabra;

            // Inicializamos el contador de palabra
            wPalabra = 0;

          } else { // Aun no hemos llegado al límite de la caja de texto

            // por lo que sumamos la palabra a ancho de línea que vamos acumulando
            wLinea += wPalabra;

            // e inicializamos el contador de ancho de palabra
            wPalabra = 0;
          }
        } // si letra = ' ' o es la última (Significa el fin de una palabra)
        // Si no era fin de palabra, seguimos sumando caracteres
      } // Fin del recorrido por el texto troceado

      // Si al completar el recorrido tan solo tenemos una línea
      // el ancho máximo será igual al ancho de la linea acumulada
      wMax = contaLineas == 1 ? wLinea : wMax;

      // Y por fin definimos el ancho y el alto de la caja de texto
      // Añado un espacio por problemas de precisión
      anchoCajaTXT = wMax + textWidth(' ');
      altoCajaTXT = contaLineas * interlineaTXT;

    } // if mensajeIni

    // Variables para el bocadillo y la caja de texto
    var cajaX = (canvasWescalado / 2);
    var cajaY = 30;
    var burbujaR = interlineaTXT * 1.8;
    var burbujasCol = (anchoCajaTXT / (burbujaR * 2));
    var burbujasFil = int((altoCajaTXT / interlineaTXT) + 1);

    // Aplico la semilla
    randomSeed(semilla);

    // Dibujo del bocadillo aleatorio
    noStroke();
    fill('#FFFFFFFF');

    for (var col = 0; col < burbujasCol; col++) {
      for (var fil = 0; fil < burbujasFil; fil++) {
        burbujaD = (burbujaR * 2) * random(0.8, 1.6)
        ellipse(
          (cajaX + col * (burbujaR * 2)),
          (cajaY + fil * (altoCajaTXT / (burbujasFil - 1))) * random(0.8, 1.2) + random(3) * sin(millis() / 800),
          burbujaD * random(0.9, 1.1), burbujaD * random(0.9, 1.1))
      }
    }
    rect(cajaX - 10, cajaY - 10, anchoCajaTXT + 20, altoCajaTXT + 20, 20);

    // Las burbujitas
    ellipse((canvasWescalado / 2 - 47) - 0.5 * sin(millis() / 500),
      65 + random(-3, 3), 20, 20);
    ellipse((canvasWescalado / 2 - 65) + 0.5 * sin(millis() / 500),
      75 + random(-3, 3), 15, 15);
    ellipse((canvasWescalado / 2 - 65) + 0.5 * sin(millis() / 500),
      90 + random(-3, 3), 10, 10);
    ellipse((canvasWescalado / 2 - 55) - 0.5 * sin(millis() / 500),
      100 + random(-3, 3), 6, 6);

    // Y por último, el texto
    fill('black');
    textFont(fredokaOne);
    textSize(altoFuenteTXT);
    textLeading(interlineaTXT);
    text(mensajeTXT, cajaX, cajaY, anchoCajaTXT, altoCajaTXT);

  } else if (mensajeTXT != '') {
    mensajeTXT = '';
  }
}

// *********************************************************************
// mousePressed()
// *********************************************************************
function mousePressed() {

  switch (estadoSixEyes) {

    case 0: // Standby

      // De momento solo hay una opción con la pelotita
      if (darSusto == true && faseAsustar == 0) {
        estadoSixEyes = 5;
        faseAsustar = 1
      } else if (!verBienvenida) {
        estadoSixEyes = 1; // Pelotita
        fasePelotita = 0;
      }
      break;

    case 1: // Pelotita

      // No hay que hacer nada
      break;

    case 3: // Ataque


      break;

    case 4: // Apagon
      // pulsarOn = true;
      break;

    default:
      return false;
  }
}

// *********************************************************************
// mouseReleased()
// *********************************************************************
function mouseReleased() {

  // Si al soltar el ratón estábamos en fase de pelotita...
  if (estadoSixEyes == 1 && fasePelotita == 0 && !verBienvenida) {
    fasePelotita = 1;
  }


}

// *********************************************************************
// mouseReleased()
// *********************************************************************
function mouseClicked() {

  // Si estamos bajo ataque, el usuario no ha fijado un blanco
  // y hace clic en un invasor, fijamos el objetivo...
  if (faseAtaque == 5 && !targetUsuario) {

    // ... tomando las coordenadas para fijarlo
    ratonX = mouseX / escala;
    ratonY = mouseY / escala;

    // Radio del tamaño de la diana
    let diana = anchoSprite / 2 * vPx;

    // Recorremos el array en busca de blancos dentro de la diana
    for (let f = 0; f < 5; f++) {
      for (let c = 0; c < 11; c++) {
        invX = colIzq + (anchoSprite + medV) * c * vPx; // Escalamos
        invY = hordaY + (altoSprite + medH) * f * vPx; // a SEpx

        // Si está sobre un invasor vivo
        // y aun no se ha fijado un objetivo, lo marcamos
        let dianaX = ratonX > invX && ratonX < invX + anchoSprite * vPx;
        let dianaY = ratonY > invY && ratonY < invY + altoSprite * vPx;
        if (dianaX && dianaY && !targetUsuario && estadoInvasor[f][c] == 0) {
          invXu = invX;
          invYu = invY;
          estadoInvasor[f][c] = 2; // marcado por el usuario
          marcaUsuario = [f, c];
          targetUsuario = true;
        }
      }
    }
  } else if (faseAtaque == 5 && targetUsuario) {
    // Solo un objetivo cada vez
    timeSolo = millis();
    soloUno = true;
  }
}

// *********************************************************************
// keyPressed()
// *********************************************************************
function keyPressed() {
  // Si está en standby
  if (estadoSixEyes == 0 && !verBienvenida) {
    switch (keyCode) {
      case 65: // [A]taque
        proximoAtaque = millis();
        break;

      case 86: // [V]ecino
        proximaVisita = millis();
        break;

      case 76: // [L]uces
        proximoApagon = millis();
        break;

      default:
        if (!flags) {
          return false
        }
    }
  }

  // Si hay un apagon
  if (estadoSixEyes == 4 && keyCode == 88) {
    rayosX = rayosX ? false : true;
  }

  // En cualquier situacion
  if (keyCode == 79 && !verBienvenida) {
    // contr[O]les
    verControles = verControles ? false : true;
  }

  // Si los flags están activados
  if (flags) {
    switch (keyCode) {
      case 66: // [B]ody
        cuerpo = cuerpo ? false : true;
        break;
      case 67: // [C]anva
        verCanvaOriginal = verCanvaOriginal ? false : true;
        break;
      case 72: // [H]it box
        verHitBox = verHitBox ? false : true;
        break;
      case 83: // [S]ix Eyes' brain
        variables = variables ? false : true;
        break;
      case 84: // [T]entáculos
        verBezierTentaculos = verBezierTentaculos ? false : true;
        break;

      default:
        return false;
    }
  }
}

// **************************************************************
// Variables
// **************************************************************
function verVariables() {
  var estadoTXT = estadoSixEyes == 0 ? 'Standby' : estadoSixEyes == 1 ? 'Pelotita' : estadoSixEyes == 2 ? 'Visita' : estadoSixEyes == 3 ? 'Ataque' : estadoSixEyes == 4 ? 'Luces' : estadoSixEyes == 5 ? 'Asustar' : estadoSixEyes == 9 ? 'Reiniciar' : 'Indefinido';
  var estadoInvasorTXT = '';
  for (let fInv = 0; fInv < estadoInvasor.length; fInv++) {
    for (let cInv = 0; cInv < estadoInvasor[fInv].length; cInv++) {
      estadoInvasorTXT += cInv == 0 ? '\n    ' + estadoInvasor[fInv][cInv] : estadoInvasor[fInv][cInv];
    }
  }
  noStroke();
  fill('#111122AA');
  rect(0, 0, 90, 300);
  fill('#FFF')
  textFont('monospace');
  textSize(7);
  textAlign(LEFT);
  text(
    "  Six Eyes\' brain" +
    '\n||||||||||||||||||| \n' +
    '\nfr: ' + alinear(frameRate(), 1, 4) + '  fc: ' + frameCount +
    '\nms: ' + int(millis()) +
    '\n' +
    '\nmC: ' + alinear(mouseX, 1, 6) + ' : ' + alinear(mouseY, 1, 6) +
    '\nmE: ' + alinear(mouseX / escala, 1, 6) + ' : ' + alinear(mouseY / escala, 1, 6) +
    '\nmS: ' + alinear(SEcoordX(mouseX / escala), 1, 6) + ' : ' + alinear(SEcoordY(mouseY / escala), 1, 6) +
    '\nmM: ' + alinear(movedX, 1, 6) + ' : ' + alinear(movedY, 1, 6) +
    '\nlk: ' + alinear(mirarX, 1, 6) + ' : ' + alinear(mirarY, 1, 6) +
    '\n\nAtaque en:   ' + alinear(((proximoAtaque - millis()) / 1000), 1, 6) +
    '\nVisita en:   ' + alinear(((proximaVisita - millis()) / 1000), 1, 6) +
    '\nApagón en:   ' + alinear(((proximoApagon - millis()) / 1000), 1, 6) +
    '\nParpadeo en: ' + alinear(((proximoParpadeo - millis()) / 1000), 1, 6) +
    '\n\nEstado:  ' + alinear(estadoTXT, 0, 10) +
    '\n' +
    estadoInvasorTXT +
    '\n' +
    '\n[S]ixEyes [C]anva' +
    '\n[T]entác  [B]ody' +
    '\n[A]taque  [V]isita' +
    '\n[L]uces   [H]it box', 10, 20)

  /*
    '\nSusto:   ' + faseAsustar +
  '\nAtaque:  ' + faseAtaque +
  '\nMirar:   ' + mirarAlgo +
  '\nRayos X: ' + rayosX +
  */
}

// **************************************************************
// Para alinear los variables de brain
// **************************************************************
function alinear(n, d, p) {
  let nTxt;
  if (typeof(n) == 'number') {
    nTxt = n.toFixed(d);
  } else {
    nTxt = n
  }
  n = nTxt;
  return ('      ' + n).slice(-p);
}

// **************************************************************
// Un pequeño easter egg
// **************************************************************
function dibSusto() {

  if (darSusto && faseAsustar < 3) {
    switch (faseAsustar) {

      case 1: // Inicializamos el contador y 
        tiempoSusto = millis();
        sonidoSusto.playMode('untilDone');
        sonidoSusto.play();
        faseAsustar = 2;
        break;

      case 2: // Aguantamos el susto
        if (millis() < tiempoSusto + 7000) {

          background(0);
          imageMode(CENTER);
          push();
          var zoom = ((millis() - tiempoSusto) / 80) < 1 ? ((millis() - tiempoSusto) / 80) : 1
          translate(canvasWescalado / 2, canvasHescalado / 2)
          scale(zoom)
          image(sustoJPG, 0, 0, ((300 * 1800) / 675), 300)
          pop();

        } else {
          estadoSixEyes = 9;
          faseAsustar = 3;
        }
        break;

      case 3: // no más sustos
      default:
        return;
    }
  }
}

// **************************************************************
// pasamos 3 valores RGB y devuelve una cadena CSS
// **************************************************************
function colorOjo(r, g, b) {
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

// **************************************************************
// Convierten coordenadas escaladas a coordenadas
// con origen en SixEyes
// **************************************************************
function SEcoordY(y) {
  return y - 300;
}

function SEcoordX(x) {
  return x - canvasWescalado / 2;
}

// ********************************************************************
// canvaOriginal()
// Lo utilizo para orientarme cuando me pierdo en el diseño
// ********************************************************************
function canvaOriginal() {
  noStroke();
  fill('#00000011');
  rect(canvasWescalado / 2 - 150, 0, 300, 300);
  strokeWeight(1);
  stroke('#00000022');
  for (let i = 0; i <= 300; i += 10) {
    line(canvasWescalado / 2 - 150, i, canvasWescalado / 2 + 150, i);
    line((canvasWescalado / 2 - 150) + i, 0, (canvasWescalado / 2 - 150) + i, 300);
  }
  stroke('#FF000033');
  for (let i = 0; i <= 300; i += 50) {
    line(canvasWescalado / 2 - 150, i, canvasWescalado / 2 + 150, i);
    line((canvasWescalado / 2 - 150) + i, 0, (canvasWescalado / 2 - 150) + i, 300);
  }
}

// ********************************************************************
//  verVersion()
// ********************************************************************
function verVersion() {

  textAlign(LEFT);
  textSize(6);
  textFont('verdana');
  fill('white')
  noStroke();
  text(version, 5, canvasHescalado - 5);
}

// ********************************************************************
// windowResized()
// Ajusta el canvas al tamaño de la ventana y calcula la escala
// del módulo cuadrado de Six Eyes
// ********************************************************************
function windowResized() {
  // canvasH vale 300 que era el tamaño original del canvas donde 
  // dibujé a Six Eyes
  escala = windowHeight / canvasH;
  canvasW = windowWidth;
  resizeCanvas(canvasW, canvasH * escala);
  canvasWescalado = width / escala;
  canvasHescalado = height / escala;
  // Ajusto la posición de Six Eyes
  sixEyexXpos = canvasWescalado / 2;
  sixEyexYpos = canvasHescalado;
  // Capa para el apagón
  oscuridad = createGraphics(canvasW, canvasH * escala);
}

// **************************************************************
// ang(ax,ay, bx, by)
// Tomando el punto a como centro de una circunferencia
// calculo el ángulo de un punto b situado en la circunferencia.
// Despues de repasar trigonometría con videos de Youtube, y 
// conseguir hacer la función, he visto que ya hay algo hecho
// en P5.js 
// ¯\_(ツ)_/¯
// **************************************************************
function ang(ax, ay, bx, by) {
  let x, y, rad, angulo;
  if (ay > by) {
    x = bx - ax;
    y = ay - by;
    rad = Math.atan(y / x);
    angulo = rad > 0 ? 2 * PI - rad : PI - rad;
  } else if (by > ay) {
    x = bx - ax;
    y = by - ay;
    rad = Math.atan(y / x);
    angulo = rad > 0 ? rad : PI + rad
  } else {
    angulo = bx > ax ? 0 : PI;
  }
  return angulo;
}