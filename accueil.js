// ================================================
// accueil.js — page d'accueil
// ================================================

function construireAccueil() {
    document.getElementById("accueilPage").innerHTML = `

        <nav class="bg-white shadow-sm sticky top-0 z-50">
            <div class="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <img src="images/logo.png" class="h-10 w-auto object-contain"
                         onerror="this.style.display='none'">
                    <span class="text-brandBlue font-bold text-lg uppercase tracking-wide">Gaydel Flux</span>
                </div>
                <div class="hidden md:flex items-center gap-8">
                    <a href="#" class="text-gray-600 hover:text-brandBlue text-sm font-medium">Solution</a>
                    <a href="#" class="text-gray-600 hover:text-brandBlue text-sm font-medium">Fonctionnement</a>
                    <a href="#" class="text-gray-600 hover:text-brandBlue text-sm font-medium">Rôle</a>
                </div>
                <button onclick="showPage('loginPage')"
                    class="bg-brandOrange hover:bg-brandOrangeHover text-white text-sm
                           font-semibold px-5 py-2 rounded-lg transition">
                    Se Connecter
                </button>
            </div>
        </nav>

        <section class="relative w-full" style="height:420px">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80"
                 alt="Lubrifiants"
                 class="absolute inset-0 w-full h-full object-cover">
            <div class="absolute inset-0"
                 style="background:linear-gradient(to right,rgba(11,34,101,0.85) 40%,rgba(11,34,101,0.30) 100%)">
            </div>
            <div class="relative z-10 h-full flex items-center px-10 md:px-16">
                <h1 class="text-white text-3xl md:text-4xl font-bold leading-tight max-w-xs">
                    Optimisez votre gestion de fluides
                </h1>
            </div>
        </section>

        <section class="bg-gray-100 py-14 px-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-brandBlue text-2xl font-bold text-center mb-1">Nos Solutions</h2>
                <div class="w-12 h-1 bg-brandBlue mx-auto rounded mb-10"></div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

                    <div class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <i class="fa-solid fa-boxes-stacked text-green-600 text-lg"></i>
                            </div>
                            <h3 class="text-brandBlue font-bold text-sm">Gestion des Stock</h3>
                        </div>
                        <p class="text-gray-500 text-xs leading-relaxed">
                            Suivi en temps réel des niveaux par produit et par format.
                            Alertes automatiques au passage du seuil.
                        </p>
                    </div>

                    <div class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <i class="fa-solid fa-cart-shopping text-blue-600 text-lg"></i>
                            </div>
                            <h3 class="text-brandBlue font-bold text-sm">Commandes</h3>
                        </div>
                        <p class="text-gray-500 text-xs leading-relaxed">
                            Réception et suivi des commandes fournisseurs.
                            Consolidation des besoins de toutes les stations.
                        </p>
                    </div>

                    <div class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                <i class="fa-solid fa-box-open text-gray-500 text-lg"></i>
                            </div>
                            <h3 class="text-brandBlue font-bold text-sm">Réceptions</h3>
                        </div>
                        <p class="text-gray-500 text-xs leading-relaxed">
                            Enregistrement des arrivées produits en entrepôt.
                            Vérification quantité et signalement des écarts.
                        </p>
                    </div>

                    <div class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <i class="fa-solid fa-truck text-green-600 text-lg"></i>
                            </div>
                            <h3 class="text-brandBlue font-bold text-sm">Livraisons</h3>
                        </div>
                        <p class="text-gray-500 text-xs leading-relaxed">
                            Génération de bons de livraison et mouvements de transfert
                            vers les stations du réseau.
                        </p>
                    </div>

                    <div class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                <i class="fa-solid fa-triangle-exclamation text-brandOrange text-lg"></i>
                            </div>
                            <h3 class="text-brandBlue font-bold text-sm">Alertes</h3>
                        </div>
                        <p class="text-gray-500 text-xs leading-relaxed">
                            Notification immédiate quand un produit passe
                            sous le seuil minimum défini.
                        </p>
                    </div>

                    <div class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                <i class="fa-solid fa-table-cells-large text-gray-500 text-lg"></i>
                            </div>
                            <h3 class="text-brandBlue font-bold text-sm">Tableau de bord</h3>
                        </div>
                        <p class="text-gray-500 text-xs leading-relaxed">
                            Vue synthétique des indicateurs clés : commandes en cours,
                            total stock, activités récentes.
                        </p>
                    </div>

                </div>
            </div>
        </section>

        <section class="bg-gray-50 py-14 px-6">
            <div class="max-w-3xl mx-auto">
                <h2 class="text-brandBlue text-2xl font-bold text-center mb-1">Comment ça fonctionne</h2>
                <p class="text-gray-500 text-sm text-center mb-2">4 processus couverts de bout en bout</p>
                <div class="w-12 h-1 bg-gray-300 mx-auto rounded mb-12"></div>
                <div class="grid grid-cols-2 gap-y-12 gap-x-6">
                    <div class="text-center">
                        <div class="text-brandOrange text-6xl font-bold mb-3">1</div>
                        <p class="text-brandBlue text-sm font-semibold">Expression et consolidation des besoins</p>
                    </div>
                    <div class="text-center">
                        <div class="text-brandOrange text-6xl font-bold mb-3">2</div>
                        <p class="text-brandBlue text-sm font-semibold">Réception en entrepôt</p>
                    </div>
                    <div class="text-center">
                        <div class="text-brandOrange text-6xl font-bold mb-3">3</div>
                        <p class="text-brandBlue text-sm font-semibold">Émission des BL et MT</p>
                    </div>
                    <div class="text-center">
                        <div class="text-brandOrange text-6xl font-bold mb-3">4</div>
                        <p class="text-brandBlue text-sm font-semibold">Vente en station</p>
                    </div>
                </div>
            </div>
        </section>

        <footer class="bg-brandBlue text-white py-6 px-6">
            <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-droplet text-brandOrange text-xl"></i>
                    <span class="font-bold uppercase tracking-wide">Gaydel Flux</span>
                </div>
                <p class="text-white/50 text-xs">Projet Master 2 Informatique — Dakar 2026</p>
                <button onclick="showPage('loginPage')"
                    class="bg-brandOrange hover:bg-brandOrangeHover text-white text-sm
                           font-semibold px-5 py-2 rounded-lg transition">
                    Se connecter
                </button>
            </div>
        </footer>
    `;
}