const express = require ('express');
const path = require ('path');
const mainRoutes = require('./src/routes/mainRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const registerRoutes = require('./src/routes/registerRoutes');
const carritoRoutes = require('./src/routes/carritoRoutes');
const productoRoutes = require('./src/routes/productoRoutes');
const perfilRoutes = require('./src/routes/perfilRoutes');
const app = express();

app.use(express.static(path.join(__dirname,'/public')));

app.set('view engine', 'ejs');

app.use('/', mainRoutes); // se concatenan las rutas del primer y segundo parámetro 

app.use('/login', loginRoutes);

app.use('/registro', registerRoutes);

app.use('/carrito', carritoRoutes);

app.use('/products', productoRoutes);

app.use('/perfil', perfilRoutes);

app.use('*', function(req, res) {
    res.send("Error de acceso, esta ruta no existe en el sitio")
});

app.listen(process.env.PORT || 3002, function() {
    console.log("Servidor corriendo en el puerto 3002");
})
