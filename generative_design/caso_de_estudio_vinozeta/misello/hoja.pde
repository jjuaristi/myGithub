class Hoja {

  // Contenedor de la hoja
  PGraphics hoja;

  // Contenedor de la etiqueta
  Etiqueta etiqueta;

  // ¿Lleva marcas de imprenta?
  boolean marcas;

  // Registro con los datos necesarios para generar la etiqueta
  String[] registro;

  // Datos extraidos del registro
  int serial;
  float botella;
  String nombre;
  String year;

  /* ------------------------------------------------------------------------
   >>>> constructor
   ---------------------------------------------------------------------------
   En el constructor inicializamos las variables con los parámetros pasados
   y se invoca al procedimiento que genera la hoja
   -------------------------------------------------------------------------- */
  Hoja(String[] _registro, boolean _marcas) {

    // recibimos el registro a generar
    registro = _registro;

    // Y si debemos añadir marcas de imprente
    marcas = _marcas;

    // nro de serie
    serial = Integer.valueOf(registro[0]);

    // Volumen de la botella
    botella = Float.valueOf(registro[1]); // String con la capacidad de la botella

    // Nombre del cliente
    nombre = registro[2];

    // Año
    year = registro[3];

    // Invocamos al procedimiento generador
    crearHoja();
  }

  /* ------------------------------------------------------------------------
   >>>> crearHoja
   ---------------------------------------------------------------------------
   Este procedimiento ajusta el tamaño final del archivo en función de si este
   debe llevar marcas de imprenta o no e incorpora la etiqueta y las marcas en
   caso de tener que llevarlas.
   -------------------------------------------------------------------------- */
  private void crearHoja () {

    // Creamos la etiqueta
    etiqueta = new Etiqueta(nombre, serial, botella, marcas);

    // Calculamos un margen para la hoja si lleva marcas
    float offset = marcas ? margen - sangre : 0;
    offset = cm2px(offset, etiDPI);

    // Creamos el contenedor de la hoja
    int anchoPX = floor(etiqueta.etiqueta.width + offset * 2);
    int altoPX = floor(etiqueta.etiqueta.height + offset * 2);
    hoja = createGraphics(anchoPX, altoPX);

    // Ponemos un fondo blanco
    hoja.beginDraw();
    hoja.background(#FFFFFF);

    // colocamos la etiqueta en el centro
    hoja.imageMode(CENTER);
    hoja.image(etiqueta.etiqueta, hoja.width/2, hoja.height/2);

    // Terminamos el dibujo de la etiqueta sobre la hoja
    hoja.endDraw();

    // Y añadimos las marcas si es necesario
    if (marcas) dibujarMarcas();
  }

  /* ------------------------------------------------------------------------
   >>>> dibujarMarcas
   ---------------------------------------------------------------------------
   Este procedimiento ajusta el tamaño final del archivo en función de si este
   debe llevar marcas de imprenta o no e incorpora la etiqueta y las marcas en
   caso de tener que llevarlas.
   -------------------------------------------------------------------------- */
  private void dibujarMarcas () {

    // Medidas en px del margen total y las lineas de corte
    float offsetTotal = cm2px (margen, etiDPI);
    float linea = cm2px(corte, etiDPI);

    // Posición de las lineas de corte
    float lineaIzq = offsetTotal;
    float lineaDer = hoja.width - offsetTotal;
    float lineaSup = offsetTotal;
    float lineaInf = hoja.height - offsetTotal;

    // Dibujado de las líneas de corte
    hoja.beginDraw();
    hoja.stroke(#000000);
    hoja.strokeWeight(2);
    hoja.line(0, lineaSup, linea, lineaSup);
    hoja.line(lineaIzq, 0, lineaIzq, linea);
    hoja.line(lineaDer, 0, lineaDer, linea);
    hoja.line(hoja.width - linea, lineaSup, hoja.width, lineaSup);
    hoja.line(hoja.width - linea, lineaInf, hoja.width, lineaInf);
    hoja.line(lineaDer, hoja.height - linea, lineaDer, hoja.height);
    hoja.line(lineaIzq, hoja.height - linea, lineaIzq, hoja.height);
    hoja.line(0, lineaInf, linea, lineaInf);
    hoja.endDraw();

    // Información del documento (si está activado el flag)
    if (notas) dibujarNotas(lineaIzq);

    // Densitómetro
    // El código siguiente, que genera la escala de densitómetro,
    // no es relevante para la PEC
    if (densi) dibujarDensi(lineaInf);
  }

  /* ------------------------------------------------------------------------
   >>>> dibujarDensi
   ---------------------------------------------------------------------------
   Si se activa el flag se añaden a la hoja una escala de densitómetro
   -------------------------------------------------------------------------- */
  void dibujarDensi (float posY) {
    
    // Ajustamoel el ancho de la escala de densitómetro en píxeles
    float dW = cm2px(densiWH, etiDPI);
    
    // Preparamos la fuente
    String densiFontFile = "Lato-Regular.ttf";
    float densiFontSize = dW/4;
    PFont densiFont = createFont("fonts/"+densiFontFile, densiFontSize);
    
    hoja.beginDraw();
    hoja.textFont(densiFont);
    hoja.textAlign(LEFT);
    hoja.textSize(densiFontSize);
    hoja.strokeWeight(2);
    hoja.rectMode(CORNER);
    for (int i = 0; i<densiVal.length; i++) {
      // Ajustamos el color de fondo y de línea
      hoja.fill(map(densiVal[i], 0, 100, 255, 0));
      hoja.stroke(densiVal[i] <= 50 ? 0 : 255);
      // Calculamos la posición y dibujamos el parche con su valor
      float dX = hoja.width - dW;
      float dY =posY - dW*(3+i);
      hoja.rect(dX, dY, dW, dW);
      hoja.fill(densiVal[i]<=50?0:255);
      hoja.text(densiVal[i], dX + dW*0.1, dY+dW*0.9);
    }
    hoja.endDraw();
  }

  /* ------------------------------------------------------------------------
   >>>> dibujarNotas
   ---------------------------------------------------------------------------
   Si se activa el flag se añaden a la hoja el nombre del archivo,
   las medidas en bruto del documento, las medidas cortado, la resolución de 
   salida y la fecha y hora de generación.
   -------------------------------------------------------------------------- */
  void dibujarNotas (float posX) {
    // Preparación de la fuente
    String notasFontFile = "Lato-Regular.ttf";
    float notasFontSize = cm2px(notasH, etiDPI);
    PFont notasFont = createFont("fonts/"+notasFontFile, notasFontSize);

    // Formateado de la fecha de creación del documento
    String[] mes = {"enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"};
    String fechaStr = nf(day(), 2)+" de " + mes[month()] + " de " + year();

    // Formateado de la hora
    String horaStr = nf(hour(), 2) + ":"+nf(minute(), 2)+":"+nf(second(), 2);

    // Formateado del nombre del archivo
    String archivoStr = raizArchivo + nf(serial, 3)+ext;

    // Formateamos las medidas
    float hojaW = (hoja.width / etiDPI) * INCH;
    float hojaH = (hoja.height / etiDPI) * INCH;
    String medidasStr = nfc(hojaW, 2) + " x " + nfc(hojaH, 2) + " cm / ";
    medidasStr += nfc(etiqueta.anchoCM - sangre * 2, 2) + " x " + nfc(etiqueta.altoCM - sangre * 2, 2) + " cm @"+etiDPI+" dpi";

    // Datos de salida
    String datosStr = archivoStr +"\n" + medidasStr + "\n" + fechaStr + "  " + horaStr;

    // Colocamos los datos en la hoja
    hoja.beginDraw();
    hoja.textFont(notasFont);
    hoja.textAlign(LEFT);
    hoja.textSize(notasFontSize);
    hoja.fill(0);
    hoja.text(datosStr, posX + notasFontSize * 4, hoja.height - notasFontSize * 4);
    hoja.endDraw();
  }
}
