document.addEventListener('DOMContentLoaded', () => {
    const communeSelect = document.getElementById('commune-select');

    // Récupérer les communes selon le code postal
    document.getElementById('postal-code').addEventListener('blur', async function() {
        const postalCode = this.value;
        if (postalCode) {
            const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${postalCode}`);
            const communes = await response.json();
            communeSelect.innerHTML = '<option value="">Sélectionnez une commune</option>'; // Réinitialiser le menu
            communes.forEach(commune => {
                const option = document.createElement('option');
                option.value = commune.code; // Utiliser le code INSEE pour l'API météo
                option.textContent = commune.nom; // Nom de la commune
                communeSelect.appendChild(option);
            });
        } else {
            communeSelect.innerHTML = '<option value="">Sélectionnez une commune</option>'; // Réinitialiser si pas de code postal
        }
    });

    // Gérer l'envoi du formulaire
    document.getElementById('weather-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const selectedCommune = communeSelect.value;

        // Appel à l'API MétéoConcept
        const response = await fetch(`https://api.meteo-concept.com/api/forecast?token=YOUR_TOKEN&insee=${selectedCommune}`);
        const data = await response.json();

        // Affichage des résultats
        displayWeather(data);
    });
});

// Fonction pour afficher les résultats
function displayWeather(data) {
    const resultsDiv = document.getElementById('weather-results');
    resultsDiv.innerHTML = ''; // Réinitialiser les résultats

    const forecast = data.forecast[0]; // Prendre la première journée pour la version de base
    const card = document.createElement('div');
    card.classList.add('weather-card');

    card.innerHTML = `
        <h2>${forecast.date}</h2>
        <p>Température minimale : ${forecast.tmin} °C</p>
        <p>Température maximale : ${forecast.tmax} °C</p>
        <p>Probabilité de pluie : ${forecast.proba} %</p>
        <p>Heures d'ensoleillement : ${forecast.ensoleillement} heures</p>
    `;

    resultsDiv.appendChild(card);
}
