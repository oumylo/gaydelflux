// ================================================
// dashboard.js — construit + gère le dashboard
// Les données viennent du localStorage (JSON)
// ================================================

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
                    <input type="text" id="searchInput" placeholder="Rechercher un produit"
                        oninput="rechercherProduit(this.value)"
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
                            <h1 id="dashNomUtilisateur" class="text-brandOrange text-xl font-bold">Bonjour !</h1>
                            <p class="text-gray-500 text-sm mt-1">Vue d'ensemble du réseau de distribution</p>
                        </div>

                        <!-- KPI calculés depuis JSON -->
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <div class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                                <div class="flex items-center gap-3 mb-3">
                                    <div class="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <i class="fa-solid fa-cart-shopping text-brandBlue text-base"></i>
                                    </div>
                                    <span class="text-gray-500 text-xs font-medium">Commande en cours</span>
                                </div>
                                <div id="kpi-commandes" class="text-brandBlue text-4xl font-bold">—</div>
                            </div>
                            <div class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                                <div class="flex items-center gap-3 mb-3">
                                    <div class="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                                        <i class="fa-solid fa-sack-dollar text-brandOrange text-base"></i>
                                    </div>
                                    <span class="text-gray-500 text-xs font-medium">Total produits en stock</span>
                                </div>
                                <div id="kpi-stock" class="text-brandBlue text-2xl font-bold">—</div>
                            </div>
                            <div class="bg-white rounded-xl p-5 border border-red-200 shadow-sm">
                                <div class="flex items-center gap-3 mb-3">
                                    <div class="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                                        <i class="fa-solid fa-triangle-exclamation text-red-500 text-base"></i>
                                    </div>
                                    <span class="text-red-500 text-xs font-medium">Alerte Rupture</span>
                                </div>
                                <div id="kpi-alertes" class="text-red-500 text-4xl font-bold">—</div>
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
                        <div class="mb-6 flex items-center justify-between">
                            <div>
                                <h1 class="text-brandOrange text-xl font-bold">Commandes</h1>
                                <p class="text-gray-500 text-sm mt-1">Liste des commandes enregistrées</p>
                            </div>
                            <button onclick="afficherSection('ajouterCommande')"
                                class="bg-brandOrange hover:bg-brandOrangeHover text-white text-sm
                                       font-semibold px-4 py-2 rounded-lg transition">
                                <i class="fa-solid fa-plus mr-1"></i>Nouvelle commande
                            </button>
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
                                <tbody id="tbody-commandes" class="divide-y divide-gray-100"></tbody>
                            </table>
                        </div>
                    </div>

                    <!-- SECTION AJOUTER COMMANDE -->
                    <div id="section-ajouterCommande" class="hidden">
                        <div class="mb-6 flex items-center gap-3">
                            <button onclick="afficherSection('commandes')"
                                class="text-gray-400 hover:text-brandBlue transition text-lg">
                                <i class="fa-solid fa-arrow-left"></i>
                            </button>
                            <div>
                                <h1 class="text-brandOrange text-xl font-bold">Nouvelle commande</h1>
                                <p class="text-gray-500 text-sm mt-1">Remplissez les informations</p>
                            </div>
                        </div>
                        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-lg">
                            <div id="cmdSuccess"
                                 class="hidden bg-green-50 border border-green-300 text-green-700 text-sm
                                        rounded-lg px-4 py-2 mb-4"></div>
                            <div id="cmdError"
                                 class="hidden bg-red-50 border border-red-300 text-red-700 text-sm
                                        rounded-lg px-4 py-2 mb-4"></div>
                            <form id="formAjouterCommande" class="space-y-4">
                                <div>
                                    <label class="text-sm font-medium text-gray-700">Station</label>
                                    <div class="relative mt-1">
                                        <i class="fa-solid fa-gas-pump absolute left-3 top-3 text-gray-400"></i>
                                        <select id="cmdStation"
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
                                    <label class="text-sm font-medium text-gray-700">Gérant</label>
                                    <div class="relative mt-1">
                                        <i class="fa-solid fa-user absolute left-3 top-3 text-gray-400"></i>
                                        <input type="text" id="cmdGerant" placeholder="Nom du gérant"
                                            class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                                   focus:outline-none focus:border-brandBlue">
                                    </div>
                                </div>
                                <div>
                                    <label class="text-sm font-medium text-gray-700">Produit</label>
                                    <div class="relative mt-1">
                                        <i class="fa-solid fa-droplet absolute left-3 top-3 text-gray-400"></i>
                                        <select id="cmdProduit"
                                            class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                                   focus:outline-none focus:border-brandBlue appearance-none">
                                            <option value="">-- Choisir un produit --</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label class="text-sm font-medium text-gray-700">Quantité</label>
                                    <div class="relative mt-1">
                                        <i class="fa-solid fa-hashtag absolute left-3 top-3 text-gray-400"></i>
                                        <input type="number" id="cmdQuantite" placeholder="Quantité souhaitée" min="1"
                                            class="w-full pl-9 py-2 border border-gray-300 rounded-lg bg-gray-50
                                                   focus:outline-none focus:border-brandBlue">
                                    </div>
                                </div>
                                <div class="flex gap-3">
                                    <button type="submit"
                                        class="flex-1 bg-brandOrange hover:bg-brandOrangeHover text-white
                                               py-2 rounded-lg font-semibold text-sm transition">
                                        <i class="fa-solid fa-check mr-1"></i>Ajouter
                                    </button>
                                    <button type="button" onclick="afficherSection('commandes')"
                                        class="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg
                                               font-semibold text-sm hover:bg-gray-50 transition">
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- SECTION RÉCEPTIONS -->
                    <div id="section-receptions" class="hidden">
                        <div class="mb-6">
                            <h1 class="text-brandOrange text-xl font-bold">Réceptions</h1>
                            <p class="text-gray-500 text-sm mt-1">Valider la réception d'une commande</p>
                        </div>
                        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-lg">
                            <div id="recepSuccess"
                                 class="hidden bg-green-50 border border-green-300 text-green-700 text-sm
                                        rounded-lg px-4 py-2 mb-4"></div>
                            <label class="text-sm font-medium text-gray-700 block mb-2">Sélectionner une commande</label>
                            <select id="selectCommande"
                                class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50
                                       outline-none focus:border-brandBlue mb-4">
                                <option value="">-- Choisir une commande --</option>
                            </select>
                            <button onclick="validerReception()"
                                class="w-full bg-brandOrange hover:bg-brandOrangeHover text-white
                                       font-semibold py-2 rounded-lg text-sm transition">
                                <i class="fa-solid fa-check mr-1"></i>Valider la réception
                            </button>
                        </div>
                    </div>

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
                                <tbody id="tbody-lubrifiant" class="divide-y divide-gray-100"></tbody>
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
                                <tbody id="tbody-accessoire" class="divide-y divide-gray-100"></tbody>
                            </table>
                        </div>
                    </div>

                    <!-- SECTION RÉSULTATS RECHERCHE -->
                    <div id="section-recherche" class="hidden">
                        <div class="mb-6 flex items-center gap-3">
                            <button onclick="afficherSection('accueil')"
                                class="text-gray-400 hover:text-brandBlue transition text-lg">
                                <i class="fa-solid fa-arrow-left"></i>
                            </button>
                            <div>
                                <h1 class="text-brandOrange text-xl font-bold">Résultats de recherche</h1>
                                <p id="searchLabel" class="text-gray-500 text-sm mt-1"></p>
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
                                <tbody id="tbody-recherche" class="divide-y divide-gray-100"></tbody>
                            </table>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    `;

    afficherSection('accueil');

    // Attacher le formulaire nouvelle commande
    document.getElementById("formAjouterCommande").addEventListener("submit", function(e) {
        e.preventDefault();
        hideMessage("cmdError");
        hideMessage("cmdSuccess");

        var station  = document.getElementById("cmdStation").value;
        var gerant   = document.getElementById("cmdGerant").value.trim();
        var produit  = document.getElementById("cmdProduit").value;
        var quantite = parseInt(document.getElementById("cmdQuantite").value);

        if (!station)       { showError("cmdError", "Choisissez une station."); return; }
        if (!gerant)        { showError("cmdError", "Le nom du gérant est obligatoire."); return; }
        if (!produit)       { showError("cmdError", "Choisissez un produit."); return; }
        if (!quantite || quantite < 1) { showError("cmdError", "Quantité invalide."); return; }

        var commandes = lireDonnees("commandes");
        var numero    = "C-" + String(Date.now()).slice(-4);
        var date      = new Date().toLocaleDateString('fr-FR');

        commandes.push({
            numero:   numero,
            date:     date,
            station:  station,
            gerant:   gerant,
            produit:  produit,
            quantite: quantite,
            statut:   "En attente"
        });
        sauvegarderDonnees("commandes", commandes);

        var s = document.getElementById("cmdSuccess");
        s.textContent = "Commande " + numero + " ajoutée avec succès !";
        s.classList.remove("hidden");

        document.getElementById("formAjouterCommande").reset();
        setTimeout(function() {
            afficherSection('commandes');
        }, 1500);
    });
}


// ── Navigation interne ────────────────────────────────────────────────────
var SECTIONS_DB = ['accueil','commandes','ajouterCommande','receptions',
                   'lubrifiant','accessoire','recherche'];
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

    // Charger les données selon la section affichée
    if (nom === 'lubrifiant')   chargerTableau('lubrifiant');
    if (nom === 'accessoire')   chargerTableau('accessoire');
    if (nom === 'commandes')    chargerTableauCommandes();
    if (nom === 'receptions')   chargerSelectCommandes();
    if (nom === 'accueil')      mettreAJourKPI();
    if (nom === 'ajouterCommande') chargerSelectProduits();
}


// ── Charger tableau stock depuis JSON ─────────────────────────────────────
function chargerTableau(type) {
    var cle   = (type === 'lubrifiant') ? 'produits_lubrifiant' : 'produits_accessoire';
    var tbody = document.getElementById('tbody-' + type);
    var data  = lireDonnees(cle);

    if (!tbody) return;
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="px-5 py-8 text-center text-gray-400">Aucun produit</td></tr>';
        return;
    }

    data.forEach(function (p) {
        var cQte = couleurQte(p.statut);
        tbody.innerHTML += `
            <tr class="hover:bg-gray-50">
                <td class="px-5 py-3 font-medium">${p.nom}</td>
                <td class="px-5 py-3 text-gray-500">${p.format}</td>
                <td class="px-5 py-3 font-semibold ${cQte}">${p.quantite}</td>
                <td class="px-5 py-3">${badgeStatut(p.statut)}</td>
            </tr>
        `;
    });
}


// ── Charger tableau commandes depuis JSON ─────────────────────────────────
function chargerTableauCommandes() {
    var tbody    = document.getElementById('tbody-commandes');
    var commandes = lireDonnees("commandes");

    if (!tbody) return;
    tbody.innerHTML = '';

    if (commandes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="px-5 py-8 text-center text-gray-400">Aucune commande</td></tr>';
        return;
    }

    commandes.forEach(function (c) {
        tbody.innerHTML += `
            <tr class="hover:bg-gray-50 transition">
                <td class="px-5 py-3 font-mono text-xs text-gray-600">${c.numero}</td>
                <td class="px-5 py-3 text-gray-600">${c.date}</td>
                <td class="px-5 py-3 text-gray-600">${c.station}</td>
                <td class="px-5 py-3">${badgeStatut(c.statut)}</td>
                <td class="px-5 py-3 text-right">
                    <button class="text-brandBlue text-xs font-semibold hover:underline">
                        Voir détails
                    </button>
                </td>
            </tr>
        `;
    });
}


// ── Charger select commandes pour réceptions ──────────────────────────────
function chargerSelectCommandes() {
    var sel       = document.getElementById('selectCommande');
    var commandes = lireDonnees("commandes");

    if (!sel) return;
    sel.innerHTML = '<option value="">-- Choisir une commande --</option>';

    commandes.filter(function(c) { return c.statut !== 'Livrée'; })
             .forEach(function (c) {
        sel.innerHTML += `<option value="${c.numero}">${c.numero} · ${c.station} · ${c.statut}</option>`;
    });
}


// ── Charger select produits pour nouvelle commande ────────────────────────
function chargerSelectProduits() {
    var sel  = document.getElementById('cmdProduit');
    if (!sel) return;
    sel.innerHTML = '<option value="">-- Choisir un produit --</option>';

    var lubrifiants  = lireDonnees("produits_lubrifiant");
    var accessoires  = lireDonnees("produits_accessoire");
    var tous         = lubrifiants.concat(accessoires);

    tous.forEach(function (p) {
        sel.innerHTML += `<option value="${p.nom} (${p.format})">${p.nom} — ${p.format}</option>`;
    });
}


// ── Valider une réception ─────────────────────────────────────────────────
function validerReception() {
    var sel    = document.getElementById('selectCommande');
    var numero = sel ? sel.value : '';

    if (!numero) {
        alert("Veuillez sélectionner une commande.");
        return;
    }

    var commandes = lireDonnees("commandes");
    commandes = commandes.map(function (c) {
        if (c.numero === numero) c.statut = "Livrée";
        return c;
    });
    sauvegarderDonnees("commandes", commandes);

    var s = document.getElementById("recepSuccess");
    if (s) {
        s.textContent = "Commande " + numero + " marquée comme Livrée !";
        s.classList.remove("hidden");
    }

    setTimeout(function() {
        hideMessage("recepSuccess");
        chargerSelectCommandes();
        if (sel) sel.value = '';
    }, 1500);
}


// ── Mettre à jour les KPI du dashboard ───────────────────────────────────
function mettreAJourKPI() {
    var commandes   = lireDonnees("commandes");
    var lubrifiants = lireDonnees("produits_lubrifiant");
    var accessoires = lireDonnees("produits_accessoire");
    var tous        = lubrifiants.concat(accessoires);

    // Commandes en cours (pas livrées)
    var enCours = commandes.filter(function(c) { return c.statut !== 'Livrée'; }).length;

    // Total unités en stock
    var totalStock = tous.reduce(function(acc, p) { return acc + p.quantite; }, 0);

    // Alertes (Alerte + Épuisé + Bas)
    var alertes = tous.filter(function(p) {
        return p.statut === 'Alerte' || p.statut === 'Épuisé' || p.statut === 'Bas';
    }).length;

    var kpiCmd = document.getElementById('kpi-commandes');
    var kpiStk = document.getElementById('kpi-stock');
    var kpiAlt = document.getElementById('kpi-alertes');

    if (kpiCmd) kpiCmd.textContent = enCours;
    if (kpiStk) kpiStk.textContent = totalStock.toLocaleString('fr-FR');
    if (kpiAlt) kpiAlt.textContent = alertes;
}


// ── Recherche de produit ──────────────────────────────────────────────────
function rechercherProduit(terme) {
    if (!terme || terme.length < 2) return;

    var lubrifiants = lireDonnees("produits_lubrifiant");
    var accessoires = lireDonnees("produits_accessoire");
    var tous        = lubrifiants.concat(accessoires);

    var resultats = tous.filter(function(p) {
        return p.nom.toLowerCase().includes(terme.toLowerCase()) ||
               p.format.toLowerCase().includes(terme.toLowerCase());
    });

    var tbody = document.getElementById('tbody-recherche');
    var label = document.getElementById('searchLabel');

    if (!tbody) return;

    tbody.innerHTML = '';
    if (label) label.textContent = resultats.length + ' résultat(s) pour "' + terme + '"';

    if (resultats.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="px-5 py-8 text-center text-gray-400">Aucun résultat</td></tr>';
    } else {
        resultats.forEach(function(p) {
            var cQte = couleurQte(p.statut);
            tbody.innerHTML += `
                <tr class="hover:bg-gray-50">
                    <td class="px-5 py-3 font-medium">${p.nom}</td>
                    <td class="px-5 py-3 text-gray-500">${p.format}</td>
                    <td class="px-5 py-3 font-semibold ${cQte}">${p.quantite}</td>
                    <td class="px-5 py-3">${badgeStatut(p.statut)}</td>
                </tr>
            `;
        });
    }

    afficherSection('recherche');
}