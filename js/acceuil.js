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
                  <div class="card-content">
                        <div>
                          <p><span>Trajet:</span>  ${element.lieuDepart} - ${element.lieuArrivee}</p>
                          <p><span>Prix:</span> ${element.cout} Fcfa</p>
                          <p><span>Nombre de places restantes:</span>  ${element.placeRestantes}</p>
                          <p><span>Date:</span> ${element.date}</p>
                        </div>
                        <div>
                          <p><span>Heure : </span>${element.heure}</p>
                          <p><span>Conducteur: </span> ${element.idClient.nom} ${element.idClient.prenom}</p>
                          <p><span>Telephone: </span>${element.idClient.tel}</p>
                          <p><span>Mot du conducteur:</span> ${element.note}</p>
                        </div>
                        <div class="btn-container">
                          <button class="btn-terminer" onclick='reserver("${element._id}")'>Reserver</button>
                        </div>
                      </div>
                </div>
              `;

            $(".container-cards").html(html);
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
