if (!localStorage.getItem('pinogordo-stored-user')) {
  window.location.href = "../home"
}


var Registrar = () => {
  let obj = new Object();

  obj.NombreEmpresa = txtEmpresa.value;
  obj.RFC = txtRFC.value;
  obj.Nombre = txtNombre.value;
  obj.ApePaterno = txtApePaterno.value;
  obj.ApeMaterno = txtApeMaterno.value;
  obj.Password = txtPassword.value;
  obj.Email = txtEmail.value;

  console.log(obj)
  const url = basepath + "/api/usuarios/registro"
  if (txtNombre.value == "" || txtApePaterno.value == "" || txtApeMaterno.value == "" || txtEmpresa.value == "" || txtRFC.value == "" || txtEmail.value == "" || txtPassword.value == "") {
    alert("Ingrese todos los datos necesarios")
  } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(txtEmail.value))) {
    alert("Ingrese un email válido")
  } else if (txtPassword.value.length < 8) {
    alert("La contraseña tiene que ser de 8 o más caracteres")
  }
  else {
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
        alert("¡El usuario con el correo " + txtEmail.value + " ha sido registrado correctamente!")

      }).catch((err) => {
        alert("Error, ese correo ya ha sido registrado");
      })
    //location.reload();
  }
}