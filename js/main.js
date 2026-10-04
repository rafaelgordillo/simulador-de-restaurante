


class Producto {
    constructor(id, nombre, precio, categoria, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.stock = stock;
    }

    // Descuenta del stock la cantidad indicada
    // siempre que haya stock suficiente.
    vender(cantidad = 1) {
        if (this.stock >= cantidad) {
            this.stock -= cantidad;
            return true;
        }

        return false;
    }
}


// PRODUCTOS INICIALES

const productosIniciales = [
    new Producto(1, "Pizza muzzarella", 18000, "Pizzas", 50),
    new Producto(2, "Hamburguesa simple", 10000, "Hamburguesas", 80),
    new Producto(3, "Ensalada César", 8000, "Ensaladas", 50),
    new Producto(4, "Gaseosa", 4000, "Gaseosas", 100),
    new Producto(5, "Papas fritas", 4000, "Guarniciones", 60),
    new Producto(6, "Flan", 5000, "Postres", 40),
    new Producto(7, "Milanesa", 10000, "Platos principales", 45),
    new Producto(8, "Pancho", 7000, "Comida rápida", 30)
];


// SELECTORES DEL DOM

const ticket =
    document.getElementById("ticket");

const formulario =
    document.getElementById("formulario-producto");

const inputNombre =
    document.getElementById("nombre");

const inputPrecio =
    document.getElementById("precio");

const inputCategoria =
    document.getElementById("categoria");

const inputStock =
    document.getElementById("stock");

const buscador =
    document.getElementById("buscador");

const contenedorProductos =
    document.getElementById("contenedor-productos");

const mensaje =
    document.getElementById("mensaje");


// CARRITO

const contenedorCarrito =
    document.getElementById("carrito");

const subtotal =
    document.getElementById("subtotal");

const montoPropina =
    document.getElementById("monto-propina");

const total =
    document.getElementById("total");

const confirmarCompra =
    document.getElementById("confirmar-compra");

const vaciarCarrito =
    document.getElementById("vaciar-carrito");

const opcionesPropina =
    document.querySelectorAll(
        'input[name="propina"]'
    );


// VARIABLES PRINCIPALES

let productos = [];
let ultimoId = 0;


// STORAGE - PRODUCTOS

function cargarProductos() {

    const productosGuardados =
        localStorage.getItem("productos");

    return productosGuardados
        ? JSON.parse(productosGuardados).map(
            ({ id, nombre, precio, categoria, stock }) =>
                new Producto(
                    id,
                    nombre,
                    precio,
                    categoria,
                    stock
                )
        )
        : null;
}


// STORAGE - CARRITO

const carritoGuardado =
    JSON.parse(
        localStorage.getItem("carrito") ?? "[]"
    );


const carrito = carritoGuardado
    .map(({ productoId, cantidad }) => ({
        productoId,
        cantidad
    }));


// FUNCIONES DE STORAGE

function guardarProductos() {

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );
}


function guardarCarrito() {

    const carritoParaGuardar =
        carrito.map(
            ({ productoId, cantidad }) => ({
                productoId,
                cantidad
            })
        );

    localStorage.setItem(
        "carrito",
        JSON.stringify(carritoParaGuardar)
    );
}


// NOTIFICACIONES CON TOASTIFY

function mostrarMensaje(texto, tipo = "info") {

    if (typeof Toastify !== "function") {

        mensaje.textContent = texto;

        setTimeout(() => {
            mensaje.textContent = "";
        }, 2500);

        return;
    }


    const configuracion = {
        text: texto,
        duration: 2500,
        close: true,
        gravity: "top",
        position: "right"
    };


    if (tipo === "error") {
        configuracion.className = "toast-error";
    }


    if (tipo === "success") {
        configuracion.className = "toast-success";
    }


    Toastify(configuracion).showToast();
}


// FEEDBACK DE CARGA

let toastCarga = null;


function mostrarCarga() {

    if (typeof Toastify !== "function") {

        mensaje.textContent =
            "Cargando productos...";

        return;
    }


    toastCarga = Toastify({
        text: "⏳ Cargando menú...",
        duration: -1,
        close: false,
        gravity: "top",
        position: "right"
    });


    toastCarga.showToast();
}


function finalizarCarga() {

    if (toastCarga) {

        toastCarga.hideToast();

        toastCarga = null;
    }


    mensaje.textContent = "";
}


// FETCH - CARGAR PRODUCTOS DESDE DATA.JSON

async function obtenerProductos() {

    mostrarCarga();


    try {

        const respuesta =
            await fetch("./data.json");


        // Verificamos que la respuesta HTTP
        // haya sido exitosa.

        if (!respuesta.ok) {

            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );
        }


        const datos =
            await respuesta.json();


        // Convertimos los objetos recibidos por fetch
        // en instancias de la clase Producto.

        const productosDesdeJSON =
            datos.map(
                ({
                    id,
                    nombre,
                    precio,
                    categoria,
                    stock
                }) =>
                    new Producto(
                        id,
                        nombre,
                        precio,
                        categoria,
                        stock
                    )
            );


        // Si ya existe información guardada por el usuario,
        // la conservamos.

        const productosGuardados =
            cargarProductos();


        productos =
            productosGuardados ??
            productosDesdeJSON;


        ultimoId =
            productos.reduce(
                (mayorId, producto) =>
                    producto.id > mayorId
                        ? producto.id
                        : mayorId,
                0
            );


        // Si no existía localStorage,
        // guardamos los datos recibidos desde JSON.

        if (!productosGuardados) {
            guardarProductos();
        }


        mostrarMensaje(
            "✅ Menú cargado correctamente.",
            "success"
        );


    } catch (error) {

        console.error(
            "Error al cargar productos:",
            error
        );


        // Si fetch falla pero existe información local,
        // utilizamos los datos guardados.

        const productosGuardados =
            cargarProductos();


        if (productosGuardados) {

            productos =
                productosGuardados;


            ultimoId =
                productos.reduce(
                    (mayorId, producto) =>
                        producto.id > mayorId
                            ? producto.id
                            : mayorId,
                    0
                );


            mostrarMensaje(
                "⚠️ No se pudo cargar el menú. Se utilizaron los datos guardados.",
                "error"
            );


        } else {

            // Último respaldo:
            // utilizamos los productos iniciales.

            productos =
                [...productosIniciales];


            ultimoId =
                productos.reduce(
                    (mayorId, producto) =>
                        producto.id > mayorId
                            ? producto.id
                            : mayorId,
                    0
                );


            guardarProductos();


            mostrarMensaje(
                "⚠️ No se pudo cargar el menú. Se utilizaron los datos iniciales.",
                "error"
            );
        }


    } finally {

        // finally se ejecuta siempre,
        // haya ocurrido un error o no.

        finalizarCarga();


        renderizarProductos(
            productos
        );


        renderizarCarrito();
    }
}


// CALCULAR SUBTOTAL

function calcularSubtotal() {

    return carrito.reduce(
        (acumulador, item) => {

            const producto =
                productos.find(
                    (producto) =>
                        producto.id === item.productoId
                );


            return acumulador +
                (
                    (producto?.precio ?? 0) *
                    item.cantidad
                );
        },
        0
    );
}


// RENDERIZAR PRODUCTOS

function renderizarProductos(
    arrayProductos
) {

    contenedorProductos.innerHTML = "";


    arrayProductos.forEach(
        (producto) => {

            // Buscamos si el producto
            // ya está en el carrito.

            const productoEnCarrito =
                carrito.find(
                    (item) =>
                        item.productoId === producto.id
                );


            const {
                cantidad: cantidadEnCarrito = 0
            } =
                productoEnCarrito ?? {};


            const stockDisponible =
                producto.stock -
                cantidadEnCarrito;


            const card =
                document.createElement("div");


            card.className = "card";


            card.innerHTML = `
                <h3>${producto.nombre}</h3>

                <p class="precio">
                    $${producto.precio}
                </p>

                <p>
                    Categoría:
                    ${producto.categoria}
                </p>

                <p class="stock-visual">
                    Stock disponible:
                    ${stockDisponible}
                </p>

                <button
                    class="btn-comprar"
                    ${stockDisponible === 0 ? "disabled" : ""}
                >
                    Comprar
                </button>

                <button class="btn-eliminar">
                    Eliminar
                </button>
            `;


            // BOTÓN COMPRAR

            const btnComprar =
                card.querySelector(
                    ".btn-comprar"
                );


            btnComprar.addEventListener(
                "click",
                () => {

                    const productoEnCarrito =
                        carrito.find(
                            (item) =>
                                item.productoId === producto.id
                        );


                    const cantidadEnCarrito =
                        productoEnCarrito?.cantidad ?? 0;


                    if (
                        cantidadEnCarrito >=
                        producto.stock
                    ) {

                        mostrarMensaje(
                            `No hay más stock disponible de ${producto.nombre}.`,
                            "error"
                        );

                        return;
                    }


                    productoEnCarrito
                        ? productoEnCarrito.cantidad++
                        : carrito.push({
                            productoId: producto.id,
                            cantidad: 1
                        });


                    guardarCarrito();

                    renderizarCarrito();

                    renderizarProductos(
                        productos
                    );


                    mostrarMensaje(
                        `${producto.nombre} agregado al carrito.`,
                        "success"
                    );
                }
            );


            // BOTÓN ELIMINAR

            const btnEliminar =
                card.querySelector(
                    ".btn-eliminar"
                );


            btnEliminar.addEventListener(
                "click",
                () => {

                    const indiceProducto =
                        productos.findIndex(
                            (item) =>
                                item.id === producto.id
                        );


                    if (
                        indiceProducto !== -1
                    ) {

                        productos.splice(
                            indiceProducto,
                            1
                        );
                    }


                    const indiceCarrito =
                        carrito.findIndex(
                            (item) =>
                                item.productoId ===
                                producto.id
                        );


                    indiceCarrito !== -1
                        ? carrito.splice(
                            indiceCarrito,
                            1
                        )
                        : null;


                    guardarProductos();

                    guardarCarrito();


                    mostrarMensaje(
                        "Producto eliminado correctamente.",
                        "success"
                    );


                    renderizarProductos(
                        productos
                    );

                    renderizarCarrito();
                }
            );


            contenedorProductos.append(
                card
            );
        }
    );
}


// RENDERIZAR CARRITO

function renderizarCarrito() {

    contenedorCarrito.innerHTML = "";


    if (carrito.length === 0) {

        contenedorCarrito.innerHTML = `
            <p>
                El carrito está vacío.
            </p>
        `;


        subtotal.textContent = "$0";

        montoPropina.textContent = "$0";

        total.textContent = "$0";

        return;
    }


    carrito.forEach(
        ({ productoId, cantidad }) => {

            const producto =
                productos.find(
                    (producto) =>
                        producto.id === productoId
                );


            if (!producto) {
                return;
            }


            const productoCarrito =
                document.createElement("div");


            productoCarrito.className =
                "item-carrito";


            productoCarrito.innerHTML = `
                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    Cantidad: ${cantidad}
                </p>

                <p>
                    Precio unitario:
                    $${producto.precio}
                </p>

                <p>
                    Total:
                    $${producto.precio * cantidad}
                </p>
            `;


            contenedorCarrito.append(
                productoCarrito
            );
        }
    );


    calcularTotal();
}


// CALCULAR TOTAL

function calcularTotal() {

    const totalCarrito =
        calcularSubtotal();


    const opcionSeleccionada =
        document.querySelector(
            'input[name="propina"]:checked'
        );


    const porcentajePropina =
        Number(
            opcionSeleccionada?.value ?? 0
        );


    const valorPropina =
        totalCarrito *
        porcentajePropina /
        100;


    const totalFinal =
        totalCarrito +
        valorPropina;


    subtotal.textContent =
        `$${totalCarrito}`;


    montoPropina.textContent =
        `$${valorPropina}`;


    total.textContent =
        `$${totalFinal}`;
}


// EVENTO PROPINA

opcionesPropina.forEach(
    (opcion) => {

        opcion.addEventListener(
            "change",
            () => {

                calcularTotal();

            }
        );
    }
);


// FINALIZAR COMPRA

function finalizarCompra() {

    if (carrito.length === 0) {

        mostrarMensaje(
            "El carrito está vacío.",
            "error"
        );

        return;
    }


    // Descontamos del stock real
    // la cantidad comprada.

    carrito.forEach(
        ({ productoId, cantidad }) => {

            const producto =
                productos.find(
                    (producto) =>
                        producto.id === productoId
                );


            producto
                ? producto.vender(cantidad)
                : null;
        }
    );


    const totalCarrito =
        calcularSubtotal();


    const opcionSeleccionada =
        document.querySelector(
            'input[name="propina"]:checked'
        );


    const porcentajePropina =
        Number(
            opcionSeleccionada?.value ?? 0
        );


    const valorPropina =
        totalCarrito *
        porcentajePropina /
        100;


    const totalFinal =
        totalCarrito +
        valorPropina;


    // Generamos el ticket dinámicamente.

    ticket.innerHTML = `

        <h2>
            🧾 Ticket de compra
        </h2>

        ${carrito.map(
            ({ productoId, cantidad }) => {

                const producto =
                    productos.find(
                        (producto) =>
                            producto.id === productoId
                    );


                return `
                    <div>

                        <p>
                            <strong>
                                ${producto?.nombre ?? "Producto"}
                            </strong>

                            x${cantidad}
                        </p>

                        <p>
                            $${(producto?.precio ?? 0) * cantidad}
                        </p>

                    </div>
                `;
            }
        ).join("")}

        <hr>

        <p>
            Subtotal:
            $${totalCarrito}
        </p>

        <p>
            Propina (${porcentajePropina}%):
            $${valorPropina}
        </p>

        <p>
            <strong>
                Total:
                $${totalFinal}
            </strong>
        </p>

        <p>
            ¡Gracias por tu compra!
        </p>
    `;


    carrito.length = 0;


    guardarProductos();

    guardarCarrito();


    renderizarCarrito();

    renderizarProductos(
        productos
    );


    opcionesPropina[0].checked = true;


    mostrarMensaje(
        "Compra realizada correctamente.",
        "success"
    );
}


// BOTÓN VACIAR CARRITO

vaciarCarrito.addEventListener(
    "click",
    () => {

        carrito.length = 0;

        guardarCarrito();

        renderizarCarrito();

        renderizarProductos(
            productos
        );

        mostrarMensaje(
            "Carrito vaciado correctamente.",
            "success"
        );
    }
);


// BOTÓN CONFIRMAR COMPRA

confirmarCompra.addEventListener(
    "click",
    () => {

        finalizarCompra();

    }
);


// FORMULARIO AGREGAR PRODUCTO

formulario.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const nombre =
            inputNombre.value.trim();


        const precio =
            Number(
                inputPrecio.value
            );


        const categoria =
            inputCategoria.value.trim();


        const stock =
            Number(
                inputStock.value
            );


        // VALIDACIÓN DE DATOS

        if (
            nombre === "" ||
            categoria === "" ||
            !Number.isFinite(precio) ||
            precio <= 0 ||
            !Number.isInteger(stock) ||
            stock < 0
        ) {

            mostrarMensaje(
                "Completá los datos correctamente.",
                "error"
            );

            return;
        }


        const nuevoProducto =
            new Producto(
                ++ultimoId,
                nombre,
                precio,
                categoria,
                stock
            );


        productos.push(
            nuevoProducto
        );


        guardarProductos();


        renderizarProductos(
            productos
        );


        formulario.reset();


        mostrarMensaje(
            "Producto agregado correctamente.",
            "success"
        );
    }
);


// BUSCADOR

buscador.addEventListener(
    "input",
    () => {

        const textoBuscado =
            buscador.value
                .toLowerCase()
                .trim();


        const productosFiltrados =
            productos.filter(
                (producto) => {

                    return producto.nombre
                        .toLowerCase()
                        .includes(textoBuscado);

                }
            );


        renderizarProductos(
            productosFiltrados
        );
    }
);


// RENDERIZADO INICIAL

// Obtenemos los productos mediante fetch.
// La función utiliza async/await,
// try/catch/finally para manejar
// correctamente la petición.

obtenerProductos();
