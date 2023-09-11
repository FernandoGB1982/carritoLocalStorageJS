// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener(){
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Muestra los cursos de LocalStorage
    document.addEventListener('DOMContentLoaded', () =>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    });

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        //console.log('vaciando carrito...');
        articulosCarrito = []; // Vaciamos el carrito
        limpiarHTML(); // Eliminamos todo el HTML
    });
}


// Funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}


// Eliminar curso del carrito
function eliminarCurso(e) {
    //console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
        //console.log(articulosCarrito);
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}


// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    //console.log(curso);
    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso .querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }
    //console.log(infoCurso);

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    //console.log(existe);
    if(existe){
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            }else{
                return curso; // retorna los objetos que no son duplicados
            }
            articulosCarrito = [...cursos];
        });

    }else {
        // Agrega articulos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
        console.log(articulosCarrito);
    }

    carritoHTML();
}


//Muestra el Carrito de compras en el HTML
function carritoHTML() {
    //Limpiar el HTML
    limpiarHTML();
    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        //console.log(curso);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> 
                <img src="${imagen}" width="100">
            </td>
            <td> ${precio} </td>
            <td> ${titulo} </td>
            <td> ${cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        // Agrega el  HTMl del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
    //Agregar el carrito al Storage
    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito));
}

// Elimina los cursos del tbody
function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
