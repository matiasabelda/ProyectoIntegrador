const express = require ('express');
const path = require ('path');
const routes = require('./src/routes/index.routes');


const app = express();

app.use(express.static(path.join(__dirname,'/public')));

app.set('view engine', 'ejs');

app.use('/', routes);


app.use('*', function(req, res) {
    res.send("Error de acceso, esta ruta no existe en el sitio")
});

app.listen(process.env.PORT || 3002, function() {
    console.log("Servidor corriendo en el puerto 3002");
})
