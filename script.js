var DONNEES_INITIALES = {
    produits_lubrifiant: [],
    produits_accessoire: [],
    commandes:           [],
    utilisateurs:        []
};

var COMPTE_DG = {
    nomComplet : "Directeur Général",
    matricule  : "DG-001",
    role       : "dg",
    station    : null,
    password   : "dg1234"
};

function initialiserDonnees() {
    if (!localStorage.getItem("user_" + COMPTE_DG.matricule)) {
        localStorage.setItem("user_" + COMPTE_DG.matricule, JSON.stringify(COMPTE_DG));
    }
    if (!localStorage.getItem("gf_produits_lubrifiant"))
        localStorage.setItem("gf_produits_lubrifiant", JSON.stringify(DONNEES_INITIALES.produits_lubrifiant));
    if (!localStorage.getItem("gf_produits_accessoire"))
        localStorage.setItem("gf_produits_accessoire", JSON.stringify(DONNEES_INITIALES.produits_accessoire));
    if (!localStorage.getItem("gf_commandes"))
        localStorage.setItem("gf_commandes", JSON.stringify(DONNEES_INITIALES.commandes));
    if (!localStorage.getItem("gf_utilisateurs"))
        localStorage.setItem("gf_utilisateurs", JSON.stringify(DONNEES_INITIALES.utilisateurs));
}

function lireDonnees(cle) {
    var json = localStorage.getItem("gf_" + cle);
    return json ? JSON.parse(json) : [];
}
function sauvegarderDonnees(cle, tableau) {
    localStorage.setItem("gf_" + cle, JSON.stringify(tableau));
}

function showPage(pageId) {
    document.querySelectorAll("section").forEach(function (p) {
        p.classList.add("hidden");
    });
    var cible = document.getElementById(pageId);
    if (cible) cible.classList.remove("hidden");
}

function showError(id, message) {
    var el = document.getElementById(id);
    if (el) { el.textContent = message; el.classList.remove("hidden"); }
}
function hideMessage(id) {
    var el = document.getElementById(id);
    if (el) { el.textContent = ""; el.classList.add("hidden"); }
}

function logout() {
    sessionStorage.removeItem("currentUser");
    showPage("loginPage");
}

function afficherDashboard(user) {
    var nomEl = document.getElementById("dashNomUtilisateur");
    if (nomEl) nomEl.textContent = "Bonjour, " + user.nomComplet;
    adapterDashboardAuRole(user);
    showPage("dashboardPage");
}

function adapterDashboardAuRole(user) {
    var role = user.role;

    document.querySelectorAll('[data-role="dg"]').forEach(function(el) {
        if (role === "dg") el.classList.remove("hidden");
        else               el.classList.add("hidden");
    });
    document.querySelectorAll('[data-role="gestionnaire"]').forEach(function(el) {
        if (role === "dg" || role === "gestionnaire") el.classList.remove("hidden");
        else                                           el.classList.add("hidden");
    });
    document.querySelectorAll('[data-role="gerant"]').forEach(function(el) {
        if (role === "dg" || role === "gerant") el.classList.remove("hidden");
        else                                     el.classList.add("hidden");
    });
    document.querySelectorAll('[data-role="client"]').forEach(function(el) {
        if (role === "client") el.classList.remove("hidden");
        else                   el.classList.add("hidden");
    });

    var badgeEl = document.getElementById("roleBadge");
    if (badgeEl) {
        var libelles = {
            dg:           "DG Admin",
            gestionnaire: "Gestionnaire",
            gerant:       "Gérant station",
            client:       "Client"
        };
        var couleurs = {
            dg:           "bg-purple-100 text-purple-700",
            gestionnaire: "bg-blue-100 text-blue-700",
            gerant:       "bg-green-100 text-green-700",
            client:       "bg-yellow-100 text-yellow-700"
        };
        badgeEl.textContent = libelles[role] || role;
        badgeEl.className   = "text-xs font-semibold px-3 py-1 rounded-full " +
                              (couleurs[role] || "bg-gray-100 text-gray-600");
    }

    var stationEl = document.getElementById("userStation");
    if (stationEl) {
        if (role === "gerant" && user.station) {
            stationEl.textContent = user.station;
            stationEl.parentElement.classList.remove("hidden");
        } else {
            stationEl.parentElement.classList.add("hidden");
        }
    }

    afficherSection("accueil");
}

function verifierAcces(rolesAutorises) {
    var userJSON = sessionStorage.getItem("currentUser");
    if (!userJSON) { showPage("loginPage"); return false; }
    var user = JSON.parse(userJSON);
    if (!rolesAutorises.includes(user.role)) {
        alert("Accès refusé. Cette section est réservée à : " + rolesAutorises.join(", "));
        return false;
    }
    return true;
}

function badgeStatut(statut) {
    var classes = {
        "Normal":       "bg-green-100 text-green-700",
        "Bas":          "bg-orange-100 text-orange-700",
        "Alerte":       "bg-red-100 text-red-600",
        "Épuisé":       "bg-red-100 text-red-600",
        "En attente":   "bg-orange-100 text-orange-700",
        "En cours":     "bg-blue-100 text-blue-700",
        "Livrée":       "bg-green-100 text-green-700",
        "DG Admin":     "bg-purple-100 text-purple-700",
        "Gestionnaire": "bg-blue-100 text-blue-700",
        "Gérant":       "bg-green-100 text-green-700",
        "Client":       "bg-yellow-100 text-yellow-700"
    };
    var cls = classes[statut] || "bg-gray-100 text-gray-600";
    return '<span class="' + cls + ' text-xs font-semibold px-3 py-1 rounded-full">' + statut + '</span>';
}
function couleurQte(statut) {
    if (statut === "Bas")    return "text-orange-500";
    if (statut === "Alerte" || statut === "Épuisé") return "text-red-500";
    return "";
}

window.onload = function () {
    initialiserDonnees();
    construireLogin();
    construireInscription();
    construireDashboard();

    var sessionUser = sessionStorage.getItem("currentUser");
    if (sessionUser) {
        afficherDashboard(JSON.parse(sessionUser));
    } else {
        showPage("loginPage");
    }
};