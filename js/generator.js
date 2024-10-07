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
    <div class="bg-gradient-to-b from-blue-600 to-blue-200 text-white rounded-lg p-4 w-full shadow-lg">
        <div class="text-center font-bold text-lg mb-2 font-medium">
            <p><span id="lieu">${city.name}</span> - <span id="date">${formattedDate}</span></p>
        </div>
        <div class="flex items-center  mb-4">
            <img src="" alt="temps du jour" class="mr-6">
            <div class="flex flex-col text-lg mb-4">
                <p  id='temps' class="ml-4 text-lg font-medium"></p>
                <p>T min : <span id="temp_min" class="font-medium">${informations.tmin}</span> °C</p>
                <p>T max : <span id="temp_max" class="font-medium">${informations.tmax}</span> °C</p>
            </div>
        </div>
        <div class="text-sm bg-white p-4 rounded-lg shadow-md">
            <div class="grid md:grid-cols-2 gap-2">
                <div class="text-sky-700 font-medium">
                    <p ><i class="fa-solid fa-sun"></i> Ensoleillement : <span id="ensoleiment">${informations.sun_hours}</span> h </p>
                </div>
                <div class="text-sky-700 font-medium">
                    <p ><i class="fa-solid fa-droplet"></i> Probabilité de pluie : <span id="proba_pluie">${informations.probarain}</span>%</p>
                </div>
                <div class="text-sky-700 font-medium ${latitudeChecked ? 'block' : 'hidden'}">
                    <p id='lat'><i class="fa-solid fa-compass"></i> Latitude : <span id="latitude_info">${informations.latitude}</span></p>
                </div>
                <div class="text-sky-700 font-medium  ${longitudeChecked ? 'block' : 'hidden'}">
                    <p id='long'><i class="fa-solid fa-compass"></i> Longitude : <span id="longitude_info">${informations.longitude}</span></p>
                </div>
                <div class=" text-sky-700 font-medium  ${dirVentChecked ? 'block' : 'hidden'}">
                    <p id='dirvent'>Direction du vent : <span id="dir_vent_info">${informations.dirwind10m}</span>° <i class="fa-solid fa-wind"></i></p>
                </div>
                <div class="text-sky-700 font-medium  ${cumulChecked ? 'block' : 'hidden'}">
                    <p id='cumPluie'><i class="fa-solid fa-droplet"></i> Cumul pluie : <span id="pluie_info">${informations.rr10}</span> mm</p>
                </div>
            </div>
            <div class="text-sky-700 font-medium colspan-2 mt-2 item-center justify-center flex  ${ventChecked ? 'block' : 'hidden'}">
                <p id='ventmoy'>Vent moyen (10m) : <span id="vent_info">${informations.wind10m}</span> km/h <i class="fa-solid fa-wind"></i></p>
            </div>
        </div>
    </div>
</div>
    `;
}