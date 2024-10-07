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


