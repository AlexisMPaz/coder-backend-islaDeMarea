# Backend Proyecto Final para CoderHouse

Comisión: 39685
Alumno: Alexis Paz

Antes de iniciar la aplicacion se debe instalar las dependencias con:

- npm i

**Las variables de entorno necesarias se encuentran en la entrega por la plataforma de Coder**
- Se ha agregado los datos del Admin a las variables de entorno

Para iniciar el servidor (script):

* (puerto 8080, entorno desarrollo): npm run dev

* (puerto 4000, entorno produccion): npm run prod

Para iniciar el frontend (Next.js 13):
- npm run dev

**POSTMAN**

Para testear la aplicacion con postman se debe agregar en los request, el header:
key: Origin         value: http://localhost:3000 (IMPORTANTE)
Tambien se puede comentar el codigo de cors para que no entre en conflicto con los request pero es necesario para que funcione el frontend asi que no se recomienda.

**Documentar API**

**Backend**

* Se ha realizado la documentacion de la api para los endpoints de Products y Carts.

* "localhost:8080/apidocs": Ruta para acceder a la interfaz grafica de Swagger

**Frontend**

Sin cambios en este desafío

**Usuario para testear**
- rol "Usuario":
email: damian@gmail.com
password: damian1234

- rol "Admin":
Email y password en las variables de entorno.


