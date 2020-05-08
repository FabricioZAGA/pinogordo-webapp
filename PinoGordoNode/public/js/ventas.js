if (!localStorage.getItem('pinogordo-stored-user')) {
    window.location.href = "../home"
} else {
    idUsuario = JSON.parse(localStorage.getItem('pinogordo-stored-user')).Id;
}

var AddProductsToCart = () => {
    $("#tbMaster").empty();
    var productos = [];

    const url = basepath + `/api/ventas`;

    fetch(url, {
        method: "GET"
    }).then((res) => {
        return res.json()
    }).then((data) => {
        productos = data;
        productos.forEach((element) => {
            var contenido =
                '<tr><td data-th="Product"><div class="row"><div class="col-sm-2 hidden-xs"><img src="' +
                element.Imagen + ' " alt="..." class="img-responsive" width="100"/></div><div class="col-sm-10"><h4 class="pl-sm-5">' +
                element.Nombre + '</h4><p class="pl-sm-5">' +
                element.Descripcion + '</p></div></div></td><td data-th="Price"> $ ' +
                element.Precio + '</td><td data-th="Quantity"><input type="number" class="form-control text-center" value="' +
                element.Cantidad + '" disabled></td><td data-th="Subtotal" class="text-center">$ ' +
                element.SubTotal + '</td><td class="actions" data-th=""><button class="btn btn-success btn-sm" onclick="ChangeAsCompleted(1, ' +
                element.IdOrden + ', ' +
                element.IdUsuario + ')"><i class="fa fa-check"></i> Enviado</button></td></tr>';

            $("#tbMaster").append(contenido);
        });
    }).catch((err) => {
        console.log("Error en el servidor: " + err);
    });
}

var ChangeAsCompleted = (status, id) => {
    const url = basepath + `/api/ventas/${status}/${id}`;
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
        }).catch((err) => {
            console.log("Error en el servidor: " + err);
        })
}


AddProductsToCart();