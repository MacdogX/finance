
function toggleMenu() {
    var menu = document.querySelector('.menu');
    var menuToggle = document.querySelector('.menu-toggle');
    menu.classList.toggle('menu-open');
    menuToggle.innerHTML = menu.classList.contains('menu-open') ? '✖' : '☰';
}

document.addEventListener("DOMContentLoaded", function () {
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modal = document.getElementById("myModal");

    openModalBtn.addEventListener("click", function () {
      modal.classList.remove("hidden");
    });

    closeModalBtn.addEventListener("click", function () {
      modal.classList.add("hidden");
    });
  });

  document.getElementById('cerrarBtn').addEventListener('click', function() {
    document.getElementById('myModal').classList.add('hidden');
});
  

document.addEventListener('DOMContentLoaded', function () {
    const tbody = document.getElementById('table-body');

    // Contador para el índice de los productos mostrados
    let startIndex = 0;
    let loadedProducts = 0;

    // Función para cargar productos desde el archivo JSON
    function cargarProductos() {
        fetch('js/data.json')
            .then(response => response.json())
            .then(data => {
                const productos = data.productos;
                loadedProducts = startIndex + 10 > productos.length ? productos.length : startIndex + 10; // Cargar todos los productos si quedan menos de 10
                for (let i = startIndex; i < loadedProducts; i++) {
                    const producto = productos[i];
                    const tr = document.createElement('tr');
                    tr.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'hover:bg-gray-50', 'dark:hover:bg-gray-600');
                    if (i < startIndex + 10) {
                        tr.classList.add('fade-in'); // Agregar clase de transición solo a los primeros 10 productos
                    }

                    const tdProducto = document.createElement('td');
                    tdProducto.classList.add('px-6', 'py-4', 'font-medium', 'text-gray-900', 'whitespace-nowrap', 'dark:text-white');
                    const icono = document.createElement('i');
                    icono.classList.add('fas');
                    switch (producto.nombre) {
                        case 'Comida':
                            icono.classList.add('fa-utensils');
                            break;
                        case 'Transporte':
                            icono.classList.add('fa-bus');
                            break;
                        case 'Café':
                            icono.classList.add('fa-coffee');
                            break;
                        case 'Casa':
                            icono.classList.add('fa-home');
                            break;
                        case 'Entretenimiento':
                            icono.classList.add('fa-gamepad');
                            break;
                        default:
                            icono.classList.add('fa-question');
                    }
                    
                    const spanIcono = document.createElement('span');
                    spanIcono.classList.add('mr-2');
                    spanIcono.appendChild(icono);
                    tdProducto.appendChild(spanIcono);
                    tdProducto.appendChild(document.createTextNode(producto.nombre));

                    const tdPrecio = document.createElement('td');
                    tdPrecio.classList.add('px-6', 'py-4');
                    tdPrecio.textContent = `$${producto.valor_x}`;

                    tr.appendChild(tdProducto);
                    tr.appendChild(tdPrecio);

                    tbody.appendChild(tr);
                }
                // Actualizar el índice de inicio para la próxima carga
                startIndex += 10;
            })
            .catch(error => console.error('Error al cargar los datos:', error));
    }

    // Función para observar cuando se acerca al final del tbody
    function observarFinalTbody(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && loadedProducts < 30) {
                cargarProductos(); // Cargar más productos cuando el usuario se acerque al final del tbody
            }
        });
    }

    // Crear un observador para observar el final del tbody
    const tbodyObserver = new IntersectionObserver(observarFinalTbody, { threshold: 0.5 });

    // Observar el tbody en lugar del footer
    tbodyObserver.observe(document.getElementById('table-body'));

    // Cargar los primeros productos
    cargarProductos();
});