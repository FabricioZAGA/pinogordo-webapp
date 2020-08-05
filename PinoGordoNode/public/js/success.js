GetQueryData = () => {
  var sPaginaURL = window.location.search.substring(1);
  var sPaginaURL = sPaginaURL.split("&");
  var obj = [];


  for (var i = 0; i < sPaginaURL.length; i++) {
    obj[i] = sPaginaURL[i].split("=");
  }
  sPaginaURL = [];
  sPaginaURL.idOrden = obj[0][1];
  sPaginaURL.id = obj[1][1];
  return sPaginaURL;
}
if (!localStorage.getItem('pinogordo-payment-reference')) {
  var idOrden = GetQueryData().idOrden;
  var referenciaPago = GetQueryData().id;
}

var ChangeOrderAsPayed = () => {
  const url = basepath + `/api/carrito/actualizar/${idOrden}/${referenciaPago}`;
  console.log(url)
  fetch(url,
    {
      method: "PUT"
    }).then((res) => {
      return res.json()
    }).then((data) => {
      localStorage.setItem('pinogordo-payment-reference', JSON.stringify(referenciaPago));
      window.location.href = '../success'

    }).catch((err) => {
      console.log("Error en el servidor: " + err);
    })
}

if (idOrden) {

  var idUsuario = JSON.parse(localStorage.getItem('pinogordo-stored-user')).Id;
  document.getElementById('spCodigoPedido').innerHTML = referenciaPago;
  ChangeOrderAsPayed();
} else {

  document.getElementById('spCodigoPedido').innerHTML = JSON.parse(localStorage.getItem('pinogordo-payment-reference'));
  localStorage.removeItem('pinogordo-payment-reference')
  alert('¡Gracias por su compra!');
}

