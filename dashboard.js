

function construireDashboard() {
    document.getElementById("dashboardPage").innerHTML = `

        <div class="flex flex-col min-h-screen bg-gray-100">

            <!-- TOPBAR -->
            <header class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <img src="images/logo.png" class="h-10 w-auto object-contain"
                         onerror="this.style.display='none'">
                    <span class="text-brandOrange font-extrabold text-lg uppercase tracking-widest">
                        Gaydel Flux
                    </span>
                </div>
                <div class="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-64">
                    <i class="fa-solid fa-magnifying-glass text-gray-400 text-sm"></i>
                    <input type="text" placeholder="Rechercher un produit"
                        class="bg-transparent outline-none text-sm w-full text-gray-600 placeholder-gray-400">
                </div>
            </header>

            <div class="flex flex-1">

                <!-- SIDEBAR -->
                <aside class="w-52 bg-white border-r border-gray-200 flex flex-col py-4">

                    <button id="btn-accueil" onclick="afficherSection('accueil')"
                        class="flex items-center gap-3 px-5 py-3 text-sm font-semibold
                               text-brandBlue bg-blue-50 border-l-4 border-brandBlue transition">
                        <i class="fa-solid fa-table-cells-large"></i>
                        Tableau de bord
                    </button>

                    <button id="btn-commandes" onclick="afficherSection('commandes')"
                        class="flex items-center gap-3 px-5 py-3 text-sm text-gray-500
                               hover:bg-gray-50 hover:text-brandBlue border-l-4 border-transparent transition mt-1">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Commandes
                    </button>

                    <button id="btn-receptions" onclick="afficherSection('receptions')"
                        class="flex items-center gap-3 px-5 py-3 text-sm text-gray-500
                               hover:bg-gray-50 hover:text-brandBlue border-l-4 border-transparent transition mt-1">
                        <i class="fa-solid fa-box-open"></i>
                        Réceptions
                    </button>

                    <div class="mt-auto px-5 py-3 border-t border-gray-100">
                        <button onclick="logout()"
                            class="flex items-center gap-2 text-xs text-gray-400 hover:text-red-500 transition">
                            <i class="fa-solid fa-right-from-bracket"></i>
                            Déconnexion
                        </button>
                    </div>
                </aside>

                <!-- CONTENU -->
                <main class="flex-1 p-6 overflow-auto">

                    <!-- SECTION ACCUEIL -->
                    <div id="section-accueil">
                        <div class="mb-6">
                            <h1 id="dashNomUtilisateur" class="text-brandOrange text-xl font-bold">
                                Bonjour !
                            </h1>
                            <p class="text-gray-500 text-sm mt-1">Vue d'ensemble du réseau de distribution</p>
                        </div>

                        <!-- KPI -->
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <div class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                                <div class="flex items-center gap-3 mb-3">
                                    <div class="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <i class="fa-solid fa-cart-shopping text-brandBlue text-base"></i>
                                    </div>
                                    <span class="text-gray-500 text-xs font-medium">Commande en cours</span>
                                </div>
                               
                            </div>
                            <div class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                                <div class="flex items-center gap-3 mb-3">
                                    <div class="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                                        <i class="fa-solid fa-sack-dollar text-brandOrange text-base"></i>
                                    </div>
                                    <span class="text-gray-500 text-xs font-medium">Valeur Total Stock</span>
                                </div>
                                
                            </div>
                            <div class="bg-white rounded-xl p-5 border border-red-200 shadow-sm">
                                <div class="flex items-center gap-3 mb-3">
                                    <div class="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                                        <i class="fa-solid fa-triangle-exclamation text-red-500 text-base"></i>
                                    </div>
                                    <span class="text-red-500 text-xs font-medium">Alerte Rupture</span>
                                </div>
                                
                            </div>
                        </div>

                        <!-- CARTES IMAGES -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl
                                        transition group cursor-pointer"
                                 onclick="afficherSection('lubrifiant')">
                               <div style="height:500px;" class="overflow-hidden">
                                    <img src="images/baril.png"
                                         class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                         onerror="this.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'">
                                </div>
                                <div class="bg-brandOrange hover:bg-brandOrangeHover transition py-4 text-center">
                                    <span class="text-white font-bold text-lg">Stock Lubrifiant</span>
                                </div>
                            </div>
                            <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl
                                        transition group cursor-pointer"
                                 onclick="afficherSection('accessoire')">
                                
                                <div style="height:500px;" class="overflow-hidden">
                                    <img src="images/accessoir.png"
                                         class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                         onerror="this.src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80'">
                                </div>
                                <div class="bg-brandOrange hover:bg-brandOrangeHover transition py-4 text-center">
                                    <span class="text-white font-bold text-lg">Stock Accessoires</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SECTION COMMANDES -->
                    <div id="section-commandes" class="hidden">
                        <div class="mb-6">
                            <h1 class="text-brandOrange text-xl font-bold">Commandes</h1>
                            <p class="text-gray-500 text-sm mt-1">Liste des commandes en cours</p>
                        </div>
                        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <table class="w-full text-sm">
                                <thead class="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">N° Commande</th>
                                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Station</th>
                                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                                        <th class="px-5 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-100">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- SECTION RÉCEPTIONS 
                    
-->
                    <!-- SECTION STOCK LUBRIFIANT -->
                    <div id="section-lubrifiant" class="hidden">
                        <div class="mb-6 flex items-center gap-3">
                            <button onclick="afficherSection('accueil')"
                                class="text-gray-400 hover:text-brandBlue transition text-lg">
                                <i class="fa-solid fa-arrow-left"></i>
                            </button>
                            <div>
                                <h1 class="text-brandOrange text-xl font-bold">Stock Lubrifiant</h1>
                                <p class="text-gray-500 text-sm mt-1">Niveaux par produit et format</p>
                            </div>
                        </div>
                        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <table class="w-full text-sm">
                                <thead class="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Produit</th>
                                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Format</th>
                                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Quantité</th>
                                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-100">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- SECTION STOCK ACCESSOIRE -->
                    <div id="section-accessoire" class="hidden">
                        <div class="mb-6 flex items-center gap-3">
                            <button onclick="afficherSection('accueil')"
                                class="text-gray-400 hover:text-brandBlue transition text-lg">
                                <i class="fa-solid fa-arrow-left"></i>
                            </button>
                            <div>
                                <h1 class="text-brandOrange text-xl font-bold">Stock Accessoires</h1>
                                <p class="text-gray-500 text-sm mt-1">Niveaux par produit</p>
                            </div>
                        </div>
                        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <table class="w-full text-sm">
                                <thead class="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Produit</th>
                                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Format</th>
                                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Quantité</th>
                                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-100">
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    `;

   
    afficherSection('accueil');
}



var SECTIONS_DB = ['accueil','commandes','receptions','lubrifiant','accessoire'];
var BTNS_DB     = ['accueil','commandes','receptions'];

function afficherSection(nom) {
    SECTIONS_DB.forEach(function (id) {
        var el = document.getElementById('section-' + id);
        if (el) el.classList.add('hidden');
    });
    var cible = document.getElementById('section-' + nom);
    if (cible) cible.classList.remove('hidden');

    BTNS_DB.forEach(function (id) {
        var btn = document.getElementById('btn-' + id);
        if (!btn) return;
        if (id === nom) {
            btn.className = "flex items-center gap-3 px-5 py-3 text-sm font-semibold " +
                            "text-brandBlue bg-blue-50 border-l-4 border-brandBlue transition";
        } else {
            btn.className = "flex items-center gap-3 px-5 py-3 text-sm text-gray-500 " +
                            "hover:bg-gray-50 hover:text-brandBlue border-l-4 border-transparent transition mt-1";
        }
    });
}