'''
=====================================================================
Constantes globales
=====================================================================
'''
# v.0.1 - Primera aproximación a Python y Tkinter
# v.0.2 - Refactorizado del código y división en módulos
#       - Cambio en la gestión de la entrada
#       - Necesita algún ajuste con los decimales en algunas operaciones
# v.0.3 - Guardado del historial
#       - Aun hay un error concatenando raices
# v.0.4 - Version operativa
#       - Habría que mejorar el manejo de los decimales

VERSION = 'v.0.4'

RESIZABLE_W = False
RESIZABLE_H = False
WINDOW_W = 348

HISTORIAL_H = 150
HISTORIAL_W = WINDOW_W
HISTORIAL_X = 0
HISTORIAL_Y = 0
HISTORIAL_FUENTE = ('Calibri', 10)
HISTORIAL_BG = '#23252E'
HISTORIAL_FG = '#DDDDDD' 

COLOR_FONDO = '#23252E'

BOTON_FUENTE = ('Calibri', 14, 'bold')
BOTON_FG = '#FFFFFF'
BOTON_GAP = 6
BOTON_W = 60
BOTON_H = 40

BOTON_DIGITO_BG = '#4F5158'
BOTON_DIGITO_BG_HOVER = '#676971'

BOTON_OPERADOR_BG = '#373842'
BOTON_OPERADOR_BG_HOVER = '#50525A'

BOTON_IGUAL_BG = '#E66100'
BOTON_IGUAL_BG_HOVER = '#FF7C26'

BOTON_HIS_BG = '#373842'
BOTON_HIS_BG_HOVER = '#50525A'
BOTON_HIS_FUENTE = ('Calibri', 10, 'bold')

PANTALLA_FUENTE = ('Calibri', 22, 'bold')
PANTALLA_BG = '#383A42'
PANTALLA_FG = '#FFFFFF'
PANTALLA_W = WINDOW_W
PANTALLA_H = BOTON_H * 2
PANTALLA_X = 0
PANTALLA_Y = HISTORIAL_H
PANTALLA_MAX_DIGITOS = 16

BOTONES_X = BOTON_GAP * 2
BOTONES_Y = PANTALLA_Y + PANTALLA_H + BOTON_GAP

WINDOW_H = HISTORIAL_H + PANTALLA_H + BOTON_GAP * 7 + BOTON_H * 5
WINDOW_SIZE = str(WINDOW_W) + 'x' + str(WINDOW_H)
