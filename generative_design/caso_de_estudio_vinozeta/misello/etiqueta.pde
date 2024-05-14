class Etiqueta {

  // Contenedor para la etiqueta
  PGraphics etiqueta;

  // Retícula compositiva de la etiqueta
  // Usar una retícula permite adaptar la etiqueta a distintos diámetros de botellas
  int retiFil = 12; // filas
  int retiCol = 21; // columnas

  // Medidas
  float anchoCM, altoCM, modCM, anchoPX, altoPX, modPX, sangrePX;

  // variables receptoras de los datos del registro
  String nombre;
  int serial;
  float botella;
  boolean marcas;

  // Variables para el sello
  // Contenedor y semilla
  Sello miSello;
  int miSemilla;
  
  /* ------------------------------------------------------------------------
  >>>> constructor
  ---------------------------------------------------------------------------
  En el constructor inicializamos las variables con los parámetros pasados
  y se invoca al procedimiento que genera la etiqueta en si
  -------------------------------------------------------------------------- */
  Etiqueta (String _nombre, int _serial, float _botella, boolean _marcas) {
    // Propiedades base
    nombre = _nombre;
    serial = _serial;
    botella = _botella;
    marcas = _marcas;

    // Localizamos el ancho de la etiqueta en cm
    anchoCM = anchoEtiquetaCM (botella);

    // y el alto en función de la retícula
    modCM = (anchoCM / retiCol);
    altoCM = modCM * retiFil;

    // Si lleva marcas añadimos la sangre
    if (marcas) {
      anchoCM += sangre * 2;
      altoCM += sangre * 2;
    }

    // Pasamos las medidas a px para trabajar con ellas
    anchoPX = cm2px(anchoCM, etiDPI);
    altoPX = cm2px(altoCM, etiDPI);
    sangrePX = marcas ? cm2px(sangre, etiDPI) : 0;
    modPX = cm2px(modCM, etiDPI);

    // Creamos el contenedor de la etiqueta
    etiqueta = createGraphics(floor(anchoPX), floor(altoPX));

    // Finalmente invocamos al generador de la etiqueta
    crearEtiqueta();
  } // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Fin del constructor

  /* ------------------------------------------------------------------------
  >>>> anchoEtiquetaCM
  ---------------------------------------------------------------------------
  Pasa la medida en cm correspondiente al volumen en litros indicado en  el CSV
  -------------------------------------------------------------------------- */ 
  private float anchoEtiquetaCM (float litros) {
    float cm = 0;
    for (int i = 0; i < etiWidths.length; i +=2) {
      if (litros == etiWidths[i]) {
        cm = etiWidths[i+1];
        continue;
      }
    }
    if (cm == 0) {
      println("Este registro no se corresponde con ninguna medida de botella disponible:" + botella);
      // Aquí habría que añadir un flag para saltar este registro y generar un log de errores
      // No se ha implementado dado que los datos proporcionados para este ejemplo están supervisados
      cm = 1; // <<< se añade para evitar errores durante los test
    }
    return cm;
  }

  /* ------------------------------------------------------------------------
  >>>> crearEtiqueta
  ---------------------------------------------------------------------------
  Esta función genera la etique incorporando todos los componentes
  -------------------------------------------------------------------------- */ 
  private void crearEtiqueta () {
    // Generamos una semilla con el nombre del cliente para crear el sello
    miSemilla = crearSemilla(nombre);

    // Generamos el sello
    miSello = new Sello(miSemilla, floor(anchoPX *2), 150);

    // Comenzamos el dibujo de la etiqueta
    etiqueta.beginDraw();
    etiqueta.imageMode(CENTER);
    etiqueta.pushMatrix();
    
    // Generamos una semilla con el serial
    randomSeed(serial);
    // Nos ubicamos en la posición correspondiente empleando la retícula
    etiqueta.translate(etiqueta.width / 2, sangrePX + modPX * 5);
    // Aplicamos una rotación aleatoria
    etiqueta.rotate(randomGaussian()*TAU);
    // Y colocamos el sello como fondo de la etiqueta
    etiqueta.image(miSello.selloCanva, 0, 0);

    // Sobre el fondo aplicamos el resto de los elementos
    primipassi();
    faja();
    pie();
    serie();
    
    // Si está activado el flag, mostramos la retícula constructiva para que nos ayude
    if (verReticula) reticula();
    
    // Finalizamos el dibujo de la etiqueta
    etiqueta.popMatrix();
    etiqueta.endDraw();
  }

  /* ------------------------------------------------------------------------
  >>>> primipassi
  ---------------------------------------------------------------------------
  Función para posicionar la marca Primipassi sobre el fondo
  -------------------------------------------------------------------------- */ 
  void primipassi () {
    
    // Preparamos la fuente empleada
    String fontPrimipassiFile = "Alexana Neue.ttf";
    float fontPrimipassiSize = modPX/2;
    PFont fontPrimipassi = createFont("fonts/" + fontPrimipassiFile, fontPrimipassiSize);
    
    // Empezamos el dibujo
    etiqueta.beginDraw();
    
    // Colocamos la mancha sobre la que irá la marca
    etiqueta.fill(#000000);
    etiqueta.noStroke();
    etiqueta.rectMode(CENTER);
    etiqueta.rect(etiqueta.width/2, sangrePX + modPX*2, modPX*6, modPX);
    
    // Y el texto de la marca
    etiqueta.textFont(fontPrimipassi);
    etiqueta.textAlign(CENTER);
    etiqueta.textSize(fontPrimipassiSize);
    etiqueta.fill(#FFFFFF);
    etiqueta.text("P R I M I P A S S I", etiqueta.width/2, sangrePX + (modPX * 2) + (fontPrimipassiSize / 2) - textDescent() );
    
    // Termina el dibujo
    etiqueta.endDraw();
  }

  /* ------------------------------------------------------------------------
  >>>> faja
  ---------------------------------------------------------------------------
  Función para posicionar la faja con el sello enmarcado sobre fondo
  -------------------------------------------------------------------------- */ 
  void faja () {
    
    // Cargamos la imagen con el contenido de la faja central
    PShape sottosopra = loadShape("images/etiqueta_faja.svg");
    
    // Comenzamos el dibujo
    etiqueta.beginDraw();
    etiqueta.shapeMode(CENTER);

    // Mancha para la faja
    etiqueta.rectMode(CENTER);
    etiqueta.fill(#000000);
    etiqueta.noStroke();
    etiqueta.rect(etiqueta.width/ 2, sangrePX + modPX * 5, etiqueta.width, modPX * 2);
    
    // Contenido de la faja
    etiqueta.shape(sottosopra, etiqueta.width/ 2, sangrePX + modPX * 5, etiqueta.width, modPX * 2);

    // Mancha para el sello enmarcado
    etiqueta.strokeWeight (modPX / 2);
    etiqueta.stroke(#000000);
    etiqueta.rect(etiqueta.width/ 2, sangrePX + modPX * 5, modPX * 2, modPX *2);

    // Sello con marco
    etiqueta.image (marco(floor(modPX*2), miSello.selloCanva, miSello.selloStroke), etiqueta.width / 2, sangrePX + modPX * 5);
  }

  /* ------------------------------------------------------------------------
  >>>> marco
  ---------------------------------------------------------------------------
  Recive un PGraphics (el sello) y retorna otro PGraphics cuadrado del tamaño 
  indicado (marcoLado) y con un marco del ancho pasado (marcoStroke)
  -------------------------------------------------------------------------- */ 
  PGraphics marco (int marcoLado, PGraphics marcoGraphics, float marcoStroke) {
    
    // Preparamos el contenedor para el nuevo PGraphics
    PGraphics miMarco = createGraphics (marcoLado, marcoLado);
    
    // Comenzamos el dibujo
    miMarco.beginDraw();
    miMarco.imageMode(CENTER);
    
    // Colocamos la imagen recibida (sello) en el centro
    miMarco.image(marcoGraphics, marcoLado / 2, marcoLado/2);
    
    // Añadimos un marco el doble de ancho al valor pasado para que la parte 
    // visible coincida con el parámetro recibido (marcoStroke) 
    miMarco.stroke(#FFFFFF);
    miMarco.strokeWeight(marcoStroke * 2);
    miMarco.noFill();
    miMarco.rect(0, 0, marcoLado, marcoLado);
    
    // Finaliza el dibujo y retornamos el PGraphics resultante
    miMarco.endDraw();
    return miMarco;
  }

  /* ------------------------------------------------------------------------
  >>>> pie
  ---------------------------------------------------------------------------
  Coloca el contenido del pie de la etiqueta
  -------------------------------------------------------------------------- */ 
  void pie () {
    
    // Cargamos el SVG con el copy de la etiqueta
    PShape pieEtiqueta = loadShape("images/etiqueta_pie.svg");
    
    // Preparamos la fuente para el volumen de la botella
    String fontVolumenFile = "Lato-Light.ttf";
    float fontVolumenSize = modPX*0.6;
    PFont fontVolumen = createFont("fonts/" + fontVolumenFile, fontVolumenSize);
    
    // Empezamos el dibujo
    etiqueta.beginDraw();
    
    // Mancha para el pie
    etiqueta.rectMode(CORNER);
    etiqueta.fill(#000000);
    etiqueta.noStroke();
    etiqueta.rect(0, sangrePX + modPX * 9, etiqueta.width, sangrePX + modPX * 3);
    
    // Copy y datos legales del pie
    etiqueta.shapeMode(CENTER);
    etiqueta.shape(pieEtiqueta, etiqueta.width / 2, sangrePX + modPX * 10.5 + 1, etiqueta.width-sangrePX*2, modPX * 3);
   
    // Añadimos el volumen de la botella
    etiqueta.textFont(fontVolumen);
    etiqueta.textAlign(LEFT);
    etiqueta.textSize(fontVolumenSize);
    etiqueta.fill(#FFFFFF);
    etiqueta.text(botella + " L", sangrePX + modPX*4, sangrePX + modPX * 10.65);
    
    // Termina el dibujo
    etiqueta.endDraw();
  }

  /* ------------------------------------------------------------------------
  >>>> serie
  ---------------------------------------------------------------------------
  Se ha implementado a parte esta función para la ubicación del serial a fin 
  de poder modificarla con comodidad en caso necesario
  -------------------------------------------------------------------------- */ 
  void serie () {
    
    // Preparamos la fuente
    String serieFontFile = "Lato-Light.ttf";
    float serieFontSize = modPX/4;
    PFont serieFont = createFont("fonts/"+serieFontFile, serieFontSize);
    
    // Formateamos el serial
    String serialStr = nf(serial, 3) + " de " + nf(ventas.length, 3);
    
    // Y colocamos el serial formateado en la posición correspondiente
    etiqueta.beginDraw();
    etiqueta.fill(255);
    etiqueta.noStroke();
    etiqueta.textFont(serieFont);
    etiqueta.textSize(serieFontSize);
    etiqueta.textAlign(LEFT);
    
    etiqueta.text(serialStr, sangrePX + modPX * 4, sangrePX + modPX * 9.87);
    
    etiqueta.endDraw();
  }
  
  /* ------------------------------------------------------------------------
  >>>> reticula
  ---------------------------------------------------------------------------
  Se ha implementado la visualización de la retícula como ayuda visual
  -------------------------------------------------------------------------- */  
  void reticula () {
    // retícula
    for (int i = 0; i < retiFil; i++) {
      for (int j = 0; j < retiCol; j ++) {
        etiqueta.beginDraw();
        etiqueta.noFill();
        etiqueta.stroke(#FF00FF);
        etiqueta.strokeWeight(3);
        etiqueta.rectMode(CORNER);
        etiqueta.rect(sangrePX + modPX * j, sangrePX + modPX * i, modPX, modPX);
        etiqueta.endDraw();
      }
    }
  }
} // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Fin de la clase
