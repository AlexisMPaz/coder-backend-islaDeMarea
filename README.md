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

**Módulos de testing para el Proyecto Final**

**Backend**

* Se han hecho 3 test en la carpeta test
Se muestran por log de consola todos los resultados.

- Test Sessions ("test/sessions.test.js"): Son 4 test. Comprueba que funcionnen correctamente la creacion de un usuario, el logeo, la ruta current que devuelve la sesion y por ultimo el logout. Si se ejecuta por segunda vez se debe borrar del atlas el usuario creado para que no falle el primer test.

- Test Products ("test/products.test.js):  Son 7 test. Primero logea con un el admin, Pide todos los productos modificando el limit de la paginacion, luego 1 por id, crea un producto, lo modifica y por ultimo lo borra.

- Test Carts ("test/carts.test.js"): Son 7 test. Primero  logea con un usuario normal, Modifica el carrito con un array nuevo, modifica la cantidad de 1, borra todos y por ultimo agrega el mismo 2 veces y termina la compra devolviendo el ticket.

**Frontend**

Sin cambios en este desafío

**Usuario para testear**
- rol "Usuario":
email: test@user.com
password: testuser

- rol "Admin":
Email y password en las variables de entorno.


