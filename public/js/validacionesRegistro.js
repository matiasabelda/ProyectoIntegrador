window.addEventListener("load", function() {
    let formulario = document.querySelector("#FormDicons")
    console.log(formulario)
    formulario.addEventListener("submit", function(e) {
        let errores= [];

        let campoNombre = document.querySelector("#Name");

        if (campoNombre.value == ""){
            errores.push("El campo nombre tiene que estar completo");
        } else if (campoNombre.value.length < 2){
            errores.push ("El campo de nombre debe tener al menos 2 caracteres");
        }

        let campoApellido = document.querySelector("#apell");
        
        if (campoApellido.value == ""){
            errores.push("El campo de apelido debe tener al menos 2 caracteres")
        }

        let campoNacimiento = document.querySelector("#Nacimiento")

        if (campoNacimiento.value == "") {
            errores.push("El campo de fecha tiene que estar completo");
        }

        let campoPais = document.querySelector("#Country")

        if (campoPais.value == ""){
            errores.push("El campo pais tiene que estar completo");
        }

        let campoEmail = document.querySelector("#emailInput")

        if (campoEmail.value == ""){
            errores.push("El campo email tiene que estar completo")
        } else if (campoEmail.value.length < 2){
            errores.push ("El campo de email debe tener al menos 2 caracteres");
        }

        let campoContraseña = document.querySelector("#passwordinput")

        if (campoContraseña.value < 5){
            errores.push ("El campo de contraseña debe tener al menos 5 caracteres");
        }

        if (errores.length > 0){
            e.preventDefault()

            let ulErrores = document.querySelector(".errores");
            for (let i = 0; i < errores.length; i++) {

                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }
        
    });
})