$(document).ready(() => {
  const verifyToken = () => {
    const token = localStorage.getItem("tokenCovoitExpress");
    if (!token) {
      return (window.location.href = "../connexion.html");
    }
  };
  verifyToken();

  const deco = $("#deco");
  deco.click((e) => {
    e.preventDefault();
    localStorage.removeItem("tokenCovoitExpress");
    window.location.href = "../connexion.html";
  });
  function showPopup(message) {
    const popup = `
        <div id="cd-pop-up" class="is-visible">
          <div id="popup-container" class="cd-popup-container">
            <p>${message}</p>
            <a href="#0" class="cd-popup-close" onclick="hidePopup()">x</a>
          </div>
        </div>
      `;
    $("body").append(popup);
  }

  window.hidePopup = function () {
    $("#cd-pop-up").remove();
    console.log("Popup fermé");
  };

  function showPopupSuccess(message) {
    const popup = `
        <div id="cd-pop-up" class="is-visible">
          <div id="popup-container" class="cd-popup-container">
            <p>${message}</p>
            <a href="#0" class="cd-popup-close" onclick="hidePopupSuccess()">x</a>
          </div>
        </div>
      `;
    $("body").append(popup);
  }

  window.hidePopupSuccess = function () {
    $("#cd-pop-up").remove();
    console.log("Popup fermé");
    window.location.reload();
  };

  const getClientInfos = () => {
    const token = localStorage.getItem("tokenCovoitExpress");
    $.ajax({
      url: "http://localhost:3000/api/v1/clients/get-client-connected",
      type: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: function (data) {
        console.log(data);
        $("#nom").val(data.data.nom);
        $("#prenom").val(data.data.prenom);
        $("#tel").val(data.data.tel);
        $("#email").val(data.data.email);
        console.log("Données recupérées");
      },
      error: function (error) {
        console.log(error);
        showPopup(error.responseJSON.message);
      },
    });
  };
  getClientInfos();

  const verifyChamp = () => {
    const nom = $("#nom").val();
    const prenom = $("#prenom").val();
    const tel = $("#tel").val();
    const email = $("#email").val();
    const message = $("#message");

    message.css("color", "red");

    if (nom == "" || prenom == "" || tel == "" || email == "") {
      message.text("Veuillez renseigner tous les champs");
      return false;
    } else {
      return true;
    }
  };

  const updatePerson = () => {
    const nom = $("#nom").val();
    const prenom = $("#prenom").val();
    const tel = $("#tel").val();
    const email = $("#email").val();
    const token = localStorage.getItem("tokenCovoitExpress");

    const data = {
      nom,
      prenom,
      tel,
      email,
    };
    if (verifyChamp()) {
      $.ajax({
        url: "http://localhost:3000/api/v1/clients/update-client",
        type: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
        success: function (data) {
          console.log(data.message);
          showPopupSuccess(data.message);
        },
        error: function (error) {
          console.log(error.responseJSON.message);
          showPopup(error.responseJSON.message);
        },
      });
    }
  };
  $("#save").click((e) => {
    e.preventDefault();
    updatePerson();
  });
  console.log("profil");
});
