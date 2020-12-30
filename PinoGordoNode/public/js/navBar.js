var hamburguer = false;
const basepath = "http://www.pinogordo.com.mx";
/*-------------------------------Functions--------------------------------*/
var showHamburger = () => {
  if (hamburguer == false) {
    document
      .getElementById("navBar-List")
      .classList.remove("navBar-Lista-ocultar");
    hamburguer = true;
  } else {
    document
      .getElementById("navBar-List")
      .classList.add("navBar-Lista-ocultar");
    hamburguer = false;
  }
};
var showCar = () => {
  window.location.href = '../carrito'
}

if (localStorage.getItem('pinogordo-stored-user')) {
  document.getElementById('lblSession').innerHTML = "Salir";
}

var CheckForLoggedUser = () => {
  if (localStorage.getItem('pinogordo-stored-user')) {
    localStorage.removeItem('pinogordo-stored-user');
  }
  else {
    window.location.href = '../login'
  }

}
