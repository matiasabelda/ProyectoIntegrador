function connectedMiddleware(req, res, next) {
	if (req.session.userLogged) {
        next();
        
        if (req.cookies.connected != undefined &&
            req.session.usuarioLogueado == undefined) {
                let usersJSON = fs.readFileSync('users.json',{encoding : 'utf-8'});
                let users;
                if (usersJSON == ""){
                    users = [];
                } else {
                    users = JSON.parse(usersJSON);
                }
                let usuarioALoguearse
    
                for (let i = 0; i < users.length; i++) {
                    if(users[i].email == req.cookies.connected){
                       usuarioALoguearse = users [i];
                            break;
                        }
                    }
                }

                 req.session.usuarioLogueado = usuarioALoguearse;
            }

}

module.exports = connectedMiddleware;