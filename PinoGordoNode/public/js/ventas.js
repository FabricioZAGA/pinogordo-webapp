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
                '<tr> <td data-th="Contact"><div class="row" onclick="ReviewOrder( ' + "'" + (element.NombreUsuario + ' ' + element.ApePaterno) + "'" + ',' + element.IdOrden + ', ' + "'" + element.Direccion + "'" + ')" style="cursor: pointer;"><div class="col-sm-10"><h4 class="pl-sm-5">'
                + element.Email + '</h4><p class="pl-sm-5">'
                + `${element.NombreUsuario} ${element.ApePaterno}` + '</p></div></div></td><td onclick="ReviewOrder( ' + "'" + (element.NombreUsuario + ' ' + element.ApePaterno) + "'" + ',' + element.IdOrden + ', ' + "'" + element.Direccion + "'" + ')" style="cursor: pointer;" data-th="Phone">'
                + element.Telefono + '</td><td data-th="Ammount" class="text-center" onclick="ReviewOrder( ' + "'" + (element.NombreUsuario + ' ' + element.ApePaterno) + "'" + ',' + element.IdOrden + ', ' + "'" + element.Direccion + "'" + ')" style="cursor: pointer;">$ '
                + element.Costo + '</td><td class="actions" data-th=""><button class="btn btn-success btn-sm" onclick="ChangeAsCompleted(1,'
                + element.IdOrden + ')">Enviado <i class="fa fa-check"></i></button></td></tr>'
            $("#tbMaster").append(contenido);
        });
    }).catch((err) => {
        console.log("Error en el servidor: " + err);
    });
}
//Esto lo escribió ddaniel
var ReviewOrder = (nombre, idOrden, direccion) => {
    sitio = "ventas";
    console.log(idOrden);
    localStorage.setItem('pinogordo-order-detail', JSON.stringify({ Nombre: nombre, Id: idOrden, Direccion: direccion, Sitio: sitio }));
    window.location.href = '../detalle-orden';
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
            location.reload();
        }).catch((err) => {
            console.log("Error en el servidor: " + err);
        })
}


AddProductsToCart();