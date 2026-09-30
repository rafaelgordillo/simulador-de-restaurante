
class Producto {
    constructor(id, nombre, precio, categoria, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.stock = stock;
    }

    vender() {
        if (this.stock > 0) {
            this.stock--;
            return true;
        }

        return false;
    }
}


const productos = [
    new Producto(1, "Pizza muzzarella", 18000, "Pizzas", 50),
    new Producto(2, "Hamburguesa simple", 10000, "Hamburguesas", 80),
    new Producto(3, "Ensalada César", 8000, "Ensaladas", 50),
    new Producto(4, "Gaseosa", 4000, "Gaseosas", 100),
    new Producto(5, "Papas fritas", 4000, "Guarniciones", 60),
    new Producto(6, "Flan", 5000, "Postres", 40),
    new Producto(7, "Milanesa", 10000, "Platos principales", 45),
    new Producto(8, "Pancho", 7000, "Comida rápida", 3)
];


let ultimoId = productos.length;


// SELECTORES DEL DOM

const ticket = document.getElementById("ticket");

const formulario = document.getElementById("formulario-producto");

const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const inputCategoria = document.getElementById("categoria");
const inputStock = document.getElementById("stock");

const buscador = document.getElementById("buscador");

const contenedorProductos = document.getElementById("contenedor-productos");

const mensaje = document.getElementById("mensaje");


// CARRITO DE COMPRAS

const carrito = [];

const contenedorCarrito = document.getElementById("carrito");

const subtotal = document.getElementById("subtotal");

const montoPropina = document.getElementById("monto-propina");

const total = document.getElementById("total");

const confirmarCompra = document.getElementById("confirmar-compra");

const vaciarCarrito = document.getElementById("vaciar-carrito");

const opcionesPropina = document.querySelectorAll(
    'input[name="propina"]'
);


// MENSAJES

function mostrarMensaje(texto) {

    mensaje.textContent = texto;

    setTimeout(() => {
        mensaje.textContent = "";
    }, 2500);
}


// CALCULAR SUBTOTAL

function calcularSubtotal() {

    return carrito.reduce(
        (acumulador, item) => {
            return acumulador +
                (item.producto.precio * item.cantidad);
        },
        0
    );
}


// RENDERIZAR PRODUCTOS

function renderizarProductos(arrayProductos) {

    contenedorProductos.innerHTML = "";

    arrayProductos.forEach((producto) => {

        // Buscamos si este producto ya está en el carrito

        const productoEnCarrito = carrito.find(
            (item) => item.producto.id === producto.id
        );


        // Cantidad de este producto que ya está en el carrito

        const cantidadEnCarrito =
            productoEnCarrito
                ? productoEnCarrito.cantidad
                : 0;


        // Stock que todavía queda disponible para comprar

        const stockDisponible =
            producto.stock - cantidadEnCarrito;


        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${producto.nombre}</h3>

            <p class="precio">$${producto.precio}</p>

            <p>Categoría: ${producto.categoria}</p>

            <p class="stock-visual">
                Stock disponible: ${stockDisponible}
            </p>

            <button class="btn-comprar"
                ${stockDisponible === 0 ? "disabled" : ""}>
                Comprar
            </button>

            <button class="btn-eliminar">Eliminar</button>
        `;


        // BOTÓN COMPRAR

        const btnComprar = card.querySelector(".btn-comprar");

        btnComprar.addEventListener("click", () => {

            const productoEnCarrito = carrito.find(
                (item) => item.producto.id === producto.id
            );


            // Cantidad que ya tenemos en el carrito

            const cantidadEnCarrito =
                productoEnCarrito
                    ? productoEnCarrito.cantidad
                    : 0;


            // Control de stock

            if (cantidadEnCarrito >= producto.stock) {

                mostrarMensaje(
                    `No hay más stock disponible de ${producto.nombre}.`
                );

                return;
            }


            if (productoEnCarrito) {

                productoEnCarrito.cantidad++;

            } else {

                carrito.push({
                    producto: producto,
                    cantidad: 1
                });
            }


            // Actualizamos el stock mostrado en la card

            const stockVisual =
                card.querySelector(".stock-visual");


            const nuevoStockDisponible =
                producto.stock -
                (productoEnCarrito
                    ? productoEnCarrito.cantidad
                    : 1);


            stockVisual.textContent =
                `Stock disponible: ${nuevoStockDisponible}`;


            // Deshabilitamos Comprar cuando llega a cero

            if (nuevoStockDisponible === 0) {

                btnComprar.disabled = true;
            }


            renderizarCarrito();

            mostrarMensaje(
                `${producto.nombre} agregado al carrito.`
            );
        });


        // BOTÓN ELIMINAR

        const btnEliminar = card.querySelector(".btn-eliminar");

        btnEliminar.addEventListener("click", () => {

            const indiceProducto = productos.findIndex(
                (item) => item.id === producto.id
            );

            productos.splice(indiceProducto, 1);

            mostrarMensaje(
                "Producto eliminado correctamente."
            );

            renderizarProductos(productos);
        });


        contenedorProductos.append(card);

    });
}


// RENDERIZAR CARRITO

function renderizarCarrito() {

    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {

        contenedorCarrito.innerHTML = `
            <p>El carrito está vacío.</p>
        `;

        subtotal.textContent = "$0";

        montoPropina.textContent = "$0";

        total.textContent = "$0";

        return;
    }


    carrito.forEach((item) => {

        const productoCarrito = document.createElement("div");

        productoCarrito.className = "item-carrito";

        productoCarrito.innerHTML = `
            <h3>${item.producto.nombre}</h3>

            <p>
                Cantidad: ${item.cantidad}
            </p>

            <p>
                Precio unitario: $${item.producto.precio}
            </p>

            <p>
                Total: $${item.producto.precio * item.cantidad}
            </p>
        `;

        contenedorCarrito.append(productoCarrito);
    });


    calcularTotal();
}


// CALCULAR TOTAL

function calcularTotal() {

    const totalCarrito = calcularSubtotal();


    const opcionSeleccionada = document.querySelector(
        'input[name="propina"]:checked'
    );


    const porcentajePropina = Number(
        opcionSeleccionada.value
    );


    const valorPropina =
        totalCarrito * porcentajePropina / 100;


    const totalFinal =
        totalCarrito + valorPropina;


    subtotal.textContent = `$${totalCarrito}`;

    montoPropina.textContent = `$${valorPropina}`;

    total.textContent = `$${totalFinal}`;
}


// EVENTO PROPINA

opcionesPropina.forEach((opcion) => {

    opcion.addEventListener("change", () => {

        calcularTotal();

    });

});


// FINALIZAR COMPRA

function finalizarCompra() {

    if (carrito.length === 0) {

        mostrarMensaje("El carrito está vacío.");

        return;
    }


    carrito.forEach((item) => {

        for (let i = 0; i < item.cantidad; i++) {

            item.producto.vender();
        }

    });


    const totalCarrito = calcularSubtotal();


    const opcionSeleccionada = document.querySelector(
        'input[name="propina"]:checked'
    );


    const porcentajePropina =
        Number(opcionSeleccionada.value);


    const valorPropina =
        totalCarrito * porcentajePropina / 100;


    const totalFinal =
        totalCarrito + valorPropina;


    ticket.innerHTML = `

        <h2>🧾 Ticket de compra</h2>

        ${carrito.map((item) => `

            <div>

                <p>
                    <strong>
                        ${item.producto.nombre}
                    </strong>

                    x${item.cantidad}
                </p>

                <p>
                    $${item.producto.precio * item.cantidad}
                </p>

            </div>

        `).join("")}

        <hr>

        <p>
            Subtotal: $${totalCarrito}
        </p>

        <p>
            Propina (${porcentajePropina}%):
            $${valorPropina}
        </p>

        <p>
            <strong>
                Total: $${totalFinal}
            </strong>
        </p>

        <p>
            ¡Gracias por tu compra!
        </p>
    `;


    carrito.length = 0;


    renderizarCarrito();

    renderizarProductos(productos);


    opcionesPropina[0].checked = true;


    mostrarMensaje(
        "Compra realizada correctamente."
    );
}


// BOTÓN VACIAR CARRITO

vaciarCarrito.addEventListener("click", () => {

    carrito.length = 0;

    renderizarCarrito();

    renderizarProductos(productos);

    mostrarMensaje(
        "Carrito vaciado correctamente."
    );

});


// BOTÓN CONFIRMAR COMPRA

confirmarCompra.addEventListener("click", () => {

    finalizarCompra();

});


// RENDERIZADO INICIAL

renderizarProductos(productos);

renderizarCarrito();


// FORMULARIO AGREGAR PRODUCTO

formulario.addEventListener("submit", (event) => {

    event.preventDefault();


    const nombre = inputNombre.value.trim();

    const precio = Number(inputPrecio.value);

    const categoria = inputCategoria.value.trim();

    const stock = Number(inputStock.value);


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
            "Completá los datos correctamente."
        );

        return;
    }


    const nuevoProducto = new Producto(

        ++ultimoId,

        nombre,

        precio,

        categoria,

        stock

    );


    productos.push(nuevoProducto);


    renderizarProductos(productos);


    formulario.reset();


    mostrarMensaje(
        "Producto agregado correctamente."
    );

});


// BUSCADOR

buscador.addEventListener("input", () => {

    const textoBuscado =
        buscador.value.toLowerCase().trim();


    const productosFiltrados =
        productos.filter((producto) => {

            return producto.nombre
                .toLowerCase()
                .includes(textoBuscado);

        });


    renderizarProductos(productosFiltrados);

});
