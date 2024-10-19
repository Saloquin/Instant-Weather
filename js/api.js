// URL de l'API pour obtenir les informations des communes
const API_ADRESSE_URL = "https://geo.api.gouv.fr/communes?";
// URL de l'API pour obtenir les prévisions météorologiques
const API_METEO_URL = "https://api.meteo-concept.com/api/forecast/daily?";
// Token d'authentification pour l'API météo
const TOKEN =
  "638bcaada1e24b2821c0115ca75de38abe29ceab9b5b355c01245e876ef7f2be";

// Fonction pour obtenir les communes en fonction du code postal
export const getCommunes = async (codepostal) => {
  try {
    // Requête à l'API pour obtenir les communes
    const response = await fetch(`${API_ADRESSE_URL}codePostal=${codepostal}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Une erreur est survenue. Veuillez réessayer plus tard.");
  }
};

// Fonction pour obtenir les prévisions météorologiques d'une commune
export const fetchMeteoByCommune = async (commune) => {
  try {
    // Requête à l'API pour obtenir les prévisions météorologiques
    const response = await fetch(
      `${API_METEO_URL}token=${TOKEN}&insee=${commune}`
    );
    const data = await response.json();
    // Ajout du code de statut à la réponse si absent
    if (!data.code) data.code = response.status;
    return data;
  } catch (error) {
    console.error("Une erreur est survenue. Veuillez réessayer plus tard.");
  }
};

// Message de confirmation que l'API est chargée
console.log("API loaded");
