
var express = require('express');
var router = express.Router();
const Openpay = require('openpay');

//Openpay configured as SandBox mode
var openpay = new Openpay('mn3xgywu5splhpvdct3l', 'sk_9e9210627d224f0ca1f34054f098bb88', false);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../public/home', { title: 'Express' });
});

router.post('/openpay', function (req, res, next) {
  var { Costo, NombreUsuario, ApePaterno, Email } = req.query;

  var chargeRequest = {
    'method': 'card',
    'amount': Costo,
    'description': 'Compra en pinogordo.com.mx',
    'customer': {
      'name': NombreUsuario,
      'last_name': ApePaterno,
      'phone_number': '',
      'email': Email
    },
    'send_email': false,
    'confirm': false,
    'redirect_url': "http://localhost:5000/success",
  }
  openpay.charges.create(chargeRequest, function (error, charge) {
    if(error) {
      res.redirect("http://localhost:5000/");
    } else {
      res.redirect(charge.payment_method.url);
    }
    
  });
});

module.exports = router;
