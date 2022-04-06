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


  <div class="col-2">
<div id="producto${producto.id}" class="card">
<img src="./imgs/${producto.img}" class="card-img-top img-fluid" alt="${producto.nombre}">
<div class="card-body">
<h5 class="card-title">${producto.nombre}</h5>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item precio">Precio: ${producto.precio}</li>
<li class="list-group-item stock">Stock disponible: ${producto.stock}</li>
<li class="list-group-item talle">Talle disponible: ${producto.talle}</li>
</ul>
<button type="button" class="btn btn-success agregarCarrito" data-id="${producto.id}">Agregar al carrito</button>
</div>


</div>
`
})
  })


listaDeProductos.addEventListener('click', e => {
  addCarrito(e)
})

const addCarrito = e => {
  //console.log(e.target)
  //console.log(e.target.classList.contains('agregarCarrito'))
  if (e.target.classList.contains('agregarCarrito')) {
    
    setCarrito(e.target.parentElement)
  }

e.stopPropagation()
}

const setCarrito = objeto => {
console.log(objeto)
const producto = {
  id: objeto.querySelector('.agregarCarrito').dataset.id,
  title: objeto.querySelector('h5').textContent,
  precio: objeto.querySelector('.precio').textContent,
  talle: objeto.querySelector('.talle').textContent,
  cantidad: 1,
}

if(carrito.hasOwnProperty(producto.id)) {
  producto.cantidad = carrito[producto.id].cantidad + 1
}

carrito[producto.id] = {...producto}
pintarCarrito()
}

const pintarCarrito = () => {
  itemsCarrito.innerHTML = ''
  Object.values(carrito).forEach(producto => {
    itemsCarrito.innerHTML += `
              <tr>
                <td>${producto.title}</td>
                <td>
                  ${producto.cantidad}
                </td>
                <td>
                ${producto.talle}
                </td>
              </tr>
    `
  })

}

let carrito = {}

let itemsCarrito = document.getElementById("itemsCarrito")
