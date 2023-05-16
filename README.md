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

**Mocking y manejo de errores**

**Backend**

* Mocking:

- Creada la ruta GET "/api/mocking/mockingproducts" Usa faker para crear 100 productos random y devuelve la totalidad de los productos de prueba en la base de datos.

* Manejo de errores:

- En la carpeta utils/customErrors hay 3 archivos:
  CustomError.js: Define la clase de los errores customizables.
  enums.js: diccionario con los codigos de los errores.
  info.js: Mensajes variables que se usan en algunas causas concretas de los errores customizables. Por el momento se hicieron 3, para cuando hay campos incompletos al registrar un usuario nuevo, campos incompletos al agregar un producto nuevo y cuando se ingresa una cantidad superior al stock disponible de un producto.

- En el archivo config/middlewares/errorHandler se encuentra el middleware encargado de trabajar con los errores que le envia los controladores. Cuando le llega un error que no pertenece a ninguna categoria manda una respuesta con status 500 y un error generico del servidor.

- Hay errores customizados en los controladores de postProduct, updateProductQuantity, deleteCartProduct registeruser.
- Todos los catch de controladores han sido modificados para que le envien en error al middleware.
- Se han creado errores customizados a todos los servicios.

**Frontend**

Sin cambios en este desafío

**Usuario para testear**
- rol "Usuario":
email: damian@gmail.com
password: damian1234

- rol "Admin":
Email y password en las variables de entorno.


