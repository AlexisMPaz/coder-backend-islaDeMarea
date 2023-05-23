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

**Mocking y manejo de errores**

**Backend**

* Implementación del logger para la gestión de registros en la aplicación.

* Utilización de la biblioteca Winston para el manejo de registros.

* Configuración del logger con niveles de registro personalizados y colores para cada nivel.

* Formateo de los registros con información de nivel, mensaje y marca de tiempo.

* Añadido transporte Console para imprimir los registros en la consola. En entorno de desarrollo desde nivel debug y en entorno de produccion desde nivel info.

* Añadido transporte File para almacenar los registros de nivel error y fatal en un archivo errors.log.

* Configuración para que el transporte File se aplique solo en el entorno de producción.

* Añadida ruta ("/api/loggertest") para testear el logger de forma sencilla.

* Se han agregado algunos loggers en los controladores, mas se agregaran en el futuro cuando corresponda.

**Frontend**

Sin cambios en este desafío

**Usuario para testear**
- rol "Usuario":
email: damian@gmail.com
password: damian1234

- rol "Admin":
Email y password en las variables de entorno.


