var express = require("express");
var router = express.Router();
var mysql = require('mysql');

router.get('/', function (req, res, next) {
  res.send('pinogordo api');
});

//variable de conexión para la base de datos
var connectionMySQL = mysql.createConnection({
  host: "db-pinogordo.cyhnjqcokye6.us-east-2.rds.amazonaws.com", //IP DEL SERVIDOR MYSQL
  user: "root",
  password: "nintendo123",
  database: "pinogordo"
});

connectionMySQL.connect(function (error) {
  if (error) {
    console.log("CONEXION NO ESTABLECIDA: " + error);
  } else {
    console.log("CONEXION ESTABLECIDA CON MYSQL");
  }
});

router.get('/usuarios', (req, res, next) => {

  var query = "CALL sp_SelectAllUsers()";

  connectionMySQL.query(query, true, (error, results, fields) => {
    if (error) {
      console.log("ERROR EN CONSULTA: " + error);
      res.send("ERROR EN CONSULTA: " + error);
    } else {
      console.log(results);
      res.send(results[0]);
    }
  });
});

router.post('/usuarios/login', (req, res, next) => {

  var query = "CALL sp_SelectUserByEmailAndPassword(?,?)";

  const data = [req.body.Email, req.body.Password]

  connectionMySQL.query(query, data, (error, results, fields) => {
    if (error) {
      console.log("ERROR EN CONSULTA: " + error);
      res.send("ERROR EN CONSULTA: " + error);
    } else {
      console.log(results);
      res.send(results[0]);
    }
  });
});

router.post('/usuarios/registro', (req, res, next) => {

  var query = "CALL sp_InsertNewUser(?,?,?,?,?,?,?)";

  const data = [
    req.body.NombreEmpresa,
    req.body.RFC,
    req.body.Nombre,
    req.body.ApePaterno,
    req.body.ApeMaterno,
    req.body.Password,
    req.body.Email
  ]
  console.log(data)
  connectionMySQL.query(query, data, (error, results, fields) => {
    if (error) {
      console.log("ERROR EN CONSULTA: " + error);
      res.send("ERROR EN CONSULTA: " + error);
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

router.get('/productos/categorias', (req, res, next) => {

  var query = "CALL sp_SelectAllCategories()";

  connectionMySQL.query(query, true, (error, results, fields) => {
    if (error) {
      console.log("ERROR EN CONSULTA: " + error);
      res.send("ERROR EN CONSULTA: " + error);
    } else {
      console.log(results);
      res.send(results[0]);
    }
  });
});

router.get('/productos/:opcion/:cat', (req, res, next) => {

  var { opcion, cat } = req.params;

  var query = "CALL sp_SelectByFilter(?,?)";
  var data = [
    opcion,
    cat
  ]
  connectionMySQL.query(query, data, (error, results, fields) => {
    if (error) {
      console.log("ERROR EN CONSULTA: " + error);
      res.send("ERROR EN CONSULTA: " + error);
    } else {
      console.log(results);
      res.send(results[0]);
    }
  });
});

router.get('/productos/:id', (req, res, next) => {
  var { id } = req.params;

  var query = "CALL sp_SelectProductById(?)";
  var data = [
    id
  ]

  connectionMySQL.query(query, data, (error, results, fields) => {
    if (error) {
      console.log("ERROR EN CONSULTA: " + error);
      res.send("ERROR EN CONSULTA: " + error);
    } else {
      console.log(results);
      res.send(results[0]);
    }
  });
});

router.post('/carrito/:id/:cantidad/:idUsuario', (req, res, next) => {
  var { id, cantidad, idUsuario } = req.params;

  var query = "CALL sp_InsertProductToCart(?,?,?)";
  var data = [
    id,
    cantidad,
    idUsuario
  ]
  console.log(data)
  connectionMySQL.query(query, data, (error, results, fields) => {
    if (error) {
      console.log("ERROR EN CONSULTA: " + error);
      res.send("ERROR EN CONSULTA: " + error);
    } else {
      res.send(results);
    }
  });
});

router.get('/carrito/:idUsuario', (req, res, next) => {
  var { idUsuario } = req.params;

  var query = "CALL sp_SelectUserCart(?)";
  var data = [
    idUsuario
  ]
  console.log(data)
  connectionMySQL.query(query, data, (error, results, fields) => {
    if (error) {
      console.log("ERROR EN CONSULTA: " + error);
      res.send("ERROR EN CONSULTA: " + error);
    } else {
      res.send(results);
    }
  });
});

router.delete('/carrito/:idDetalle/:idUsuario', (req, res, next) => {
  var { idDetalle, idUsuario } = req.params;

  var query = "CALL sp_DeleteProductFromCart(?,?)";
  var data = [
    idDetalle,
    idUsuario
  ]
  console.log(data)
  connectionMySQL.query(query, data, (error, results, fields) => {
    if (error) {
      console.log("ERROR EN CONSULTA: " + error);
      res.send("ERROR EN CONSULTA: " + error);
    } else {
      res.send(results);
    }
  });
});

router.get('/carrito/costo/:idUsuario', (req, res, next) => {
  var { idUsuario } = req.params;

  var query = "CALL sp_SelectTotalPriceFromCart(?)";
  var data = [
    idUsuario
  ]
  console.log(data)
  connectionMySQL.query(query, data, (error, results, fields) => {
    if (error) {
      console.log("ERROR EN CONSULTA: " + error);
      res.send("ERROR EN CONSULTA: " + error);
    } else {
      res.send(results[0]);
    }
  });
});

router.put('/carrito/actualizar/:idUsuario/:referenciaPago', (req, res, next) => {
  var { idUsuario, referenciaPago } = req.params;

  var query = "CALL sp_UpdateCartToBuyed(?,?)";
  var data = [
    idUsuario,
    referenciaPago
  ]
  console.log(data)
  connectionMySQL.query(query, data, (error, results, fields) => {
    if (error) {
      console.log("ERROR EN CONSULTA: " + error);
      res.send("ERROR EN CONSULTA: " + error);
    } else {
      res.send(results);
    }
  });
});

router.get('/ventas', (req, res, next) => {

  var query = "CALL sp_SelectPendingProducts()";

  connectionMySQL.query(query, true, (error, results, fields) => {
    if (error) {
      console.log("ERROR EN CONSULTA: " + error);
      res.send("ERROR EN CONSULTA: " + error);
    } else {
      res.send(results[0]);
    }
  });
});

router.post('/ventas/:status/:id', (req, res, next) => {
  var { status, id } = req.params;
  var query = "CALL sp_UpdateOrderStatus(?,?)";

  var data = [status, id]
  connectionMySQL.query(query, data, (error, results, fields) => {
    if (error) {
      console.log("ERROR EN CONSULTA: " + error);
      res.send("ERROR EN CONSULTA: " + error);
    } else {
      res.send(results[0]);
    }
  });
});


//sp_SelectTotalPriceFromCart
module.exports = router;
