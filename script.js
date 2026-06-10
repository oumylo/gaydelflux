
var DONNEES_INITIALES = {
    produits_lubrifiant: [
        { nom: "SAE 50 MIRALUB",  format: "Bidon 5L",  quantite: 312, statut: "Normal" },
        { nom: "SAE 50 MIRALUB",  format: "Fût 220L",  quantite: 18,  statut: "Normal" },
        { nom: "15W40 MIRALUB",   format: "Bidon 1L",  quantite: 520, statut: "Normal" },
        { nom: "15W40 MIRALUB",   format: "Bidon 5L",  quantite: 208, statut: "Normal" },
        { nom: "20W50 vrac",      format: "Litre",     quantite: 450, statut: "Bas"    },
        { nom: "Graisse EP2",     format: "Boîte 1kg", quantite: 36,  statut: "Alerte" }
    ],
    produits_accessoire: [
        { nom: "Glaciol",        format: "Bidon 1L", quantite: 0,   statut: "Épuisé" },
        { nom: "Eau distillée",  format: "Bidon 1L", quantite: 145, statut: "Normal" },
        { nom: "Lave-glace",     format: "Bidon 1L", quantite: 78,  statut: "Normal" },
        { nom: "Ampoule H4 12V", format: "Unité",    quantite: 22,  statut: "Bas"    }
    ],
    commandes: [
        { numero: "C-094", date: "09/06/2026", station: "Yeumbeul", statut: "En attente" },
        { numero: "C-093", date: "07/06/2026", station: "Pikine",   statut: "En cours"   },
        { numero: "C-092", date: "05/06/2026", station: "Rufisque", statut: "Livrée"     }
    ],
    stations: ["Yeumbeul", "Pikine", "Rufisque"]
};

// ── Initialiser les données si elles n'existent pas encore ────────────────
function initialiserDonnees() {
    if (!localStorage.getItem("gf_produits_lubrifiant")) {
        localStorage.setItem("gf_produits_lubrifiant",
            JSON.stringify(DONNEES_INITIALES.produits_lubrifiant));
    }
    if (!localStorage.getItem("gf_produits_accessoire")) {
        localStorage.setItem("gf_produits_accessoire",
            JSON.stringify(DONNEES_INITIALES.produits_accessoire));
    }
    if (!localStorage.getItem("gf_commandes")) {
        localStorage.setItem("gf_commandes",
            JSON.stringify(DONNEES_INITIALES.commandes));
    }
}

// ── Lire des données depuis localStorage ──────────────────────────────────
function lireDonnees(cle) {
    var json = localStorage.getItem("gf_" + cle);
    return json ? JSON.parse(json) : [];
}

// ── Sauvegarder des données dans localStorage ──────────────────────────────
function sauvegarderDonnees(cle, tableau) {
    localStorage.setItem("gf_" + cle, JSON.stringify(tableau));
}

// ── Navigation SPA ────────────────────────────────────────────────────────
function showPage(pageId) {
    var pages = document.querySelectorAll("section");
    pages.forEach(function (page) { page.classList.add("hidden"); });
    var cible = document.getElementById(pageId);
    if (cible) cible.classList.remove("hidden");
}

// ── Messages d'erreur / succès ────────────────────────────────────────────
function showError(id, message) {
    var el = document.getElementById(id);
    if (el) { el.textContent = message; el.classList.remove("hidden"); }
}

function hideMessage(id) {
    var el = document.getElementById(id);
    if (el) { el.textContent = ""; el.classList.add("hidden"); }
}

// ── Déconnexion ───────────────────────────────────────────────────────────
function logout() {
    sessionStorage.removeItem("currentUser");
    showPage("loginPage");
}

// ── Afficher le dashboard après connexion ─────────────────────────────────
function afficherDashboard(user) {
    var nomEl = document.getElementById("dashNomUtilisateur");
    if (nomEl) nomEl.textContent = "Bonjour, " + user.nomComplet;
    showPage("dashboardPage");
}

// ── Badge couleur selon statut ────────────────────────────────────────────
function badgeStatut(statut) {
    var classes = {
        "Normal":   "bg-green-100 text-green-700",
        "Bas":      "bg-orange-100 text-orange-700",
        "Alerte":   "bg-red-100 text-red-600",
        "Épuisé":   "bg-red-100 text-red-600",
        "En attente": "bg-orange-100 text-orange-700",
        "En cours": "bg-blue-100 text-blue-700",
        "Livrée":   "bg-green-100 text-green-700"
    };
    var cls = classes[statut] || "bg-gray-100 text-gray-600";
    return '<span class="' + cls + ' text-xs font-semibold px-3 py-1 rounded-full">' + statut + '</span>';
}

// ── Couleur quantité selon statut ─────────────────────────────────────────
function couleurQte(statut) {
    if (statut === "Bas")    return "text-orange-500";
    if (statut === "Alerte") return "text-red-500";
    if (statut === "Épuisé") return "text-red-500";
    return "";
}

// ── Au chargement de la page ──────────────────────────────────────────────
window.onload = function () {
    initialiserDonnees();

    construireAccueil();
    construireInscription();
    construireLogin();
    construireDashboard();
    construireStock();
    construireCommande();

    // Vérifier si déjà connecté
    var sessionUser = sessionStorage.getItem("currentUser");
    if (sessionUser) {
        afficherDashboard(JSON.parse(sessionUser));
    } else {
        showPage("loginPage");
    }
};