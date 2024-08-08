// variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener("click", agregarCurso);

    // elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);

    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito == [];
        limpiarhtml()
    })
}

// funciones

function agregarCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }   
}


function eliminarCurso(e) {
    console.log(e.target.classList)
    if (e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id")

        //elmina del arreglo de articulosCarrito por el data-id

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        carritoHTML() // volvemos a mostar el html (volviendo a iterar)
    }
}

// lee el contenido de la card y obtiene el html

function leerDatosCursos (curso) {
    console.log(curso)
    // crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    // revisa si un elemento está repetido
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else {
                return curso; // retorna los no duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // agrga elementos al arreglo carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML()
}

// muestra el carrito en el html 
function carritoHTML(){
// limpiar el html
    limpiarhtml()
// recorre el carrito y muestra el html
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad} = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src=${imagen} width=100 > 
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            
            <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
        `;
        // agrega el html del carrio en el tbody
        contenedorCarrito.appendChild(row)
    })
}

//elimmina los cursos del tbody
function limpiarhtml() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}