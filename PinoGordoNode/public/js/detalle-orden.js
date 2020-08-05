if (!localStorage.getItem('pinogordo-order-detail')) {
  window.location.href = "../admin"
} else {
  console.log(JSON.parse(localStorage.getItem('pinogordo-order-detail')))
  var { Nombre, Id, Direccion, Sitio } = JSON.parse(localStorage.getItem('pinogordo-order-detail'));
  console.log(Nombre, Id, Direccion);
  document.getElementById('spnOrden').innerHTML = 'Orden de: ' + Nombre + ' - ID: ' + Id;
  document.getElementById('spnDireccion').innerHTML = Direccion;
}


var AddProductsToCart = () => {
  $("#tbMaster").empty();
  const url = basepath + `/api/ventas/${Id}`;

  fetch(url,
    {
      method: "GET"
    }).then((res) => {
      return res.json()
    }).then((data) => {


      data.forEach((element) => {
        var contenido =
          '<tr><td data-th="Product"><div class="row"><div class="col-sm-2 hidden-xs"><img src="'
          + element.Imagen + ' " alt="..." class="img-responsive" width="100"/></div><div class="col-sm-10"><h4 class="pl-sm-5">'
          + element.Nombre + '</h4><p class="pl-sm-5">'
          + element.Descripcion + '</p></div></div></td><td data-th="Price"> $ '
          + element.Precio + '</td><td data-th="Quantity"><input type="number" class="form-control text-center" value="'
          + element.Cantidad + '" disabled></td><td data-th="Subtotal" class="text-center">$ '
          + element.SubTotal + '</td><td class="actions" data-th=""></td></tr>';
        $("#tbMaster").append(contenido);
      });
    }).catch((err) => {
      console.log("Error en el servidor: " + err);
    });
}


var ChangeTotalCost = () => {
  const url = basepath + `/api/ventas/costo/${Id}`;

  fetch(url,
    {
      method: "GET"
    }).then((res) => {
      return res.json()
    }).then((data) => {
      try {
        document.getElementById("lblTotal").innerHTML = `Total $ ${data[0].Costo}`
        montoTemp = data[0].Costo;
      }
      catch {
        document.getElementById("lblTotal").innerHTML = `Total $ 0`
      }
    }).catch((err) => {
      console.log("Error en el servidor: " + err);
    });
}

var ChangeAsCompleted = () => {
  const url = basepath + `/api/ventas/1/${Id}`;
  console.log(url)
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
      alert('Se ha cambiado el status correctamente');
      localStorage.removeItem('pinogordo-order-detail')
      window.location.href = '../ventas'
    }).catch((err) => {
      console.log("Error en el servidor: " + err);
    })
}

var Volver = () => {
  localStorage.removeItem('pinogordo-order-detail');
  window.location.href = '../' + Sitio;
}


AddProductsToCart();
ChangeTotalCost();