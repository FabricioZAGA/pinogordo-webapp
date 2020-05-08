if(localStorage.getItem('pinogordo-stored-user')){
    window.location.href = "../home"
}

var Login = () => {
  let obj = new Object();
  obj.Email = txtEmail.value.trim();
  obj.Password = txtPassword.value.trim();
  const url = basepath +"/api/usuarios/login";

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
          console.log(data);
          if (Number(data) != 0) {
              localStorage.setItem("pinogordo-stored-user", JSON.stringify(data[0]));
              if(data[0].Administrador==1){
                alert("¡Ha iniciado sesión el administrador!")
              window.location.href = "../admin"
              }
              else{
                alert("¡Ha iniciado sesión correctamente!")
              window.location.href = "../home"
              }
              
          }
          else {
              alert("Las credenciales de inicio de sesión no son válidas");
          }
      }).catch((err) => {
          console.log("Error en el servidor: " + err);
      })
}