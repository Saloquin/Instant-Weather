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



