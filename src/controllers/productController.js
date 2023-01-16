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
			image: req.file.filename
			//image: req.file ? req.file.filename : "noImage.jpg",
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
					descripcion: prod.description,
					imagen: "http://localhost:3002/img/products/" + prod.image
				}

				listaProductos.push(itemProduct);
			}

			db.products.count({attributes: ['Categoria_id', 'categorias.name'], group: 'Categoria_id', include: 'categorias' })
			.then((grupo) => {
				console.log(grupo)

				res.json({
					descripcion: "Listado de Productos",
					cantidadProductos: listaProductos.length,
					data: listaProductos,
					//dataCategory: grupo
				})
			})
		})
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
				descripcion: prod.description,
				imagen: "http://localhost:3002/img/products/" + prod.image
			}

			res.json({
			descripcion: "Producto encontrado por id " + req.params.id,
		    codigo: 200,
			data: itemProduct})
		})
		.catch(error => {
			
			error = "Invalid string value: 'asdf'. Allowed values: [mostpopular]"


			res.json({
				error: "El Producto buscado por el id " + req.params.id + " no se encuentra en nuestra base de datos",
				codigo: 400,
				Error: error
			})
		  
		})
	},

	// Root - Show products in each Category
	traerProductosPorCategoria: (req, res) => {

		db.products.findAll({include: [{association: 'categorias'}]})
		.then((prod) =>{

			let itemProduct = {
				id: prod.id,
				nombre:  prod.name,
				precio: prod.price,
				descuento: prod.discount,
				//categoria: prod.categorias.name,
				descripcion: prod.description,
				imagen: "http://localhost:3002/img/products/" + prod.image //http://localhost:3002/img/products/1669982399705.jpg
			}

			db.products.count({attributes: ['Categoria_id', 'categorias.name'], group: 'Categoria_id', include: 'categorias' })
			.then((grupo) => {
				console.log(grupo)

				
				db.category.count().then((lista) => {

				let listaCategorias = lista;
				console.log(listaCategorias)

					res.json({
						descripción: "Cantidad de Productos por Categoria",
						cantidadCategorias: listaCategorias,
						codigo: 200,
						data: grupo
					})
				})
			})
		})
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
			cantidadCategorias: cantidadCategorias,
		    codigo: 200,
			data: listaCategorias})
		});
	},

	// Root - Show products Quantity
	productsQuantity: (req, res) => {

		db.products.findAll()
		.then((productos) => {

			let listaProductos=[];
		
			for (prod of productos){

				let itemProducts = {

					id: prod.id,
					nombre: prod.name

				}

				listaProductos.push(itemProducts);
				
			}
			let cantidadProductos = listaProductos.length;
			res.json(cantidadProductos
				)
		});
	},

	allCategories: (req, res) => {
	
		db.category.findAll()
		.then((categorias) =>{
			
			let listaCategorias=[];
		
			for (cat of categorias){

				let itemCategory = cat.name

				listaCategorias.push(itemCategory);
				
			}

			res.json(listaCategorias)
		});	
	},

	// Root - Show last product created
	lastProductCreated: (req, res) => {

		db.products.findAll({include: [{association: 'categorias'}]})
		.then((productos) => {

			let listaProductos=[];
		
			for (prod of productos){

				let itemProduct = {
					id: prod.id,
					nombre:  prod.name,
					precio: prod.price,
					descuento: prod.discount,
					categoria: prod.categorias.name,
					descripcion: prod.description,
					imagen: "http://localhost:3002/img/products/" + prod.image 
				}

				listaProductos.push(itemProduct);
			}

			let lastProductCreated = listaProductos.slice(-1);
			
			res.json({lastProductCreated})
		});
	},
	
	promociones: (req,res) => {
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

			res.render('promociones',{Allproductos: listaProductos}); 

		});

	}
};

module.exports = controladorProducts;