var txtNombre = document.getElementById('txtNombre');
var txtApePaterno = document.getElementById('txtApePaterno');
var txtEmail = document.getElementById('txtEmail');

var paymentData = new Object();
var user;
var monto;
var idOrden;
if (!localStorage.getItem('checkout-temp-payment-ammount')) {
  window.location.href = './pagar'
} else {
  console.log(JSON.parse(localStorage.getItem('checkout-temp-payment-ammount')));
  monto = JSON.parse(localStorage.getItem('checkout-temp-payment-ammount')).monto;
  idOrden = JSON.parse(localStorage.getItem('checkout-temp-payment-ammount')).orden;
  console.log(JSON.parse(localStorage.getItem('checkout-temp-payment-ammount')))
  document.getElementById('spnMonto').innerHTML = `$ ${monto}`
  paymentData.Costo = monto;
}

if (localStorage.getItem('pinogordo-stored-user')) {
  user = JSON.parse(localStorage.getItem('pinogordo-stored-user'));
  console.log(user)
  txtNombre.value = user.Nombre;
  txtApePaterno.value = user.ApePaterno;
  txtEmail.value = user.Email;
  txtNombre.disabled = true;
  txtApePaterno.disabled = true;
  txtEmail.disabled = true;
}

var GoToCheckOut = () => {
  if (txtInformacion.value == "" ||
    txtCiudad.value == "" ||
    txtEstado.value == "" ||
    txtCodigoPostal.value == "" ||
    txtNombre.value == "" ||
    txtApePaterno.value == "" ||
    txtEmail.value == "" ||
    txtTelefono.value == "") {
    alert("Favor de completar todos campos obligatorios /n Pendejo de mierda");
    return;
  }

  var url;

  var obj = {
    informacion: txtInformacion.value,
    informacionOpcional: txtInformacionOpcional.value,
    Ciudad: txtCiudad.value,
    Estado: txtEstado.value,
    CodigoPostal: txtCodigoPostal.value,
    Nombre: txtNombre.value,
    ApePaterno: txtApePaterno.value,
    Password: CreateRandomPassword(),
    Email: txtEmail.value,
    Telefono: txtTelefono.value
  }
  if (localStorage.getItem('pinogordo-stored-user')) {
    url = `${basepath}/api/usuarios/existente/direccion`
    obj.IdUsuario = user.Id;
  }
  else {
    url = `${basepath}/api/usuarios/nuevo/direccion`
  }
  fetch(url,
    {
      method: "POST",
      body: JSON.stringify(obj),
      headers:
      {
        "Content-type": "application/json"
      }
    }).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data[0][0]);
      localStorage.setItem('pinogordo-stored-user', JSON.stringify(data[0][0]));

      const user = JSON.parse(localStorage.getItem('pinogordo-stored-user'))
      console.log(user)
      paymentData.NombreUsuario = user.Nombre;
      paymentData.ApePaterno = user.ApePaterno;
      paymentData.Email = user.Email;
      paymentData.Telefono = user.Telefono;
      alert("¡Va a ser redirigido al checkout!")
      document.getElementById('spnDireccion').innerHTML = `${txtInformacion.value}`
      document.getElementById('spnTelefono').innerHTML = `${txtTelefono.value}`
      document.getElementById('divCheckOut').classList.add('desaparecer')
      document.getElementById('divPagos').classList.remove('desaparecer')
    }).catch((err) => {
      alert("Error Inesperado");
    })
}


//QUITATE ALV FUNCION DE MIERDA ESTORBOSA
var CreateRandomPassword = () => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


var HandlePaymentAction = () => {
  document.payForm.action = `/openpay?Costo=${paymentData.Costo}&NombreUsuario=${paymentData.NombreUsuario}&ApePaterno=${paymentData.ApePaterno}&Email=${paymentData.Email}&Telefono=${paymentData.Telefono}&IdOrden=${idOrden}`
}