var idUsuario = false;
if (!localStorage.getItem('pinogordo-stored-user')) {
  document.getElementById('btnAddCar').style.visibility = 'hidden';
} else {
  idUsuario = JSON.parse(localStorage.getItem('pinogordo-stored-user')).Id;
}
obtenerDatosUrl = () => {
  var sPaginaURL = window.location.search.substring(1);
  var sPaginaURL = sPaginaURL.split("&");
  var obj = [];

  for (var i = 0; i < sPaginaURL.length; i++) {
    obj[i] = sPaginaURL[i].split("=");
  }
  sPaginaURL = [];
  sPaginaURL.nombre = obj[0][1];
  sPaginaURL.id = obj[1][1];
  return sPaginaURL;
};
var obj = obtenerDatosUrl();
const url = basepath + "/api/productos/" + obj.id;

fetch(url,
  {
    method: "GET"
  }).then((res) => {
    return res.json()
  }).then((data) => {
    data = data[0];
    console.log(data.Imagen)
    document.getElementById('innerImg').src = data.Imagen
    document.getElementById('innerImg').alt = data.Nombre
    document.getElementById('innerTitulo').innerHTML = data.Nombre
    document.getElementById('innerDesc').innerHTML = data.Descripcion
    document.getElementById('innerPrecio').innerHTML = '$' + data.Precio
    obj.precio = data.Precio;
  }).catch((err) => {
    console.log("Error en el servidor: " + err);
  });

var cambiarPrecio = () => {
  document.getElementById('innerPrecio').innerHTML = '$' + (obj.precio * document.getElementById('inQuantity').value)
}

var InsertarProductoCarrito = () => {
  const url = basepath + "/api/carrito/" + obj.id + "/" + document.getElementById('inQuantity').value + "/" + idUsuario;

  fetch(url,
    {
      method: "POST",
      body: JSON.stringify(obj),
      headers:
      {
        "Content-type": "application/json"
      }
    }).then((res) => {
      return res.json()
    }).then((data) => {
      alert(obj.nombre + " se ha añadido correctamente al carrito\n\nCantidad: " + document.getElementById('inQuantity').value);
      window.location.href = "../productos"
    }).catch((err) => {
      console.log("Error en el servidor: " + err);
    })
}