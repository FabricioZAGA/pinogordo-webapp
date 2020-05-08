const { Administrador } = JSON.parse(localStorage.getItem('pinogordo-stored-user'));

if (Administrador != 1) {
  window.location.href = "../home"
}
if (!localStorage.getItem('pinogordo-stored-user')) {
  window.location.href = "../home"
}

var registrarUsuario = () => {
  window.location.href = '../registro'
}

var verVentas = () => {
  window.location.href = '../ventas'
}
