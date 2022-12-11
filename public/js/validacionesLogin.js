const mail = document.getElementById ("email-login")

const pass = document.getElementById ("contraseña-login")

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


mail.addEventListener("blur", (e) => validacionGeneral("introduzca su email" , e));

pass.addEventListener("blur", (e) => validacionContraseña("introduzca una contraseña de 6 o mas caracteres" , e));

mail.addEventListener("input", validacionEmail);