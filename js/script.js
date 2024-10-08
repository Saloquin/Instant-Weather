import { getCommunes, fetchMeteoByCommune } from './api.js';
import { generateCard } from './generator.js';


// Initialisation des variables
const codePostale = document.getElementById('cp');
const commune = document.getElementById('commune');


let cardNode = document.getElementById("cardNode");

//initialisation des checkbox dans le localstorage
const checkboxes = ['latitude', 'longitude', 'cumul', 'vent', 'dir_vent'];



document.addEventListener("DOMContentLoaded", () => {

    codePostale.addEventListener("blur", function () {
        const codepostal = this.value;

        commune.innerHTML = '';
        commune.innerHTML = '<option selected disabled >Sélectionner une commune</option>';

        if (!codepostal || codepostal.length !== 5) {
            return;
        }

        getCommunes(codepostal).then(data => {

            // Add new options
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.code;
                option.text = item.nom;
                commune.appendChild(option);
            });
        });
    });

    checkboxes.forEach(id => {
        const checkbox = document.getElementById(id);
        if (!localStorage.getItem(id)) {
            localStorage.setItem(id, checkbox.checked);
        }
        else {
            checkbox.checked = localStorage.getItem(id) === 'true';
        }
        checkbox.addEventListener('change', () => {
            localStorage.setItem(id, checkbox.checked);
        });
    });



});

document.getElementById('submit').addEventListener('click', function () {
    const input = document.getElementById('nbjour');
    const maxValue = 7;

    if (input.value > maxValue || !codePostale.value || commune.value == 'Sélectionner une commune') {
        alert(`Le nombre de jour ne doit pas dépasser ${maxValue}. et tout les champs doivent être remplit`);
    } else {
        remplir(input.value);
    }
});


function remplir(jours) {
    const insee = commune.value;
    fetchMeteoByCommune(insee).then(data => {

        cardNode.innerHTML = '';
        for (let i = 0; i < jours; i++) {
            const card = generateCard(data.city, data.forecast[i]);
            const newCard = document.createElement('div');
            newCard.className = "flex gap-2 justify-center items-center p-3 sm:p-0";
            newCard.innerHTML = card;
            cardNode.appendChild(newCard);

        }


    });



};




const cloudsContainer = document.querySelector('.clouds');
const MAX_CLOUDS = 100; // Limite le nombre de nuages
let cloudCount = 0; // Compteur de nuages

function createCloud() {
    if (cloudCount < MAX_CLOUDS) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');
        let proba = Math.random()
        let isLelyan = proba < 0.2;
        let isAlix = proba < 0.4;
        let isClement = proba <0.6;
        let isCadiou = proba <0.8;
        let isCam = proba < 1;
        if (isLelyan) {
            cloud.style.backgroundImage = "url('assets/lelyan.jpeg')";
            cloud.style.width = '90px';
            cloud.style.height = '90px';
        }
        else if (isAlix) {
            cloud.style.backgroundImage = "url('assets/alix.jpeg')";
            cloud.style.width = '150px';
            cloud.style.height = '100px';
        }
        else if (isClement) {
            cloud.style.backgroundImage = "url('assets/clement.JPG')";
            cloud.style.width = '150px';
            cloud.style.height = '100px';
        }
        else if (isCadiou) {
            cloud.style.backgroundImage = "url('assets/cadiou.jpeg')";
            cloud.style.width = '150px';
            cloud.style.height = '100px';
        }
        else if (isCam) {
            cloud.style.backgroundImage = "url('assets/cam.jpg')";
            cloud.style.width = '150px';
            cloud.style.height = '100px';
        } 

        else {
            cloud.style.width = Math.random() * 200 + 100 + 'px';
            cloud.style.height = Math.random() * 100 + 50 + 'px';
            cloud.style.background = 'white';
        }

        cloud.style.left = '-200px'; // Commence à l'extérieur de l'écran
        cloud.style.top = Math.random() * 100 + 'vh'; // Position verticale aléatoire
        cloud.style.animationDuration = Math.random() * 20 + 10 + 's'; // Durée d'animation aléatoire

        cloudsContainer.appendChild(cloud);
        cloudCount++;

        cloud.addEventListener('animationend', () => {
            cloudsContainer.removeChild(cloud);
            cloudCount--;
        });
    }
}


const toggleSwitch = document.getElementById('toggleSwitch');
const body = document.body;

let shootingStarInterval;
let cloudInterval;

function removeStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => star.remove());
}

function removeClouds() {
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach(cloud => cloud.remove());
}

function updateTheme() {
    // Nettoyer les intervalles existants
    clearInterval(shootingStarInterval);
    clearInterval(cloudInterval);

    if (toggleSwitch.checked) {
        // Mode nuit
        body.classList.add('night');
        body.classList.remove('day');
        createStars();
        shootingStarInterval = setInterval(createShootingStar, 5000);
        removeClouds(); // Supprime les nuages la nuit
    } else {
        // Mode jour
        body.classList.add('day');
        body.classList.remove('night');
        removeStars(); // Supprime toutes les étoiles
        cloudInterval = setInterval(createCloud, 300); // Crée des nuages le jour
    }
}

// Écoute les changements sur le switch
toggleSwitch.addEventListener('change', updateTheme);

// Initialiser le thème par défaut
updateTheme();

function createStars() {
    const starsContainer = document.querySelector('.stars');

    for (let i = 0; i < 500; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;

        starsContainer.appendChild(star);
    }
}

function createShootingStar() {
    const starsContainer = document.querySelector('.stars');
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('star');
    shootingStar.style.width = '8px';
    shootingStar.style.height = '8px';
    shootingStar.style.left = '0';
    shootingStar.style.top = `${Math.random() * 100}vh`;
    shootingStar.style.background = 'white';
    shootingStar.style.animation = 'shooting-star 2s forwards';
    starsContainer.appendChild(shootingStar);

    setTimeout(() => {
        starsContainer.removeChild(shootingStar);
    }, 1000);
}

toggleSwitch.addEventListener("click", 
    switchMode
);

function switchMode() {
    let moon = document.getElementById("moon");
    if (moon.className == "moon") {
        moon.className = "sun";
    }
    else {
        moon.className = "moon";
    }
}



