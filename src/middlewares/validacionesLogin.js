Window.addEventListener("load", function(){
    let formulario = document.querySelector("#FormLogin")

    formulario.addEventListener("submit", function(e) {
        let errores= [];

        let campoEmail = document.querySelector("#email-login");

        if (campoNombre.value == ""){
            errores.push("El campo email tiene que estar completo");
        } else if (campoNombre.value.length < 2){
            errores.push ("El campo de email debe tener al menos 2 caracteres");
        }

        let campoContraseña = document.querySelector("#contraseña-login")

        if (campoContraseña.value < 5){
            errores.push ("El campo de contraseña debe tener al menos 5 caracteres");
        }

        
        if (errores.length > 0){
            e.preventDefault();

            let ulErrores = document.querySelector("div.errores ul");
            for (let i = 0; i< errores.length; i++) {
                ulErrores.innerHTML += "<li> " + errores[i] + "</li>"
            }
        }


    })
})