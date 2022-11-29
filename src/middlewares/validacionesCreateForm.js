Window.addEventListener("load", function(){
    let formulario = document.querySelector("#FormCreate ")

    formulario.addEventListener("submit", function(e) {
        let errores= [];

        let campoNombre = document.querySelector("#name");

        if (campoNombre.value == ""){
            errores.push("El campo nombre del producto tiene que estar completo");
        } else if (campoNombre.value.length < 3){
            errores.push ("El campo del producto debe tener al menos 3  caracteres");
        }

        let campoPrecio = document.querySelector("#precio-create")

        if (campoPrecio.value == ""){
            errores.push ("El campo de precio debe estar completo");
        }

        let campoDescripcion = document.querySelector("#descuento-create")

        if (campoDescripcion.value == ""){
            errores.push ("El campo descripcion debe estar completo")
        } else if (campoDescripcion.value.length < 20){
            errores.push("El campo descripcion debe tener al menos 20 caracteres")
        }else if (campoDescripcion.value.length > 40){
            errores.push ("El campo descripcion debe tener menos de 40 caracteres")
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