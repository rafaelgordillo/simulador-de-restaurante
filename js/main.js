// Variable para generar el total a pagar 
let total = 0;

//constantes de productos del menú
const HAMBURGUESA_SIMPLE = "Hamburguesa simple";
const PIZZA_MUZZA = "Pizza muzzarella";
const ENSALADA_CESAR = "Ensalada César";
const GASEOSA = "Gaseosa";
const PAPAS_FRITAS = "Papas fritas"
const FLAN_CASERO = "flan casero";
const MILANESA_CARNE = "milanesa de carne";
const SUPER_PANCHO = "Pancho grande";

//Constantes con el precio de cada producto
const PRECIO_PIZZA = 18000;
const PRECIO_HAMBURGUESA = 10000;
const PRECIO_ENSALADA = 8000;
const PRECIO_GASEOSA = 4000;
const PRECIO_PAPAS = 4000;
const PRECIO_FLAN = 5000;
const PRECIO_MILANESA = 10000;
const PRECIO_PANCHO = 7000; 

//Funciones 
/*funcion para mostrar el menu y elegir la cantidad de opciones a pedir
 tambien se invoca a la función en el while para comprobar que se ingresó un numero 
  y sino volver a mostrar el menú  */
function mostrarMenu() {
    return prompt(
        "***Menú del día***" +
        "\n - 1 " + PIZZA_MUZZA + " $ " + PRECIO_PIZZA +
        "\n - 1 " + HAMBURGUESA_SIMPLE + " $ " + PRECIO_HAMBURGUESA +
        "\n - 1 " + ENSALADA_CESAR + " $ " + PRECIO_ENSALADA +
        "\n - 1 " + GASEOSA + " $ " + PRECIO_GASEOSA +
        "\n - 1 " + PAPAS_FRITAS + " $ " + PRECIO_PAPAS +
        "\n**Ingresá la cantidad de opciones que vas a pedir**"
    );
}

//función para mostrar en el switch el numero de item, el nombre del producto y su precio
function mostrarProducto(numeroItem, nombreDeProducto, precioDeProducto){
         console.log("art nº " + numeroItem + " - 1 " + nombreDeProducto + " $ " + precioDeProducto);
            }

//funcion para calcular la propina y retornar el resultado a la variable propina
function calcularPropina(total, porcentaje){
        return total * porcentaje / 100;
    }
//Funcion de la despedida y agradecimiento al cliente
const agradecerAlCliente = function(nombre){
console.log("--------------------------------------");
console.log("Gracias por tu visita " + nombre + ".");
console.log("¡Te esperamos nuevamente!");
console.log("======================================");
}   
//funcion para sumar al total el precio del producto que se va agregando en el switch
const sumarAlTotal = (total, precio) =>  total + precio;

//funcion para mostrar el array final 
function mostrarListaDeProductos(lista){
console.log("---------------------------------------------" +
     "\n" + "Lista final al publico de productos del menú " +
     "\n" + "---------------------------------------------"
    );
for (const producto of lista) {
    console.log("producto: "  + producto);   
}
}

console.log("======================================");
console.log("        Restaurante El Oasis"          ); 
console.log("======================================");
console.log("       PANEL DE ADMINISTRACION        ");
console.log("______________________________________");

//Array de productos
const listaDeProductos = [MILANESA_CARNE, SUPER_PANCHO, ENSALADA_CESAR, GASEOSA, PAPAS_FRITAS];
console.log(listaDeProductos);//imprime por consola el array de productos

//Agregamos un nuevo elemento al final del array listaDeProductos
listaDeProductos.push(FLAN_CASERO);
console.log("se agrego a la lista: " + FLAN_CASERO);//imprime por consola lo que se agregó

//Agregamos un elemento al inicio del array listaDeProductos
listaDeProductos.unshift(PIZZA_MUZZA);
console.log("se agregó: " + listaDeProductos[0]);//imprime por consola lo que se agregó

//Eliminamos el ultimo elemento del array listaDeProductos
let elementoEliminado = listaDeProductos.pop();
console.log("se ha eliminado el elemento: " + elementoEliminado);//imprime por consola lo que se eliminó

//Actualizacion por indice 
listaDeProductos.splice(1,2,HAMBURGUESA_SIMPLE);
console.log("Se actualizó el indice 1 Y borramos el 2 por: " + HAMBURGUESA_SIMPLE + " al menú");//imprime por consola la actualizacion

//Se muestra el array final para el panel de cliente mediante una funcion
mostrarListaDeProductos(listaDeProductos);

console.log(
"\n " +   
"/***************FIN ADMINISTRACION*****************/"
);

console.log(
    "\n " +
    "     Inicio panel de atencion al cliente " + 
    "----------------------------------------------" +
    "\n " + 
    "\n "
);

//Inicio del ticket cliente
console.log("======================================");
console.log("        Restaurante El Oasis"          ); 
console.log("======================================");

// Pide el nombre del cliente
let nombre = prompt(
    "Bienvenido!" +
    "\nIngresá tu nombre:");
//comprueba que sea un nombre y no un numero
   while (!isNaN(nombre)) {
    alert("El dato ingresado no es un nombre. Intentá nuevamente.");
    nombre = prompt("Ingresá tu nombre:");
} 
//Muesta la lista de productos por consola para el cliente
console.log(listaDeProductos);


mostrarListaDeProductos(listaDeProductos);
//console.log("cantidad de elementos: " + listaDeProductos.length);

//pide que el cliente busque de la lista algun producto para ver si esta disponible
let seguirBuscando = "si";

while (seguirBuscando == "si") {
    
let productoBuscado = prompt("Escribi el nombre exacto del producto que buscas");

if (listaDeProductos.includes(productoBuscado)) {
    const posicionDelProducto = listaDeProductos.indexOf(productoBuscado);
   console.log("El producto " + productoBuscado +  " está disponible en la posicion: " + posicionDelProducto);
   
   
}else{
   console.log("el producto " + productoBuscado + " no existe en la lista");
   
}
seguirBuscando = prompt("¿Queres buscar otro producto? (si/no)")

while (seguirBuscando != "si" && seguirBuscando != "no") {
    alert("Respuesta inválida. Ingresá si o no ");
    seguirBuscando = prompt("Queres buscar otro producto? (si/no)");
}
}
   
//Encabezado del ticket que saluda al cliente
console.log("---------------------------------");
console.log("       Detalle del pedido        ");
console.log("---------------------------------");


console.log("Hola " + nombre + " tu pedido es:");

//aqui pide la cantidad de opciones que va a pedir el cliente mediante la funcion mostrarMenu()
let cantidad = parseInt((mostrarMenu()       
));

//comprueba que la cantidad que se ingresa sea un numero
 while (isNaN(cantidad) || cantidad <= 0) {

    alert("el dato ingresado no es un numero, volve a intentarlo");

     cantidad = parseInt(mostrarMenu())
 }

let productosValidados = 0;
let numeroArticulo = 1; //variable que va a mostrar en el ticket el numero de articulo

// aqui  elige los productos y los va sumando (si es mas de uno)
while (productosValidados < cantidad) {
    
    //Pide que se elija el producto mediante su numero de item
    let opcion = parseInt(prompt(
        " *** Ingresá el numero de la opcion que vas a pedir *** " +
        "\n1 - " + PIZZA_MUZZA + " $ " + PRECIO_PIZZA +
        "\n2 - " + HAMBURGUESA_SIMPLE + " $ " + PRECIO_HAMBURGUESA +
        "\n3 - " + ENSALADA_CESAR + " $ " + PRECIO_ENSALADA + 
        "\n4 - " + GASEOSA + " $ " + PRECIO_GASEOSA +
        "\n5 - " + PAPAS_FRITAS + " $ " + PRECIO_PAPAS +
        "\nVas eligiendo " + numeroArticulo + " productos"
    ));

    //lista de los productos elegidos que se mostrarán por consola
    switch(opcion){

        case 1:   
           
            mostrarProducto(numeroArticulo, PIZZA_MUZZA, PRECIO_PIZZA);
            total = sumarAlTotal(total, PRECIO_PIZZA);
            productosValidados++;
            numeroArticulo++;
            break;

        case 2:
            mostrarProducto(numeroArticulo, HAMBURGUESA_SIMPLE, PRECIO_HAMBURGUESA);
            total = sumarAlTotal(total, PRECIO_HAMBURGUESA);
            productosValidados++;
            numeroArticulo++;
            break;

        case 3:
            mostrarProducto(numeroArticulo, ENSALADA_CESAR, PRECIO_ENSALADA);
            total = sumarAlTotal(total, PRECIO_ENSALADA);
            productosValidados++
            numeroArticulo++;
            break;

        case 4:
            mostrarProducto(numeroArticulo, GASEOSA, PRECIO_GASEOSA);
            total = sumarAlTotal(total, PRECIO_GASEOSA);
            productosValidados++;
            numeroArticulo++;
            break;

        case 5: mostrarProducto(numeroArticulo, PAPAS_FRITAS, PRECIO_PAPAS);
            total = sumarAlTotal(total, PRECIO_PAPAS); 
             productosValidados++;
            numeroArticulo++;
            break; 

        default:
            alert("Opcion inválida, presione aceptar para continuar")
           
            break;
    }
}

// Muestra el subtotal por consola
console.log("--------------------------------------");
console.log("Subtotal: $ " + total);

// Pregunta si desea dejar propina
let dejarPropina = prompt("¿Dejás propina? (si/no)");

while (dejarPropina != "si" && dejarPropina != "no") {
    alert("Respuesta inválida. Ingresá si o no ");
    dejarPropina = prompt("¿Dejás propina? (si/no)");
}

if(dejarPropina == "si"){

    let porcentaje = parseInt(prompt("Ingresá el porcentaje de la propina:"));

    while((isNaN(porcentaje ) || (porcentaje < 0 || porcentaje > 100))){

        porcentaje = parseInt(prompt("Porcentaje no válido. Ingresá un valor entre 0 y 100"));
    }
    
    let propina = calcularPropina(total, porcentaje);

    const TOTAL_FINAL = total + propina;
    
    //muestra por consola el detalle de la propina y el total a pagar
    console.log("Propina: $ " + propina);
    console.log("TOTAL A PAGAR: $ " + TOTAL_FINAL);

}else{
    //muestra solo el total a pagar en caso de no haber dejado propina
    console.log("TOTAL A PAGAR: $ " + total);
}

agradecerAlCliente(nombre);


