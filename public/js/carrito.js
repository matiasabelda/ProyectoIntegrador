window.addEventListener('load', function(){

    if(localStorage.getItem('carrito') !== null){

        let itemContainer = document.getElementById('item-container');
        let counter = document.getElementById('counter');
        let counter2 = document.getElementById('counter2');
        
        //let deleteIcon = document.getElementsByTagName('i');
        let vaciarCarrito = document.getElementById('vaciar-carrito');
        let deleteIcon = document.getElementById('delete-icon');

        let carrito = JSON.parse(localStorage.getItem('carrito'));

        

        if( carrito.length == 0){
            counter.innerHTML = `No tenés productos en tu carrito`;
        } else if(carrito.length == 1) {
            counter.innerHTML = `Tenés ${carrito.length} producto en tu carrito`;
        } else if(carrito.length > 1){
            counter.innerHTML = `Tenés ${carrito.length} productos en tu carrito`;
        }
        
        if(carrito.length == 0){

            counter2.innerHTML = `${carrito.length}`;
        } else if(carrito.length >= 1){
            counter2.innerHTML = `${carrito.length}`;
        }
        renderCarrito();
        function renderCarrito() {

            carrito.forEach(productoGuardado => {

                let itemCarrito = document.createElement('div');
                itemCarrito.classList.add('card');
                itemCarrito.classList.add('mb-3');
                itemCarrito.onmouseover=function(){
                    itemCarrito.style.backgroundColor="#e9e9e9";
                }
                itemCarrito.onmouseout=function(){
                    itemCarrito.style.backgroundColor="white";
                }
                itemCarrito.innerHTML = `
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex flex-row align-items-center">
                                    <a href="/products/detail/${productoGuardado.id}" style="text-decoration: none;">
                                        <img id="image-product" class="img-fluid rounded-3" src="${productoGuardado.image}" alt="noImage.jpg" style="width: 80px;">
                                    </a>
                                    <div class="ms-3">
                                        <h5 id="name-product">
                                            ${productoGuardado.name}
                                        </h5>
                                    </div>
                                    </div>
                                    <div class="d-flex flex-row align-items-center">
                                    <div style="width: 150px;">
                                        <div class=" input-group ml-2" >
                                            <button id="minus" class="input-group-text">-</button>
                                            <span id="numberPlace" type="text" class="col-sm-4 form-control" >
                                                ${productoGuardado.quantity}
                                            </span>
                                            <button id="plus" class="input-group-text">+</button>
                                        </div>
                                    </div>
                                    <div style="width: 120px;">
                                        <h5 id="price-product" class="mb-0">
                                            ${productoGuardado.price}
                                        </h5>
                                    </div>
                                    <div id="delete-icon" onclick="deleteItem(${productoGuardado.id})" style="color: #cecece;" onmouseover="this.style.color='#ff3b3b'"; onmouseout="this.style.color='#cecece'";>
                                    <i class="fas fa-trash-alt" ></i>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                `;

                itemContainer.appendChild(itemCarrito);
                //deleteItem();
                
                
            });
            
        }

        function deleteItem(prodId) {

            let item = carrito.map((productoGuardado) => {
                productoGuardado.id === prodId
            });
            let index = carrito.indexOf(item);
            carrito.splice(index, 1);
        }
            
        vaciarCarrito.addEventListener('click', function(){

            localStorage.clear();
            localStorage.setItem('carrito');
            //renderCarrito();
        })
    
        
    }
});