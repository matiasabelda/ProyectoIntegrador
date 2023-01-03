const db = require('../database/models'); // Importo toda la carpeta models incluyendo Sequelize con sus metodos


let controladorProducts = {

    // Show all products
    index: (req, res) => {
		res.redirect('/'); // Si el usuario va al entry point "/products" lo redirige al home donde se muestran todos los productos
	},

	// Create - Form to create
	create: (req, res) => {
		db.category.findAll()
			.then(function(categorias) {
				console.log(categorias)
				return res.render('product-create-form', {categorias: categorias});
			}
		);
	},

	store : (req,res) => {

		// Si el usuario no sube ninguna foto que se cargue una foto por default
		let imgProduct = '';

		if(req.file) {

			imgProduct = req.file.filename;

		} else {
			
			imgProduct = 'noImage.jpg';
		}

		db.products.create({
			create_at: req.body.create_at,
			update_at: req.body.update_at,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			Categoria_id: req.body.category,
			description: req.body.description,
			image: imgProduct
		})
		// Faltaria crear un alert que diga "producto creado correctamente" y luego redirigimos la vista al home
		.then(function() {
			
			res.redirect("/");
		});
		
	},

	// Detail - Detail Form of each product
	detail: (req, res) => {
		db.products.findOne({where: {id: req.params.id}})
			.then(function(productoBuscado) {
				res.render('detail', {productoBuscado: productoBuscado})
			})
	},

	// Edit - Edit Form of each product
	edit: (req, res) => {
		
		let productToEdit = db.products.findByPk(req.params.id);
		let allCategories = db.category.findAll();

		Promise.all([productToEdit, allCategories])
			.then(([productoAEditar, categorias]) => {
				res.render('product-edit-form', {
					productoAEditar: productoAEditar, categorias: categorias
					});
			});
	},

	// Update - Update products atributes
	update: (req,res) => {
		db.products.update({
			
			// create_at: req.body.create_at,
			update_at: req.body.update_at ,
			name: req.body.name,
			price: req.body.price ,
			discount: req.body.discount,
			Categoria_id: req.body.category,
			description: req.body.description,
			image: req.body.image //image: req.file ? req.file.filename : "logo-PF-tipografico.png",
		},
		{
			where:{
				id: req.params.id
			}
		}).then(() => {
			res.redirect("/products/detail/" + req.params.id)
		});
		
	},

	// Delete - Delete specific product by id
	delete : (req, res) => {
		db.products.destroy({
			where:{
				id: req.params.id
			}
		}).then(() => {
			res.redirect("/products");
		});
		
	},
	
	carrito: (req, res) => {
		let productToAdd = db.products.findByPk(req.params.id);
		return res.render('carrito', {
			user: req.session.userLogged[0],
			productToAdd: productToAdd
            
		});
	},

	// Root - Show all products
	traerProductos: (req, res) => {
	
		db.products.findAll({include: [{association: 'categorias'}]})
		.then((productos) =>{
			
			let listaProductos=[];
		
			for (prod of productos){

				let itemProduct = {
					id: prod.id,
					nombre:  prod.name,
					precio: prod.price,
					descuento: prod.discount,
					categoria: prod.categorias.name,
					descripcion: prod.description
					//imagen: "http://localhost:3002/" + prod.attributes.src.nodeValue
				}

				listaProductos.push(itemProduct);
				
			}

			let cantidadProductos = listaProductos.length;
			res.json({
			descripcion: "Lista de Productos",
			cantidadProductos: cantidadProductos,
		    codigo: 200,
			data: listaProductos})

		});
		
	},

	// Root - Show products by ID
	traerProductoPorId: (req, res) => {

		db.products.findByPk(req.params.id, {include: [{association: 'categorias'}]})
		.then((prod) =>{

			let itemProduct = {
				id: prod.id,
				nombre:  prod.name,
				precio: prod.price,
				descuento: prod.discount,
				categoria: prod.categorias.name,
				descripcion: prod.description
				//imagen: "http://localhost:3002/" + prod.attributes.src.nodeValue
			}

			res.json({
			descripcion: "Producto encontrado por id " + req.params.id,
		    codigo: 200,
			data: itemProduct})

		})
		// .catch(error => res.json({
		// 	error: "El Producto con el id " + req.params.id + " no se encuentra en la base de datos",
		//     codigo: 200,
		// 	data: itemProduct}));

		
	},

	// Root - Show products in each Category
	traerProductosPorCategoria: (req, res) => {

		db.products.findAll({include: [{association: 'categorias'}]},
		{
			model: category
		})
		.then((categorias) => {

			res.json({
				descripcion: "Cantidad de Productos por Categoria",
				cantidadCategorias: cantidadCategorias,
					codigo: 200,
				data: listaCategorias})
		});


		// db.category.findAll({include: [{association: 'productos'}]})
		// .then((categorias) =>{
			
		// 	let listaCategorias=[];
		
		// 	for (cat of categorias){

		// 		let listaProductos = [];

		// 		for(prod of cat.productos){
		// 			var prodCat = prod.categorias.length
					
		// 		}

		// 		listaProductos.push(prodCat)

		// 		let itemCategory = {

		// 			categoria: cat.name,
		// 			cantProductos: listaProductos
					
		// 		}

		// 		listaCategorias.push(itemCategory);
				
		// 	}

		// 	let cantidadCategorias = listaCategorias.length;
		// 	res.json({
		// 	descripcion: "Lista de Productos",
		// 	cantidadCategorias: cantidadCategorias,
		//     codigo: 200,
		// 	data: listaCategorias})

		// });

		
	},

	// Root - Show all categories
	traerCategorias: (req, res) => {
	
		db.category.findAll()
		.then((categorias) =>{
			
			let listaCategorias=[];
		
			for (cat of categorias){

				let itemCategory = {

					id: cat.id,
					nombre: cat.name

				}

				listaCategorias.push(itemCategory);
				
			}

			let cantidadCategorias = listaCategorias.length;
			res.json({
			descripcion: "Lista de Categorias",
			cantidadProductos: cantidadCategorias,
		    codigo: 200,
			data: listaCategorias})

		});
		
	}
};

module.exports = controladorProducts;