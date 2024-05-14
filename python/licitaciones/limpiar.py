import codecs

ruta = 'C:/Users/juari/Documents/sketchs python/licitaciones/'
txt = 'mail_18102023.txt'
archivo = ruta + '/' + txt

saltarTexto = ['Anuncio de Adjudicaci\xF3n\r\n',
               'Anuncio de Formalizaci\xF3n\r\n',
               'Anulaci\xF3n Anuncio de Licitaci\xF3n\r\n',
               'Rectificaci\xF3n Anuncio de Formalizaci\xF3n\r\n',
               'Anulaci\xF3n Pliegos\r\n']
saltar = False
lineaVacia = '\r\n'

entrada = codecs.open(archivo, 'r', encoding='utf-8', errors='ignore')
salida = open(txt + '_LIMPIO.txt', 'w')

print (entrada)
print (salida)

for linea in entrada:
    if linea in saltarTexto:
        saltar = True
        continue
    if saltar :
        if linea == lineaVacia :
            saltar = False
            continue
        else :
            continue

    salida.write(linea.rstrip()+'\n')

entrada.close()
salida.close()
print ('Fin de la limpieza')
