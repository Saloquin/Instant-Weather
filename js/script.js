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
        if(!localStorage.getItem(id)) {
            localStorage.setItem(id, checkbox.checked);
        }
        else{
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
            newCard.className = "flex w-1/3 gap-2 justify-center items-center";
            newCard.innerHTML = card;
            cardNode.appendChild(newCard);
        }

    });



};


function getImageWeather(meteo){
    if(meteo >= 100 && meteo <= 138){
        imageMeteo.src = "assets/orage.png";
    }
    else if(meteo == 20 || meteo == 60){
        imageMeteo.src = "assets/pluie_parti_enso.png";
    }
    else if((meteo >= 20 && meteo <= 22) || (meteo >= 220 && meteo <= 235)){
        imageMeteo.src = "assets/neige.png";
    }
    else if(meteo >= 60 && meteo <= 68){
        imageMeteo.src = "assets/neige.png";
    }
    else if(meteo == 0){
        imageMeteo.src = "assets/soleil.png";
    }
    else if (meteo >= 1 && meteo <= 7){
        imageMeteo.src = "assets/nuageux_parti_enso.png"
    }
    else if(meteo == 10 || meteo == 13 || meteo == 40 || meteo == 43 || meteo == 46 ||meteo == 70 || meteo == 73 || meteo == 76 || meteo == 210){
        imageMeteo.src = "assets/pluie_parti_enso.png"
    }
    else if(meteo == 11 || meteo == 14 || meteo == 41 ||meteo == 44 ||meteo == 47 || meteo == 71 || meteo == 74 || meteo == 77 || meteo == 211){
        imageMeteo.src = "assets/pluie_vent.png"
    }
    else if(meteo == 12 || meteo == 15 ||meteo == 42 || meteo == 45 || meteo == 48 ||meteo == 72 || meteo == 75 || meteo == 78 || meteo == 212){
        imageMeteo.src = "assets/grossepluie.png"
    }
    else{
        imageMeteo.src = "assets/vent.png"
    }
}

const cloudsContainer = document.querySelector('.clouds');
const MAX_CLOUDS = 10; // Limite le nombre de nuages
let cloudCount = 0; // Compteur de nuages

function createCloud() {
    if (cloudCount < MAX_CLOUDS) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');
        let proba =Math.random() 
        let isBunnyCloud = proba < 0.05; 
        let iscamouCloud = proba < 0.001;
        if (iscamouCloud) {
            cloud.style.backgroundImage = "url('asset/camou.png')";
            cloud.style.width = '90px'; 
            cloud.style.height = '90px'; 
        }else if (isBunnyCloud) {
            cloud.style.backgroundImage = "url('asset/lapin.png')";
            cloud.style.width = '150px'; 
            cloud.style.height = '100px'; 
        } else {
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




const currentHour = new Date().getHours();
const body = document.body;

if (currentHour >= 19 || currentHour < 6) {
    body.classList.add('night');
    body.classList.remove('day');
    createStars();
    setInterval(createShootingStar, 5000);
} else {
    body.classList.add('day');
    body.classList.remove('night');
    setInterval(createCloud, 3000); 
}

function createStars() {
    const starsContainer = document.querySelector('.stars');
    
    for (let i = 0; i <500; i++) { // Crée 100 étoiles
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1; // Taille des étoiles aléatoire
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`; // Position horizontale aléatoire
        star.style.top = `${Math.random() * 100}vh`; // Position verticale aléatoire

        starsContainer.appendChild(star);
    }
}

function createShootingStar() {
    const starsContainer = document.querySelector('.stars');
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('star');
    shootingStar.style.width = '8px';
    shootingStar.style.height = '8px';
    shootingStar.style.left = 0;
    shootingStar.style.top = `${Math.random() * 100}vh`;
    shootingStar.style.background = 'white';
    shootingStar.style.animation = 'shooting-star 2s forwards';
    starsContainer.appendChild(shootingStar);

    // Supprimer l'étoile filante après l'animation
    setTimeout(() => {
        starsContainer.removeChild(shootingStar);
    }, 1000); // Correspond à la durée de l'animation
}


