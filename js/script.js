$(document).ready(function () {
  const btnConnect = $(".signBtnCon");
  const btnRegister = $(".signBtn");
  const rejoinBtn = $("#rejoinBtn");

  btnConnect.click(() => {
    window.location.href = "./page/connexion.html";
  });

  btnRegister.click(() => {
    window.location.href = "./page/inscription.html";
  });

  rejoinBtn.click(() => {
    window.location.href = "./page/inscription.html";
  });
});
