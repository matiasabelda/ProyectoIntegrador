const nombre = document.querySelector ("#name")
const precio = document.querySelector ("#price")
const descripcion = document.querySelector ("#description")
const img = document.getElementById("product-img")

const validacionGeneral = (mensaje, e)=> {
    const archivo = e.target;
    const archivoValue = e.target.value;

    if(archivoValue.trim().length == 0){
        archivo.classList.add("campo-invalido")
        archivo.nextElementSibling.classList.add("error")
        archivo.nextElementSibling.innerText = mensaje

    }else{
        archivo.classList.remove("campo-invalido")
        archivo.nextElementSibling.classList.remove("error")
        archivo.nextElementSibling.innerText = ""   
    }
}

img.addEventListener("change", (e) => {
    const archivo= e.target;
    const imgExt = e.target.files[0].name.split(".").pop().toLowerCase();
    const extensiones = ["jpg", "jpeg", "png"]

    if(!extensiones.includes(imgExt)) {
        archivo.classList.add("campo-invalido")
        archivo.nextElementSibling.classList.add("error")
        archivo.nextElementSibling.innerText =  `Por favor ingresar una validacion valida: ${extensiones.join (", ")}`

    }else{
        archivo.classList.remove("campo-invalido")
        archivo.nextElementSibling.classList.remove("error")
        archivo.nextElementSibling.innerText = ""
    }

})

nombre.addEventListener("blur", (e) => validacionGeneral("introduzca el nombre del producto" , e));
precio.addEventListener("blur", (e) => validacionGeneral("introduzca el precio del producto" , e));
descripcion.addEventListener("blur", (e) => validacionGeneral("introduzca la descripcion del producto" , e));

        