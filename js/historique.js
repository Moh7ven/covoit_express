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

  const getTrajetReservers = () => {
    $.ajax({
      url: "http://localhost:3000/api/v1/clients/get-trajets-reserve",
      type: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenCovoitExpress")}`,
      },
      success: function (data) {
        console.log(data);
        if (data.status === true) {
          let html = "";
          data.data.forEach((element) => {
            html += `
                  <div class="card">
                    <div class="card-content">
                        <div>
                          <p><span>Trajet:</span>  ${element.idTrajet.lieuDepart} - ${element.idTrajet.lieuArrivee}</p>
                          <p><span>Prix:</span> ${element.idTrajet.cout} Fcfa</p>
                          <p><span>Nombre de places restantes:</span>  ${element.idTrajet.placeRestantes}</p>
                          <p><span>Date:</span> ${element.idTrajet.date}</p>
                        </div>
                        <div>
                          <p><span>Heure : </span>${element.idTrajet.heure}</p>
                          <p><span>Conducteur: </span> ${element.idTrajet.idClient.nom} ${element.idTrajet.idClient.prenom}</p>
                          <p><span>Telephone: </span>${element.idTrajet.idClient.tel}</p>
                          <p><span>Mot du conducteur:</span> ${element.idTrajet.note}</p>
                        </div>
                        <div class="btn-container">
                          <button class="btn-annule" onclick='annulerOption("${element.idTrajet._id}")'>Annuler</button>
                        </div>
                      </div>
                  </div>
                `;

            $("#trajer-en-cours").html(html);
          });
        } else {
          console.log(data.message);
          showErrorPopup(data.message);
        }
      },
      error: function (error) {
        console.log(error.responseJSON.message);
      },
    });
  };
  getTrajetReservers();

  window.annulerOption = function (id) {
    $.ajax({
      url: `http://localhost:3000/api/v1/clients/annuler-trajet-reserver/${id}`,
      type: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenCovoitExpress")}`,
      },
      success: function (data) {
        console.log(data);
        showErrorPopup(data.message);
        window.location.reload();
      },
      error: function (error) {
        console.log(error.responseJSON.message);
        showErrorPopup(error.responseJSON.message);
      },
    });
  };

  const getTrajetTerminer = () => {
    $.ajax({
      url: "http://localhost:3000/api/v1/trajets/termine",
      type: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenCovoitExpress")}`,
      },
      success: function (data) {
        console.log(data);
      },
      error: function (error) {
        console.log(error);
      },
    });
  };

  const getTrajetsAnnuler = () => {
    $.ajax({
      url: "http://localhost:3000/api/v1/clients/all-trajet-reserver-annuler",
      type: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenCovoitExpress")}`,
      },
      success: function (data) {
        console.log(data);
        if (data.status === true) {
          let html = "";
          data.data.forEach((element) => {
            html += `
                    <div class="card">
                    <div class="card-content">
                        <div>
                          <p><span>Trajet:</span>  ${element.idTrajet.lieuDepart} - ${element.idTrajet.lieuArrivee}</p>
                          <p><span>Prix:</span> ${element.idTrajet.cout} Fcfa</p>
                          <p><span>Nombre de places restantes:</span>  ${element.idTrajet.placeRestantes}</p>
                          <p><span>Date:</span> ${element.idTrajet.date}</p>
                        </div>
                        <div>
                          <p><span>Heure : </span>${element.idTrajet.heure}</p>
                          <p><span>Conducteur: </span> ${element.idTrajet.idClient.nom} ${element.idTrajet.idClient.prenom}</p>
                          <p><span>Telephone: </span>${element.idTrajet.idClient.tel}</p>
                          <p><span>Mot du conducteur:</span> ${element.idTrajet.note}</p>
                        </div>
                      </div>
                  </div>
                  `;

            $("#trajer-annules").html(html);
          });
        } else {
          console.log(data.message);
          let html = `<p>${data.message}</p>`;
          $("#trajer-annules").html(html);
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  };
  getTrajetsAnnuler();
});
