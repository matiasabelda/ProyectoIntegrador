const express = require('express');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const routes = require('./routes/index.routes');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

app.use('/', routes);

app.use('*', function(req, res) {
    res.render('error-404');
});

app.listen(process.env.PORT || 3002, function() {
    console.log("Servidor corriendo en el puerto 3002");
})
