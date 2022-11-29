Window.addEventListener("load", function(){
    let formulario = document.querySelector("#FormDicons")

    formulario.addEventListener("submit", function(e) {
        let errores= [];

        let campoNombre = document.querySelector("#name");

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

        if (errores.length > 0){
            e.preventDefault();

            let ulErrores = document.querySelector("div.errores ul");
            for (let i = 0; i< errores.length; i++) {
                ulErrores.innerHTML += "<li> " + errores[i] + "</li>"
            }
        }
        
    })
})