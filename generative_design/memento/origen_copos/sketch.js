/*

Generador de datos para el ejercicio de copos de nieve
v 0.1

-----------------------------------------------------------------------------
Entrada
-----------------------------------------------------------------------------

- namesList.csv
  Lista con todos los nombres con frecuencia igual o mayor
  a 20 personas en empadronadas en España en 2021.
  
  Total: 54916 nombres
  
  Origen:
  https://www.ine.es/daco/daco42/nombyapel/nombres_por_edad_media.xls
  
  Metodología:
  Se han extraido los nombres de hombre y mujer y han sido
  concatenados en una única lista.
  La lista original del INE se encuentra en mayúsculas y sin 
  tildes (¡¿?!) por lo que previamente se ha modificado el caso de 
  los nombres para   mostrarlos en mayúsculas y minúsculas como es habitual.

- surnamesList.csv
  Lista con todos los apellidos con frecuencia igual o mayor
  a 20 personas en empadronadas en España en 2021.
  
  Total: 26223 apellidos
  
  Origen:
  https://www.ine.es/daco/daco42/nombyapel/apellidos_frecuencia.xls
  
  Metodología:
  La misma que con los nombres.
  
- paragraphsList.txt
  Haciendo uso de la página lipsum.com he generado un archivo TXT
  con 150 párrafos (al parecer es el límite del generador).
  
-----------------------------------------------------------------------------
Salida
-----------------------------------------------------------------------------
  El programa limpia las listas de cadenas vacías y genera un diccionario
  con tantos elementos como los indicados en la variables numberOfElements.
  
  Toma un nombre y apellido al azar y lo elimina del array para evitar
  repeticiones.
  
  Los párrafos se toman en una cantidad aleatoria de 1 a 4.
  
  Por simplicidad, las fechas se generan empleando el objeto Date de
  JavaScript, lo que nos proporcionará fechas aleatorias desde el
  1 de enero de 1970.
  
*/

/*
  Número de elementos a crear
  Como el programa elimina los apellidos y nombres en la lista a fin de
  evitar posibles duplicados, hay que tener en cuenta esta limitación.
*/
let numberOfElements = 500;

// Contenedor del dicionario de recuerdos
let mementosList = [];

// Contenedores de los arrays
let paragraphsList, namesList, surnamesList, mementoDate;

function preload() {
  paragraphsList = loadStrings('assets/paragraphsList.txt');
  namesList = loadStrings('assets/namesList.csv');
  surnamesList = loadStrings('assets/surnamesList.csv');
}

function setup() {
  // limpieza de paragraphsList
  for (let i = paragraphsList.length - 1; i >= 0; i--) {
    if (paragraphsList[i] == "") paragraphsList.splice(i, 1);
  }
  
  // limpieza de namesList
  for (let i = namesList.length - 1; i >= 0; i--) {
    if (namesList[i] == "") namesList.splice(i, 1);
  }
  
  // limpieza de surnamesList
  for (let i = surnamesList.length - 1; i >= 0; i--) {
    if (surnamesList[i] == "") surnamesList.splice(i, 1);
  }
  
  // Generamos la lista de recuerdos --------------------------------------
  for (let i = 0; i < numberOfElements; i++) {
   
    // Creamos una fecha aleatoria desde el 1 de enero de 1970 al día de hoy
    let today = Date.now();
    let mementoDate = new Date();
    let newDate = random(today);
    mementoDate.setTime(newDate);
    
    // La semilla asociada a la fecha contendrá el valor en milisegundos
    let seedA = ceil(newDate);
       
    // Elegimos un nombre...
    let newNameIndex = int(random(namesList.length));
    let newName = namesList[newNameIndex];
    // ... y lo eliminamos de la lista
    namesList.splice(newNameIndex, 1);
    
    // Ahora un primer apellido...
    let newFirstSurnameIndex = int(random(surnamesList.length));
    let newFirstSurname = surnamesList[newFirstSurnameIndex];
    // ... y lo eliminamos de la lista
    surnamesList.splice(newFirstSurnameIndex, 1);
    
    // Un segundo apellido...
    let newSecondSurnameIndex = int(random(surnamesList.length));
    let newSecondSurname = surnamesList[newSecondSurnameIndex];
    // ... y lo eliminamos de la lista
    surnamesList.splice(newSecondSurnameIndex, 1);
    
    // Combinamos los apellidos con el nombre
    newName += ' ' + newFirstSurname + ' ' + newSecondSurname;
    
    /* Calculamos otra semilla usando 4 carácteres del nombre
       Los valores ASCII para caráteres alfabéticos van del 65
       al 122 así que generaremos una cadena de entre 8 y 12 dígitos
       que convertiremos en semilla.
       Usamos la primera semilla para poder reproducir los resultados
       en caso de necesitar verificar la integridad de los datos.
    */
    randomSeed(seedA);
    let newNameCopy = split (newName, "");
    let seedStringB = "";
    for (let i = 0; i < 4; i++) {
      let j = floor(random (newNameCopy.length));
      seedStringB += str(unchar(newNameCopy[j]));
      newNameCopy.splice(j, 1);
    }
    let seedB = Number(seedStringB);
    
    // Decidimos cuantos párrafos contendrá el recuerdo (1-4)
    let numberOfParragraphs = ceil(random(4));
    // Inicializamos la cadena de texto que contendrá los párrafos
    let newParagraphs = "";
    // Y elegimos 4 párrafos al azar
    // Antes hacemos una copia de la lista de párrafos
    let paragraphsListCopy = [...paragraphsList];
    for (let i = 0; i < numberOfParragraphs; i++) {
      let newParagraphIndex = int(random(paragraphsListCopy.length));
      newParagraphs += "\n" + paragraphsListCopy[newParagraphIndex];
      paragraphsListCopy.splice(newParagraphIndex, 1);
    }
    
    // Repetimos el proceso para la tercera semilla con los párrafos
    
    randomSeed(seedA);
    let newParagraphsCopy = split (newParagraphs, "");
    let seedStringC = "";
    for (let i = 0; i < 4; i++) {
      let j = floor(random (newParagraphsCopy.length));
      seedStringC += str(unchar(newParagraphsCopy[j]));
      newParagraphsCopy.splice(j, 1);
    }
    let seedC = Number(seedStringC);
    
    // Añadimos el recuerdo a la lista
    
    let newElement = {
      seedA: seedA,
      seedB: seedB,
      seedC: seedC,
      date: mementoDate,
      name: newName,
      memento: newParagraphs
    }
    mementosList.push(newElement);
  }
  
  // Guardamos el resultado en un JSON que usaremos en el enerador de copos
  saveJSON(mementosList, 'mementos.json');
}
