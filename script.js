
window.onload = function () {
   
    construireAccueil();
    construireInscription();
    construireLogin();
    construireDashboard();
    construireStock();
    construireCommande();

  
    showPage("loginPage");
};



function showPage(pageId) {
    var pages = document.querySelectorAll("section");
    pages.forEach(function (page) {
        page.classList.add("hidden");
    });
    var cible = document.getElementById(pageId);
    if (cible) cible.classList.remove("hidden");
}



function showError(id, message) {
    var el = document.getElementById(id);
    if (el) {
        el.textContent = message;
        el.classList.remove("hidden");
    }
}


function hideMessage(id) {
    var el = document.getElementById(id);
    if (el) {
        el.textContent = "";
        el.classList.add("hidden");
    }
}



function logout() {
    sessionStorage.removeItem("currentUser");
    showPage("loginPage");
}


function afficherDashboard(user) {
   
    var nomEl = document.getElementById("dashNomUtilisateur");
    if (nomEl) nomEl.textContent = "Bonjour, " + user.nomComplet;
    showPage("dashboardPage");
}