# El Oasis — Simulador de restaurante

## Descripción

**El Oasis** es un simulador de restaurante desarrollado como proyecto para el curso de JavaScript de Coderhouse.

El proyecto fue desarrollado progresivamente a través de las diferentes etapas del curso, incorporando conceptos de JavaScript y nuevas funcionalidades en cada entrega.

Actualmente permite administrar un catálogo de productos, realizar compras, gestionar un carrito de pedidos, conservar los datos mediante `localStorage`, trabajar con conceptos de asincronismo y Promesas, consumir datos mediante `Fetch API` y utilizar una librería externa para mejorar las notificaciones al usuario.

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript
* DOM
* JSON
* Fetch API
* localStorage
* Toastify JS

## Funcionalidades

### Gestión de productos

* Visualización dinámica de productos.
* Carga inicial de productos mediante un archivo `data.json`.
* Agregar nuevos productos mediante un formulario.
* Eliminar productos.
* Búsqueda de productos por nombre.
* Control de stock disponible.

### Carrito de compras

* Agregar productos al carrito.
* Acumular cantidades de un mismo producto.
* Visualizar cantidad, precio unitario y total por producto.
* Calcular subtotal.
* Seleccionar porcentaje de propina.
* Calcular automáticamente el total final.
* Vaciar el carrito.
* Finalizar la compra y generar un ticket.

### Persistencia de datos

El proyecto utiliza **`localStorage`** para conservar el estado del simulador.

Se almacenan:

* Productos.
* Stock actualizado.
* Carrito de compras.

Los datos se convierten a JSON mediante `JSON.stringify()` para guardarlos y se recuperan mediante `JSON.parse()`.

De esta manera, los datos permanecen disponibles aunque se recargue la página.

### Asincronismo y Promesas

El proyecto también incorpora conceptos de **asincronismo y Promesas** trabajados durante el curso.

Se utilizan:

* `Promise`.
* `resolve()` y `reject()`.
* `.then()`.
* `.catch()`.
* `async/await`.
* `setTimeout()` para simular procesos asincrónicos.

Estos recursos permiten trabajar con operaciones que no se ejecutan de manera inmediata y manejar sus resultados de forma controlada.

### Fetch API y carga de datos

En la última etapa del proyecto se incorporó el uso de **Fetch API** para obtener los datos iniciales de los productos desde un archivo local `data.json`.

La información se obtiene utilizando:

* `fetch()`.
* `async/await`.
* `try/catch/finally`.
* `response.ok`.
* `response.json()`.

Durante el proceso de carga se informa visualmente al usuario que los datos están siendo obtenidos.

También se implementó manejo de errores para informar al usuario si ocurre algún problema durante la carga de los datos.

### Notificaciones

Se incorporó la librería externa **Toastify JS** mediante CDN para mejorar la comunicación con el usuario.

Las notificaciones se utilizan para informar diferentes acciones del simulador, como:

* Carga de productos.
* Productos agregados al carrito.
* Productos eliminados.
* Errores de validación.
* Compra finalizada.
* Carrito vaciado.
* Errores durante la carga de datos.

## Conceptos de JavaScript aplicados

Durante el desarrollo del proyecto se utilizaron diferentes conceptos trabajados durante el curso:

* Variables y constantes.
* Funciones.
* Objetos y clases.
* Métodos de arrays.
* Funciones de orden superior.
* `map()`, `filter()`, `find()`, `findIndex()` y `reduce()`.
* Manipulación del DOM.
* Eventos.
* Formularios.
* Template literals.
* Operador ternario.
* Destructuring de objetos.
* Optional chaining (`?.`).
* Nullish coalescing (`??`).
* Spread operator (`...`).
* `localStorage`.
* `JSON.stringify()` y `JSON.parse()`.
* Asincronismo.
* Promesas.
* `async/await`.
* `setTimeout()`.
* Fetch API.
* Manejo de errores con `try/catch/finally`.
* Librerías externas mediante CDN.

## Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.
2. Abrir la carpeta del proyecto.
3. Ejecutar el archivo `index.html` utilizando un servidor local, por ejemplo **Live Server**.
4. Interactuar con el simulador desde el navegador.

> Se recomienda utilizar un servidor local para ejecutar correctamente el proyecto, especialmente para permitir la carga de datos mediante `fetch()` desde `data.json`.

## Estructura del proyecto

```text
El-Oasis/

│
├── index.html
├── data.json
├── js/
│   └── main.js
├── css/
│   └── style.css
└── README.md
```

## Objetivo del proyecto

El objetivo principal fue integrar progresivamente los conocimientos adquiridos durante el curso de JavaScript, especialmente la manipulación del DOM, el manejo de eventos, la persistencia de datos mediante `localStorage`, el uso de asincronismo y Promesas, el consumo de datos mediante `Fetch API` y la integración de librerías externas.

El proyecto representa la evolución del aprendizaje a lo largo de las diferentes entregas del curso y la incorporación progresiva de nuevas funcionalidades.
