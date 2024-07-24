$(document).ready(() => {
  const submitBtn = $("#btn-submit");

  const verifChamp = () => {
    const tel = $("#tel").val();
    const password = $("#password").val();
    const message = $("#message");
    message.css("color", "red");

    if (tel === "") {
      message.text("Veuillez renseigner votre numéro de téléphone");
      return false;
    } else if (tel.length !== 10) {
      message.text("Le numéro de téléphone doit être de 10 caractères");
      return false;
    }

    if (password === "") {
      message.text("Veuillez renseigner votre mot de passe");
      return false;
    } else if (password.length < 8 || password.length > 10) {
      message.text("Le mot de passe doit être entre 8 et 10 caractères");
      return false;
    }

    return true;
  };

  const login = () => {
    const tel = $("#tel").val();
    const password = $("#password").val();
    if (verifChamp() == true) {
      const person = {
        tel,
        password,
      };
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/api/v1/clients/login-client",
        data: person,

        success: function (data) {
          console.log(data);
          localStorage.setItem("tokenCovoitExpress", data.token);
          window.location.href = "./acceuil.html";
        },
        error: function (error) {
          $("#message").text(error.responseJSON.message);
          console.log(error.responseJSON.message);
        },
      });
    }
  };

  submitBtn.click((e) => {
    e.preventDefault();
    login();
    // window.location.href = "./acceuil.html";
  });
});
