var idUsuario = false;
var paymentData = {
  Email: '',
  NombreUsuario: '',
  ApePaterno: '',
  Costo: '',
  IsFilled: false
};

if (!localStorage.getItem('pinogordo-stored-user')) {
  window.location.href = "../home"
} else {
  idUsuario = JSON.parse(localStorage.getItem('pinogordo-stored-user')).Id;
}

var DisableFormToPay = () => {
  console.log(paymentData.IsFilled)
  if (paymentData.IsFilled) {
    document.getElementById('formPay').style.display = 'block';
  } else {
    document.getElementById('formPay').style.display = 'none';
  }
}

var AddProductsToCart = () => {
  $("#tbMaster").empty();
  var productos = [];

  const url = basepath + `/api/carrito/${idUsuario}`;

  fetch(url,
    {
      method: "GET"
    }).then((res) => {
      return res.json()
    }).then((data) => {
      productos = data[0];
      try {
        paymentData.Email = productos[0].Email;
        paymentData.NombreUsuario = productos[0].NombreUsuario;
        paymentData.ApePaterno = productos[0].ApePaterno;
        paymentData.Costo = productos[0].Costo;
        paymentData.IsFilled = true;
      } catch {
        paymentData.IsFilled = false;
        DisableFormToPay();
        alert("No cuenta con elementos en el carrito")

      }

      console.log(paymentData);
      productos.forEach((element) => {
        var contenido =
          '<tr><td data-th="Product"><div class="row"><div class="col-sm-2 hidden-xs"><img src="'
          + element.Imagen + ' " alt="..." class="img-responsive" width="100"/></div><div class="col-sm-10"><h4 class="pl-sm-5">'
          + element.Nombre + '</h4><p class="pl-sm-5">'
          + element.Descripcion + '</p></div></div></td><td data-th="Price"> $ '
          + element.Precio + '</td><td data-th="Quantity"><input type="number" class="form-control text-center" value="'
          + element.Cantidad + '" disabled></td><td data-th="Subtotal" class="text-center">$ '
          + element.SubTotal + '</td><td class="actions" data-th=""><button class="btn btn-danger btn-sm" onclick="RemoveFromCart('
          + element.IdDetalle + ', '
          + element.IdUsuario + ')"><i class="fa fa-trash-o"></i></button></td></tr>';

        $("#tbMaster").append(contenido);
      });
    }).catch((err) => {
      console.log("Error en el servidor: " + err);
    });
}

var RemoveFromCart = (IdDetalle, IdUsuario) => {
  const url = basepath + `/api/carrito/${IdDetalle}/${IdUsuario}`;

  fetch(url,
    {
      method: "DELETE",
      headers:
      {
        "Content-type": "application/json"
      }
    }).then((res) => {
      return res.json()
    }).then((data) => {
      alert('Se ha eliminado correctamente');
      AddProductsToCart();
      ChangeTotalCost();
      DisableFormToPay();
    }).catch((err) => {
      console.log("Error en el servidor: " + err);
    })
}

var ChangeTotalCost = () => {
  const url = basepath + `/api/carrito/costo/${idUsuario}`;

  fetch(url,
    {
      method: "GET"
    }).then((res) => {
      return res.json()
    }).then((data) => {
      try {
        document.getElementById("lblTotal").innerHTML = `Total $ ${data[0].Costo}`
      }
      catch {
        document.getElementById("lblTotal").innerHTML = `Total $ 0`
      }
    }).catch((err) => {
      console.log("Error en el servidor: " + err);
    });
}


var HandlePaymentAction = () => {
  document.payForm.action = `/openpay?Costo=${paymentData.Costo}&NombreUsuario=${paymentData.NombreUsuario}&ApePaterno=${paymentData.ApePaterno}&Email=${paymentData.Email}`
}


AddProductsToCart();
ChangeTotalCost();
