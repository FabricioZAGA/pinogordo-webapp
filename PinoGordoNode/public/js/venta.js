var idUsuario = false;

if (!localStorage.getItem('pinogordo-stored-user')) {
  window.location.href = "../home"
} else {
  idUsuario = JSON.parse(localStorage.getItem('pinogordo-stored-user')).Id;
}


var RegistrarCompra = () => {
  const precio = document.getElementById('txtCantidad').value
  const referencia = document.getElementById('txtReferencia').value
  if (precio) {
    const payCode = CreatePayCode();
    const url = basepath + `/api/pagos/${precio}/${payCode}/${idUsuario}/${referencia}`

    fetch(url,
      {
        method: "POST",
        headers:
        {
          "Content-type": "application/json"
        }
      }).then((res) => {
        return res.json()
      }).then((data) => {
        alert(`El código de pago para la cantidad de $${precio} es: ${payCode}`);
        location.reload();
      }).catch((err) => {
        alert("Error al crear el pago");
      })


  } else {
    alert("Favor de insertar un valor")
  }

}

var SelectPendingPayments = () => {
  const url = basepath + `/api/pagos`

  fetch(url,
    {
      method: "GET"
    }).then((res) => {
      return res.json()
    }).then((data) => {
      $("#tbMaster").empty();
      var pagos = data;
      pagos.forEach((element) => {
        var contenido =
          '<tr><td data-th="Product"><h3 id="txtCodigo">'
          + element.CodigoRastreo + '</h3></td><td data-th="Reference"><h4>'
          + element.Referencia + '</h4></td><td data-th="Price"><h5>$ '
          + element.Costo + '</h5></td></tr >'

        // '<tr><td data-th="Product"><h4 class="" id="txtCodigo">'
        // + element.CodigoRastreo + '</h4></td><td data-th="Price"><h5>$ '
        // + element.Costo + '</h5></td></tr>'
        $("#tbMaster").append(contenido);
      });
    })
}


var CreatePayCode = () => {
  var result = 'pc-';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

SelectPendingPayments();