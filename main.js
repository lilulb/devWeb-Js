document.addEventListener('DOMContentLoaded', function () {
  const sumaBtn = document.getElementById('sumaBtn');
  const restaBtn = document.getElementById('restaBtn');
  const multiplicacionBtn = document.getElementById('multiplicacionBtn');
  const divisionBtn = document.getElementById('divisionBtn');
  const porcentajeBtn = document.getElementById('porcentajeBtn');

  sumaBtn.addEventListener('click', function () {
    realizarOperacion('+');
  });

  restaBtn.addEventListener('click', function () {
    realizarOperacion('-');
  });

  multiplicacionBtn.addEventListener('click', function () {
    realizarOperacion('*');
  });

  divisionBtn.addEventListener('click', function () {
    realizarOperacion('/');
  });

  porcentajeBtn.addEventListener('click', function () {
    realizarOperacion('%');
  });
});

let carrito = [];

function toggleCarrito() {
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.classList.toggle('visible');
}

function agregarAlCarrito(nombre, precio, cantidad) {
  const productoEnCarrito = carrito.find((item) => item.nombre === nombre);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad });
  }

  console.log('Producto agregado al carrito:', nombre, precio, cantidad);
  actualizarCarrito();
}

function actualizarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  const totalElemento = document.getElementById('total');
  const cantidadCarritoElemento = document.getElementById('cantidad-carrito');
  if (cantidadCarritoElemento) {
    cantidadCarritoElemento.textContent = carrito.length;
  }
  listaCarrito.innerHTML = '';

  let total = 0;

  carrito.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} - $${item.precio} x${item.cantidad}`;
    listaCarrito.appendChild(li);

    total += item.precio * item.cantidad;
  });

  totalElemento.textContent = total.toFixed(2);
}

function sumarCantidad(nombre) {
  const cantidadElemento = document.getElementById(`cantidad-${nombre}`);
  let cantidad = parseInt(cantidadElemento.textContent, 10);
  cantidad += 1;
  cantidadElemento.textContent = cantidad;

  const precio = obtenerPrecioPorNombre(nombre);
  agregarAlCarrito(nombre, precio, 1);
}

function restarCantidad(nombre) {
  const cantidadElemento = document.getElementById(`cantidad-${nombre}`);
  let cantidad = parseInt(cantidadElemento.textContent, 10);
  cantidad = Math.max(0, cantidad - 1);

  cantidadElemento.textContent = cantidad;

  const precio = obtenerPrecioPorNombre(nombre);
  agregarAlCarrito(nombre, precio, -1);
}

function obtenerPrecioPorNombre(nombre) {
  const productos = [
    { nombre: 'Llaveros personalizados', precio: 200 },
    { nombre: 'Adornos', precio: 300 },
    { nombre: 'Mascaras', precio: 600 },
  ];

  const producto = productos.find((prod) => prod.nombre === nombre);

  return producto ? producto.precio : 0;
}

function mostrarOpcionesCompra() {
  const detalleCarrito = calcularDetalleCarrito();

  const opciones = `
    Opciones de compra:
    1. Ver detalle del carrito
    2. Ir a pagar
    3. Cerrar
  `;

  const seleccion = prompt(`${detalleCarrito}\n${opciones}`);

  switch (seleccion) {
    case '1':
      alert(detalleCarrito);
      break;
    case '2':
      calcularValorFinal();
      break;
    case '3':
      toggleCarrito(); // Cerrar el carrito
      break;
    default:
      alert('Opción no válida');
  }
}

function calcularCuotas() {
  const numeroCuotas = prompt('Ingrese la cantidad de cuotas:');
  const cuotas = parseInt(numeroCuotas, 10);

  calcularCuotasInternas(cuotas);
}

function calcularCuotasInternas(numeroCuotas) {
  const totalElemento = document.getElementById('total');
  let total = parseFloat(totalElemento.textContent);

  if (isNaN(numeroCuotas) || numeroCuotas <= 0) {
    alert('Por favor, ingrese un número válido de cuotas.');
    return;
  }

  if (numeroCuotas === 1) {
    const descuento = total * 0.1;
    total -= descuento;
    alert(`Descuento aplicado (10%): -$${descuento.toFixed(2)}`);
  }

  const montoCuota = total / numeroCuotas;

  alert(`Monto por cuota (${numeroCuotas} cuotas): $${montoCuota.toFixed(2)}`);
}

function calcularValorFinal() {
  const totalElemento = document.getElementById('total');
  let total = parseFloat(totalElemento.textContent);

  let numeroCuotas = prompt('Ingrese la cantidad de cuotas:');

  if (!numeroCuotas || isNaN(numeroCuotas) || numeroCuotas <= 1) {
    const descuento = total * 0.1;
    total -= descuento;
    alert(`Descuento aplicado (10%): -$${descuento.toFixed(2)}`);
    numeroCuotas = 1;
  } else if (numeroCuotas <= 0) {
    alert('Por favor, ingrese un número válido de cuotas.');
    return;
  }

  const cuotas = parseInt(numeroCuotas, 10);
  const montoCuota = total / cuotas;

  alert(
    `Total a pagar: $${total.toFixed(
      2,
    )}\nMonto por cuota (${cuotas} cuotas): $${montoCuota.toFixed(2)}`,
  );
}

function calcularDetalleCarrito() {
  let detalle = 'Detalle de la compra:\n\n';

  carrito.forEach((item) => {
    detalle += `${item.nombre} - Precio: $${item.precio} - Cantidad: ${item.cantidad}\n`;
  });

  const subTotal = calcularSubTotal();
  const descuento = calcularDescuento(subTotal);
  const total = subTotal - descuento;

  detalle += `\nSubtotal: $${subTotal.toFixed(2)}\n`;
  detalle += `Descuento: $${descuento.toFixed(2)}\n`;
  detalle += `Total a pagar: $${total.toFixed(2)}`;

  return detalle;
}

function calcularSubTotal() {
  let subTotal = 0;

  carrito.forEach((item) => {
    subTotal += item.precio * item.cantidad;
  });

  return subTotal;
}

function calcularDescuento(subTotal) {
  const numeroCuotas = prompt('Ingrese la cantidad de cuotas:');

  if (!numeroCuotas || isNaN(numeroCuotas) || numeroCuotas <= 1) {
    return subTotal * 0.1;
  }

  return 0;
}
function abrirCarrito() {
  const carritoContainer = document.getElementById('carrito-container');
  carritoContainer.classList.add('visible');
}

// Evitar cerrar el carrito al hacer clic dentro del modal
document.getElementById('carrito-container').addEventListener('click', function(event) {
  event.stopPropagation();
});