// Variable global para almacenar los productos en el carrito
let carrito = [];

// Función para mostrar un popup de notificación
function mostrarPopup(mensaje) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.textContent = mensaje;
    document.body.appendChild(popup);

    // Ocultar el popup después de 3 segundos
    setTimeout(() => {
        popup.remove();
    }, 3000);
}

// Función para actualizar la lista en la sección "Mi Carrito"
function actualizarCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    carritoLista.innerHTML = ''; // Limpia la tabla antes de actualizarla

    let total = 0; // Variable para almacenar la suma de los precios

    carrito.forEach((item, index) => {
        const fila = document.createElement('tr'); // Crea una fila de la tabla

        // Celda del producto
        const productoCelda = document.createElement('td');
        productoCelda.textContent = item.producto;
        fila.appendChild(productoCelda);

        // Celda del precio
        const precioCelda = document.createElement('td');
        precioCelda.textContent = `$${item.precio}`;
        fila.appendChild(precioCelda);

        // Celda del botón de eliminación
        const eliminarCelda = document.createElement('td');
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = '×'; // Símbolo de cruz
        botonEliminar.classList.add('btn-eliminar'); // Clase para estilo
        botonEliminar.addEventListener('click', () => {
            eliminarProducto(index);
        });
        eliminarCelda.appendChild(botonEliminar);
        fila.appendChild(eliminarCelda);

        // Agregar la fila a la tabla
        carritoLista.appendChild(fila);

        // Sumar el precio al total
        total += parseFloat(item.precio);
    });

    // Crear la fila del total
    const filaTotal = document.createElement('tr');
    filaTotal.classList.add('total-row'); // Agregar la clase 'total-row' para el estilo

    const productoTotal = document.createElement('td');
    productoTotal.textContent = 'Total';
    filaTotal.appendChild(productoTotal);

    const precioTotal = document.createElement('td');
    precioTotal.textContent = `$${total.toFixed(2)}`; // Mostrar el total con dos decimales
    filaTotal.appendChild(precioTotal);

    const celdaVacia = document.createElement('td'); // Columna vacía para alinear con el botón
    filaTotal.appendChild(celdaVacia);

    // Agregar la fila del total al final de la tabla
    carritoLista.appendChild(filaTotal);

    // Solo agregar el event listener para "Confirmar Pedido" si no está agregado
    const confirmarPedidoBtn = document.getElementById('confirmar-pedido');
    if (confirmarPedidoBtn) {
        confirmarPedidoBtn.removeEventListener('click', confirmarPedidoHandler); // Elimina cualquier listener previo
        confirmarPedidoBtn.addEventListener('click', confirmarPedidoHandler); // Agrega el listener actual
    } else {
        console.error('No se encontró el botón "Confirmar Pedido"');
    }
}

// Función para confirmar el pedido
function confirmarPedidoHandler() {
    if (carrito.length > 0) {
        mostrarPopup('Pedido confirmado con éxito');
        carrito = []; // Vaciar el carrito
        actualizarCarrito(); // Actualizar la vista del carrito (se mostrará vacío)
    } else {
        mostrarPopup('Tu carrito está vacío. Agrega productos antes de confirmar.');
    }
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1); // Eliminar el producto del carrito
    actualizarCarrito(); // Actualizar la tabla del carrito
}

// Función para cargar una sección
function loadSection(url, target) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga de la sección');
            }
            return response.text();
        })
        .then(data => {
            const targetElement = document.querySelector(target);
            targetElement.innerHTML = data;

            const carritoLista = document.getElementById('carrito-lista');
            if (carritoLista) {
                actualizarCarrito();
            } else {
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    card.addEventListener('click', () => {
                        const producto = card.getAttribute('data-product');
                        const precio = card.querySelector('.precio').textContent;

                        carrito.push({ producto, precio });

                        mostrarPopup('Agregaste un producto al carrito');

                        if (document.querySelector(target) && target === '.carrito-container') {
                            actualizarCarrito();
                        }
                    });
                });
            }

            if (url === 'inicio.html' && document.querySelector('.slider')) {
                initSlider();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Se asegura que el código se ejecute solo una vez al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
});






