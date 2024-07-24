$(document).ready(function () {
  const btnConnect = $(".signBtnCon");
  const btnRegister = $(".signBtn");

  btnConnect.click(() => {
    window.location.href = "./page/connexion.html";
  });

  btnRegister.click(() => {
    window.location.href = "./page/inscription.html";
  });
});
