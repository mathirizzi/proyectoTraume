class Usuario {
    constructor(usuario, correo, contraseña) {
        this.usuario = usuario;
        this.correo = correo;
        this.contraseña = contraseña;
    }
};

let arrayUsuarios = [];



if(localStorage.getItem('usuarios')) {
    arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'))
} else {
    localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios))
};

let formContacto = document.getElementById("formContacto");
let inputSuscribite = document.getElementById("inputSuscribite");

let formRegistrar = document.getElementById("formRegistrar");
let inputUsuario = document.getElementById("inputUsuario");
let inputCorreo = document.getElementById("inputCorreo");
let inputContraseña = document.getElementById("inputContraseña");
let inputRegistrate = document.getElementById("inputRegistrate");
let logo = document.getElementById("logo");

inputSuscribite.addEventListener('click', () => {
    
    formContacto.innerHTML = `
    <div class="bg-success text-center text-white">
    TE SUSCRIBISTE CORRECTAMENTE
    </div>
    `
});


formRegistrar.addEventListener('submit', (e) => {
e.preventDefault()

let usuario = document.getElementById("inputUsuario").value;
let correo = document.getElementById("inputCorreo").value;
let contraseña = document.getElementById("inputContraseña").value;

const nuevoUsuario = new Usuario(usuario, correo, contraseña);
arrayUsuarios.push(nuevoUsuario)
localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios));

formRegistrar.innerHTML = `
<div class="bg-success text-center text-white">
${inputUsuario.value} Te has registrado correctamente.
</div>
`;

swal("Te has registrado correctamente!", "Te enviamos un correo electronico de confirmacion.", "success");

});

botonVerUsuarios.addEventListener('click', () => {
    arrayUsuarios.forEach((usuarioEnArray, indice) => {
        usuariosRegistrados.innerHTML += `
<div class="card" id="user${indice} style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">Usuario ${usuarioEnArray.usuario}</h5>
        <p class="card-text">Correo Electronico: ${usuarioEnArray.correo}</p>
        <button id="boton${indice}" class="btn btn-danger">Eliminar</button>
    </div>
</div>
`

    })
});


swal({
    title: "¿Deseas suscribirte?",
    text: "Te invitamos a suscribirte a nuestras novedades por correo electronico",
    icon: "warning",
    buttons: ["Cancelar", "Suscribirme"],
    
  })
  .then((suscribirse) => {
    if (suscribirse) {
      swal("Te has suscripto correctamente!", {
        icon: "success",
        buttons: "Cerrar"
      });
    } else {
      swal("No te has suscripto a las novedades!", {
          icon: "warning",
          buttons: "Cerrar"
      });
    }
  });

  let listaDeProductos = document.getElementById("listaDeProductos")
  fetch("./json/productos.json")
  .then(response => response.json())
  .then(productos => {
productos.forEach((producto) => {
listaDeProductos.innerHTML += `
<div id="producto${producto.id}" class="card" style="width: 18rem;">
<img src="./imgs/${producto.img}" class="card-img-top" alt="${producto.nombre}">
<div class="card-body">
<h5 class="card-title">${producto.nombre}</h5>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item">Precio: ${producto.precio}</li>
<li class="list-group-item">Stock disponible: ${producto.stock}</li>
<li class="list-group-item">Talle disponible: ${producto.talle}</li>
</ul>
<button type="button" class="btn btn-success">Comprar</button>
</div>
`
})
  })


