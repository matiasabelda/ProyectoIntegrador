const fs = require('fs');
const path = require('path');

const db = require('../database/models');

let controladorMain = {

    home: (req, res) => {

        db.products.findAll() //asociar los productos con cada usuario?
		.then((productos) => {

			let listaProductos=[];

			for (let producto of productos){

				let objaux={
					id: producto.id,
					name: producto.name,
					price: producto.price,
					discount: producto.discount,
					description: producto.description,
					image: producto.image,
				}

				listaProductos.push(objaux);
				
			}

			res.render('home',{Allproductos: listaProductos}); 

		});


    },
	search: (req, res) => {
		res.send('Proximamente...');
	}
};

module.exports = controladorMain;