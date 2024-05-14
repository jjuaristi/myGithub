#!/usr/bin/env python

# Python 3 usa UTF-8 por defecto pero incluyo la linea como buena práctica
# -*- coding: utf-8 -*-

'''
=====================================================================
Librerías
=====================================================================
'''
# tkinter (Tool Kit de INTERface gráfica [GUI])
# Está algo obsoleta, pero parece sencilla para empezar 
from tkinter import *
from tkinter import ttk
from tkinter.ttk import *
import os
import datetime
import mates
import strings
import constantes as con

'''
=====================================================================
Variables
=====================================================================
'''
operando_A = None
operando_B = None
operador = None
numero = None
resultado = None
decimales = None
nuevo_operando = True
str_pantalla = ''
historial = []

'''
=====================================================================
GUI - Estilos
=====================================================================
'''
# Declaramos el objeto raiz
root = Tk()

# Creamos un objeto de tipo Style()
style = Style()

# Definimos los estilos generales de los botones
style.configure('TButton', font=con.BOTON_FUENTE, foreground=con.BOTON_FG, relief='flat')

# Y los estilos específicos
style.configure('digito.TButton', background = con.BOTON_DIGITO_BG)
style.map('digito.TButton', background=[('active', con.BOTON_DIGITO_BG_HOVER)])

style.configure('operador.TButton', background = con.BOTON_OPERADOR_BG)
style.map('operador.TButton', background=[('active', con.BOTON_OPERADOR_BG_HOVER)])

style.configure('igual.TButton', background = con.BOTON_IGUAL_BG)
style.map('igual.TButton', background=[('active', con.BOTON_IGUAL_BG_HOVER)])

style.configure('his.TButton', background = con.BOTON_HIS_BG, font=con.BOTON_HIS_FUENTE)
style.map('his.TButton', background=[('active', con.BOTON_HIS_BG_HOVER)])

# Definimos el estilo de la pantalla principal
style.configure('pantalla.TLabel', 
    font = con.PANTALLA_FUENTE, 
    background = con.PANTALLA_BG, 
    foreground = con.PANTALLA_FG, 
    padding = 12,
    relief='flat')

# Definimos el estilo del historial
style.configure('historial.TLabel', 
    font = con.HISTORIAL_FUENTE, 
    background = con.HISTORIAL_BG, 
    foreground = con.HISTORIAL_FG, 
    padding = 12,
    relief='flat')

# Ajustamos las opciones de redimensionamiento
root.resizable(con.RESIZABLE_W, con.RESIZABLE_H)

# Y el tamaño de la ventana
root.geometry(con.WINDOW_SIZE)

# Color de fondo de la root
root.config(bg = con.COLOR_FONDO)

# Añadimos un título a la ventana
root.title('Calculadora ' + con.VERSION)

'''
=====================================================================
GUI - Bloques
=====================================================================
'''
#####################################################################
# teclado()
# Presenta el teclado
#####################################################################
def mostrar_teclado():
    # Definimos los botones
    btn_0 = Button(root, style = 'digito.TButton', command = lambda: add_btn('0'), text='0')
    btn_1 = Button(root, style = 'digito.TButton', command = lambda: add_btn('1'), text='1')
    btn_2 = Button(root, style = 'digito.TButton', command = lambda: add_btn('2'), text='2')
    btn_3 = Button(root, style = 'digito.TButton', command = lambda: add_btn('3'), text='3')
    btn_4 = Button(root, style = 'digito.TButton', command = lambda: add_btn('4'), text='4')
    btn_5 = Button(root, style = 'digito.TButton', command = lambda: add_btn('5'), text='5')
    btn_6 = Button(root, style = 'digito.TButton', command = lambda: add_btn('6'), text='6')
    btn_7 = Button(root, style = 'digito.TButton', command = lambda: add_btn('7'), text='7')
    btn_8 = Button(root, style = 'digito.TButton', command = lambda: add_btn('8'), text='8')
    btn_9 = Button(root, style = 'digito.TButton', command = lambda: add_btn('9'), text='9')

    btn_c = Button(root, style = 'operador.TButton', command = lambda: add_btn('c'), text='C')
    # btn_abre = Button(root, style = 'operador.TButton', command = lambda: add_btn('('), text='(')
    # btn_cierra = Button(root, style = 'operador.TButton', command = lambda: add_btn(')'), text=')')
    btn_mod = Button(root, style = 'operador.TButton', command = lambda: add_btn('mod'), text='mod')
    btn_pi = Button(root, style = 'operador.TButton', command = lambda: add_btn('pi'), text='\u03C0')
    btn_div = Button(root, style = 'operador.TButton', command = lambda: add_btn('div'), text='\u00F7')
    btn_sqr = Button(root, style = 'operador.TButton', command = lambda: add_btn('sqr'), text='\u221A')
    btn_mult = Button(root, style = 'operador.TButton', command = lambda: add_btn('mul'), text='\u00D7')
    #btn_exp = Button(root, style = 'operador.TButton', command = lambda: add_btn('exp'), text='x\u00B2')
    btn_exp = Button(root, style = 'operador.TButton', command = lambda: add_btn('exp'), text='x\u1DB0')
    btn_res = Button(root, style = 'operador.TButton', command = lambda: add_btn('res'), text='-')
    btn_per = Button(root, style = 'operador.TButton', command = lambda: add_btn('per'), text='%')
    btn_sum = Button(root, style = 'operador.TButton', command = lambda: add_btn('sum'), text='+')

    btn_punto = Button(root, style = 'operador.TButton', command = lambda: add_btn('pun'), text='.')

    btn_igual = Button(root, style = 'igual.TButton', command = lambda: add_btn('='), text='=')
        
    btn_his = Button(root, style = 'his.TButton', command = lambda: add_btn('his'), text='Save history')

    # Creamos una retícula de fil x col
    fil = 5
    col = 5
    reticula = (
        btn_c, btn_his, None, btn_mod, btn_pi,
        btn_7, btn_8, btn_9, btn_div, btn_sqr,
        btn_4, btn_5, btn_6, btn_mult, btn_exp,
        btn_1, btn_2, btn_3, btn_res, btn_igual,
        btn_0, btn_punto, btn_per, btn_sum, None)

    # Y dibujamos el panel de botones
    for pos_y in range(fil):
        for pos_x in range(col):
            indice = pos_y * fil + pos_x
            if reticula[indice] != None:
                if reticula[indice] == btn_igual:
                    reticula[indice].place(
                        x = con.BOTONES_X + (con.BOTON_W + con.BOTON_GAP) * pos_x, 
                        y = con.BOTONES_Y + (con.BOTON_H + con.BOTON_GAP) * pos_y, 
                        width = con.BOTON_W, 
                        height = con.BOTON_H * 2 + con.BOTON_GAP)
                elif reticula[indice] == btn_his:
                    reticula[indice].place(
                        x = con.BOTONES_X + (con.BOTON_W + con.BOTON_GAP) * pos_x, 
                        y = con.BOTONES_Y + (con.BOTON_H + con.BOTON_GAP) * pos_y, 
                        width = con.BOTON_W * 2 + con.BOTON_GAP, 
                        height = con.BOTON_H)
                else:
                    reticula[indice].place(
                        x = con.BOTONES_X + (con.BOTON_W + con.BOTON_GAP) * pos_x, 
                        y = con.BOTONES_Y + (con.BOTON_H + con.BOTON_GAP) * pos_y, 
                        width = con.BOTON_W, 
                        height = con.BOTON_H)

#####################################################################
# Definimos la pantalla y la colocamos
#####################################################################
def mostrar_pantalla():
    global numero
    pantalla = Label(root, style='pantalla.TLabel', text=numero, anchor='e')
    pantalla.place(
        x = con.PANTALLA_X, 
        y = con.PANTALLA_Y, 
        width = con.PANTALLA_W, 
        height = con.PANTALLA_H)

#####################################################################
# Definimos el historial y lo colocamos
#####################################################################
def mostrar_historial():
    global historial
    historial_str = ''
    for i in historial[-7:]:
        historial_str += str(i) + '\n'

    display_historial = Label(root, style='historial.TLabel', text=historial_str, anchor='se', justify=RIGHT)
    display_historial.place(
        x = con.HISTORIAL_X, 
        y = con.HISTORIAL_Y, 
        width = con.HISTORIAL_W, 
        height = con.HISTORIAL_H)

'''
*********************************************************************
*********************************************************************
Funciones
*********************************************************************
*********************************************************************
'''
#####################################################################
# Guardado del historial
#####################################################################
def guarda_historial():
    fecha_y_hora = str(datetime.datetime.now())
    separador = '-------------------------------------------\n'
    log_ini = separador + '>>> START >>> ' + fecha_y_hora + '\n' + separador
    log_fin = separador +  '<<< END <<< ' + fecha_y_hora + '\n' + separador
    archivo_historial = 'historial.log'
    archivo = open('archivo_historial.log', 'a')
    archivo.write(log_ini)
    for i in historial:
        archivo.write(i + '\n')
    archivo.write(log_fin)
    archivo.close()

#####################################################################
# Operar
#####################################################################
def operar(a, b, op):
    match op:
        case 'sum': 
            return mates.suma(operando_A, operando_B)
        case 'res': 
            return mates.resta(operando_A, operando_B)
        case 'mul': 
            return mates.multiplica(operando_A, operando_B)
        case 'div':
            return mates.divide(operando_A, operando_B)
        case 'mod':
            return mates.modulo(operando_A, operando_B)
        case 'per':
            return mates.porcentaje(operando_A, operando_B)
        case 'exp':
            return mates.exponente(operando_A, operando_B)

#####################################################################
# Symbolo de la operacion
#####################################################################
def simbolo(op):
    match op:
        case 'sum':
            return ' + '
        case 'res':
            return ' - '
        case 'mul':
            return ' \u00D7 '
        case 'div':
            return ' \u00F7 '
        case 'mod':
            return ' mod '
        case 'per':
            return ' % '
        case 'exp':
            return ' ^ '
        case 'sqr':
            return ' \u221A '    
'''
=====================================================================
Manejo de las entradas
=====================================================================
'''
#####################################################################
# add_btn(entrada)
# Recibe la pulsación de los botones
#####################################################################
def add_btn(entrada):
    global operando_A, operando_B, operador, numero, resultado, decimales, nuevo_operando, historial
    
    # --------------------------
    # Clear - Reiniciar cálculos
    # --------------------------
    if entrada == 'c':
        if operador != None:
            historial.pop()
            historial.append('---')
        operando_A = None
        operando_B = None
        operador = None
        numero = None
        resultado = None
        decimales = None
      
    # --------------------------
    # Dígitos
    # --------------------------
    if entrada in ('1', '2', '3', '4', '5', '6', '7', '8', '9', '0') and len(str_pantalla) < con.PANTALLA_MAX_DIGITOS:
        
        # La pantalla está limpia
        if numero == None or nuevo_operando:
            numero = entrada
            nuevo_operando = False
            
        #ya hay algo en pantalla
        elif len(numero) < con.PANTALLA_MAX_DIGITOS: 
            numero_num = strings.str_to_num(numero)
            
            # El número en pantalla es un entero
            if type(numero_num) == int:
                numero_str = str(numero_num)
                numero_int = int(numero_str + entrada)
                numero = strings.int_to_str(numero_int)
            
            # El número en pantalla es un float
            if type(numero_num) == float:
                numero += entrada
                decimales += 1

    # --------------------------
    # Punto decimal
    # --------------------------
    if entrada == 'pun':
        if nuevo_operando:
            numero = '0,'
            decimales = 0
            nuevo_operando = False
        elif ',' not in numero:
            numero += ','
            decimales = 0

    # --------------------------
    # Operaciones
    # --------------------------
    if entrada in ('sum', 'res', 'mul', 'div', 'mod', 'per', 'exp', 'sqr'):
        if operando_A == None:
            operando_A = strings.str_to_num(numero)
            operador = entrada
            if entrada != 'sqr':
                operando_a_y_operador = numero + simbolo(entrada)
                historial.append(operando_a_y_operador)
            else:
                operando_a_y_operador = simbolo(operador) + numero
                resultado = mates.raiz(operando_A)
                numero = strings.num_to_str(resultado, decimales, con.PANTALLA_MAX_DIGITOS)
                historial.append(operando_a_y_operador)
                historial.append(numero)
                operando_A = None
                operando_B = None
                resultado = None
            nuevo_operando = True 

        else:
            
            if entrada != 'sqr':
                # Todas las operaciones menos sqr
                operando_B = strings.str_to_num(numero)
                historial[-1] = historial[-1] + numero
                resultado = operar (operando_A, operando_B, operador)
                
                if resultado != 'Indefinido':
                    numero = strings.num_to_str(resultado, decimales, con.PANTALLA_MAX_DIGITOS)           
                    historial.append(numero)
                    operador = entrada
                    historial.append(numero + simbolo(operador))
                    operando_A = resultado
                else:
                    numero = resultado
                    historial.append(numero)
                    historial.append('---')
                    operando_A = None
                
            else:
                # Raiz cuadrada
                operando_B = strings.str_to_num(numero)
                historial[-1] = historial[-1] + numero
                resultado = operar (operando_A, operando_B, operador)
                numero = strings.num_to_str(resultado, decimales, con.PANTALLA_MAX_DIGITOS)           
                historial.append(numero)
                operador = entrada
                operando_a_y_operador = simbolo(operador) + numero
                operando_A = resultado
                resultado = mates.raiz(operando_A)
                numero = strings.num_to_str(resultado, decimales, con.PANTALLA_MAX_DIGITOS)
                historial.append(operando_a_y_operador)
                historial.append(numero)
                operando_A = None

            
            operando_B = None
            resultado = None
            nuevo_operando = True


    # --------------------------
    # Implementación limitada de PI
    # --------------------------
    if entrada == 'pi':
        numero = mates.pi()
        decimales = 6
              
    # --------------------------
    # Igual
    # --------------------------
    if entrada == '=':
        if operando_A != None:
            operando_B = strings.str_to_num(numero)
            historial[-1] = historial[-1] + numero
            resultado = operar (operando_A, operando_B, operador) 
            if resultado != 'Indefinido':
                numero = strings.num_to_str(resultado, decimales, con.PANTALLA_MAX_DIGITOS)
            else:
                numero = resultado
            historial.append(numero)
            historial.append('---')
            operando_A = None
            operando_B = None
            operador = None
            resultado = None
            decimales = None
            nuevo_operando = True
    

    # --------------------------
    # Guardar historial
    # --------------------------
    if entrada == 'his':
        guarda_historial()

    # --------------------------
    # Refrescamos la calculadora
    # --------------------------   
    mostrar_pantalla()
    mostrar_historial()

'''
=====================================================================
Presentación inicial de los bloques y la ventana
=====================================================================
'''
# Presentamos el teclado
mostrar_teclado()

# Y la pantalla
mostrar_pantalla()

# Y el historial
mostrar_historial()

# Bucle global
root.mainloop()