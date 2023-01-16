//import { sumaTotalCarrito, imprimirItemCarrito } from './carrito-home';
window.addEventListener('load', function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
      carrito = storage;
      imprimirItemCarrito()
    }
  });

    var itemContainer = document.getElementById('item-container'); // Div donde se imprimen los items del carrito
    var counter = document.getElementById('counter'); // Muestra la cantidad de productos en items
    var counter2 = document.getElementById('counter2'); // Muestra la cantidad de productos en RESUMEN
    var btnVaciarCarrito = document.getElementById('vaciar-carrito');
    var itemSumaTotal = document.querySelector('#itemSumaTotal');
    let totalizador = 0;
    // itemContainer.addEventListener('click', e => { // captura el valor de cada etiqueta de los productos
    //     getValueTag(e);
    // })
    // Recupero todos los items guardados en el localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    console.log('carrito en el LS');
    console.log(carrito);
    
    if( carrito !== null){

        function imprimirItemCarrito() {

            //itemContainer.innerHTML = '';

            carrito.forEach(newItemSavedInLocalStorage => {
                
                var itemCarrito = document.createElement('div');
                itemCarrito.classList.add('card');
                itemCarrito.classList.add('mb-3');
                itemCarrito.onmouseover=function(){
                    itemCarrito.style.backgroundColor="#e9e9e9";
                }
                itemCarrito.onmouseout=function(){
                    itemCarrito.style.backgroundColor="white";
                }
                const Content = `
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex flex-row align-items-center">
                                    <a href="/products/detail/${newItemSavedInLocalStorage.id}" style="text-decoration: none;">
                                        <img id="image-product" class="img-fluid rounded-3" src="${newItemSavedInLocalStorage.image}" alt="noImage.jpg" style="width: 80px; height: 80px">
                                    </a>
                                    <div class="ms-3">
                                        <h5 id="name-product">
                                            ${newItemSavedInLocalStorage.name}
                                        </h5>
                                    </div>
                                    </div>
                                    <div class="d-flex flex-row align-items-center">
                                    <div style="width: 150px;">
                                        <div class=" input-group ml-2" >
                                            <input id="numberPlace" min="1" type="number" value="${newItemSavedInLocalStorage.quantity}" class="col-sm-6 form-control">
                                        </div>
                                    </div>
                                    <div style="width: 120px;">
                                        <h5 id="price-product" class="mb-0">
                                            ${newItemSavedInLocalStorage.price}
                                        </h5>
                                    </div>
                                    <button id="delete-icon" class="delete-product btn">
                                        <i class="fas fa-trash-alt delete-product" ></i>
                                    </button>
                            
                                    
                                    
                                    
                                    
                                    
                                </div>
                            </div>
                        </div>
                `;
                //<a style="text-decoration: none;" href="/products/carrito"></a>
                itemCarrito.innerHTML = Content;
                // Con el dataset.id le agrego la propiedad data-id al boton de eliminar con el id de cada producto
                itemCarrito.querySelector('#delete-icon').dataset.id = newItemSavedInLocalStorage.id;
                itemCarrito.querySelector('.fa-trash-alt').dataset.id = newItemSavedInLocalStorage.id;
                
                // itemContainer es el div vacio en el carrito para agregar cada producto
                itemContainer.appendChild(itemCarrito);
                
                //document.querySelector('#delete-icon').dataset.id = newItemSavedInLocalStorage.id;
                //console.log(deleteIcon);
                CarritoNotNull(); // Muestra la cantidad de productos si el carrito no es null
                VaciarCarrito();

                
                let cantidad = document.querySelector("#numberPlace");
                console.log(cantidad);
                cantidad.addEventListener('change', sumaCantidad)
                    
                // });
                
                // capturo si existe algun cambio en el input de la cantidad y ejecuto la fc sumacantidad
                
                //console.log("numberPlace = ");
                //console.log(numberPlace.value);
                


                
                
            }); // Fin carrito.ForEach -----------------------
                            
            CarritoTotal();
                        
        }   // Fin function imprimirItemCarrito()
        
    }
    
    function CarritoTotal() {
        // Muestra la suma de los productos y los imprime en RESUMEN
        //var cantidad = document.querySelector('#numberPlace').value
        const itemSumaTotal = document.querySelector('#itemSumaTotal')
        console.log(itemSumaTotal.textContent);
        var itemSumaTotalAzul = document.querySelector('#itemSumaTotalAzul');
        console.log(itemSumaTotalAzul.textContent);
        carrito.forEach((item) => {
            var precioPorProducto = (Number(item.price.replace("$", ''))*(item.quantity));
            totalizador = totalizador + (precioPorProducto);
        })

        itemSumaTotal.innerHTML = '$ ' + totalizador;
        itemSumaTotalAzul.innerHTML = itemSumaTotal.textContent;
        console.log(itemSumaTotal.textContent);
        
    }
    
    
    function sumaCantidad(){
         //var numberPlace  = e.target
         
         carrito.forEach((item) => {
           var cantidad = document.querySelector('#numberPlace').value
            if(item.quantity !== cantidad){
                     cantidad.value < 1 ?  (cantidad.value = 1) : cantidad.value;
                     item.quantity == cantidad;
                     
            }
        })
        CarritoTotal()
        // itemSumaTotal.innerHTML = '$ ' + totalizador;
        // itemSumaTotalAzul.innerHTML = itemSumaTotal.textContent;
        // console.log(itemSumaTotal.textContent);
       // carrito.forEach(item => {
           // CarritoTotal()
        //   if(item.quantity !== cantidad){
        //     cantidad.value < 1 ?  (cantidad.value = 1) : cantidad.value;
        //     item.quantity == cantidad;
        //     const precioPorProducto = (Number(item.price.replace("$", ''))*cantidad);
        //     totalizador = totalizador + (precioPorProducto);
        //     }

        // itemSumaTotal.innerHTML = '$ ' + totalizador;
        // itemSumaTotalAzul.innerHTML = itemSumaTotal.textContent;
        // console.log(itemSumaTotal.textContent);
       // })
        // itemSumaTotal.innerHTML = '$ ' + totalizador;
        // itemSumaTotalAzul.innerHTML = itemSumaTotal.textContent;
      }

    

    function VaciarCarrito() { 
        btnVaciarCarrito.addEventListener('click', function(){
            localStorage.clear();
        });
    }

    let btnCompra = document.getElementById('btn-compra');
    btnCompra.addEventListener('click', mensajeCompraRealizada)
    function mensajeCompraRealizada () {
          Swal.fire({
            icon: 'success',
            title: 'Tu compra ha sido exitosa!',
            text: 'Tu pedido llega mañana. Gracias por confiar en Dicons!',
            showConfirmButton: false,
            footer: '<a href="/">Seguí navegando</a>'
          })
          localStorage.clear()
    }

    if( carrito == null){
        counter.innerHTML = `No tenés productos en tu carrito`;
        counter2.innerHTML = `0`;
        itemSumaTotal.innerHTML = `0`;
        itemSumaTotalAzul.innerHTML = `0`;
    }

    function CarritoNotNull() {
        if(carrito.length == 1) {
            // Div que te dice cuantos productos tenes en tu carrito abajo del nombre
            counter.innerHTML = `Tenés ${carrito.length} producto en tu carrito`;

        } else if(carrito.length > 1){

            counter.innerHTML = `Tenés ${carrito.length} productos en tu carrito`;
        }

        if(carrito.length >= 1){
            // Div que te dice cuantos productos tenes en la seccion de RESUMEN
            counter2.innerHTML = `${carrito.length}`;
        }
    }

    // const getValueTag = e => {
    //     console.log(e.target);
    //     console.log(e.target.classList.contains('delete-product'));
    //     if(e.target.classList.contains('delete-product')) {

    //     }
    // }
// -------------------  pruebas ----------------------------------
    // function eliminarDelCarrito(e) {
    //     if (e.target.classList.contains('delete-product')) {
    //         const deleteId = e.target.getAttribute('data-id');
    //         console.log(e.target);
    //         console.log("deleteId = " + deleteId.textContent);
    //         carrito.forEach(value => {
    //             if (value.id == deleteId) {
    //                 let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
    //                 //totalCard =  totalCard - priceReduce;
    //                 //totalCard = totalCard.toFixed(2);
    //             }
    //         });
    //         carrito = carrito.filter(product => product.id !== deleteId);
    //         localStorage.setItem('carrito', JSON.stringify(newCarrito));
            
    //         //countProduct--;
    //     }
    //}

// function CarritoTotal(){
    //     let Total = 0;
    //     const itemCartTotal = document.querySelector('.itemCartTotal')
    //     carrito.forEach((item) => {
    //       const precio = Number(item.precio.replace("$", ''))
    //       Total = Total + precio*item.cantidad
    //     })
      
    //     itemCartTotal.innerHTML = `Total $${Total}`
    //     addLocalStorage()
    //   }


// function deleteItem(prodId) {

//     let item = carrito.map((productoGuardado) => {
//         productoGuardado.id === prodId
//     });
//     console.log('item a eliminar:' + item.name);

//     // let index = carrito.indexOf(item);
//     // carrito.splice(index, 1);
// }

// function SumaTotalCarrito() {
//     let total = 0;
//     const itemSumaTotal = document.querySelector('#itemSumaTotal');
//     carrito.forEach((item) => {
//         let precio = Number(item.precio.replace('$', ''))
//         total = total + precio*item.quantity;
//     })

//     itemSumaTotal.innerHTML = `$${total}`;
// }

//  function eliminarDelCarrito(prodId) {
                //         var deleteIcon = document.getElementById('delete-icon');
                //         console.log("deleteIcon = " + deleteIcon);
                //         var dataId = deleteIcon.getAttribute('data-id');
                //         console.log("dataId = " + dataId);
                //          let item = carrito.map((item) => {
                //             item.id === prodId
                //          });
                //          console.log('item a eliminar:' + item.name);
                    
                //          // let index = carrito.indexOf(item);
                //          // carrito.splice(index, 1);
                //      }



//-------------------------------nuevas pruebas ------------

// Evento click en el icono de eliminar para eliminar un item del carrito
// var deleteIcon = document.getElementById('delete-icon');
// console.log("deleteIcon = " + deleteIcon);
// console.log(deleteIcon);
// var dataId = deleteIcon.getAttribute('data-id');
// console.log("dataId = " + dataId);
// console.log(dataId);
// deleteIcon.addEventListener('click', eliminarDelCarrito)

// function eliminarDelCarrito (e) {
//     const btnDelete = e.target
//     const item = btnDelete.closest('.card')
//     const itemName = item.querySelector('name-product').textContent;
//     console.log(itemName);
//     for(let i=0; i<carrito.length ; i++){

//         if(carrito[i].name.trim() === itemName.trim()){
//           carrito.splice(i, 1)
//         }
//     }
//     item.remove();
//     CarritoTotal()
//     console.log("Carrito dps del filter ");
//     console.log(Carrito);
//     localStorage.setItem('carrito', JSON.stringify(newCarrito));
// }