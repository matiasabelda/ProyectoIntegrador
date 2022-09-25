const express = require ('express');
const path = require ('path');

const app = express();

app.use(express.static(path.join(__dirname,'/public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./views/home.html'))
});

app.get('/producto', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./views/producto.html'))
});
app.get('/carrito', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./views/carrito.html'))
})
app.get('/registro', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./views/indexFormulario.html'))
})
app.get('/login', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./views/login.html'))
})
app.get('/perfil', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./views/perfil.html'))
})
app.listen(process.env.PORT || 3002, function() {
    console.log("Servidor corriendo en el puerto 3002");
})
