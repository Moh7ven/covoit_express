$(document).ready(() => {
  const btnAnnuler = $(".btn-annule");
  const btnTerminer = $(".btn-terminer");
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

  const getTrajetEnCours = () => {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/api/v1/clients/get-trajet-en-cours-conducteur",
      contentType: "application/json",
      dataType: "json",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenCovoitExpress")}`,
      },
      success: function (data) {
        if (data.status === true) {
          console.log(data);
          if (
            data.data === null ||
            data.data === undefined ||
            data.data == []
          ) {
            let html = "Vous n'avez aucun trajet en cours";
            $(".container-cards").html(html);
          }
          let html = `<div class="card">
              <div class="card-content">
                <div>
                  <p><span>Date:</span> ${data.data.date}</p>
                  <p><span>Heure:</span> ${data.data.heure}</p>
                  <p><span>Prix:</span> ${data.data.cout} FCFA</p>
                </div>
                <div>
                  <p><span>Depart : </span>${data.data.lieuDepart}</p>
                  <p><span>Arrive : </span> ${data.data.lieuArrivee}</p>
                  <p><span>Places restantes : </span>${data.data.placeRestantes}</p>
                </div>
              </div>
              <p><button href="" onclick='getClientsReserve("${data.data._id}")'>Voir les clients</button></p>
              <div class="btn-container">
                <button class="btn-annule" onclick='annulerOption("${data.data._id}")'>Annuler</button>
                <button class="btn-terminer" onclick='terminerOption("${data.data._id}")'>Terminer</button>
              </div>
            </div>`;
          $(".container-cards").html(html);
        } else {
          console.log(data.message);
          showPopup(data.message);
        }
      },
      error: (error) => {
        console.log(error.responseJSON.message);
        showPopup(error.responseJSON.message);
      },
    });
  };
  getTrajetEnCours();

  window.annulerOption = function (id) {
    $.ajax({
      url: `http://localhost:3000/api/v1/clients/annuler-trajet-ajouter/${id}`,
      type: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenCovoitExpress")}`,
      },
      success: function (data) {
        console.log(data);
        showPopup(data.message);
        window.location.reload();
      },
      error: function (error) {
        console.log(error.responseJSON.message);
        showPopup(error.responseJSON.message);
      },
    });
  };

  window.terminerOption = function (id) {
    $.ajax({
      url: `http://localhost:3000/api/v1/clients/terminer-trajet/${id}`,
      type: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenCovoitExpress")}`,
      },
      success: function (data) {
        console.log(data);
        showPopup(data.message);
        window.location.reload();
      },
      error: function (error) {
        console.log(error.responseJSON.message);
        showPopup(error.responseJSON.message);
      },
    });
  };

  function showPopupClients(nom, prenom, numero) {
    const popup = `
        <div id="cd-pop-up" class="is-visible">
          <div id="popup-container" class="cd-popup-container">
            <div class="card-popup">
              <div class="card-content-popup">
                <div>
                  <p><span>Nom:</span> ${nom}</p>
                  <p><span>Prenom:</span> ${prenom}</p>
                  <p><span>Numéro:</span> ${numero} FCFA</p>
              </div>
              <a href="#0" class="cd-popup-close" onclick="hidePopup()">x</a>
            </div>
          </div>
        </div>
      `;
    $("body").append(popup);
  }

  window.getClientsReserve = (id) => {
    $.ajax({
      url: `http://localhost:3000/api/v1/clients/get-client-reserve-my-trajet/${id}`,
      type: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenCovoitExpress")}`,
      },
      success: function (data) {
        console.log(data);
        data.data.forEach((e) =>
          showPopupClients(e.idClient.nom, e.idClient.prenom, e.idClient.tel)
        );
      },
      error: function (error) {
        console.log(error.responseJSON.message);
        showPopup(error.responseJSON.message);
      },
    });
  };

  btnAnnuler.click((e) => {
    e.preventDefault();
    console.log("annuler");
  });

  btnTerminer.click((e) => {
    e.preventDefault();
    console.log("terminer");
  });
});
