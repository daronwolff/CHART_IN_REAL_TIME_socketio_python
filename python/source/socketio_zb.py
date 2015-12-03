import logging
from socketIO_client import SocketIO#, LoggingNamespace#,BaseNamespace
socketIO = SocketIO('localhost', 3000)
import random

datos = {}
datos["child"] = [random.randrange(0,100),random.randrange(0,100)]
datos["mom"] = [random.randrange(0,100),random.randrange(0,100)]
socketIO.emit('datos_cliente',datos)

#FC mama 60 hasta 100
#BB 120 a 160