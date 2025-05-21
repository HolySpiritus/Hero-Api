const searchButton = document.getElementById('search-button');
const heroInput = document.getElementById('hero-input');
const heroContainer = document.getElementById('hero-container');

const apiKey = '33ad30e5bc947637fa30ffb0020edacc'; 


async function fetchHero() {
    const heroTitle = heroInput.value.trim();

    if (!heroTitle) {
        alert('Please enter a hero title.');
        return;
    }

    try {
        const response = await fetch(`https://superheroapi.com/api.php/${apiKey}/search/${heroTitle}`);
        const data = await response.json();

        if (data.results.length === 0) {
            heroContainer.innerHTML = '<p>Hero not found. Try another name!</p>';
        } else {
            displayHero(data.results[0]);
        }
    } catch (error) {
        console.error('Error fetching hero data:', error);
        heroContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
}

// Function to display hero information
function displayHero(hero) {
    heroContainer.innerHTML = `
        <div style="text-align: center; color: white;">
            <img src="${hero.image.url}" alt="${hero.name}" style="max-width: 200px; height: auto;" />
            <h2>${hero.name}</h2>
            <p>Name: ${hero.biography['full-name']}</p>
            <p>Intelligence: ${hero.powerstats.intelligence}</p>
            <p>Strength: ${hero.powerstats.strength}</p>
            <p>Speed: ${hero.powerstats.speed}</p>
            <p>Durability: ${hero.powerstats.durability}</p>
            <p>Power: ${hero.powerstats.power}</p>
            <p>Combat: ${hero.powerstats.combat}</p>
        </div>
    `;
}

searchButton.addEventListener('click', fetchHero);


function toggleMenu() {
  var menu = document.getElementById("menu");

  if (menu.className === "menu") {
    menu.className += " responsive"; 
  } else {
    menu.className = "menu"; 
  }
}
