window.addEventListener('load', function(){

    
    const iconCart = document.querySelectorAll("#icon-cart");
    iconCart.onmouseover = "return overlib('Agregar al Carrito');"

    let carrito = JSON.parse(localStorage.getItem('carrito'));

        if(carrito == undefined || carrito == null){
    
            carrito = [];
        }

        iconCart.forEach(icon => {

            icon.addEventListener('click', addToCarritoItem)
            
        });

        function addToCarritoItem(e) {

            let button = e.target
            let item = button.closest('.card-producto');
            
            let productoGuardado = {
                                id: item.querySelector('#producto-id').textContent,
                                name: item.querySelector('#nombre-producto').textContent,
                                price: item.querySelector('#precio-producto').textContent,
                                discount: item.querySelector('#descuento-producto').textContent,
                                image: item.querySelector('#imagen-producto').attributes.src.nodeValue,
                                quantity: 1
            }
            
            // carrito.map((prop) => {

            //     if(prop.id === productoGuardado.id) {
            //         prop.quantity++;

            //         return null;
            //     }
            // });

            
            carrito.push(productoGuardado);
            localStorage.setItem('carrito', JSON.stringify(carrito));
    
            //alert('El Producto "' + productoGuardado.name +'" se agregó al carrito exitosamente!');

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'El Producto "' + productoGuardado.name +'" se agregó al carrito!',
                showConfirmButton: false,
                timer: 1500,
                width: '400px',
                height: '200px',
              })
        }

        
})


//         iconCart.addEventListener('click', function(){

//             let carrito = JSON.parse(localStorage.getItem('carrito'));

//             if(carrito == undefined || carrito == null){

//                 carrito = [];
//             }

//             let productoGuardado = {
//                 id: document.getElementById('producto-id').textContent,
//                 name: document.getElementById('nombre-producto').textContent,
//                 price: document.getElementById('precio-producto').textContent,
//                 discount: document.getElementById('descuento-producto').textContent,
//                 image: document.getElementById('imagen-producto').attributes.src.nodeValue,
//                 quantity: document.getElementById('numberPlace').textContent,
//                 description: document.getElementById('descripcion-producto').textContent
//             }

//             carrito.push(productoGuardado);
//             localStorage.setItem('carrito', JSON.stringify(carrito));
        
//             alert('El Producto "' + productoGuardado.name +'" se agregó al carrito exitosamente!');

            
//         });

    
        
        
    
// });