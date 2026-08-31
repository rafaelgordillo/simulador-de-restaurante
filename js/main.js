// CLASE PRODUCTO
class Producto {

    constructor(nombre, precio, categoria, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.stock = stock;
    }

    vender(cantidad) {

        if (cantidad <= this.stock) {
            this.stock -= cantidad;
            return `Venta realizada. Quedan ${this.stock} unidades.`;
        }

        return "No hay stock suficiente.";
    }
}

// INSTANCIAS DE PRODUCTOS

const pizza = new Producto("Pizza muzzarella", 18000, "Pizzas", 50);

const hamburguesa = new Producto("Hamburguesa simple",10000, "Hamburguesas",80);

const ensalada = new Producto( "Ensalada César", 8000,"Ensaladas", 50);

const gaseosa = new Producto("Gaseosa",4000, "Gaseosas", 100);

const papasFritas = new Producto("Papas fritas", 4000, "Papas", 50);

const flan = new Producto("Flan casero", 5000, "Postres", 50);

const milanesa = new Producto("Milanesa de carne", 10000, "Milanesas", 50);

const pancho = new Producto("Pancho grande", 7000, "Panchos", 100);


// ARRAY DEL MENÚ
const menu = [pizza, hamburguesa, ensalada, gaseosa, papasFritas, flan, milanesa, pancho];

// VARIABLES
let total = 0;

// FUNCIONES
// Muestra el menú utilizando el array de objetos
function mostrarMenu() {

    let mensaje = "*** MENÚ DEL DÍA ***\n";

    for (let i = 0; i < menu.length; i++) {

        mensaje += `${i + 1} - ${menu[i].nombre} $${menu[i].precio}\n`;
    }

    return mensaje;
}

// Muestra un producto seleccionado
function mostrarProducto(numeroItem, producto) {
    console.log( "art nº " + numeroItem + " - 1 " + producto.nombre + " $ " + producto.precio);
}

// Calcula la propina
function calcularPropina(total, porcentaje) {

    return total * porcentaje / 100;
}


// Despedida del cliente
const agradecerAlCliente = function (nombre) {

    console.log("--------------------------------------");
    console.log("Gracias por tu visita " + nombre + ".");
    console.log("¡Te esperamos nuevamente!");
    console.log("======================================");
};


// Suma un precio al total
const sumarAlTotal = (total, precio) => total + precio;


// Muestra los productos del menú
function mostrarListaDeProductos(lista) {

    console.log(
        "---------------------------------------------" +
        "\nLista de productos del menú" +
        "\n---------------------------------------------"
    );

    for (const producto of lista) {

     console.log( "Producto: " + producto.nombre + " | Precio: $" + producto.precio + " | Categoría: " + 
        producto.categoria + " | Stock: " + producto.stock);
    }
}

// PANEL DE ADMINISTRACIÓN
console.log("======================================");
console.log("        Restaurante El Oasis");
console.log("======================================");
console.log("       PANEL DE ADMINISTRACION");
console.log("______________________________________");


// Mostramos el menú actual
mostrarListaDeProductos(menu);

console.log( "\n" +
    "/*************** FIN ADMINISTRACION *****************/");

// PANEL DE ATENCIÓN AL CLIENTE
console.log(
    "\n" + 
    "Inicio panel de atención al cliente" +
    "\n----------------------------------------------"
);

// INICIO DEL TICKET
console.log("======================================");
console.log("        Restaurante El Oasis");
console.log("======================================");

// Pedimos nombre del cliente
let nombre = prompt("¡Bienvenido!" +
    "\nIngresá tu nombre:"
);

// Comprobamos que sea un nombre y no un número
while (!isNaN(nombre)) {

    alert("El dato ingresado no es un nombre. Intentá nuevamente.");

    nombre = prompt("Ingresá tu nombre:");
}

// Mostramos el menú
mostrarListaDeProductos(menu);

// BÚSQUEDA DE PRODUCTOS
let seguirBuscando = "si";

while (seguirBuscando == "si") {

    let productoBuscado = prompt( "Escribí el nombre exacto del producto que buscás");

    // Buscamos dentro del array de objetos
    const productoEncontrado = menu.find(producto => producto.nombre.toLowerCase() === productoBuscado.toLowerCase());

    if (productoEncontrado) {
        const posicionDelProducto =
            menu.indexOf(productoEncontrado);

        console.log( "El producto " + productoEncontrado.nombre + " está disponible en la posición: " 
            + posicionDelProducto);

    } else {

        console.log("El producto " + productoBuscado + " no existe en el menú.");
    }

    seguirBuscando = prompt("¿Querés buscar otro producto? (si/no)");

    while ( seguirBuscando != "si" && seguirBuscando != "no") {

        alert("Respuesta inválida. Ingresá si o no.");

        seguirBuscando = prompt( "¿Querés buscar otro producto? (si/no)");
    }
}

// PEDIDO DEL CLIENTE
console.log("---------------------------------");
console.log("       Detalle del pedido");
console.log("---------------------------------");

console.log( "Hola " + nombre + ", tu pedido es:");

// Preguntamos cantidad de productos
let cantidad = parseInt( prompt( mostrarMenu() +
        "\nIngresá la cantidad de productos que vas a pedir:"
    )
);

// Validamos cantidad
while (isNaN(cantidad) || cantidad <= 0) {

    alert(
        "El dato ingresado no es válido. Volvé a intentarlo."
    );

    cantidad = parseInt( prompt(  mostrarMenu() +
            "\nIngresá la cantidad de productos que vas a pedir:"
        )
    );
}

// SELECCIÓN DE PRODUCTOS
let productosValidados = 0;
let numeroArticulo = 1;


while (productosValidados < cantidad) {
    const opcion = parseInt(prompt( mostrarMenu() +
            "\nIngresá el número de la opción que vas a pedir." +
            "\nVas eligiendo " + numeroArticulo + " producto/s." )
    );

    // Verificamos que la opción exista
    if ( isNaN(opcion) || opcion < 1 || opcion > menu.length) {

        alert( "Opción inválida. Elegí un número del 1 al " + menu.length );

        continue;
    }

    // Obtenemos el objeto seleccionado
    const productoSeleccionado = menu[opcion - 1];

    // Mostramos el producto
    mostrarProducto(numeroArticulo, productoSeleccionado);

    // Actualizamos el stock
    const resultadoVenta = productoSeleccionado.vender(1);
    console.log(resultadoVenta);

    // Sumamos el precio al total
    total = sumarAlTotal(total, productoSeleccionado.precio);

    productosValidados++;
    numeroArticulo++;
}

// SUBTOTAL
console.log("--------------------------------------");
console.log( "Subtotal: $ " + total);

// PROPINA
let dejarPropina = prompt("¿Dejás propina? (si/no)");


while (dejarPropina != "si" && dejarPropina != "no") {

    alert( "Respuesta inválida. Ingresá si o no." );

    dejarPropina = prompt( "¿Dejás propina? (si/no)" );
}

if (dejarPropina == "si") {

    let porcentaje = parseInt( prompt( "Ingresá el porcentaje de la propina:"));


    while ( isNaN(porcentaje) || porcentaje < 0 || porcentaje > 100) {

        porcentaje = parseInt( prompt(
                "Porcentaje no válido. " +
                "Ingresá un valor entre 0 y 100."
            )
        );
    }


    const propina = calcularPropina(total, porcentaje);

    const totalFinal = total + propina;


    console.log("Propina: $ " + propina);

    console.log("TOTAL A PAGAR: $ " + totalFinal );

} else {

    console.log( "TOTAL A PAGAR: $ " + total);
}

// DESPEDIDA
agradecerAlCliente(nombre);