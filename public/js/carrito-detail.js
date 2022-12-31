window.addEventListener('load', function(){

    
    const buttonCart = document.querySelector("#boton-carrito");

        buttonCart.addEventListener('click', function(){

            let carrito = JSON.parse(localStorage.getItem('carrito'));

            if(carrito == undefined || carrito == null){

                carrito = [];
            }

            let productoGuardado = {
                id: document.getElementById('producto-id').textContent,
                name: document.getElementById('nombre-producto').textContent,
                price: document.getElementById('precio-producto').textContent,
                discount: document.getElementById('descuento-producto').textContent,
                image: document.getElementById('imagen-producto').attributes.src.nodeValue,
                quantity: document.getElementById('numberPlace').textContent,
                description: document.getElementById('descripcion-producto').textContent
            }

            // for(cart of carrito){
            //     if(cart.id === productoGuardado.id) {
            //         cart.quantity++;
            //     }
            //     return null;
            // }
            carrito.push(productoGuardado);
            localStorage.setItem('carrito', JSON.stringify(carrito));
    

            console.log(carrito)
    
            //alert('El Producto "' + productoGuardado.name +'" se agregó al carrito!');

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'El Producto "' + productoGuardado.name +'" se agregó al carrito!',
                showConfirmButton: false,
                timer: 1500
              })
            
        });

    
        
        
    
});
       

        




// {/* <button onclick="miFunc()">Haz click</button>

// <script>
//   function miFunc() {
//     alert('Se ha dado clic al botón!');
//   }
// </script> */}