/*
  La clave del diseño es generar un sello único para cada cliente 
  utilizando su nombre del cliente para generar una semilla. 
  El proceso se explica paso a paso a lo largo del código 
*/
public class Sello {
  // Preparamos un contenedor del sello
  PGraphics selloCanva;

  // Variables del sello
  int selloSeed, selloSize, selloAnillos;
  float selloDiametro, selloStroke;
  float strokeOffset = 1.3; //Ajustar visual el trazo

  // Esta lista de puntos la he usado para generar otras propuestas
  // la mantengo por comodidad
  ArrayList<Float> puntos = new ArrayList<Float>();

  // Constructor
  Sello (int _selloSeed, int _selloSize, int _selloAnillos) {
    
    // Inicializamos las propiedades básicas del sello
    selloSeed = _selloSeed;
    selloSize = _selloSize;
    selloAnillos= _selloAnillos;

    // Preparamos el contenedor para el sello
    selloCanva = createGraphics (selloSize, selloSize);

    // Aplicamos la semilla
    randomSeed (selloSeed);

    // Ajustamos el grosor del trazo en función del tamaño del sello y el número de anillo ...
    selloStroke = selloSize / (selloAnillos * 3);

    // ... y el diametro inicial en función del grosor del trazo
    selloDiametro = selloStroke * 4;

    // Iniciamos el dibujo con un fondo negro
    selloCanva.beginDraw();
    selloCanva.background(#000000);

    // Aplicamos el color y grosor del trazo
    selloCanva.strokeWeight(selloStroke);
    selloCanva.stroke(#FFFFFF);

    // Nos aseguramos de eliminar el relleno
    selloCanva.noFill();

    // Ajustamos el modo para las elipses
    selloCanva.ellipseMode(CENTER);

    // Generamos anillos concéntricos con tantos puntos aleatorios como indice de anillo tengan
    for (int i = 0; i < selloAnillos; i++) {

      // Calculamos el gap para el anillo en cuestión en función del grosor del trazo
      float puntoGap = (selloStroke * 1.5) / (selloDiametro/2); // Angulo en radianes = Longitud de arco / Radio

      // Primero elegimos al azar el primer punto del anillo
      float primerPunto = random(TAU);

      // añadimos el punto a la lista de puntos
      puntos.add(primerPunto); // Ángulo
      puntos.add(selloDiametro/2); // Radio

      // Dibujamos un arco de 0,001 rad para que tan solo dibuje un punto
      selloCanva.arc (selloSize / 2, selloSize / 2, selloDiametro, selloDiametro, primerPunto - 0.001, primerPunto + 0.001);

      // Dibujamos el resto de arcos y puntos
      // El primer anillo no entra en este bucle (j = 0) < (i=0)
      for (int j = 0; j < i; j++) {

        // Anotamos la posición del punto anterior
        float puntoA = puntos.get(puntos.size()-2);

        // Calculamos el siguiente punto y lo añadimos a la lista
        float arcoMax = (TAU - puntoA + primerPunto) / (i-j);
        float nuevoArco = random(arcoMax*0.2, arcoMax);
        float puntoB = puntoA + nuevoArco;
        puntos.add(puntoB);
        puntos.add(selloDiametro/2);

        // Dibujamos el arco
        selloCanva.arc (selloSize / 2, selloSize / 2, selloDiametro, selloDiametro, puntoA + puntoGap, puntoB - puntoGap);

        // Y el punto
        selloCanva.stroke(#FFFFFF);
        selloCanva.arc (selloSize / 2, selloSize / 2, selloDiametro, selloDiametro, puntoB - 0.001, puntoB + 0.001);
      }

      // Dibujamos el arco final para completar el anillo
      selloCanva.arc (selloSize / 2, selloSize / 2, selloDiametro, selloDiametro, puntos.get(puntos.size()-2) + puntoGap, TAU + primerPunto - puntoGap);

      // Aumentamos el diametro para el siguiente anillo
      selloDiametro += selloStroke * 4;
    }

    // Finalizamos el dibujo del sello
    selloCanva.endDraw();
    
  }
}
