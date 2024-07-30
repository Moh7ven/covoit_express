$(document).ready(() => {
  const verifToken = () => {
    const token = localStorage.getItem("tokenCovoitExpress");
    if (token == null) {
      window.location.href = "../connexion.html";
    }
  };
  verifToken();

  const deco = $("#deco");
  deco.click((e) => {
    e.preventDefault();
    localStorage.removeItem("tokenCovoitExpress");
    window.location.href = "../connexion.html";
  });

  const getTrajetEffectues = () => {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/api/v1/clients/get-trajtes-terminer-by-conducteur",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenCovoitExpress")}`,
      },
      success: function (data) {
        if (data.status === true) {
          let html = "";
          console.log(data.data);
          data.data.forEach((e) => {
            html += `<div class="card">
              <div class="card-content">
                <div>
                  <p><span>Date:</span> ${e.date}</p>
                  <p><span>Heure:</span> ${e.heure}</p>
                  <p><span>Prix:</span> ${e.cout} FCFA</p>
                </div>
                <div>
                  <p><span>Depart : </span>${e.lieuDepart}</p>
                  <p><span>Arrive : </span> ${e.lieuArrivee}</p>
                  <p><span>Places restantes : </span>${e.placeRestantes}</p>
                </div>
              </div>
              <p><a href="">Voir les clients</a></p>
            </div>`;

            $(".container-cards").html(html);
          });
        }
      },
      error: function (data) {
        console.log(data.responseJSON.message);
        showPopup(data.responseJSON.message);
      },
    });
  };
  getTrajetEffectues();

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
});
