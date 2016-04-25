import logging
from socketIO_client import SocketIO#, LoggingNamespace#,BaseNamespace
socketIO = SocketIO('localhost', 3000)
import random
import time

datos = {}
for x in xrange(1,150):
	datos["elementOne"] = [random.randrange(0,80),random.randrange(0,100)]
	datos["elementTwo"] = [random.randrange(0,130),random.randrange(0,150)]
	socketIO.emit('datos_cliente',datos)
	time.sleep(1)

