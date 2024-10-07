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
const imageMeteo = document.getElementById("imageMeteo");

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
        getImageWeather(informations.weather);

    });



};

function updateVisibility() {
    document.getElementById('lat').style.display = document.getElementById('latitude').checked ? 'block' : 'none';
    document.getElementById('long').style.display = document.getElementById('longitude').checked ? 'block' : 'none';
    document.getElementById('cumPluie').style.display = document.getElementById('cumul').checked ? 'block' : 'none';
    document.getElementById('ventmoy').style.display = document.getElementById('vent').checked ? 'block' : 'none';
    document.getElementById('dirvent').style.display = document.getElementById('dir_vent').checked ? 'block' : 'none';
}

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


