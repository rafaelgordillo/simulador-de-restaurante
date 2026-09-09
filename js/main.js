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
const hamburguesa = new Producto("Hamburguesa simple", 10000, "Hamburguesas", 80);
const ensalada = new Producto("Ensalada César", 8000, "Ensaladas", 50);
const gaseosa = new Producto("Gaseosa", 4000, "Gaseosas", 100);
const papasFritas = new Producto("Papas fritas", 4000, "Papas", 50);
const flan = new Producto("Flan casero", 5000, "Postres", 50);
const milanesa = new Producto("Milanesa de carne", 10000, "Milanesas", 50);
const pancho = new Producto("Pancho grande", 7000, "Panchos", 100);

// 1. ARRAY DE OBJETOS (ARRAY DEL MENÚ)
const menu = [pizza, hamburguesa, ensalada, gaseosa, papasFritas, flan, milanesa, pancho];

// VARIABLES
let total = 0;

// FUNCIONES 
//Muestra el menu del dia mediante un for
function mostrarMenu() {
    let mensaje = "*** MENÚ DEL DÍA ***\n";
    for (let i = 0; i < menu.length; i++) {
        mensaje += `${i + 1} - ${menu[i].nombre} $${menu[i].precio}\n`;
    }
    return mensaje;
}
//funcion para mostrar un producto con su numero de articulo, nombre, precio
function mostrarProducto(numeroItem, producto) {
    console.log("art nº " + numeroItem + " - 1 " + producto.nombre + " $ " + producto.precio);
}
//funcion para calcular la propina y retornar el resultado a la variable propina
function calcularPropina(total, porcentaje) {
    return (total * porcentaje) / 100;
}
//Funcion de la despedida y agradecimiento al cliente
const agradecerAlCliente = function (nombre) {
    console.log("--------------------------------------");
    console.log("Gracias por tu visita " + nombre + ".");
    console.log("¡Te esperamos nuevamente!");
    console.log("======================================");
};
//funcion para sumar al total el precio del producto
const sumarAlTotal = (total, precio) => total + precio;

//Muestra la lista mediante un for of
function mostrarListaDeProductos(lista) {
    console.log(
        "---------------------------------------------" +
        "\nLista de productos del menú" +
        "\n---------------------------------------------"
    );
    for (const producto of lista) {
        console.log(
            "Producto: " + producto.nombre +
            " | Precio: $" + producto.precio +
            " | Categoría: " + producto.categoria +
            " | Stock: " + producto.stock
        );
    }
}


// ===================================================
// PANEL DE ADMINISTRACIÓN (MÉTODOS DE ORDEN SUPERIOR)
// ===================================================
console.log("======================================");
console.log("        Restaurante El Oasis");
console.log("======================================");
console.log("        PANEL DE ADMINISTRACION");
console.log("______________________________________");

// Mostramos el menú actual
mostrarListaDeProductos(menu);

// PANEL DE ADMINISTRACIÓN
let opcionAdmin = prompt(
    "PANEL DE ADMINISTRACIÓN\n\n" +
    "1 - Ver resumen de precios\n" +
    "2 - Ver valor total del inventario\n" +
    "3 - Verificar stock bajo\n" +
    "4 - Panel de cliente"
);

while (opcionAdmin !== "4") {

    switch (opcionAdmin) {

        case "1":
            // aplicamos map
            const resumenPrecios = menu.map(
                producto => `${producto.nombre}: $${producto.precio}`
            );

            console.log("\n--- Resumen rápido de carta (Map) ---");
            console.log(resumenPrecios.join(" | "));
            break;

        case "2":
            //aplicamos reduce
            const valorTotalInventario = menu.reduce(
                (acc, producto) => acc + (producto.precio * producto.stock),
                0
            );

            console.log(
                `\nValor total en inventario (Reduce): $${valorTotalInventario}`
            );
            break;

        case "3":
            // aplicamos some
            const hayStockBajo = menu.some(
                (producto) => producto.stock < 40 );

                if (hayStockBajo) {
                   console.log("revisar reposicion de stock");   
                    
                } else {
                    console.log("hay stock suficiente");    
                }
           
            break;

        default:
            alert("Opción inválida. Elegí una opción del 1 al 4.");
    }

    opcionAdmin = prompt(
        "PANEL DE ADMINISTRACIÓN\n\n" +
        "1 - Ver resumen de precios\n" +
        "2 - Ver valor total del inventario\n" +
        "3 - Verificar stock bajo\n" +
        "4 - Panel de cliente"
    );
}

console.log("\n/*************** FIN ADMINISTRACION *****************/\n");


// ===================================================
// PANEL DE ATENCIÓN AL CLIENTE
// ===================================================
console.log("Inicio panel de atención al cliente");
console.log("----------------------------------------------");
console.log("======================================");
console.log("        Restaurante El Oasis");
console.log("======================================");

// Pedimos nombre del cliente
let nombre = prompt("¡Bienvenido!\nIngresá tu nombre:");

while (!isNaN(nombre) || !nombre) {
    alert("El dato ingresado no es un nombre válido. Intentá nuevamente.");
    nombre = prompt("Ingresá tu nombre:");
}

// Aplicamos filter()
// Permite al cliente filtrar por una categoría específica
let filtrar = prompt("¿Deseas filtrar la carta por categoría? (si/no)").toLowerCase();
if (filtrar === "si") {
    let catBuscada = prompt("Ingresá la categoría a buscar: Pizzas, Hamburguesas, Ensaladas, Gaseosas, Papas, Postres, Milanesas):");
    
    // Aplicación del método filter()
    const productosFiltrados = menu.filter((producto) => producto.categoria.toLowerCase() === catBuscada.toLowerCase());
    
    if (productosFiltrados.length > 0) {
        console.log(`\n--- Resultados para la categoría '${catBuscada}' (Filter) ---`);
        mostrarListaDeProductos(productosFiltrados);
    } else {
        console.log(`No se encontraron productos en la categoría '${catBuscada}'. Mostramos menú completo:`);
        mostrarListaDeProductos(menu);
    }
} else {
   
   mostrarListaDeProductos(menu);
}

// Aplicamos find()
// Búsqueda puntual por nombre completo
let seguirBuscando = "si";

while (seguirBuscando === "si") {
    let productoBuscado = prompt("Escribí el nombre completo del producto que buscás:");

    // Aplicación del método find()
    const productoEncontrado = menu.find(
        producto => producto.nombre.toLowerCase() === productoBuscado.toLowerCase()
    );

    if (productoEncontrado) {
        const posicionDelProducto = menu.indexOf(productoEncontrado);
        console.log(`El producto ${productoEncontrado.nombre} está disponible en la posición: ${posicionDelProducto}`);
    } else {
        console.log(`El producto ${productoBuscado} no existe en el menú.`);
    }

    seguirBuscando = prompt("¿Querés buscar otro producto? (si/no)").toLowerCase();

    while (seguirBuscando !== "si" && seguirBuscando !== "no") {
        alert("Respuesta inválida. Ingresá si o no.");
        seguirBuscando = prompt("¿Querés buscar otro producto? (si/no)").toLowerCase();
    }
}


// PEDIDO DEL CLIENTE
console.log("---------------------------------");
console.log("       Detalle del pedido");
console.log("---------------------------------");
console.log("Hola " + nombre + ", tu pedido es:");

// Preguntamos cantidad de productos
let cantidad = parseInt(prompt(mostrarMenu() + "\nIngresá la cantidad de productos que vas a pedir:"));

while (isNaN(cantidad) || cantidad <= 0) {
    alert("El dato ingresado no es válido. Volvé a intentarlo.");
    cantidad = parseInt(prompt(mostrarMenu() + "\nIngresá la cantidad de productos que vas a pedir:"));
}

// Seleccion de productos
let productosValidados = 0;
let numeroArticulo = 1;

while (productosValidados < cantidad) {
    const opcion = parseInt(
        prompt(
            mostrarMenu() +
            "\nIngresá el número de la opción que vas a pedir." +
            "\nVas eligiendo " + numeroArticulo + " producto/s."
        )
    );

    if (isNaN(opcion) || opcion < 1 || opcion > menu.length) {
        alert("Opción inválida. Elegí un número del 1 al " + menu.length);
        continue;
    }

    const productoSeleccionado = menu[opcion - 1];

    mostrarProducto(numeroArticulo, productoSeleccionado);

    const resultadoVenta = productoSeleccionado.vender(1);
    console.log(resultadoVenta);

    total = sumarAlTotal(total, productoSeleccionado.precio);

    productosValidados++;
    numeroArticulo++;
}

// Subtotal y propina
console.log("--------------------------------------");
console.log("Subtotal: $ " + total);

let dejarPropina = prompt("¿Dejás propina? (si/no)").toLowerCase();

while (dejarPropina !== "si" && dejarPropina !== "no") {
    alert("Respuesta inválida. Ingresá si o no.");
    dejarPropina = prompt("¿Dejás propina? (si/no)").toLowerCase();
}

if (dejarPropina === "si") {
    let porcentaje = parseInt(prompt("Ingresá el porcentaje de la propina:"));

    while (isNaN(porcentaje) || porcentaje < 0 || porcentaje > 100) {
        porcentaje = parseInt(prompt("Porcentaje no válido. Ingresá un valor entre 0 y 100."));
    }

    const propina = calcularPropina(total, porcentaje);
    const totalFinal = total + propina;

    console.log("Propina: $ " + propina);
    console.log("TOTAL A PAGAR: $ " + totalFinal);
} else {
    console.log("TOTAL A PAGAR: $ " + total);
}

// Despedida
agradecerAlCliente(nombre);