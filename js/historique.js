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
                    <p><u>Trajet</u>: ${element.idTrajet.lieuDepart} - ${element.idTrajet.lieuArrivee}</p>
                    <p><u>Prix</u>: ${element.idTrajet.cout} Fcfa</p>
                    <p><u>Nombre de places restantes</u>: ${element.idTrajet.placeRestantes}</p>
                    <p><u>Date</u>: ${element.idTrajet.date}</p>
                    <p><u>Heure</u>: ${element.idTrajet.heure}</p>
                    <p><u>Conducteur</u>: ${element.idClient.nom} ${element.idClient.prenom}</p>
                    <p><u>Telephone</u>: ${element.idClient.tel}</p>
                    <p><u>Mot du conducteur </u>: ${element.note}</p>
                    <button class="btn-annuler" style="background-color: orangered; color: white" onclick='annulerOption("${element.idTrajet._id}")'>Annuler</button>
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
                      <p><u>Trajet</u>: ${element.lieuDepart} - ${element.lieuArrivee}</p>
                      <p><u>Prix</u>: ${element.cout} Fcfa</p>
                      <p><u>Nombre de places restantes</u>: ${element.placeRestantes}</p>
                      <p><u>Date</u>: ${element.date}</p>
                      <p><u>Heure</u>: ${element.heure}</p>
                      <p><u>Conducteur</u>: ${element.idClient.nom} ${element.idClient.prenom}</p>
                      <p><u>Telephone</u>: ${element.idClient.tel}</p>
                      <p><u>Mot du conducteur </u>: ${element.note}</p>
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
