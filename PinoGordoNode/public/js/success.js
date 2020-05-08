


GetQueryData = () => {
  var sPaginaURL = window.location.search.substring(1);
  var sPaginaURL = sPaginaURL.split("&");
  var obj = [];


  for (var i = 0; i < sPaginaURL.length; i++) {
    obj[i] = sPaginaURL[i].split("=");
  }
  sPaginaURL = [];
  sPaginaURL.id = obj[0][1];
  return sPaginaURL;
};
var referenciaPago = GetQueryData().id;
var idUsuario = JSON.parse(localStorage.getItem('pinogordo-stored-user')).Id;
document.getElementById('spCodigoPedido').innerHTML = referenciaPago;



var ChangeOrderAsPayed = () => {
  const url = basepath + `/api/carrito/actualizar/${idUsuario}/${referenciaPago}`;
  console.log(url)
  fetch(url,
    {
      method: "PUT"
    }).then((res) => {
      return res.json()
    }).then((data) => {
      alert('¡Gracias por su compra!');
    }).catch((err) => {
      console.log("Error en el servidor: " + err);
    })
}
ChangeOrderAsPayed();