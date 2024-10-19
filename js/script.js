// Importation des fonctions nécessaires depuis les fichiers externes
import { fetchMeteoByCommune, getCommunes } from "./api.js";
import { generator } from "./generator.js";

// Initialisation des variables pour les éléments du DOM
const codePostale = document.getElementById("cp");
const commune = document.getElementById("commune");
let cardNode = document.getElementById("cardNode");

// Initialisation des checkbox dans le localStorage
const checkboxes = ["latitude", "longitude", "cumul", "vent", "dir_vent"];

const remplirCommunes = (codepostal) => {
  // Réinitialisation des options de la commune
  commune.innerHTML = "";

  // Vérification de la validité du code postal
  if (!codepostal || codepostal.length !== 5) {
    return;
  }
  // Récupération des communes correspondant au code postal
  getCommunes(codepostal).then((data) => {
    // Ajout des nouvelles options
    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.code;
      option.text = item.nom;
      commune.appendChild(option);
    });
  });
};

// Événement déclenché lorsque le DOM est complètement chargé
document.addEventListener("DOMContentLoaded", () => {
  //check if code postal is not empty
  if (codePostale.value) {
    // Récupération des communes correspondant au code postal
    remplirCommunes(codePostale.value);
  }

  // Événement déclenché lorsque le champ de code postal perd le focus
  codePostale.addEventListener("blur", function () {
    const codepostal = this.value;
    // Récupération des communes correspondant au code postal
    remplirCommunes(codepostal);
  });

  // Initialisation des checkbox à partir du localStorage
  checkboxes.forEach((id) => {
    const checkbox = document.getElementById(id);
    if (!localStorage.getItem(id)) {
      localStorage.setItem(id, checkbox.checked);
    } else {
      checkbox.checked = localStorage.getItem(id) === "true";
    }
    // Mise à jour du localStorage lorsque la checkbox change
    checkbox.addEventListener("change", () => {
      localStorage.setItem(id, checkbox.checked);
    });
  });
});

// Événement déclenché lorsque le bouton "Envoyer" est cliqué
document.getElementById("submit").addEventListener("click", function () {
  const input = document.getElementById("nbjour");
  const maxValue = 7;

  // Vérification des conditions avant de soumettre le formulaire
  if (
    input.value > maxValue ||
    !codePostale.value ||
    commune.value == "Sélectionner une commune"
  ) {
    alert(
      `Le nombre de jour ne doit pas dépasser ${maxValue}. et tout les champs doivent être remplit`
    );
  } else {
    remplir(input.value);
  }
});

// Fonction pour remplir les prévisions météorologiques
function remplir(jours) {
  const insee = commune.value;
  fetchMeteoByCommune(insee).then((data) => {
    cardNode.innerHTML = "";
    if (data.code == 200) {
      generator(data.city, data.forecast, jours);
    } else {
      cardNode.innerHTML =
        '<div class="text-center text-red-500 text-lg font-bold">Une erreur est survenue lors de la récupération des données</div>';
    }
  });
}

// Sélection du conteneur des nuages
const cloudsContainer = document.querySelector(".cloudcontainer");
const MAX_CLOUDS = 15; // Limite le nombre de nuages
let cloudCount = 0; // Compteur de nuages

// Fonction pour créer un nuage
function createCloud() {
  if (cloudCount < MAX_CLOUDS) {
    const cloud = document.createElement("div");
    cloud.classList.add("cloud");
    let proba = Math.random();
    let isLapin = proba < 0.05;
    if (isLapin) {
      cloud.style.backgroundImage = "url('assets/lapin.png')";
      cloud.style.width = "90px";
      cloud.style.height = "90px";
    } else {
      cloud.style.width = Math.random() * 200 + 100 + "px";
      cloud.style.height = Math.random() * 100 + 50 + "px";
      cloud.style.background = "white";
    }

    cloud.style.left = "-200px"; // Commence à l'extérieur de l'écran
    cloud.style.top = Math.random() * 100 + "vh"; // Position verticale aléatoire
    cloud.style.animationDuration = Math.random() * 20 + 10 + "s"; // Durée d'animation aléatoire

    cloudsContainer.appendChild(cloud);
    cloudCount++;

    // Événement déclenché lorsque l'animation se termine
    cloud.addEventListener("animationend", () => {
      cloudsContainer.removeChild(cloud);
      cloudCount--;
    });
  }
}

// Sélection du commutateur de thème et du corps du document
const toggleSwitch = document.getElementById("toggleSwitch");
const body = document.body;

let shootingStarInterval;
let cloudInterval;

// Fonction pour supprimer les étoiles
function removeStars() {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => star.remove());
}

// Fonction pour supprimer les nuages
function removeClouds() {
  const clouds = document.querySelectorAll(".cloud");
  clouds.forEach((cloud) => cloud.remove());
}

// Fonction pour mettre à jour le thème (jour/nuit)
function updateTheme() {
  // Nettoyer les intervalles existants
  clearInterval(shootingStarInterval);
  clearInterval(cloudInterval);

  if (toggleSwitch.checked) {
    // Mode nuit
    body.classList.add("night");
    body.classList.remove("day");
    createStars();
    shootingStarInterval = setInterval(createShootingStar, 5000);
    removeClouds(); // Supprime les nuages la nuit
  } else {
    // Mode jour
    body.classList.add("day");
    body.classList.remove("night");
    removeStars(); // Supprime toutes les étoiles
    cloudCount = 0;
    cloudInterval = setInterval(createCloud, 1000); // Crée des nuages le jour
  }
}

// Écoute les changements sur le switch
toggleSwitch.addEventListener("click", updateTheme);

// Initialiser le thème par défaut
updateTheme();

// Fonction pour créer des étoiles
function createStars() {
  const starsContainer = document.querySelector(".stars");

  for (let i = 0; i < 500; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;

    starsContainer.appendChild(star);
  }
}

// Fonction pour créer une étoile filante
function createShootingStar() {
  const starsContainer = document.querySelector(".stars");
  const shootingStar = document.createElement("div");
  shootingStar.classList.add("star");
  shootingStar.style.width = "8px";
  shootingStar.style.height = "8px";
  shootingStar.style.left = "0";
  shootingStar.style.top = `${Math.random() * 100}vh`;
  shootingStar.style.background = "white";
  shootingStar.style.animation = "shooting-star 2s forwards";
  starsContainer.appendChild(shootingStar);

  setTimeout(() => {
    starsContainer.removeChild(shootingStar);
  }, 1000);
}
