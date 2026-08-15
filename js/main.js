// Variable para generar el total a pagar 
let total = 0;

//constantes de productos del menú
const PIZZA_MUZZA = "Pizza Muzzarella con jamón";
const HAMBURGUESA_SIMPLE = "Hamburguesa simple completa";
const ENSALADA_CESAR = "Ensalada César";
const GASEOSA_500 = "Gaseosa 500 cc.";

//Constantes con el precio de cada producto
const PRECIO_PIZZA = 18000;
const PRECIO_HAMBURGUESA = 10000;
const PRECIO_ENSALADA = 8000;
const PRECIO_GASEOSA = 4000;

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
        "\n - 1 " + GASEOSA_500 + " $ " + PRECIO_GASEOSA +
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
                
            

//////////////////////////////////////////////////////////
//Inicio del ticket
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

//Encabezado del ticket que saluda al cliente
console.log("Hola " + nombre + " tu pedido es:");

//aqui pide la cantidad de opciones que va a pedir el cliente mediante la funcion mostrarMenu()
let cantidad = parseInt((mostrarMenu()       
));

//comprueba que la cantidad que se ingresa sea un numero
 while (isNaN(cantidad) || cantidad <= 0) {

    alert("el dato ingresado no es un numero, volve a intentarlo");

     cantidad = parseInt(mostrarMenu())
 }

// aqui  elige los productos y los va sumando (si es mas de uno)
for(let i = 1; i <= cantidad; i++){
    //Pide que se elija el producto mediante su numero de item
    let opcion = parseInt(prompt(
        " *** Ingresá el numero de la opcion que vas a pedir *** " +
        "\n1 - " + PIZZA_MUZZA + " $ " + PRECIO_PIZZA +
        "\n2 - " + HAMBURGUESA_SIMPLE + " $ " + PRECIO_HAMBURGUESA +
        "\n3 - " + ENSALADA_CESAR + " $ " + PRECIO_ENSALADA + 
        "\n4 - " + GASEOSA_500 + " $ " + PRECIO_GASEOSA +
        "\nVas eligiendo " + i + " productos"
    ));

    //lista de los productos elegidos que se mostrarán por consola
    switch(opcion){

        case 1:   
           
            mostrarProducto(i, PIZZA_MUZZA, PRECIO_PIZZA);
            total = sumarAlTotal(total, PRECIO_PIZZA);
            break;

        case 2:
            mostrarProducto(i, HAMBURGUESA_SIMPLE, PRECIO_HAMBURGUESA);
            total = sumarAlTotal(total, PRECIO_HAMBURGUESA);
            break;

        case 3:
            mostrarProducto(i, ENSALADA_CESAR, PRECIO_ENSALADA);
            total = sumarAlTotal(total, PRECIO_ENSALADA);
            break;

        case 4:
            mostrarProducto(i, GASEOSA_500, PRECIO_GASEOSA);
            total = sumarAlTotal(total, PRECIO_GASEOSA);
            break;

        default:
            alert("Opcion inválida, presione aceptar para continuar")
            i--;
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


