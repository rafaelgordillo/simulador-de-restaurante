

console.log("======================================");
console.log("        Restaurante El Oasis"          ); 
console.log("======================================");

// Pide del cliente
let nombre = prompt(
    "Bienvenido!" +
    "\nIngresá tu nombre:");

console.log("Hola " + nombre + " tu pedido es:");

// Variable para generar el total a pagar 
let total = 0;

//aqui pide la cantidad de opciones que va a pedir el cliente
let cantidad = parseInt(prompt(
        "***Menú del dia***" +
        "\n - 1 Pizza Muzza con jamón $18000" +
        "\n - 1 Hamburguesa simple completa $10000" +
        "\n - 1 Ensalada César $8000" +
        "\n - 1 Gaseosa 500cc $4000" +
        "\n**Ingresá la cantidad de opciones que vas a pedir**"
));

// aqui  elige los productos
for(let i = 1; i <= cantidad; i++){
    //Pide que se elija el producto mediante su numero de item
    let opcion = parseInt(prompt(
        " *** Ingresá el numero de la opcion que vas a pedir *** " +
        "\n1 - Pizza muzza con jamón $18000" +
        "\n2 - Hamburguesa simple completa $10000" +
        "\n3 - Ensalada César $8000" +
        "\n4 - Gaseosa 500cc $4000" +
        "\nVas eligiendo " + i + " productos"
    ));
    //lista de los productos elegidos que se mostrarán por consola
    switch(opcion){

        case 1:
            console.log("art nº " + i + " - 1 Pizza muzza con jamón - $18000");
            total = total + 18000;
            break;

        case 2:
            console.log("art nº " + i + " - 1 Hamburguesa simple completa - $10000");
            total = total + 10000;
            break;

        case 3:
            console.log("art nº " + i + " - 1 Ensalada César - $8000");
            total = total + 8000;
            break;

        case 4:
            console.log("art nº " + i + " - 1 Gaseosa 500cc - $4000");
            total = total + 4000;
            break;

        default:
            alert("Opcion inválida, presione aceptar para continuar")
            i--;
            break;

    }

}

// Muestra el subtotal por consola
console.log("--------------------------------------");
console.log("Subtotal: $" + total);

// Pregunta si desea dejar propina
let respuesta = prompt("¿Dejás propina? (si/no)");

if(respuesta == "si"){

    let porcentaje = parseInt(prompt("Ingresá el porcentaje de la propina:"));

    while(porcentaje < 0 || porcentaje > 100){

        porcentaje = parseInt(prompt("Porcentaje inválido. Ingresá un valor entre 0 y 100"));

    }

    let propina = total * porcentaje / 100;
    let totalFinal = total + propina;
    
    //muestra por consola el detalle de la propina y el total a pagar
    console.log("Propina: $" + propina);
    console.log("TOTAL A PAGAR: $" + totalFinal);

}else{
    //muestra solo el total a pagar en caso de no haber dejado propina
    console.log("TOTAL A PAGAR: $" + total);

}

console.log("--------------------------------------");
console.log("Gracias por tu visita.");
console.log("¡Te esperamos nuevamente!");
console.log("======================================");

