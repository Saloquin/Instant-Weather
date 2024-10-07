import { getCommunes, fetchMeteoByCommune } from './api.js';

const codePostale = document.getElementById('cp');
const commune = document.getElementById('commune');
const submit = document.getElementById('submit');




//informations méteo 
const tempMinElement = document.getElementById("temp_min");
const tempMaxElement = document.getElementById("temp_max");
const probaPluieElement = document.getElementById("proba_pluie");
const ensoleillementElement = document.getElementById("ensoleiment");
const latitudeElement = document.getElementById("latitude_info");
const longitudeElement = document.getElementById("longitude_info");
const directionVent = document.getElementById("dir_vent_info");
const vitesseVent = document.getElementById("vent_info");
const cumulPluie = document.getElementById("pluie_info");
const lieu = document.getElementById("lieu");
const date = document.getElementById("date");

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





});

document.getElementById('submit').addEventListener('click', function () {
    const input = document.getElementById('nbjour');
    const maxValue = 7;

    if (input.value > maxValue || !codePostale.value || commune.value == 'Sélectionner une commune') {
        alert(`Le nombre de jour ne doit pas dépasser ${maxValue}. et tout les champs doivent être remplit`);
    } else {
        remplir();
        updateVisibility();
    }
});


function remplir() {
    const insee = commune.value;
    fetchMeteoByCommune(insee).then(data => {
        console.log(data);
        const informations = data.forecast;

        const dateform = new Date(informations.datetime);
        const formattedDate = dateform.toLocaleDateString();

        tempMinElement.textContent = informations.tmin;
        tempMaxElement.textContent = informations.tmax;
        probaPluieElement.textContent = informations.probarain;
        ensoleillementElement.textContent = informations.sun_hours;
        longitudeElement.textContent = informations.longitude;
        latitudeElement.textContent = informations.latitude;
        directionVent.textContent = informations.dirwind10m;
        vitesseVent.textContent = informations.wind10m;
        cumulPluie.textContent = informations.rr10;
        lieu.textContent = data.city.name;
        date.textContent = formattedDate;


    });



};

function updateVisibility() {
    document.getElementById('lat').style.display = document.getElementById('latitude').checked ? 'block' : 'none';
    document.getElementById('long').style.display = document.getElementById('longitude').checked ? 'block' : 'none';
    document.getElementById('cumPluie').style.display = document.getElementById('cumul').checked ? 'block' : 'none';
    document.getElementById('ventmoy').style.display = document.getElementById('vent').checked ? 'block' : 'none';
    document.getElementById('dirvent').style.display = document.getElementById('dir_vent').checked ? 'block' : 'none';
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


