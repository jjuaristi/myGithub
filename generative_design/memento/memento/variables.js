// Contenedor de recuerdos
let mementos;
let mementosCopy = [];

// Contenedor del copo
let snowFlake;

// Colores
let backgroundColor = "#0B1929";
let mainColor = "#50B9E1";
let textColor = "#FFFFFF";

// Fuentes
let defaulFont, snowFont;

/*
  Definimos las estados de ejecución del programa:
  
  0 - Carga de datos y recursos
  1 - Nevada
  2 - Presentación de un copo
*/
let stage = 0;

// Flags loader
let mementosLoadedFlag = false;
let fontLoadedFlag = false;
let introFlag = false;

// Tiempo mínimo de introducción en segundos
let introTime = 30;

// Valores iniciales de la nevada
let flakes = [];
let minSize = 2;
let maxSize = 18;
let maxFlakes = 300;
let windX = 0;
let windY = 0;
let renovar = false;
let flakeX,
  flakeY,
  flakeSize,
  flakeVy,
  flakeAy,
  flakeVx,
  flakeRot,
  flakeVelRot,
  flakeCol;
let tempo, tempo2;
let setupSnowFlag = true;
let letHunt = true;
let showMementoID;
let showMementoFlag = false;

// Nuestro div para mostrar el contenido
let divContent;
