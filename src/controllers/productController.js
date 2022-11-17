const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const db = require('../database/models'); // Importo toda la carpeta models incluyendo Sequelize con sus metodos

let controladorProducts = {
    // Muestra todos los productos
    index: (req, res) => {
        
		
		//res.render('products', {productos: products}); // En la vista producto.ejs mostramos toda la lista de productos del JSON
		db.dicons.findAll()
    },

    // Detail - Detail from one product
	detail: (req, res) => {

		let idProducto = req.params.id;

		let productoBuscado=null;

		for (let o of products){
			if (o.id==idProducto){
				productoBuscado=o;
				break;
			}
		}

		if (productoBuscado!=null){
			res.render('detail',{producto: productoBuscado});
		}

		res.send("Producto no encontrado");
	
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let datos = req.body;
		let idNuevoProducto = (products[products.length-1].id)+1;
		let imagenProducto = '';
		
		if(req.file) {
			imagenProducto = req.file.filename;
		} else {
			imagenProducto = 'noImage.jpg';
		}
			let nuevoProducto ={
				"id": idNuevoProducto,
				"name": datos.name,
				"price": parseInt(datos.price),
				"discount": parseInt(datos.discount),
				"category": datos.category,
				"description": datos.description,
				"image": imagenProducto
			};
	
			products.push(nuevoProducto);
			fs.writeFileSync(productsFilePath,JSON.stringify(products, null, " "),'utf-8');

		res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {

		let idProducto = req.params.id;

		let productoBuscado=null;

		for (let o of products){
			if (o.id==idProducto){
				productoBuscado=o;
				break;
			}
		}

		if (productoBuscado!=null){
			res.render('product-edit-form',{producto: productoBuscado});
		}

		res.send("Producto no encontrado");
	},

	// Update - Method to update
	update: (req, res) => {

		let idProducto = req.params.id;

		let datosProducto = req.body;

		let nombreImagenAntigua="";

		for (let o of products){
			if (o.id==idProducto){

				nombreImagenAntigua = o.image;

				o.name = datosProducto.name;
				o.price = parseInt(datosProducto.price);
				o.discount = parseInt(datosProducto.discount);
				o.category = datosProducto.category;
				o.description = datosProducto.description;
				o.image = req.file.filename;
				break;
			}
		}

		fs.writeFileSync(productsFilePath,JSON.stringify(products, null, " "),'utf-8');

		// Borra la imagen anterior guardada fisicamente del producto que estamos editando
		if(nombreImagenAntigua != 'noImage.jpg') {
			fs.unlinkSync(__dirname+'/../../public/img/products/'+nombreImagenAntigua);
		}
		

		res.redirect('/');
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {

		let idProductoX = req.params.id;

		let nombreImagenAntigua="";

		for (let o of products){
			if (o.id==idProductoX){
				nombreImagenAntigua = o.image;
			}
		}
		
		let NuevaListaProductos = products.filter(function(e){
			return e.id!=idProductoX;
		});

		fs.writeFileSync(productsFilePath,JSON.stringify(NuevaListaProductos, null, " "),'utf-8');

		if(nombreImagenAntigua != 'noImage.jpg') {
			fs.unlinkSync(__dirname+'/../../public/img/products/'+nombreImagenAntigua);
		}
		
		res.redirect('/');

	},
	
	carrito: (req, res) => {
        res.render('carrito');
    }
};

module.exports = controladorProducts;