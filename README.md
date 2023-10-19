# DoLister - Tu Lista de Tareas en Línea

Bienvenido a DoLister, tu nueva y elegante lista de tareas en línea. DoLister es una aplicación web que te permite organizar tus tareas de manera eficiente, ¡sin esfuerzo!

## Acceso a la Aplicación

Puedes acceder a la aplicación en vivo en el siguiente enlace: [DoLister - Tu Lista de Tareas](https://dolister-todo-production.up.railway.app/).

## Características Principales

- **Gestión de Tareas**: Agrega, edita y elimina tus tareas con facilidad.
- **Estado de Tareas**: Marca tus tareas como completadas o pendientes.
- **Interfaz Sencilla y Minimalista**: Una experiencia de usuario intuitiva y agradable.
- **Seguridad de Datos**: Tus datos se almacenan de forma segura en una base de datos PostgreSQL.

## Tecnologías Utilizadas

- **Express**: El backend de la aplicación se ha construido con Express.js y TypeScript.
- **PostgreSQL**: Utilizamos PostgreSQL como base de datos para mantener tus datos seguros y organizados.
- **React + Vite**: La interfaz de usuario de DoLister se ha desarrollado utilizando React junto con Vite para una carga rápida y una experiencia fluida.

## Instalación Local

Si deseas ejecutar DoLister en tu entorno local para propósitos de desarrollo, sigue estos pasos:

1. Clona este repositorio:

```bash
   git clone https://github.com/fallenxl/DoLister-ToDo.git
  
```
2. Navega al directorio del proyecto:
```bash
    cd DoLister-ToDo
```
3. Instala las dependencias del frontend y backend:
```bash
    cd client
    npm install
    cd server
    npm install
```
4. Configura la base de datos PostgreSQL y actualiza la configuración en el archivo .env del backend.

5. Inicia el servidor:
```bash
    npm run start:dev
```

La aplicacion estara disponible en el http://localhost:4002

# Documentacion

## Controlador de Autenticación

**Descripción**: Este controlador se utiliza para autenticar a un usuario existente.

**Ruta**: `/auth/login`

**Método HTTP**: POST

**Entrada**:
- El cuerpo de la solicitud debe contener las credenciales del usuario en forma de `UserDTO`.

**Respuesta Exitosa (Código 200)**:
- La respuesta contiene los datos generados por la función `validateUser`.

**Respuesta de Error (Código 400)**:
- En caso de un error, se devuelve una respuesta de error con el mensaje de error.

## Controlador de Registro de Usuario

**Descripción**: Este controlador se utiliza para registrar a un nuevo usuario.

**Ruta**: `/auth/register`

**Método HTTP**: POST

**Entrada**:
- El cuerpo de la solicitud debe contener los datos del nuevo usuario en forma de `UserDTO`.

**Respuesta de Creación Exitosa (Código 201)**:
- La respuesta contiene los datos generados por la función `registerUser`.

**Respuesta de Error (Código 400)**:
- En caso de un error, se devuelve una respuesta de error con el mensaje de error.

## Controlador de Renovación de Token

**Descripción**: Este controlador se utiliza para renovar el token de un usuario autenticado.

**Ruta**: `/auth/refresh-token`

**Método HTTP**: GET

**Entrada**:
- El identificador de usuario almacenado en la solicitud (previamente establecido por el middleware).

**Respuesta Exitosa (Código 200)**:
- La respuesta contiene los datos generados por la función `refreshToken`.

**Respuesta de Error (Código 400)**:
- En caso de un error, se devuelve una respuesta de error con el mensaje de error.

Este documento proporciona información sobre los controladores disponibles para gestionar la autenticación de usuarios en la aplicación.


## Obtener Todas las Tareas

**Descripción**: Obtiene todas las tareas asociadas al usuario.

**Ruta**: `/tasks`

**Método HTTP**: GET

**Respuesta Exitosa (Código 200)**:
- Mensaje: "Todas las tareas recuperadas con éxito"
- Tareas: Lista de tareas

**Respuesta de Error (Código 500)**:
- Mensaje: Mensaje de error interno del servidor

## Obtener una Tarea por ID

**Descripción**: Obtiene una tarea específica por su ID.

**Ruta**: `/tasks/{id}`

**Método HTTP**: GET

**Parámetros**:
- `id` (Path): ID de la tarea a recuperar.

**Respuesta Exitosa (Código 200)**:
- Mensaje: "Tarea recuperada con éxito"
- Tarea: Datos de la tarea

**Respuesta de Error (Código 404)**:
- Mensaje: "Tarea no encontrada"

**Respuesta de Error (Código 500)**:
- Mensaje: Mensaje de error interno del servidor

## Actualizar una Tarea

**Descripción**: Actualiza una tarea existente con los datos proporcionados.

**Ruta**: `/tasks/{id}`

**Método HTTP**: PUT

**Parámetros**:
- `id` (Path): ID de la tarea a actualizar.

**Respuesta Exitosa (Código 200)**:
- Mensaje: "Tarea actualizada con éxito"
- Tarea: Datos de la tarea actualizada

**Respuesta de Error (Código 500)**:
- Mensaje: Mensaje de error interno del servidor

## Marcar o Desmarcar una Tarea como Completada

**Descripción**: Marca o desmarca una tarea como completada por su ID.

**Ruta**: `/tasks/status/{id}`

**Método HTTP**: POST

**Parámetros**:
- `id` (Path): ID de la tarea a marcar/desmarcar como completada.

**Respuesta Exitosa (Código 200)**:
- Mensaje: "Tarea actualizada con éxito"
- Tarea: Datos de la tarea actualizada

**Respuesta de Error (Código 500)**:
- Mensaje: Mensaje de error interno del servidor

## Crear una Nueva Tarea

**Descripción**: Crea una nueva tarea y la asocia al usuario actual.

**Ruta**: `/tasks/`

**Método HTTP**: POST

**Respuesta Exitosa (Código 201)**:
- Mensaje: "Tarea creada con éxito"
- Tarea: Datos de la tarea creada

**Respuesta de Error (Código 500)**:
- Mensaje: Mensaje de error interno del servidor

## Eliminar una Tarea por ID

**Descripción**: Elimina una tarea específica por su ID.

**Ruta**: `/tasks/{id}`

**Método HTTP**: DELETE

**Parámetros**:
- `id` (Path): ID de la tarea a eliminar.

**Respuesta Exitosa (Código 200)**:
- Mensaje: "Tarea eliminada con éxito"
- Tareas Eliminadas: Lista de tareas eliminadas

**Respuesta de Error (Código 500)**:
- Mensaje: Mensaje de error interno del servidor

## Eliminar Tareas Seleccionadas

**Descripción**: Elimina una lista de tareas seleccionadas asociadas al usuario actual.

**Ruta**: `/tasks/selected`

**Método HTTP**: POST

**Respuesta Exitosa (Código 200)**:
- Mensaje: "Tareas eliminadas con éxito"
- Tareas Eliminadas: Lista de tareas eliminadas

**Respuesta de Error (Código 500)**:
- Mensaje: Mensaje de error interno del servidor

## Eliminar Todas las Tareas

**Descripción**: Elimina todas las tareas asociadas al usuario actual.

**Ruta**: `/tasks`

**Método HTTP**: POST

**Respuesta Exitosa (Código 200)**:
- Mensaje: "Todas las tareas eliminadas con éxito"
- Tareas Eliminadas: Lista de tareas eliminadas

**Respuesta de Error (Código 500)**:
- Mensaje: Mensaje de error interno del servidor




## Autor
DoLister fue desarrollado por Axl Santos. ¡Si tienes alguna pregunta o comentario, no dudes en contactarme!

