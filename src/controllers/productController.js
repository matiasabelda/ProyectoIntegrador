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

			res.json({
			descripcion: "Lista de Productos",
		    codigo: 200,
			data: listaProductos})

		});
		
	},
};

module.exports = controladorProducts;