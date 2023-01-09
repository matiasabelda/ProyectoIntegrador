//import { sumaTotalCarrito, imprimirItemCarrito, counter } from './carrito';

window.addEventListener('load', function(){

    // Este JS solo captura los productos del home y los guarda en el localStorage
    const iconCart = document.querySelectorAll("#icon-cart");
    iconCart.onmouseover = "return overlib('Agregar al Carrito');"

    let carrito = JSON.parse(localStorage.getItem('carrito'));

        if(carrito == undefined || carrito == null){
    
            carrito = [];
        }

        iconCart.forEach(icon => {

            icon.addEventListener('click', addToLocalStorage)
            
        });


        function addToLocalStorage(e) {

            let button = e.target
            let item = button.closest('.card-producto'); //captura el contenedor padre del icono del carrito
            
            let newItemInLocalStorage = {
                                id: item.querySelector('#producto-id').textContent,
                                name: item.querySelector('#nombre-producto').textContent,
                                price: item.querySelector('#precio-producto').textContent,
                                discount: item.querySelector('#descuento-producto').textContent,
                                image: item.querySelector('#imagen-producto').attributes.src.nodeValue,
                                quantity: 1
            }
            
            //agrego cada item al carrito
            addItemCarrito(newItemInLocalStorage)
            

            // Cada vez que agrego un nuevo producto le envío un mensaje exitoso
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'El Producto "' + newItemInLocalStorage.name +'" se agregó al carrito!',
                showConfirmButton: false,
                timer: 1500,
                width: '400px',
                height: '200px',
              })
            console.log('LocalStorage');
            console.log(carrito);
        }


        function addItemCarrito(newItemInLocalStorage) {

            // Si el producto ya está agregado al carrito que solo sume la cantidad
            for(let i=0; i <carrito.length; i++) {

                if(carrito[i].id === newItemInLocalStorage.id) {
                    carrito[i].quantity++;
                    console.log('for'+carrito);
                    console.log(carrito);
                    return null;
                }
            }
            
            carrito.push(newItemInLocalStorage);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            //imprimirItemCarrito()
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