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

  const search = $("#search");

  function searchSend() {
    const depart = $("#depart").val();
    const arrivee = $("#arrivee").val();
    const prix = $("#prix").val();
    const token = localStorage.getItem("tokenCovoitExpress");

    const data = {
      lieuDepart: depart,
      lieuArrivee: arrivee,
      cout: prix,
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/api/v1/clients/search-trajet",
      data: JSON.stringify(data),
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: function (data) {
        if (data.status === true) {
          let html = "";
          data.data.forEach((element) => {
            html += `
                <div class="card">
                  <p><u>Trajet</u>: ${element.lieuDepart} - ${element.lieuArrivee}</p>
                  <p><u>Prix</u>: ${element.cout} Fcfa</p>
                  <p><u>Nombre de places restantes</u>: ${element.placeRestantes}</p>
                  <p><u>Date</u>: ${element.date}</p>
                  <p><u>Heure</u>: ${element.heure}</p>
                  <p><u>Conducteur</u>: ${element.idClient.nom} ${element.idClient.prenom}</p>
                  <p><u>Telephone</u>: ${element.idClient.tel}</p>
                  <p><u>Mot du conducteur </u>: ${element.note}</p>
                  <button class="btn-reserver" onclick='reserver("${element._id}")'>Réserver</button>
                </div>
              `;

            $(".cards-container").html(html);
          });
        } else {
          console.log(data.message);
          showErrorPopup(data.message);
        }
      },
      error: function (error) {
        console.log(error.responseJSON.message);
        showErrorPopup(error.responseJSON.message);
      },
    });
  }

  window.reserver = function (id) {
    const donnee = {
      date: Date(),
      heure: Date(),
    };
    console.log(donnee);
    $.ajax({
      type: "POST",
      data: donnee,
      url: `http://localhost:3000/api/v1/clients/reserver-trajet/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenCovoitExpress")}`,
      },
      success: function (data) {
        console.log(data.message);
        showErrorPopup(data.message);
      },
      error: function (error) {
        console.log(error.responseJSON.message);
        showErrorPopup(error.responseJSON.message);
      },
    });
  };

  function showErrorPopup(message) {
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

  search.click((e) => {
    $(".cards-container").html("");
    e.preventDefault();
    searchSend();
  });
});
