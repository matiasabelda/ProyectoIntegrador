const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');

let controladorMain = {

    home: (req, res) => {
        /* const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('home', {productos: products}); */

        db.products.findAll() //asociar los productos con cada usuario?
		.then((productos) => {

			//console.log(productos)

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