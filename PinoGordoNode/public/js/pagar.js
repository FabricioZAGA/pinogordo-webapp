var montoTemp = false;
var idOrden = false;
var Verify = () => {
  const payCode = document.getElementById('txtCodigo').value;
  if (payCode) {
    const url = basepath + `/api/pagos/${payCode}`

    fetch(url,
      {
        method: "GET"
      }).then((res) => {
        return res.json()
      }).then((data) => {
        if (data.length != 0) {
          document.getElementById('btnVerificar').style.visibility = 'hidden'
          document.getElementById('txtReferencia').style.visibility = 'visible'
          document.getElementById('txtMonto').style.visibility = 'visible'
          document.getElementById('btnCheckOut').style.visibility = 'visible'

          document.getElementById('txtReferencia').innerHTML = data[0].Referencia;
          montoTemp = data[0].Costo;
          idOrden = data[0].Id;
          document.getElementById('txtMonto').innerHTML = data[0].Costo;
        }
        else {
          alert('Código incorrecto')
        }
      }).catch((error) => {
        alert('Error inesperado')
      });
  } else {
    alert('Favor de ingresar un código de pago')
  }
}

var CheckOut = () => {
  window.location.href = './checkout'
  var obj = {
    monto: montoTemp,
    orden: idOrden
  }
  localStorage.setItem('checkout-temp-payment-ammount', JSON.stringify(obj))
  montoTemp = false;
}