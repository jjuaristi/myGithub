/*

v1 - Cargo el JSON y genero un mosaico con una imagen.
     La posición del cursor genera un efecto en el mosaico.
     Con los cursores cambio de noticia.
     
     Me da error al tratar de cargar una imagen desde mytimes.com
v2 - Preparo el titular como una clase.
     Añadido el cambio de tamaño de fuente con + y -.
     Sigo con el error de la carga de imágenes.
     
v3 - Ahora el mosaico también es una clase.
     Añadidos métodos set...() a las clases.
     Mejorada la presentación del titular ajustando el arco de
     del texto teniendo en cuenta la cadena ya escrita en lugar
     de cada carácter independiente.
     Añadido el cambio de fuente y control del traking para
     modificar la densidad del mosaico.
     El problema con las imágenes es Cross-Origin Resource 
     Sharing (CORS).
     https://developer.mozilla.org/es/docs/Web/HTTP/CORS/Errors
     
v4 - Encontrado cors-anywhere.herokuapp.com, un proxy que nos 
     permite esquivar el problema de CORS.
     https://github.com/Rob--W/cors-anywhere/#documentation
     Ya puedo descargar las imágenes de las noticias.
     Hago la carga de imágenes en el setup porque el el preload
     me da error ya que el JSON no está aun cargado.

v5 - Cambios y pruebas menores.

v6 - Reorganizo el código y creo un archivo para cada clase.
     Independizo las clases de las variables globales añadiendo
     nuevos métodos set...().
     Consigo hacer la precarga con un callbak tras la carga del JSON 
     
v7 - Tengo una idea con esto: https://www.youtube.com/watch?v=4hA7G3gup-4
     Empiezo a usar vectores.
     He adaptado la idea de...
     https://www.youtube.com/watch?v=4hA7G3gup-4
     pero tengo problemas de rendimiento. 
     ya tenía problemas solo con el mosaico.
     Demasiadas partículas.
     Con el traking y la fuente al mínimo llego a algo más de 10.000
     partículas en el canva (más de 13.000 con la fuente tipo fraktur),
     que además al no tratrase de simples puntos si no de caracteres,
     hacen que el rendimiento caiga hasta un FPS.
     Dibujar los 10.000 caracteres lleva en mi ordenador un total de
     unos 300 ms, 350 ms si incluyo los comnportamientos de las partículas.
     
     Investigar: Si dejo en el draw() tan solo el background y la llamada
     a dibujar el fondo de partículas...
     
     function draw() {
        background(250);
        fondo.dibujar();
      }
      
     ... desde que termina de dibujar hasta vuelve a comenzar el draw()
     pasan 200 ms ¡¡¿?!!
     
     ¡Eso son como 12 frames! ¿Donde pierde ese tiempo el programa?
     
     Como no he encontrado una solución pero me gusta el resultado voy a
     limitar lo máximo que pueda el tamaño y traking mínimo pero la caida
     de frame rate seguirá siendo muy alta.
     
v8 - Añado las instrucciones para la entrega

*/

/*

  CONTROLES
  ---------
  [ ← ] [ → ] Cambio de arículo
  
  [ - ] [ + ] Tamaño de fuente
  
  [ pUp ] [ pDown ] Cambio de fuente
  
  [ Home ] [ End ] Traking (densidad del mosaico)

*/

const version = 'v.0.8.0'

// ***************************************************************
// Variables para la descarga del JSON
// ***************************************************************
const posibles = ['music', 'technology', 'film', 'sport', 'covid', 'spain', 'science']

let API_KEY = 'amYeR35kIzaDLM9pDGmFAv77Jd24Uk7y';
let query = posibles[parseInt(Math.random() * posibles.length)]
let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + query + '&api-key=' + API_KEY;
let cors = 'https://cors-anywhere.herokuapp.com/https://www.nytimes.com/'
let articulosJSON;
// ***************************************************************

// Arrays e índices
let titulares = [];
let textos = [];
let imagenes = [];
let fuentes = [];
let iArt = 0;
let iImg = 0;
let iFnt = 0;

// Variables globales
let canvasWH = 500;
let fuentePx = 35;
let fntPxMin = 25;
let fntPxMax = 50;
let densidad = 1;
let imagenAlternativa;
let rendimiento = true;
let fuente, fondo, diana;
let fase = 0;

// *************************************************************
// Preload
// *************************************************************
function preload() {

  // Precarga de fuentes
  fuentes[0] = loadFont('assets/Merriweather-Black.ttf');
  fuentes[1] = loadFont('assets/Ultra-Regular.ttf');
  fuentes[2] = loadFont('assets/UnifrakturCook-Bold.ttf');

  // Imágenes alternativas
  imagenAlternativa = loadImage('assets/fondo01.png')

  // Precarga de artículos
  articulosJSON = loadJSON(url, iniArrays);

}


// *************************************************************
// Función para inicializar los arrays antes de empezar
// *************************************************************
function iniArrays() {

  // Recorremos el array de artículosJSON
  for (let i = 0; i < articulosJSON.response.docs.length; i++) {

    // Obtenemos la URL de la imagen que queremos cargar...
    if (articulosJSON.response.docs[i].multimedia.length > 0) {
      let imgURL = articulosJSON.response.docs[i].multimedia[19].url;

      // ...y la añadimos al array de imágenes.
      imagenes.push(loadImage(cors + imgURL));
    } else {

      // Si el artículo no tiene imágenes cargamos una imagen alternativa
      imagenes.push(imagenAlternativa);
    }

    // Lo mismo con los titulares
    titulares.push(articulosJSON.response.docs[i].headline.main);

    // Y el texto que vamos a utilizar para el mosaico
    let resumen = articulosJSON.response.docs[i].abstract;
    let parrafo = articulosJSON.response.docs[i].lead_paragraph;
    textos.push(resumen + ' ' + parrafo + ' ');

  }
}


// *************************************************************
// Setup
// *************************************************************
function setup() {
  createCanvas(canvasWH, canvasWH);

  //Creamos el fondo
  fondo = new MosaicoTexto(
    textos[iArt],
    imagenes[iImg],
    fuentes[iFnt],
    fuentePx,
    densidad
  );

  // Y el titular en circular
  diana = new Titular(
    titulares[iArt],
    fuentes[iFnt]
  );
}

// *************************************************************
// Draw
// *************************************************************
function draw() {
  if (fase == 0) {
    presentacion();
  } else {
    //console.log(millis(), '$$$$$DRAW')
    background(250);
    fondo.dibujar();
    diana.update();
    diana.dibujar();
    rendimiento ? dibujarRendimiento() : null;
  }
}

// *******************************************************
// presentación
// *******************************************************
function presentacion() {
  background(255);
  noStroke();
  textFont('verdana');
  textAlign(CENTER);
  fill(20);
  textSize(30);
  textStyle(BOLD)
  text('PRACTICA', width / 2, height / 2 - 175);

  textSize(10);
  textLeading(18)
  textStyle(NORMAL);
  text('© 2021 Javier Juaristi | ' + version +
    '\nJSON, split, objetos y vectores', width / 2, height / 2 - 150);
  textSize(12);
  text('El programa descarga desde la API del New York Times un archivo JSON con diez noticias de varios temas al azar y prepara un mosaico con el texto del resumen y el encabezado.\n\nSi apretamos el traking (espaciado) y reducimos el tamaño de la fuente, veremos como el mosaico de letras termina formando la imagen de la noticia.\n\nEl titular de la noticia aparece como un anillo que rota y repele las letras que están en su interior mientras estas tratan de regresar a su posición.\n\nEn la barra de estado inferior se muestra el índice de la noticia, el numero de caracteres dibujados, su tamaño y el frame rate. Al medida que aumenta el número de caracteres el frame rate cae drásticamente.', width * 0.15, height / 2 - 110, width * 0.7, 240)
   text('Cambiar de titular [←] [→]', width / 2, height / 2 + 158);
  text('Tamaño de la fuente [↑] [↓]', width / 2, height / 2 + 176);
  text('Ajustar traking [-] [+]', width / 2, height / 2 + 194);
  text('Cambiar fuente [pgUp] [pgDown]', width / 2, height / 2 + 212);
  
  textSize(15);
  text('Haz clic con el ratón para comenzar', width / 2, height / 2 + 240)

  if(mouseIsPressed){
    fase = 1
  }

}

// *******************************************************
// barra de estado
// *******************************************************
function dibujarRendimiento() {
  fill(255, 200);
  noStroke();
  rect(0, height, width, -20);
  fill(0);
  textFont('monospace');
  textSize(14);
  textAlign(CENTER)
  text(`${query}[${iArt}] - Caracteres: ${fondo.mosaico.length}@${fuentePx}px - FPS ${frameRate().toFixed(1)}`, width / 2, height - 5)
}

// *************************************************************
// Controles por teclado
// *************************************************************
function keyPressed() {
  switch (keyCode) {

    case 37: // ← Artículo
      if (iArt == 0) {
        iArt = textos.length;
      }
      if (iArt > 0) {
        iArt--;
      }
      fondo.setImagen(imagenes[iArt])
      fondo.setTexto(textos[iArt]);
      fondo.update();
      diana.setTitular(titulares[iArt])
      diana.update();
      break;

    case 39: // → Artículo
      if (iArt < textos.length) {
        iArt++;
      }
      if (iArt == textos.length) {
        iArt = 0;
      }
      fondo.setImagen(imagenes[iArt])
      fondo.setTexto(textos[iArt]);
      fondo.update();
      diana.setTitular(titulares[iArt])
      diana.update();
      break;

    case 38: // Arriba tamaño fuente
      fuentePx = fuentePx < fntPxMax ? ++fuentePx : fuentePx;
      fondo.setFontSize(fuentePx);
      fondo.update();
      break;

    case 40: // Abajo tamaño fuente
      fuentePx = fuentePx > fntPxMin ? --fuentePx : fuentePx;
      fondo.setFontSize(fuentePx);
      fondo.update();
      break;

    case 33: // PageUp Fuente
      if (iFnt < imagenes.length) {
        iFnt++;
      }
      if (iFnt == fuentes.length) {
        iFnt = 0;
      }
      fondo.setFuente(fuentes[iFnt]);
      fondo.update();
      diana.setFuente(fuentes[iFnt]);
      diana.update();
      break;

    case 34: // PageDown Fuente
      if (iFnt == 0) {
        iFnt = fuentes.length;
      }
      if (iFnt > 0) {
        iFnt--;
      }
      fondo.setFuente(fuentes[iFnt]);
      fondo.update();
      diana.setFuente(fuentes[iFnt]);
      diana.update();
      break;

    case 107: // + traking
      if (densidad < 1.5) {
        densidad = (densidad * 10 + 1) / 10;
      }
      fondo.setDensidad(densidad);
      fondo.update();
      break;

    case 109: // + traking
      if (densidad > 0.4) {
        densidad = (densidad * 10 - 1) / 10;
      }
      fondo.setDensidad(densidad);
      fondo.update();
      break;

    case 82: // [R]endimiento
      rendimiento = !rendimiento;
      break;
  }
}