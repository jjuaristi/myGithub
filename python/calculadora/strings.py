'''
=====================================================================
Funciones para convertir un número en una cadena
con notación en español
=====================================================================
'''
#####################################################################
# Entero a cadena
#####################################################################
def int_to_str (num):
    int_str = str(int(num))
    str_temp =''
    j = 0
    for i in range(len(int_str) -1, -1, -1):
        if j < 3:
            str_temp = int_str[i] + str_temp
            j += 1
        else:
            str_temp = int_str[i] + '.' + str_temp
            j = 1
    return str_temp

#####################################################################
# Flotante a cadena
#####################################################################
def float_to_str(num):
    arr_num = str(float(num)).split('.')
    int_str = int_to_str(int(arr_num[0]))
    dec_str = arr_num[1]
    float_str = int_str + ',' + dec_str
    return float_str

#####################################################################
# Número a cadena
#####################################################################
def num_to_str (num, dig, dec):
    return_str = ''

    if type(num) == int:
        return_str = int_to_str (num)
    
    if type(num) == float:
        if dec == 0:
            return_str = int_to_str (num)
        else:
            return_str = float_to_str (num)

    return return_str

#####################################################################
# Cadena a numero
#####################################################################
def str_to_num (cad):
    num_str = ''

    # Es un float
    if ',' in cad:
        for c in cad:
            if c == '.':
                continue
            elif c == ',':
                num_str += '.'
            else:
                num_str += c
        return float(num_str)
    
    # es un entero 
    else:
        for c in cad:
            if c == '.':
                continue
            else:
                num_str += c
        return int(num_str)