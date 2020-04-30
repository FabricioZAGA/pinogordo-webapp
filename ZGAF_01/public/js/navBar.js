var hamburguer = false;

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

var onclickApp=()=>{
  if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)){
  //window.location.href='fb://www.facebook.com/eric.patino.313'
 }else{
  window.location.href='http://www.facebook.com/eric.patino.313'
 }
}

console.log(window.navigator.userAgent);