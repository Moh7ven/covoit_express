$(document).ready(() => {
  const verifyToken = () => {
    const token = localStorage.getItem("tokenCovoitExpress");
    if (!token) {
      return (window.location.href = "./connexion.html");
    }
  };
  verifyToken();

  const deco = $("#deco");
  deco.click((e) => {
    e.preventDefault();
    localStorage.removeItem("tokenCovoitExpress");
    window.location.href = "./connexion.html";
  });

  const verifChamp = () => {
    const permis = $("#permis").val();
    const vehicule = $("#vehicule").val();
    const colorVehicule = $("#colorVehicule").val();
    const immatriculation = $("#immatriculation").val();
    const nombrePlace = $("#nombrePlace").val();

    const message = $("#message");

    message.css("color", "red");
    if (permis === "") {
      message.text("Veuillez renseigner votre numéro de permis");
      return false;
    }

    if (vehicule === "") {
      message.text("Veuillez renseigner la marque de votre véhicule");
      return false;
    }

    if (colorVehicule === "") {
      message.text("Veuillez renseigner la couleur de votre véhicule");
      return false;
    }

    if (immatriculation === "") {
      message.text("Veuillez renseigner l'immatriculation de votre véhicule");
      return false;
    }

    if (nombrePlace === "") {
      message.text("Veuillez renseigner le nombre de place de votre véhicule");
      return false;
    }
    return true;
  };

  const save = () => {
    if (verifChamp() == true) {
      const permis = $("#permis").val();
      const vehicule = $("#vehicule").val();
      const colorVehicule = $("#colorVehicule").val();
      const immatriculation = $("#immatriculation").val();
      const nombrePlace = $("#nombrePlace").val();

      const data = {
        permis,
        vehicule,
        colorVehicule,
        immatriculation,
        nombrePlace,
      };

      console.log(data);
      $.ajax({
        url: "http://localhost:3000/api/v1/clients/save-as-conducteur",
        type: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenCovoitExpress")}`,
        },
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
          console.log(data.message);
          showPopup(data.message);
        },
        error: function (error) {
          console.log(error.responseJSON.message);
          showPopup(error.responseJSON.message);
        },
      });
    }
  };

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

  $("#save").click((e) => {
    e.preventDefault();
    save();
  });
});
