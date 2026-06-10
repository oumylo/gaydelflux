

function construireLogin() {
    document.getElementById("loginPage").innerHTML = `
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

                <h2 class="text-brandBlue text-2xl font-semibold mb-4">Connexion</h2>

                <div id="loginError"
                     class="hidden bg-red-50 border border-red-300 text-red-700 text-sm
                            rounded-lg px-4 py-2 mb-4 text-left"></div>

                <form id="loginForm" class="space-y-4 text-left">

                    <div>
                        <label class="text-sm font-medium text-gray-700">Matricule</label>
                        <div class="relative mt-1">
                            <i class="fa-solid fa-id-card absolute left-3 top-3 text-gray-400"></i>
                            <input type="text" id="loginMatricule" placeholder="Ex: GFX-2026"
                                class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                       focus:outline-none focus:border-brandBlue">
                        </div>
                    </div>

                    <div>
                        <label class="text-sm font-medium text-gray-700">Mot de passe</label>
                        <div class="relative mt-1">
                            <i class="fa-solid fa-lock absolute left-3 top-3 text-gray-400"></i>
                            <input type="password" id="loginPassword" placeholder="Votre mot de passe"
                                class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                       focus:outline-none focus:border-brandBlue">
                        </div>
                    </div>

                    <button type="submit"
                        class="w-full bg-brandOrange text-white py-3 rounded-lg font-semibold
                               hover:bg-brandOrangeHover transition">
                        Se connecter
                    </button>

                    <p class="text-sm text-center text-gray-500">
                        Pas de compte ?
                        <a href="#" onclick="showPage('inscriptionPage')"
                           class="text-brandOrange font-semibold hover:underline">
                            S'inscrire
                        </a>
                    </p>
                </form>
            </div>
        </div>
    `;

    // Attacher l'événement submit après injection du HTML
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();

        hideMessage("loginError");

        var matricule = document.getElementById("loginMatricule").value.trim();
        var password  = document.getElementById("loginPassword").value;

        if (!matricule) { showError("loginError", "Veuillez saisir votre matricule."); return; }
        if (!password)  { showError("loginError", "Veuillez saisir votre mot de passe."); return; }

        var userJSON = localStorage.getItem("user_" + matricule);
        if (!userJSON) { showError("loginError", "Matricule introuvable. Inscrivez-vous d'abord."); return; }

        var user = JSON.parse(userJSON);
        if (user.password !== password) { showError("loginError", "Mot de passe incorrect."); return; }

        sessionStorage.setItem("currentUser", JSON.stringify(user));
        document.getElementById("loginForm").reset();
        afficherDashboard(user);
    });
}