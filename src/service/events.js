//const Swal = require('sweetalert2');

FormCreate.addEvenListener ("click", function(e) {

    // e.preventDefault();

    // let nombre = document.getElementById("name");

    // if (nombre!=="") {
    //     Swal.fire({
    //         position: 'top-end',
    //         icon: 'success',
    //         title: 'Producto creado correctamente!',
    //         showConfirmButton: false,
    //         timer: 1500
    //       })
    // }

    //FormCreate.submit();

    //alert('Producto creado correctamente');
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto creado correctamente!',
        showConfirmButton: false,
        timer: 1500
    })
});