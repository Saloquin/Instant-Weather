import { getCommunes, fetchMeteoByCommune } from './api.js';

const codePostale = document.getElementById('cp');
const commune = document.getElementById('commune');
const submit = document.getElementById('submit');

//informations méteo 
const tempMinElement = document.getElementById("temp_min");
const tempMaxElement = document.getElementById("temp_max");
const probaPluieElement = document.getElementById("proba_pluie");
const ensoleillementElement = document.getElementById("ensoleiment");

document.addEventListener("DOMContentLoaded", () => {

    codePostale.addEventListener("blur", function () {
        const codepostal = this.value;

        commune.innerHTML = '';
        commune.innerHTML = '<option selected disabled >Sélectionner une commune</option>';

        if(!codepostal || codepostal.length !== 5){
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


    submit.addEventListener("click", function () {
        const insee = commune.value;
        fetchMeteoByCommune(insee).then(data => {
            console.log(data);
           const informations = data.forecast;

              tempMinElement.innerHTML = informations.tmin;
                tempMaxElement.innerHTML = informations.tmax;
                probaPluieElement.innerHTML = informations.probarain;
                ensoleillementElement.innerHTML = informations.sun_hours;


        });



    });


});
