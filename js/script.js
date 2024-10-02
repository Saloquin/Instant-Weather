const codePostale = document.getElementById('cp');
const commune = document.getElementById('commune');

document.addEventListener("DOMContentLoaded", () => {

    codePostale.addEventListener("blur", async function () {
        const codepostal = this.value;
        getCommunes(codepostal).then(data => {
            // Clear the select options
            commune.innerHTML = '';

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