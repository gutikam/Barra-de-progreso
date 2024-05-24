const progress = document.querySelector("#progress");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const circles = document.querySelectorAll(".circle");

let tecnologiasActive = 1;

// Event listener
eventListener()

function eventListener() {
    next.addEventListener("click", nextBtn);
    prev.addEventListener("click", prevBtn);
    document.addEventListener("DOMContentLoaded", cargandoLocalS);
}


// Funciones

// suma 1 circulo al precionar el boton Next
function nextBtn() { 
    tecnologiasActive++;

    if(tecnologiasActive > circles.length) {
        tecnologiasActive = circles.length;
    }

    update();
}

// Resta un circulo al precionar el boton Prev
function prevBtn() { 
    tecnologiasActive--;

    if(tecnologiasActive < 1) {
        tecnologiasActive = 1;
    }

    update();
}

// Carga la linea de progreso
function update(){ 
    circles.forEach((circle, idx) =>{
        if (idx < tecnologiasActive) {
            circle.classList.add("active");
        } else {
            circle.classList.remove("active");
        }
    }) 

    btnLoad();

    sincronizarStorange();
}

// Función para actualizar el estado de los botones next y prev y la barra de progreso
function btnLoad() { 
    const actives = document.querySelectorAll(".active");

    progress.style.width = ((actives.length - 1) / (circles.length -1) * 100 + "%");

    // Si 'tecnologiasActive' es 1, deshabilita solo el botón "prev"
    if (tecnologiasActive === 1) {
        prev.disabled = true;
        next.disabled = false; // Asegura que el botón "next" esté habilitado
    // Si 'tecnologiasActive' es igual al número total de círculos, deshabilita solo el botón "next"
    } else if (tecnologiasActive === circles.length) {
        prev.disabled = false; // Asegura que el botón "prev" esté habilitado
        next.disabled = true;
    // En otros casos, ambos botones deben estar habilitados
    } else {
        prev.disabled = false;
        next.disabled = false;
    }
}

// Agregando las tecnologias actuales a Localstorage
function sincronizarStorange() {
    localStorage.setItem("tecnologiasActive", JSON.stringify(tecnologiasActive));
}

// Agregando localStorage al html
function cargandoLocalS() {
    tecnologiasActive = JSON.parse( localStorage.getItem("tecnologiasActive") || 1);

    update();
}
