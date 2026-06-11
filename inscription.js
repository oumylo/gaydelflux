
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

                <h2 class="text-brandBlue text-2xl font-semibold mb-1">Inscription</h2>

                <!-- Avertissement visible -->
                

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
                        <label class="text-sm font-medium text-gray-700">Matricule</label>
                        <div class="relative mt-1">
                            <i class="fa-solid fa-id-card absolute left-3 top-3 text-gray-400"></i>
                            <input type="text" id="inscMatricule" placeholder="Ex: GFX-2026"
                                class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                       focus:outline-none focus:border-brandBlue">
                        </div>
                    </div>

                    <!-- Rôle : gestionnaire ou gérant uniquement -->
                    <div>
                        <label class="text-sm font-medium text-gray-700">Rôle</label>
                        <div class="relative mt-1">
                            <i class="fa-solid fa-shield-halved absolute left-3 top-3 text-gray-400"></i>
                            <select id="inscRole"
                                class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                       focus:outline-none focus:border-brandBlue appearance-none"
                                onchange="toggleChampStation()">
                                <option value="">-- Choisir un rôle --</option>
                                <option value="gestionnaire">Gestionnaire de stock</option>
                                <option value="gerant">Gérant de station</option>
                            </select>
                        </div>
                    </div>

                    <!-- Station : visible seulement pour les gérants -->
                    <div id="champStation" class="hidden">
                        <label class="text-sm font-medium text-gray-700">Station</label>
                        <div class="relative mt-1">
                            <i class="fa-solid fa-gas-pump absolute left-3 top-3 text-gray-400"></i>
                            <select id="inscStation"
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
                        S'inscrire
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
            .addEventListener("submit", soumettreInscription);
}


function toggleChampStation() {
    var role  = document.getElementById("inscRole").value;
    var champ = document.getElementById("champStation");
    if (role === "gerant") {
        champ.classList.remove("hidden");
    } else {
        champ.classList.add("hidden");
        document.getElementById("inscStation").value = "";
    }
}

function soumettreInscription(e) {
    e.preventDefault();
    hideMessage("inscriptionError");
    hideMessage("inscriptionSuccess");

    var nomComplet      = document.getElementById("inscNom").value.trim();
    var matricule       = document.getElementById("inscMatricule").value.trim().toUpperCase();
    var role            = document.getElementById("inscRole").value;
    var station         = document.getElementById("inscStation").value;
    var password        = document.getElementById("inscPassword").value;
    var confirmPassword = document.getElementById("inscConfirmPassword").value;

   
    if (!nomComplet) { showError("inscriptionError", "Le nom complet est obligatoire."); return; }
    if (!matricule)  { showError("inscriptionError", "Le matricule est obligatoire."); return; }
    if (!role)       { showError("inscriptionError", "Veuillez choisir un rôle."); return; }

    
    if (role === "dg") {
        showError("inscriptionError", "Impossible de créer un compte administrateur via ce formulaire.");
        return;
    }

   
    if (matricule === "DG-001" || matricule.startsWith("DG-")) {
        showError("inscriptionError", "Ce format existe.");
        return;
    }

    if (role === "gerant" && !station) {
        showError("inscriptionError", "Un gérant doit choisir sa station.");
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
        showError("inscriptionError", "Ce matricule est déjà utilisé.");
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
    liste.push({
        nomComplet : nomComplet,
        matricule  : matricule,
        role       : role,
        station    : station || "—"
    });
    sauvegarderDonnees("utilisateurs", liste);

    var s = document.getElementById("inscriptionSuccess");
    s.textContent = "Inscription réussie ! Redirection vers la connexion...";
    s.classList.remove("hidden");
    document.getElementById("inscriptionForm").reset();
    toggleChampStation();

    setTimeout(function () {
        hideMessage("inscriptionSuccess");
        showPage("loginPage");
    }, 1500);
}