function setupSnow() {
  tempo = millis();
  tempo2 = 500;
  setupSnowFlag = false;
}

function letItSnow() {
  // Creación de los copos cada tempo2 milisegundos y acelerando
  if (flakes.length < mementosCopy.length && millis() > tempo) {
    flakes.push(newFlake());
    tempo = millis() + tempo2;
    //tempo2 *= 0.95;
  }

  // Dibujo de los flakes --------------------------------------------
  for (var i = 0; i < flakes.length; i++) {
    // Leemos el flake
    flakeX = flakes[i].x;
    flakeY = flakes[i].y;
    flakeSize = flakes[i].size;
    flakeVy = flakes[i].velY;
    flakeAy = flakes[i].aceY;
    flakeVx = flakes[i].velX;
    flakeRot = flakes[i].rot;
    flakeVelRot = flakes[i].velRot;
    flakeCol = flakes[i].col;

    // Dibujamos el flake
    push();
    translate(flakeX, flakeY);
    rotate(flakeRot);
    fill(flakeCol);
    noStroke();
    textFont(snowFont);
    textSize(flakeSize * 2);
    text("*", 0, 0);
    pop();

    // Calculamos su próxima posición

    // Rotación
    flakes[i].rot += flakes[i].velRot;
    // Posición Y
    flakes[i].y += flakeVy;
    flakes[i].y += windY * map(flakeSize, minSize, maxSize, 2, 1, true);
    //flakes[i].velY += flakeAy;
    // Posición X
    flakes[i].x += flakeVx;
    flakes[i].x += windX * map(flakeSize, minSize, maxSize, 2, 1, true);

    // El viento ------------------------------------------------------------------
    // No dejamos soplar el wind hasta que la animación lleve
    // 15 segundos para evitar efectos indeseados
    if (mouseIsPressed && millis() > 15000) {
      windX += movedX / 10000;
      windY += movedY / 10000;
    }
    if (abs(windX) > 0) {
      windX *= 0.99995;
    }
    if (abs(windY) > 0) {
      windY *= 0.99995;
    }
    // El viento ------------------------------------------------------------------

    // Comprobamos si ha salido por abajo o por arriba
    if (flakes[i].y < -flakeSize || flakes[i].y > height + flakeSize) {
      // Lo lo eliminamos e introducimos un nuevo copo en la nevada
      flakes.splice(i, 1);
      flakes.push(newFlake());
    }

    // Comprobamos si ha salido por los lados
    if (flakes[i].x < -flakeSize || flakes[i].x > width + flakeSize) {
      // Lo pasamos al otro lado del canva
      flakes[i].x = flakes[i].x < -flakeSize ? width + flakeSize : -flakeSize;
    }
  }
}

// **********************************************************************
// newFlake()
//***********************************************************************
function newFlake() {
  let size = random(minSize, maxSize);
  let col = color(mainColor);
  col.setAlpha(map(size, minSize, maxSize, 15, 180, true));
  if (mementosCopy.length == 0) copyMementos();
  let mementoID = floor(random(mementosCopy.length));
  mementosCopy.splice(mementoID, 1);

  //console.log(mementosCopy.length);

  return {
    id: mementoID,
    size: size,
    x: random(width),
    y: 0,
    velY: map(size, minSize, maxSize, 0.5, 1.5, true),
    velX: random(0.5, -0.5),
    rot: random(0, TWO_PI),
    velRot: random(-PI / 45, PI / 45),
    col: col,
  };
}

// Al hacer clic con el ratón
function mouseClicked() {
  // Si estamos en fase 2...
  if (stage == 2) {
    // ... ocultamos el contenido del copo que se mostraba
    // y volvemos a la fase de nevada
    stage = 1;
    letHunt = true;
    divContent.hide();
  }

  // Si estamos en fase 1 y se permite a caza de copos...
  if (stage == 1 && letHunt) {
    // Muestrame el recuerdo -----------------------------
    for (let i = 0; i < flakes.length; i++) {
      // Cazamos el primer copo que esté a menos de 30 píxeles del puntero
      if (dist(mouseX, mouseY, flakes[i].x, flakes[i].y) < 30) {
        // Anulamos el permiso de caza
        letHunt = false;
        // Seleccionamos el recuerdo
        showMementoID = flakes[i].id;
        // Activamos la visualización
        showMementoFlag = true;
        // Creamos el copo
        snowFlake = new Copo(6, 250, mementos[showMementoID]);
        // Y pasamos a fase 2
        stage = 2;
        break;
      }
    }
    // Muestrame el recuerdo ----------------------------------
  }
}
