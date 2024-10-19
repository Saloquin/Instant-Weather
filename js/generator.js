// Importation de la fonction generateCard depuis le fichier generatorCard.js
import { generateCard } from "./generatorCard.js";

// Fonction pour générer le carousel avec les cartes météo
export const generator = (city, forecast, jours) => {
  let cards = [];

  // Génération des cartes pour chaque jour
  for (let i = 0; i < jours; i++) {
    const card = generateCard(city, forecast[i]);
    cards.push(card);
  }

  let carouselItems = "";

  // Création des éléments du carousel
  for (let i = 0; i < cards.length; i++) {
    carouselItems += `
        <div class="${
          i === 0 ? "" : "hidden"
        } duration-700 ease-in-out" data-carousel-item>
            ${cards[i]}
        </div>
        `;
  }

  // HTML du carousel
  const carouselHTML = `
    <div id="default-carousel" class="relative w-[100%] sm:w-[50%] p-5 pb-32" data-carousel="static">
        <!-- Carousel wrapper -->
        <div class="relative h-56 rounded-lg md:h-96">
            <!-- Items -->
            ${carouselItems}
        </div>
        <!-- Slider controls -->
        <button type="button" class=" align-middle absolute top-0  start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev id="preview">
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
                <span class="sr-only">Previous</span>
            </span>
        </button>
        <button type="button" class=" align-middle absolute top-0  end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next id="next">
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span class="sr-only">Next</span>
            </span>
        </button>s
    </div>
    `;

  // Insertion du carousel dans le DOM
  cardNode.innerHTML = carouselHTML;

  let currentIndex = 0;
  const carouselItemsElements = document.querySelectorAll(
    "[data-carousel-item]"
  );

  // Fonction pour changer l'élément du carousel affiché
  function switchCarouselItem(newIndex) {
    // Masquer l'élément actuel
    carouselItemsElements[currentIndex].classList.add("hidden");

    // Afficher le nouvel élément
    currentIndex = newIndex;
    carouselItemsElements[currentIndex].classList.remove("hidden");
  }

  console.log("carouselItemsElements", carouselItemsElements);
  document.getElementById("preview").addEventListener("click", () => {
    console.log("preview");
    switchCarouselItem(
      (currentIndex - 1 + carouselItemsElements.length) %
        carouselItemsElements.length
    );
  });

  document.getElementById("next").addEventListener("click", () => {
    console.log("next");
    switchCarouselItem((currentIndex + 1) % carouselItemsElements.length);
  });

  const carouselIndicatorsElements = document.querySelectorAll(
    "[data-carousel-slide-to]"
  );
  carouselIndicatorsElements.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      switchCarouselItem(index);
    });
  });

  return carouselHTML;
};
