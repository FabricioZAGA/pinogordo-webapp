var opcionSlect=1;
var catSelect = 0;

var ColocarProductos = () => {
  var productos = [];

  const url = basepath + `/api/productos/${opcionSlect}/${catSelect}`;

  fetch(url,
    {
      method: "GET"
    }).then((res) => {
      return res.json()
    }).then((data) => {
      productos = data;
      productos.forEach((element) => {
        var contenido =
          '<div class="col-12 col-md-3 my-3"><div class="productos-div-img"><img src="' +
          element.Imagen +
          '" width="100%"><div class="productos-div-contenido-img d-flex justify-content-center align-items-center"><div class="w-100 h-100  d-flex justify-content-center align-items-center productos-div-int"><div class="text-center produtos-div-text"><h1 class="font-Size-2">' +
          element.Nombre +
          '</h1><h2 class="font-Size-3">' +
          element.Descripcion +
          '</h2></div><div class="productos-div-ext" onclick="VerProducto(' +
          "'" + 
          element.Nombre + 
          "'" +
          "," +
          element.Id +
          ')"></div></div></div></div></div>';

        $("#productoCategoria" + element.IdCategorias).append(contenido);
      });
    }).catch((err) => {
      console.log("Error en el servidor: " + err);
    });
};

var InicializarProductos = () => {
  var categorias = [];
  const url = basepath + "/api/productos/categorias";

  fetch(url,
    {
      method: "GET"
    }).then((res) => {
      return res.json()
    }).then((data) => {
      categorias = data;
      console.log(categorias)
      $("#productoVariedad").empty();
      categorias.forEach((element) => {
        var contenido =
          /*'<div class="row font-Size-1 color-black font-bold color-white"><div class="col-12 text-center"><h1>' +
          element.Nombre +
          '</h1></div></div>'*/
          '<div class="row" id="productoCategoria' +
          element.Id +
          '"></div>';
        $("#productoVariedad").append(contenido);


      });
      ColocarProductos();
    }).catch((err) => {
      console.log("Error en el servidor: " + err);
    })



};

var ColocarCategorias = () => {
  var categorias = [];
  const url = basepath + "/api/productos/categorias";

  fetch(url,
    {
      method: "GET"
    }).then((res) => {
      return res.json()
    }).then((data) => {
      categorias = data;
      console.log(categorias)
      
      categorias.forEach((element) => {
        console.log('hola')
        var contenido='<input class="raddio-button-product" type="radio" name="Cat" id="cat'+
        element.Id+'" onclick="radioCatChecked('+
        element.Id+
        ')"><label  for="cat'+
        element.Id+
        '">' +
        element.Nombre +
        '</label></br>'
        $("#rowCategoriaRaddio").append(contenido);
      })
    }).catch((err) => {
      console.log("Error en el servidor: " + err);
    })



};

var VerProducto = (nombre, id) => {
  window.location.href = `../producto?nombre=${nombre}&id=${id}`;
};

var cmbChanged = () => {
  opcionSlect=document.getElementsByyId('cmbSelected').value//;
  InicializarProductos();
}

var radioCatChecked = (id) => {
  catSelect=id;
  InicializarProductos();
}

InicializarProductos();
ColocarCategorias();
