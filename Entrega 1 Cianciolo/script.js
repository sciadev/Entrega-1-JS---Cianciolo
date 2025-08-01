let nombres = [];
let tickets = [];
let satisfacciones = [];

function pedirCantidadAgentes() {
  let cantidad = parseInt(prompt("Ingresar cantidad de agentes (máximo 3)"));
  while (isNaN(cantidad) || cantidad < 1 || cantidad > 3) {
    cantidad = parseInt(prompt("Ingresá un número entre 1 y 3."));
  }
  return cantidad;
}
function cargarDatos(cantidad) {
  for (let i = 0; i < cantidad; i++) {
    let nombre = prompt("Nombre del agente " + (i + 1));
    let ticket = parseInt(prompt("¿Cuántos tickets atendió " + nombre + "?"));
    let satisfaccion = parseInt(prompt("Porcentaje de satisfacción (0 a 100) de " + nombre));

    if (isNaN(ticket) || ticket < 0) ticket = 0;
    if (isNaN(satisfaccion) || satisfaccion < 0 || satisfaccion > 100) satisfaccion = 0;

    nombres.push(nombre);
    tickets.push(ticket);
    satisfacciones.push(satisfaccion);
  }
}
function calcularPromedios() {
  let totalTickets = 0;
  let totalSatisfaccion = 0;

  for (let i = 0; i < tickets.length; i++) {
    totalTickets += tickets[i];
    totalSatisfaccion += satisfacciones[i];
  }

  return {
    promedioTickets: totalTickets / tickets.length,
    promedioSatisfaccion: totalSatisfaccion / satisfacciones.length
  };
}
function sugerencia(satisfaccion) {
  if (satisfaccion >= 80) {
    return "+ Favorabilidad dentro del target.";
  } else if (satisfaccion >= 60) {
    return "~ Favorabilidad levemente por debajo del target.";
  } else {
    return "- Favorabilidad baja, revisar procesos de atención.";
  }
}
function sugerenciaVolumen(ticket) {
  if (ticket >= 80) {
    return "+ Volumen de gestión dentro del target.";
  } else if (ticket >= 60) {
    return "~ Volumen levemente por debajo del target.";
  } else {
    return "- Volumen bajo, revisar gestión de tickets con agente.";
  }
}
function sugerenciaVolumenGeneral(volumen) {
  if (volumen >= 80) {
    return "+ Volumen general dentro del target.";
  } else if (volumen >= 60) {
    return "~ Volumen general levemente por debajo del target.";
  } else {
    return "- Volumen general bajo. Se sugiere revisar gestión.";
  }
}
function mostrarResultados(promedios) {
  let mensaje = "Resultado general:\n\n";
  mensaje += "Promedio de tickets: " + promedios.promedioTickets.toFixed(2) + "\n";
  mensaje += "Promedio de satisfacción: " + promedios.promedioSatisfaccion.toFixed(2) + "%\n";

  mensaje += "\n" + sugerencia(promedios.promedioSatisfaccion);
  mensaje += "\n" + sugerenciaVolumenGeneral(promedios.promedioTickets);
  alert(mensaje);

  console.log("Evaluación:");
  for (let i = 0; i < nombres.length; i++) {
    console.log(nombres[i] + " - Tickets: " + tickets[i] + " - Satisfacción: " + satisfacciones[i] + "%");
    console.log("  " + sugerencia(satisfacciones[i]));
    console.log("  " + sugerenciaVolumen(tickets[i]));
  }
}

let cantidadAgentes = pedirCantidadAgentes();
cargarDatos(cantidadAgentes);
let promedios = calcularPromedios();
mostrarResultados(promedios);
