/* 
   Javier Juaristi
	 Autoretrato
   20/09/2020
   
   Funciones utilizadas:
	 rect();
   triangle();
   arc();
   ellipse();
   vertex();
   bezierVertex();
*/

function setup() {
  createCanvas(500, 800);
  noLoop(); // Siendo una imagen estática, no es necesario redibujarla
}

function draw() {

  // Fondo
  background('#eee'); // Pared
  fill('#fff8');
  noStroke();
  triangle(0, 0, 500, 0, 500, 800); // Brillo
  
  // Definición del trazo para el resto del dibujo
  strokeWeight(8);

  // Sombra gafas
  fill('#ee01'); // Color sombra cristal 
  stroke('#ddd'); // Color sombra marco
  beginShape();
  vertex(55, 328);
  bezierVertex(102, 320, 136, 320, 176, 330);
  bezierVertex(186, 332, 195, 345, 191, 353);
  vertex(174, 403);
  bezierVertex(169, 420, 39, 424, 38, 392);
  vertex(35, 342);
  bezierVertex(34, 335, 53, 330, 55, 328);
  endShape();
  
  // Sombra cabeza
  fill('#ddd'); // Color sombra
  noStroke();
  rect(55, 120, 310, 600, 155);

  // Camiseta
  fill('#804C62');
  ellipse(184,711,760,490); // Camiseta luz
  fill('#0002');
  ellipse(110,711,615,460); // Camiseta sombra
  stroke('#000'); 
  noFill();
  ellipse(184,711,760,490); // Contorno camiseta
  
  // Manga
  fill('#804C62');
  noStroke();
  ellipse(550,760,350,365); // Manga 
  fill('#0002');
  ellipse(550,760,350,365); // Manga sombra
  fill('#804C62');
  ellipse(550,705,200,255); // Manga luz
  noFill();
  stroke('#000');
  ellipse(550,760,350,365); // Manga contorno
  
  // Sombra barba
  noStroke();
  fill('#0002');
  ellipse(240,670,280,100);
          
  // Cabeza
  fill('HSL(180, 20%, 72%)'); // Color de piel
  stroke('#000');
  rect(95, 100, 310, 600, 155);

  // Barba
  fill('HSL(180, 20%, 50%)'); // Color de la barba
  beginShape();
  vertex(95, 410);
  bezierVertex(95, 430, 113, 450, 133, 450);
  bezierVertex(171, 450, 174, 410, 250, 410);
  bezierVertex(326, 410, 329, 450, 367, 450);
  bezierVertex(387, 450, 405, 430, 405, 410);
  vertex(405, 555);
  bezierVertex(405, 653, 348, 700, 250, 700);
  bezierVertex(152, 700, 95, 653, 95, 555);
  vertex(95, 410);
  endShape()

  // Boca
  noFill();
  arc(250, 410, 160, 190, QUARTER_PI, PI * 0.75);

  // Ojos
  noStroke();
  fill('#000');
  ellipse(172, 345, 30, 30); // Ojo izq
  ellipse(width - 172, 345, 30, 30); // Ojo der

  // Cejas
  stroke('#000');
  noFill();

  // Ceja izq
  beginShape();
  vertex(124, 340);
  bezierVertex(151, 334, 177, 330, 204, 340);
  endShape();

  // Ceja der
  beginShape();
  vertex(296, 340);
  bezierVertex(323, 330, 349, 334, 376, 340);
  endShape();

  // Brillo cabeza
  fill('#fff4');
  noStroke();
  beginShape();
  vertex(250, 104);
  bezierVertex(330, 104, 401, 163, 401, 255);
  vertex(401, 545);
  bezierVertex(401, 651, 351, 700, 250, 696);
  bezierVertex(300, 696, 350, 615, 350, 545);
  vertex(350, 255);
  bezierVertex(350, 205, 300, 100, 250, 104);
  endShape();
  
  // Gafas
  // coordenadas xDer = width-xIzq

  // Reflejo gafa izq
  fill('#fff8');
  noStroke();
  beginShape();
  vertex(95, 308);
  bezierVertex(142, 300, 176, 300, 216, 310);
  bezierVertex(226, 312, 235, 325, 231, 333);
  vertex(214, 383);
  bezierVertex(209, 400, 75, 322, 75, 322);
  bezierVertex(74, 315, 93, 310, 95, 308);
  endShape();

  // Reflejo gafa der
  beginShape();
  vertex(405, 308);
  bezierVertex(358, 300, 324, 300, 284, 310);
  bezierVertex(274, 312, 265, 325, 269, 333);
  bezierVertex(269, 333, 421, 404, 422, 372);
  vertex(425, 322);
  bezierVertex(426, 315, 407, 310, 405, 308);
  endShape();

  // Cristal izq
  fill('HSLA(60,100%,50%,0.3)');// Amarillo al 30% de transparencia
  stroke('#000');
  beginShape();
  vertex(95, 308);
  bezierVertex(142, 300, 176, 300, 216, 310);
  bezierVertex(226, 312, 235, 325, 231, 333);
  vertex(214, 383);
  bezierVertex(209, 400, 79, 404, 78, 372);
  vertex(75, 322);
  bezierVertex(74, 315, 93, 310, 95, 308);
  endShape();

  // Cristal der
  beginShape();
  vertex(405, 308);
  bezierVertex(358, 300, 324, 300, 284, 310);
  bezierVertex(274, 312, 265, 325, 269, 333);
  vertex(286, 383);
  bezierVertex(291, 400, 421, 404, 422, 372);
  vertex(425, 322);
  bezierVertex(426, 315, 407, 310, 405, 308);
  endShape();

  // Puente
  fill('#000');
  rect(233, 324, 34, 17);
}