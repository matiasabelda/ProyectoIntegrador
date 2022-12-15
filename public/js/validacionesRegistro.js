const nombre = document.querySelector ("#Name")
const apellido = document.getElementById ("apell")
const mail = document.getElementById ("emailInput")
const pass = document.getElementById ("passwordinput")
const pais = document.getElementById ("Country")
const img = document.getElementById("avatar")

const validacionGeneral = (mensaje, e)=> {
    const archivo = e.target;
    const archivoValue = e.target.value;        

    if(archivoValue.trim().length < 3){
        archivo.classList.add("campo-invalido")
        archivo.nextElementSibling.classList.add("error")
        archivo.nextElementSibling.innerText = mensaje

    }else{
        archivo.classList.remove("campo-invalido")
        archivo.nextElementSibling.classList.remove("error")
        archivo.nextElementSibling.innerText = ""
    }
}

const validacionContraseña = (mensaje, e)=> {
    const archivo = e.target;
    const archivoValue = e.target.value;

    if(archivoValue.trim().length < 6){
        archivo.classList.add("campo-invalido")
        archivo.nextElementSibling.classList.add("error")
        archivo.nextElementSibling.innerText = mensaje

    }else{
        archivo.classList.remove("campo-invalido")
        archivo.nextElementSibling.classList.remove("error")
        archivo.nextElementSibling.innerText = ""
    }
}



const validacionEmail = e => {
    const archivo = e.target;
    const archivoValue= e.target.value;
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
   
    if(archivoValue.trim().length > 5  &&  !regex.test(archivoValue)) {
        archivo.classList.add("campo-invalido")
        archivo.nextElementSibling.classList.add("error")
        archivo.nextElementSibling.innerText = "Por favor ingresar un correo valido"

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


nombre.addEventListener("blur", (e) => validacionGeneral("introduzca su nombre" , e));

apellido.addEventListener("blur", (e) => validacionGeneral("introduzca su apellido" , e));

mail.addEventListener("blur", (e) => validacionGeneral("introduzca su email" , e));



pass.addEventListener("blur", (e) => validacionContraseña("introduzca una contraseña de 6 o mas caracteres" , e));

pais.addEventListener("blur", (e) => validacionGeneral("introduzca su pais" , e));

mail.addEventListener("input", validacionEmail);
