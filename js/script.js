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
    }
});


function remplir() {
    const insee = commune.value;
    fetchMeteoByCommune(insee).then(data => {
        console.log(data);
        const informations = data.forecast;

        tempMinElement.innerHTML = informations.tmin;
        tempMaxElement.innerHTML = informations.tmax;
        probaPluieElement.innerHTML = informations.probarain;
        ensoleillementElement.innerHTML = informations.sun_hours;
        longitudeElement.innerHTML = informations.longitude;
        latitudeElement.innerHTML = informations.latitude;
        directionVent.innerHTML = informations.dirwind10m;
        vitesseVent.innerHTML = informations.wind10m;
        cumulPluie.innerHTML = informations.rr10;
        updateVisibility();
        if ( document.getElementById('latitude').checked == false)
            document.getElementById('lat').style.display='none';

        if ( document.getElementById('longitude').checked == false)
            document.getElementById('long').style.display='none';

        if ( document.getElementById('cumul').checked == false)
            document.getElementById('cumPluie').style.display='none';

        if ( document.getElementById('vent').checked == false)
            document.getElementById('ventmoy').style.display='none';

        if ( document.getElementById('dir_vent').checked == false)
            document.getElementById('dirvent').style.display='none';


    });



};

function updateVisibility() {
    if (input.value < maxValue  && codePostale.value || commune.value != 'Sélectionner une commune')
    // Vérifie l'état des cases à cocher et ajuste la visibilité des éléments
    document.getElementById('lat').style.display = document.getElementById('latitude').checked ? 'block' : 'none';
    document.getElementById('long').style.display = document.getElementById('longitude').checked ? 'block' : 'none';
    document.getElementById('cumPluie').style.display = document.getElementById('cumul').checked ? 'block' : 'none';
    document.getElementById('ventmoy').style.display = document.getElementById('vent').checked ? 'block' : 'none';
    document.getElementById('dirvent').style.display = document.getElementById('dir_vent').checked ? 'block' : 'none';
}


