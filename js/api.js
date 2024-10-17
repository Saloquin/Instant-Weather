const API_ADRESSE_URL = 'https://geo.api.gouv.fr/communes?';
const API_METEO_URL = 'https://api.meteo-concept.com/api/forecast/daily?';
const TOKEN = '638bcaada1e24b2821c0115ca75de38abe29ceab9b5b355c01245e876ef7f2be'

export const getCommunes = async (codepostal) => {

    try {
        const response = await fetch(`${API_ADRESSE_URL}codePostal=${codepostal}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
}

export const fetchMeteoByCommune = async (commune) => {
    try{
        const response = await fetch(`${API_METEO_URL}token=${TOKEN}&insee=${commune}`);
        const data = await response.json();
        if(!data.code)
            data.code = response.status;
        return data;
    }
    catch (error){
        console.error('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
}


console.log('API loaded');
