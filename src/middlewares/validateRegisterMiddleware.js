const path = ('path');
const { body }= require =('express-validator');

module.exports = [
body ('name').notEmpty().withMessage('Debes confirmar nombre'),
body ('apell').notEmpty().withMessage('Debes confirmar apellido'),
body ('nac').notEmpty().withMessage('Debes agregar una fecha de nacimiento'),
body ('count').notEmpty().withMessage('Debes confirmar tu país'),
body ('email').notEmpty().withMessage('Debes confirmar tu email'),
body ('pass').notEmpty().withMessage('Debes confirmar tu contraseña'),
body ('genero').notEmpty().withMessage('Debes confirmar tu genero'),
body ('terms').notEmpty().withMessage('Acepta términos y condiciones'),
]