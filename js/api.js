const API_ADRESSE_URL = 'https://geo.api.gouv.fr/communes?';
const API_METEO_URL = 'https://api.meteo-concept.com/api/forecast/daily/0?';
const TOKEN = '638bcaada1e24b2821c0115ca75de38abe29ceab9b5b355c01245e876ef7f2be'

export const getCommunes = async (codepostal) =>{
    const response = await fetch(`${API_ADRESSE_URL}codePostal=${codepostal}`);
    const data = await response.json();
    return data;
}

export const fetchMeteoByCommune = async (commune) => {
    const response = await fetch(`${API_METEO_URL}token=${TOKEN}&insee=${commune}`);
    const data = await response.json();
    return data;
}


console.log('API loaded');

/*
const reponse = getCommunes(14210).then(data => {
    console.log(data);
});
*/