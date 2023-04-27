# Backend Proyecto Final para CoderHouse

Comisión: 39685
Alumno: Alexis Paz

Antes de iniciar la aplicacion se debe instalar las dependencias con:

- npm i

**Las variables de entorno necesarias se encuentran en la entrega por la plataforma de Coder**
- Se ha agregado los datos del Admin a las variables de entorno

Para iniciar el servidor (script):

(puerto 8080)
- npm run dev:development 
(puerto 4000)
- npm run dev:production 

La unica diferencia que tienen los 2 modos es el puerto para testear que funcione command con dotenv.

**POSTMAN**

Para testear la aplicacion con postman se debe agregar en los request el header:
key: Origin         value: http://localhost:3000
Tambien se puede comentar el codigo de cors para que no entre en conflicto con los request.


**Reestructura de nuestro servidor**

Eliminadas las vistas de Handlebars, el proyecto esta separado entre Backend y Frontend.

**Backend**

Nueva estructura del servidor por capas.

-Modelos:
Se encargan de crear los modelos usados por Mongoose.

-Servicios:
Usando los modelos se crea un CRUD para cada collection de la base de datos.

-Controladores:
Definen la accion que realiza el servidor al recibir una request a una ruta y utiliza los servicios para devolver una respuesta al cliente.


email: damian@gmail.com
password: damian1234


