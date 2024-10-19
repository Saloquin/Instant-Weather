// Dictionnaire pour convertir les jours de la semaine de l'anglais au français
const englishToFrenchDays = {
  0: "Dimanche",
  1: "Lundi",
  2: "Mardi",
  3: "Mercredi",
  4: "Jeudi",
  5: "Vendredi",
  6: "Samedi",
};

// Fonction pour obtenir l'image correspondant au type de météo
function getImageWeather(meteo) {
  if (meteo >= 100 && meteo <= 138) {
    return "assets/orage.png";
  } else if (meteo == 20 || meteo == 60) {
    return "assets/pluie_parti_enso.png";
  } else if ((meteo >= 20 && meteo <= 22) || (meteo >= 220 && meteo <= 235)) {
    return "assets/neige.png";
  } else if (meteo >= 60 && meteo <= 68) {
    return "assets/neige.png";
  } else if (meteo == 0) {
    return "assets/soleil.png";
  } else if (meteo >= 1 && meteo <= 7) {
    return "assets/nuageux_parti_enso.png";
  } else if (
    meteo == 10 ||
    meteo == 13 ||
    meteo == 40 ||
    meteo == 43 ||
    meteo == 46 ||
    meteo == 70 ||
    meteo == 73 ||
    meteo == 76 ||
    meteo == 210
  ) {
    return "assets/pluie_parti_enso.png";
  } else if (
    meteo == 11 ||
    meteo == 14 ||
    meteo == 41 ||
    meteo == 44 ||
    meteo == 47 ||
    meteo == 71 ||
    meteo == 74 ||
    meteo == 77 ||
    meteo == 211
  ) {
    return "assets/pluie_vent.png";
  } else if (
    meteo == 12 ||
    meteo == 15 ||
    meteo == 42 ||
    meteo == 45 ||
    meteo == 48 ||
    meteo == 72 ||
    meteo == 75 ||
    meteo == 78 ||
    meteo == 212
  ) {
    return "assets/grossepluie.png";
  } else {
    return "assets/vent.png";
  }
}

// Fonction pour générer une carte météo pour une ville donnée et une prévision
export const generateCard = (city, forecast) => {
  const informations = forecast;
  const dateform = new Date(informations.datetime);
  const formattedDate = dateform.toLocaleDateString();
  const jourActuel = englishToFrenchDays[dateform.getDay()];

  // Vérification des préférences utilisateur pour l'affichage des informations
  let latitudeChecked = localStorage.getItem("latitude") === "true";
  let longitudeChecked = localStorage.getItem("longitude") === "true";
  let cumulChecked = localStorage.getItem("cumul") === "true";
  let ventChecked = localStorage.getItem("vent") === "true";
  let dirVentChecked = localStorage.getItem("dir_vent") === "true";

  return `
    <div class="flex gap-2 w-full justify-center items-center">
        <div class="bg-gradient-to-b from-blue-600 to-blue-200 text-white rounded-lg p-4 w-full sm:w-4/5 md:w-full shadow-lg">
            <div class="text-center font-bold text-lg mb-2 font-medium">
                <p>${jourActuel}</p>
            </div>    
            <div class="text-center font-bold text-lg mb-2 font-medium">
                <p><span id="lieu">${
                  city.name
                }</span> - <span id="date">${formattedDate}</span></p>
            </div>
            <div class="flex items-center mb-0">
                <img id="imageMeteo" src="${getImageWeather(
                  informations.weather
                )}" alt="temps du jour" class="mr-6 rounded w-1/3">
                <div class="flex flex-col text-lg ml-12">
                    <p class="font-bold sm:mb-5"> ${FdonneTemps(
                      informations.weather
                    )}</p>
                    <p>T min : <span id="temp_min" class="font-medium">${
                      informations.tmin
                    }</span> °C</p>
                    <p>T max : <span id="temp_max" class="font-medium">${
                      informations.tmax
                    }</span> °C</p>
                </div>
            </div>
            <div class="text-sm bg-white p-4 rounded-lg shadow-md">
                <div class="grid md:grid-cols-2 gap-2">
                    <div class="text-sky-700 font-medium">
                        <p><i class="fa-solid fa-sun"></i> Ensoleillement : <span id="ensoleiment">${
                          informations.sun_hours
                        }</span> h </p>
                    </div>
                    <div class="text-sky-700 font-medium">
                        <p><i class="fa-solid fa-droplet"></i> Probabilité de pluie : <span id="proba_pluie">${
                          informations.probarain
                        }</span>%</p>
                    </div>
                    <div class="text-sky-700 font-medium ${
                      latitudeChecked ? "block" : "hidden"
                    }">
                        <p id='lat'><i class="fa-solid fa-compass"></i> Latitude : <span id="latitude_info">${
                          informations.latitude
                        }</span></p>
                    </div>
                    <div class="text-sky-700 font-medium ${
                      longitudeChecked ? "block" : "hidden"
                    }">
                        <p id='long'><i class="fa-solid fa-compass"></i> Longitude : <span id="longitude_info">${
                          informations.longitude
                        }</span></p>
                    </div>
                    <div class="text-sky-700 font-medium ${
                      dirVentChecked ? "block" : "hidden"
                    }">
                        <p id='dirvent'>Direction du vent : <span id="dir_vent_info">${
                          informations.dirwind10m
                        }</span>° <i class="fa-solid fa-wind"></i></p>
                    </div>
                    <div class="text-sky-700 font-medium ${
                      cumulChecked ? "block" : "hidden"
                    }">
                        <p id='cumPluie'><i class="fa-solid fa-droplet"></i> Cumul pluie : <span id="pluie_info">${
                          informations.rr10
                        }</span> mm</p>
                    </div>
                </div>
                <div class="text-sky-700 font-medium colspan-2 mt-2 flex items-center justify-start ${
                  ventChecked ? "block" : "hidden"
                }">
                    <p id='ventmoy'>Vent moyen (10m) : <span id="vent_info">${
                      informations.wind10m
                    }</span> km/h <i class="fa-solid fa-wind"></i></p>
                </div>
            </div>
        </div>
    </div>
    `;
};

// Dictionnaire pour convertir les codes météo en descriptions textuelles
const donneTemps = {
  0: "Soleil",
  1: "Peu nuageux",
  2: "Ciel voilé",
  3: "Nuageux",
  4: "Très nuageux",
  5: "Couvert",
  6: "Brouillard",
  7: "Brouillard givrant",
  10: "Pluie faible",
  11: "Pluie modérée",
  12: "Pluie forte",
  13: "Pluie faible verglaçante",
  14: "Pluie modérée verglaçante",
  15: "Pluie forte verglaçante",
  16: "Bruine",
  20: "Neige faible",
  21: "Neige modérée",
  22: "Neige forte",
  30: "Pluie et neige mêlées faibles",
  31: "Pluie et neige mêlées modérées",
  32: "Pluie et neige mêlées fortes",
  40: "Averses de pluie locales et faibles",
  41: "Averses de pluie locales",
  42: "Averses locales et fortes",
  43: "Averses de pluie faibles",
  44: "Averses de pluie",
  45: "Averses de pluie fortes",
  46: "Averses de pluie faibles et fréquentes",
  47: "Averses de pluie fréquentes",
  48: "Averses de pluie fortes et fréquentes",
  60: "Averses de neige localisées et faibles",
  61: "Averses de neige localisées",
  62: "Averses de neige localisées et fortes",
  63: "Averses de neige faibles",
  64: "Averses de neige",
  65: "Averses de neige fortes",
  66: "Averses de neige faibles et fréquentes",
  67: "Averses de neige fréquentes",
  68: "Averses de neige fortes et fréquentes",
  70: "Averses de pluie et neige mêlées localisées et faibles",
  71: "Averses de pluie et neige mêlées localisées",
  72: "Averses de pluie et neige mêlées localisées et fortes",
  73: "Averses de pluie et neige mêlées faibles",
  74: "Averses de pluie et neige mêlées",
  75: "Averses de pluie et neige mêlées fortes",
  76: "Averses de pluie et neige mêlées faibles et nombreuses",
  77: "Averses de pluie et neige mêlées fréquentes",
  78: "Averses de pluie et neige mêlées fortes et fréquentes",
  100: "Orages faibles et locaux",
  101: "Orages locaux",
  102: "Orages forts et locaux",
  103: "Orages faibles",
  104: "Orages",
  105: "Orages forts",
  106: "Orages faibles et fréquents",
  107: "Orages fréquents",
  108: "Orages forts et fréquents",
  120: "Orages faibles et locaux de neige ou grésil",
  121: "Orages locaux de neige ou grésil",
  122: "Orages forts et locaux de neige ou grésil",
  123: "Orages faibles de neige ou grésil",
  124: "Orages de neige ou grésil",
  125: "Orages forts de neige ou grésil",
  126: "Orages faibles et fréquents de neige ou grésil",
  127: "Orages fréquents de neige ou grésil",
  128: "Orages forts et fréquents de neige ou grésil",
  130: "Orages faibles et locaux de pluie et neige mêlées ou grésil",
  131: "Orages locaux de pluie et neige mêlées ou grésil",
  132: "Orages forts et locaux de pluie et neige mêlées ou grésil",
  133: "Orages faibles de pluie et neige mêlées ou grésil",
  134: "Orages de pluie et neige mêlées ou grésil",
  135: "Orages forts de pluie et neige mêlées ou grésil",
  136: "Orages faibles et fréquents de pluie et neige mêlées ou grésil",
  137: "Orages fréquents de pluie et neige mêlées ou grésil",
  138: "Orages forts et fréquents de pluie et neige mêlées ou grésil",
  140: "Pluies orageuses",
  141: "Pluie et neige mêlées à caractère orageux",
  142: "Neige à caractère orageux",
  210: "Pluie faible intermittente",
  211: "Pluie modérée intermittente",
  212: "Pluie forte intermittente",
  220: "Neige faible intermittente",
  221: "Neige modérée intermittente",
  222: "Neige forte intermittente",
  230: "Pluie et neige mêlées",
  231: "Pluie et neige mêlées",
  232: "Pluie et neige mêlées",
  235: "Averses de grêle",
};

// Fonction pour obtenir la description textuelle de la météo à partir de son code
function FdonneTemps(numero) {
  return donneTemps[numero];
}
