# Backend Proyecto Final para CoderHouse

Comisión: 39685
Alumno: Alexis Paz

Antes de iniciar la aplicacion se debe instalar las dependencias con:

- npm i

**Las variables de entorno necesarias se encuentran en la entrega por la plataforma de Coder**
- Se ha agregado los datos del Admin a las variables de entorno

Para iniciar el servidor (script):

(puerto 8080, usar este para poder probar el frontend):
- npm run dev
(puerto 4000)
- npm run prod

La unica diferencia que tienen los 2 modos es el puerto para testear que funcione command con dotenv.

Para iniciar el frontend (Next.js 13):
- npm run dev

**POSTMAN**

Para testear la aplicacion con postman se debe agregar en los request, el header:
key: Origin         value: http://localhost:3000 (IMPORTANTE)
Tambien se puede comentar el codigo de cors para que no entre en conflicto con los request pero es necesario para que funcione el frontend asi que no se recomienda.
Testear el chat por el frontend.

**Tercera entrega del proyecto final**

**Backend**

- Cambie session por jwt, trae muchos menos problemas para la conexion con el frontend.

- Creado los modelos de ticket y message(chat)

- Controladores nuevos para Session (login, register, logout) usando passport jwt.

- Controladores nuevos para ticket y message(chat)

- Nuevas rutas:
* POST "api/cart/purchase":
  Se encarga de crear terminar la compra creando un ticket con los items dentro del carrito.
  Se hacen validaciones de stock, si hay al menos un producto con stock insuficiente se retiran el o los productos invalidados del carrito y se cancela la compra.
  Si el ticket se crea satisfactoriamente, se descuenta de la base de datos el stock de los producto y por ultimo se vacia el carrito.

* GET "api/chat" Sirve para obtener los mensajes del chat de la base de datos. Usado cuando se ingresa a la pagina del chat en el frontend.
* POST "api/chat" Crea un nuevo mensaje en la base de datos para el chat usando el nombre e email de la sesion y el mensaje del body, luego deuelve todos los mensajes de la base de datos para poder renderizarlos en el frontend a tiempo real a todos los usuarios conectados al socket.

- Nuevos Middlewares en la carpeta config. Uno se encarga de validar la sesion con passport y el otro para validar el rol del usuario.
    No en todas las rutas son necesarios, por ejemplo la vista de los productos no necesita estar logeado el usuario.
    Las rutas del carrito y enviar un mensaje al chat son solo para Usuarios y las rutas de modificar productos de la base de datos son solo para el Admin. 

**Frontend**

El frontend esta hecho con Next.js 13 y ya se conecta de varias formas con el backend.
Estoy teniendo un problema con los estilos, la primera vez que se carga la pagina no se cargan todos los estilos pero al abrir otra vez la pagina en una nueva pestaña se arregla
y no se vuelve a aparecer el problema siempre y cuando no se cierre la aplicacion desde la consola. Si se te ocurre que puede ser me lo comentas.

Funciones que ya se pueden testear:
- LOGIN
- LOGOUT
- Vista de productos
- Chat con socket (recuerda que  para ver el chat debes estar logeado y solo un usuario normal puede mandar mensajes.)

Usado context y localStorage para guardar datos del usuario como para el mensaje de bienvenida en el contenedor de productos. (Solo para temas visuales, todos los request usan jwt)

**Usuario para testear**
- rol "Usuario":
email: damian@gmail.com
password: damian1234

- rol "Admin":
Email y password en las variables de entorno.


