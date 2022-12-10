
const nombre = document.getElementById ("Name")
const apellido = document.getElementById ("apell")
const mail = document.getElementById ("emailInput")
const pass = document.getElementById ("passwordinput")
const pais = document.getElementById ("Country")
const error = document.getElementById("errores")

form.addEventListener("submit", e=>{
    e.preventDefauld()
    if(nombre.value.length <3){
        error += 'el nombre no es valido <br>'
    }
})