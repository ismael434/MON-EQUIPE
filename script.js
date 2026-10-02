
/* =====================================
   MENU MOBILE
===================================== */

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", function () {

    menu.classList.toggle("active");

});


/* Fermer le menu après avoir
   cliqué sur un lien */

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        menu.classList.remove("active");

    });

});


/* =====================================
   MODE SOMBRE / MODE CLAIR
===================================== */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("light");


    if (document.body.classList.contains("light")) {

        themeBtn.textContent = "☀️";

    } else {

        themeBtn.textContent = "🌙";

    }

});


/* =====================================
   RECHERCHE DES JOUEURS
===================================== */

const searchInput =
    document.getElementById("searchInput");

const joueurs =
    document.querySelectorAll(".joueur");


searchInput.addEventListener("input", function () {

    const recherche =
        searchInput.value.toLowerCase();


    joueurs.forEach(function (joueur) {

        const nom =
            joueur.querySelector("h3")
            .textContent
            .toLowerCase();

        const poste =
            joueur.querySelector("p")
            .textContent
            .toLowerCase();


        if (
            nom.includes(recherche) ||
            poste.includes(recherche)
        ) {

            joueur.style.display = "block";

        } else {

            joueur.style.display = "none";

        }

    });

});


/* =====================================
   COMPTEUR ANIME
===================================== */

const counters =
    document.querySelectorAll(".counter");


counters.forEach(function (counter) {

    const target =
        Number(counter.dataset.target);

    let nombre = 0;

    const vitesse = 50;


    const animation = setInterval(function () {

        nombre++;

        counter.textContent = nombre;


        if (nombre >= target) {

            clearInterval(animation);

        }

    }, vitesse);

});


/* =====================================
   GALERIE
===================================== */

const galleryImages =
    document.querySelectorAll(".gallery-image");

const modal =
    document.getElementById("imageModal");

const modalImage =
    document.getElementById("modalImage");

const closeModal =
    document.getElementById("closeModal");


galleryImages.forEach(function (image) {

    image.addEventListener("click", function () {

        modal.classList.add("active");

        modalImage.src = image.src;

    });

});


/* =====================================
   FERMER LA PHOTO
===================================== */

closeModal.addEventListener("click", function () {

    modal.classList.remove("active");

});


/* Fermer si on clique
   en dehors de la photo */

modal.addEventListener("click", function (event) {

    if (event.target === modal) {

        modal.classList.remove("active");

    }

});


/* =====================================
   TOUCHE ESCAPE
===================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        modal.classList.remove("active");

    }

});

