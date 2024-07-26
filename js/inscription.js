$(document).ready(() => {
  const submitBtn = $("#submit");
  const verifChamp = () => {
    const nom = $("#nom").val();
    const prenom = $("#prenom").val();
    const email = $("#email").val();
    const tel = $("#tel").val();
    const password = $("#password").val();
    const confirmPassword = $("#confirm-password").val();

    const message = $("#message");
    message.css("color", "red");
    if (nom === "") {
      message.text("Veuillez renseigner votre nom");
      return false;
    }
    if (prenom === "") {
      message.text("Veuillez renseigner votre prenom");
      return false;
    }
    if (email === "") {
      message.text("Veuillez renseigner votre email");
      return false;
    } else if (email.includes("@") == false || email.includes(".") == false) {
      message.text("Veuillez renseigner un email valide");
      return false;
    }

    if (tel === "") {
      message.text("Veuillez renseigner votre numéro de téléphone");
      return false;
    } else if (tel.length !== 10) {
      message.text("Le numéro de téléphone doit contenir 10 chiffres");
      return false;
    }

    if (password === "") {
      message.text("Veuillez renseigner votre mot de passe");
      return false;
    }

    if (password.length < 8 || password.length > 10) {
      message.text("Le mot de passe doit contenir entre 8 et 10 caractères");
      return false;
    }

    if (confirmPassword === "") {
      message.text("Veuillez confirmer votre mot de passe");
      return false;
    }

    if (password !== confirmPassword) {
      message.text("Les mots de passe ne sont pas identiques");
      return false;
    }
    return true;
  };

  const registerPerson = () => {
    //console.log("ok");
    const nom = $("#nom").val();
    const prenom = $("#prenom").val();
    const email = $("#email").val();
    const tel = $("#tel").val();
    const password = $("#password").val();
    const confirmPassword = $("#confirm-password").val();

    if (verifChamp() == true) {
      const person = {
        nom,
        prenom,
        email,
        tel,
        password,
        confirmPassword,
      };
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/api/v1/clients/add-client",
        data: person,
        success: function (data) {
          console.log(data);
          window.location.href = "./connexion.html";
        },
        error: function (error) {
          $("#message").text(error.responseJSON.message);
        },
      });
    } else {
      return console.log("incorrecte");
    }
  };

  submitBtn.click((e) => {
    e.preventDefault();
    registerPerson();
    // window.location.href = "./acceuil.html";
  });
});
