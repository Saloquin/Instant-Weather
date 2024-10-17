export const generateCard = (city, forecast) => {
    const informations = forecast;
    const dateform = new Date(informations.datetime);
    const formattedDate = dateform.toLocaleDateString();

    let latitudeChecked = localStorage.getItem('latitude') === 'true';
    let longitudeChecked = localStorage.getItem('longitude') === 'true';
    let cumulChecked = localStorage.getItem('cumul') === 'true';
    let ventChecked = localStorage.getItem('vent') === 'true';
    let dirVentChecked = localStorage.getItem('dir_vent') === 'true';

    return `
    <div class="flex gap-2 w-full justify-center items-center">
    <div class="bg-gradient-to-b from-blue-600 to-blue-200 text-white rounded-lg p-4 w-full sm:w-4/5 md:w-full shadow-lg">
        <div class="text-center font-bold text-lg mb-2 font-medium">
            <p><span id="lieu">${city.name}</span> - <span id="date">${formattedDate}</span></p>
        </div>
        <div class="flex items-center mb-4">
            <img id="imageMeteo" src="${getImageWeather(informations.weather)}" alt="temps du jour" class="mr-6 rounded w-1/3">
            <div class="flex flex-col text-lg mb-4 ml-16">
                <p>T min : <span id="temp_min" class="font-medium">${informations.tmin}</span> °C</p>
                <p>T max : <span id="temp_max" class="font-medium">${informations.tmax}</span> °C</p>
            </div>
        </div>
        <div class="text-sm bg-white p-4 rounded-lg shadow-md">
            <div class="grid md:grid-cols-2 gap-2">
                <div class="text-sky-700 font-medium">
                    <p><i class="fa-solid fa-sun"></i> Ensoleillement : <span id="ensoleiment">${informations.sun_hours}</span> h </p>
                </div>
                <div class="text-sky-700 font-medium">
                    <p><i class="fa-solid fa-droplet"></i> Probabilité de pluie : <span id="proba_pluie">${informations.probarain}</span>%</p>
                </div>
                <div class="text-sky-700 font-medium ${latitudeChecked ? 'block' : 'hidden'}">
                    <p id='lat'><i class="fa-solid fa-compass"></i> Latitude : <span id="latitude_info">${informations.latitude}</span></p>
                </div>
                <div class="text-sky-700 font-medium ${longitudeChecked ? 'block' : 'hidden'}">
                    <p id='long'><i class="fa-solid fa-compass"></i> Longitude : <span id="longitude_info">${informations.longitude}</span></p>
                </div>
                <div class="text-sky-700 font-medium ${dirVentChecked ? 'block' : 'hidden'}">
                    <p id='dirvent'>Direction du vent : <span id="dir_vent_info">${informations.dirwind10m}</span>° <i class="fa-solid fa-wind"></i></p>
                </div>
                <div class="text-sky-700 font-medium ${cumulChecked ? 'block' : 'hidden'}">
                    <p id='cumPluie'><i class="fa-solid fa-droplet"></i> Cumul pluie : <span id="pluie_info">${informations.rr10}</span> mm</p>
                </div>
            </div>
            <div class="text-sky-700 font-medium colspan-2 mt-2 item-center justify-center flex ${ventChecked ? 'block' : 'hidden'}">
                <p id='ventmoy'>Vent moyen (10m) : <span id="vent_info">${informations.wind10m}</span> km/h <i class="fa-solid fa-wind"></i></p>
            </div>
        </div>
    </div>
</div>

    `;
}

function getImageWeather(meteo) {
    if (meteo >= 100 && meteo <= 138) {
        return "assets/orage.png";
    }
    else if (meteo == 20 || meteo == 60) {
        return "assets/pluie_parti_enso.png";
    }
    else if ((meteo >= 20 && meteo <= 22) || (meteo >= 220 && meteo <= 235)) {
        return "assets/neige.png";
    }
    else if (meteo >= 60 && meteo <= 68) {
        return "assets/neige.png";
    }
    else if (meteo == 0) {
        return "assets/soleil.png";
    }
    else if (meteo >= 1 && meteo <= 7) {
        return "assets/nuageux_parti_enso.png"
    }
    else if (meteo == 10 || meteo == 13 || meteo == 40 || meteo == 43 || meteo == 46 || meteo == 70 || meteo == 73 || meteo == 76 || meteo == 210) {
        return "assets/pluie_parti_enso.png"
    }
    else if (meteo == 11 || meteo == 14 || meteo == 41 || meteo == 44 || meteo == 47 || meteo == 71 || meteo == 74 || meteo == 77 || meteo == 211) {
        return "assets/pluie_vent.png"
    }
    else if (meteo == 12 || meteo == 15 || meteo == 42 || meteo == 45 || meteo == 48 || meteo == 72 || meteo == 75 || meteo == 78 || meteo == 212) {
        return "assets/grossepluie.png"
    }
    else {
        return "assets/vent.png"
    }

}