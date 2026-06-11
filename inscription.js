/* =====================================================================
   inscription.js
   - Page publique : inscription CLIENT uniquement (depuis la page login)
   - Inscription staff (gestionnaire, gérant, chauffeur…) : réservée au DG
     depuis son dashboard (modale déclenchée par afficherFormulaireInscriptionDG())
   ===================================================================== */

/* ── Page inscription publique (clients seulement) ── */
function construireInscription() {
    document.getElementById("inscriptionPage").innerHTML = `
        <div class="flex justify-center items-center min-h-screen p-4 bg-cover bg-center bg-no-repeat"
            style="background-image:linear-gradient(rgba(11,34,101,0.70),rgba(11,34,101,0.80)),
                   url('https://i.pinimg.com/1200x/2f/5d/23/2f5d2354b9864247f7474d47888d0f61.jpg')">

            <div class="w-full max-w-[450px] bg-white rounded-2xl p-8 shadow-xl text-center">

                <div class="mb-6">
                    <img class="w-20 mx-auto mb-2" src="images/logo.png" alt="Logo"
                         onerror="this.style.display='none'">
                    <h1 class="text-brandOrange text-3xl font-bold uppercase">Gaydel Flux</h1>
                    <p class="text-sm text-gray-500">Gestion de distribution pétrolière</p>
                </div>

                <h2 class="text-brandBlue text-2xl font-semibold mb-1">Créer un compte client</h2>
                <p class="text-xs text-gray-400 mb-4">Accédez à nos services en ligne</p>

                <div id="inscriptionError"
                     class="hidden bg-red-50 border border-red-300 text-red-700 text-sm
                            rounded-lg px-4 py-2 mb-4 text-left"></div>
                <div id="inscriptionSuccess"
                     class="hidden bg-green-50 border border-green-300 text-green-700 text-sm
                            rounded-lg px-4 py-2 mb-4 text-left"></div>

                <form id="inscriptionForm" class="space-y-4 text-left">

                    <div>
                        <label class="text-sm font-medium text-gray-700">Nom complet</label>
                        <div class="relative mt-1">
                            <i class="fa-solid fa-user absolute left-3 top-3 text-gray-400"></i>
                            <input type="text" id="inscNom" placeholder="Votre nom complet"
                                class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                       focus:outline-none focus:border-brandBlue">
                        </div>
                    </div>

                    <div>
                        <label class="text-sm font-medium text-gray-700">Matricule / Identifiant</label>
                        <div class="relative mt-1">
                            <i class="fa-solid fa-id-card absolute left-3 top-3 text-gray-400"></i>
                            <input type="text" id="inscMatricule" placeholder="Ex: CLI-2026"
                                class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                       focus:outline-none focus:border-brandBlue">
                        </div>
                    </div>

                    <!-- Rôle figé à "client" — non modifiable -->
                    <div>
                        <label class="text-sm font-medium text-gray-700">Rôle</label>
                        <div class="relative mt-1">
                            <i class="fa-solid fa-user-tag absolute left-3 top-3 text-gray-400"></i>
                            <input type="text" value="Client" disabled
                                class="w-full pl-9 py-2 border border-gray-200 rounded-lg bg-gray-100
                                       text-gray-500 cursor-not-allowed">
                        </div>
                    </div>

                    <div>
                        <label class="text-sm font-medium text-gray-700">Mot de passe</label>
                        <div class="relative mt-1">
                            <i class="fa-solid fa-lock absolute left-3 top-3 text-gray-400"></i>
                            <input type="password" id="inscPassword" placeholder="Minimum 6 caractères"
                                class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                       focus:outline-none focus:border-brandBlue">
                        </div>
                    </div>

                    <div>
                        <label class="text-sm font-medium text-gray-700">Confirmer mot de passe</label>
                        <div class="relative mt-1">
                            <i class="fa-solid fa-lock absolute left-3 top-3 text-gray-400"></i>
                            <input type="password" id="inscConfirmPassword" placeholder="Répéter le mot de passe"
                                class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                       focus:outline-none focus:border-brandBlue">
                        </div>
                    </div>

                    <button type="submit"
                        class="w-full bg-brandOrange text-white py-3 rounded-lg font-semibold
                               hover:bg-brandOrangeHover transition">
                        <i class="fa-solid fa-user-plus mr-2"></i>Créer mon compte
                    </button>

                    <p class="text-sm text-center text-gray-500">
                        Déjà un compte ?
                        <a href="#" onclick="showPage('loginPage')"
                           class="text-brandOrange font-semibold hover:underline">Se connecter</a>
                    </p>
                </form>
            </div>
        </div>
    `;

    document.getElementById("inscriptionForm")
            .addEventListener("submit", soumettreInscriptionClient);
}

function soumettreInscriptionClient(e) {
    e.preventDefault();
    hideMessage("inscriptionError");
    hideMessage("inscriptionSuccess");

    var nomComplet      = document.getElementById("inscNom").value.trim();
    var matricule       = document.getElementById("inscMatricule").value.trim().toUpperCase();
    var password        = document.getElementById("inscPassword").value;
    var confirmPassword = document.getElementById("inscConfirmPassword").value;

    if (!nomComplet) { showError("inscriptionError", "Le nom complet est obligatoire."); return; }
    if (!matricule)  { showError("inscriptionError", "L'identifiant est obligatoire."); return; }

    /* Empêcher d'usurper un matricule réservé */
    if (matricule.startsWith("DG-") || matricule.startsWith("GF-")) {
        showError("inscriptionError", "Ce format d'identifiant est réservé au personnel.");
        return;
    }
    if (password.length < 6) {
        showError("inscriptionError", "Mot de passe : minimum 6 caractères.");
        return;
    }
    if (password !== confirmPassword) {
        showError("inscriptionError", "Les mots de passe ne correspondent pas.");
        return;
    }
    if (localStorage.getItem("user_" + matricule)) {
        showError("inscriptionError", "Cet identifiant est déjà utilisé.");
        return;
    }

    var user = {
        nomComplet : nomComplet,
        matricule  : matricule,
        role       : "client",
        station    : null,
        password   : password,
        dateInscription: new Date().toLocaleDateString('fr-FR')
    };
    localStorage.setItem("user_" + matricule, JSON.stringify(user));

    var liste = lireDonnees("utilisateurs");
    liste.push({ nomComplet, matricule, role: "client", station: "—" });
    sauvegarderDonnees("utilisateurs", liste);

    var s = document.getElementById("inscriptionSuccess");
    s.textContent = "Compte créé avec succès ! Redirection vers la connexion...";
    s.classList.remove("hidden");
    document.getElementById("inscriptionForm").reset();

    setTimeout(function () {
        hideMessage("inscriptionSuccess");
        showPage("loginPage");
    }, 1500);
}


/* =====================================================================
   MODALE D'INSCRIPTION STAFF — réservée au DG depuis son dashboard
   ===================================================================== */
function afficherFormulaireInscriptionDG() {
    /* Vérification sécurité */
    var userJSON = sessionStorage.getItem("currentUser");
    if (!userJSON) return;
    var currentUser = JSON.parse(userJSON);
    if (currentUser.role !== "dg") {
        alert("Accès refusé.");
        return;
    }

    /* Si la modale existe déjà, juste la montrer */
    var existing = document.getElementById("modaleDG");
    if (existing) { existing.classList.remove("hidden"); remplirModale(); return; }

    /* Créer la modale */
    var modale = document.createElement("div");
    modale.id  = "modaleDG";
    modale.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4";
    modale.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">

            <button onclick="fermerModaleDG()"
                class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition text-xl">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="mb-5">
                <h2 class="text-brandBlue text-xl font-bold">Inscrire un membre du personnel</h2>
                <p class="text-xs text-gray-400 mt-1">Seul le DG peut créer des comptes staff.</p>
            </div>

            <div id="dgInscError"
                 class="hidden bg-red-50 border border-red-300 text-red-700 text-sm
                        rounded-lg px-4 py-2 mb-4"></div>
            <div id="dgInscSuccess"
                 class="hidden bg-green-50 border border-green-300 text-green-700 text-sm
                        rounded-lg px-4 py-2 mb-4"></div>

            <form id="formDGInsc" class="space-y-4">

                <div>
                    <label class="text-sm font-medium text-gray-700">Nom complet</label>
                    <div class="relative mt-1">
                        <i class="fa-solid fa-user absolute left-3 top-3 text-gray-400"></i>
                        <input type="text" id="dgNom" placeholder="Nom complet"
                            class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                   focus:outline-none focus:border-brandBlue">
                    </div>
                </div>

                <div>
                    <label class="text-sm font-medium text-gray-700">Matricule</label>
                    <div class="relative mt-1">
                        <i class="fa-solid fa-id-card absolute left-3 top-3 text-gray-400"></i>
                        <input type="text" id="dgMatricule" placeholder="Ex: GFX-2026"
                            class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                   focus:outline-none focus:border-brandBlue">
                    </div>
                </div>

                <div>
                    <label class="text-sm font-medium text-gray-700">Rôle</label>
                    <div class="relative mt-1">
                        <i class="fa-solid fa-shield-halved absolute left-3 top-3 text-gray-400"></i>
                        <select id="dgRole"
                            class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                   focus:outline-none focus:border-brandBlue appearance-none"
                            onchange="toggleChampStationDG()">
                            <option value="">-- Choisir un rôle --</option>
                            <option value="gestionnaire">Gestionnaire de stock</option>
                            <option value="gerant">Gérant de station</option>
                        </select>
                    </div>
                </div>

                <div id="champStationDG" class="hidden">
                    <label class="text-sm font-medium text-gray-700">Station</label>
                    <div class="relative mt-1">
                        <i class="fa-solid fa-gas-pump absolute left-3 top-3 text-gray-400"></i>
                        <select id="dgStation"
                            class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                   focus:outline-none focus:border-brandBlue appearance-none">
                            <option value="">-- Choisir une station --</option>
                            <option value="Yeumbeul">Yeumbeul</option>
                            <option value="Pikine">Pikine</option>
                            <option value="Rufisque">Rufisque</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="text-sm font-medium text-gray-700">Mot de passe</label>
                    <div class="relative mt-1">
                        <i class="fa-solid fa-lock absolute left-3 top-3 text-gray-400"></i>
                        <input type="password" id="dgPassword" placeholder="Minimum 6 caractères"
                            class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                   focus:outline-none focus:border-brandBlue">
                    </div>
                </div>

                <div>
                    <label class="text-sm font-medium text-gray-700">Confirmer mot de passe</label>
                    <div class="relative mt-1">
                        <i class="fa-solid fa-lock absolute left-3 top-3 text-gray-400"></i>
                        <input type="password" id="dgConfirmPassword" placeholder="Répéter le mot de passe"
                            class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                   focus:outline-none focus:border-brandBlue">
                    </div>
                </div>

                <div class="flex gap-3 pt-2">
                    <button type="submit"
                        class="flex-1 bg-brandOrange hover:bg-brandOrangeHover text-white
                               py-3 rounded-lg font-semibold transition">
                        Inscrire
                    </button>
                    <button type="button" onclick="fermerModaleDG()"
                        class="flex-1 border border-gray-300 text-gray-600 py-3 rounded-lg
                               hover:bg-gray-50 transition">
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modale);

    document.getElementById("formDGInsc")
            .addEventListener("submit", soumettreInscriptionDG);
}

function fermerModaleDG() {
    var m = document.getElementById("modaleDG");
    if (m) m.classList.add("hidden");
}

function toggleChampStationDG() {
    var role  = document.getElementById("dgRole").value;
    var champ = document.getElementById("champStationDG");
    if (role === "gerant") {
        champ.classList.remove("hidden");
    } else {
        champ.classList.add("hidden");
        document.getElementById("dgStation").value = "";
    }
}

function remplirModale() {
    
    ["dgNom","dgMatricule","dgPassword","dgConfirmPassword"].forEach(function(id){
        var el = document.getElementById(id);
        if (el) el.value = "";
    });
    var sel = document.getElementById("dgRole");
    if (sel) sel.value = "";
    toggleChampStationDG();
    hideMessage("dgInscError");
    hideMessage("dgInscSuccess");
}

function soumettreInscriptionDG(e) {
    e.preventDefault();
    hideMessage("dgInscError");
    hideMessage("dgInscSuccess");

    var nomComplet      = document.getElementById("dgNom").value.trim();
    var matricule       = document.getElementById("dgMatricule").value.trim().toUpperCase();
    var role            = document.getElementById("dgRole").value;
    var station         = document.getElementById("dgStation") ? document.getElementById("dgStation").value : "";
    var password        = document.getElementById("dgPassword").value;
    var confirmPassword = document.getElementById("dgConfirmPassword").value;

    if (!nomComplet) { showError("dgInscError", "Le nom complet est obligatoire."); return; }
    if (!matricule)  { showError("dgInscError", "Le matricule est obligatoire."); return; }
    if (!role)       { showError("dgInscError", "Veuillez choisir un rôle."); return; }
    if (matricule === "DG-001" || matricule.startsWith("DG-")) {
        showError("dgInscError", "Ce format de matricule est réservé.");
        return;
    }
    if (role === "gerant" && !station) {
        showError("dgInscError", "Un gérant doit être associé à une station.");
        return;
    }
    if (password.length < 6) {
        showError("dgInscError", "Mot de passe : minimum 6 caractères.");
        return;
    }
    if (password !== confirmPassword) {
        showError("dgInscError", "Les mots de passe ne correspondent pas.");
        return;
    }
    if (localStorage.getItem("user_" + matricule)) {
        showError("dgInscError", "Ce matricule est déjà utilisé.");
        return;
    }

    var user = {
        nomComplet : nomComplet,
        matricule  : matricule,
        role       : role,
        station    : station || null,
        password   : password,
        dateInscription: new Date().toLocaleDateString('fr-FR')
    };
    localStorage.setItem("user_" + matricule, JSON.stringify(user));

    var liste = lireDonnees("utilisateurs");
    liste.push({ nomComplet, matricule, role, station: station || "—" });
    sauvegarderDonnees("utilisateurs", liste);

    var s = document.getElementById("dgInscSuccess");
    s.textContent = "Compte créé pour " + nomComplet + " (" + matricule + ")";
    s.classList.remove("hidden");

   
    document.getElementById("formDGInsc").reset();
    toggleChampStationDG();

    
    setTimeout(function() {
        hideMessage("dgInscSuccess");
        fermerModaleDG();
        if (document.getElementById("section-utilisateurs") &&
            !document.getElementById("section-utilisateurs").classList.contains("hidden")) {
            chargerTableauUtilisateurs();
        }
    }, 1500);
}