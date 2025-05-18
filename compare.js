const apiKey = '33ad30e5bc947637fa30ffb0020edacc';
const API_URL = `https://superheroapi.com/api.php/${apiKey}/search/`;

let selectedHero1 = null;
let selectedHero2 = null;

async function searchHero(query, resultsDiv, selectHeroCallback) {
    if (!query) {
        resultsDiv.innerHTML = '';
        return;
    }
    try {
        const res = await fetch(API_URL + encodeURIComponent(query));
        const data = await res.json();
        if (data.response === "success") {
            resultsDiv.innerHTML = data.results.map(hero =>
                `<div class="result-item" data-id="${hero.id}">${hero.name}</div>`
            ).join('');
            resultsDiv.querySelectorAll('.result-item').forEach(item => {
                item.onclick = () => {
                    const hero = data.results.find(h => h.id === item.dataset.id);
                    selectHeroCallback(hero);
                    resultsDiv.innerHTML = '';
                };
            });
        } else {
            resultsDiv.innerHTML = '<div>No results</div>';
        }
    } catch (err) {
        resultsDiv.innerHTML = '<div>Error fetching results</div>';
    }
}

document.getElementById('search1').addEventListener('input', function() {
    searchHero(this.value, document.getElementById('results1'), hero => {
        selectedHero1 = hero;
        this.value = hero.name;
    });
});

document.getElementById('search2').addEventListener('input', function() {
    searchHero(this.value, document.getElementById('results2'), hero => {
        selectedHero2 = hero;
        this.value = hero.name;
    });
});

document.getElementById('compare-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const resultDiv = document.getElementById('comparison-result');
    if (!selectedHero1 || !selectedHero2) {
        resultDiv.textContent = "Please select two heroes.";
        return;
    }
    if (selectedHero1.id === selectedHero2.id) {
        resultDiv.textContent = "Please select two different heroes.";
        return;
    }
resultDiv.innerHTML = `
    <h3 style="font-size:2em; margin-bottom: 20px;">${selectedHero1.name} vs ${selectedHero2.name}</h3>
    <div style="display:flex;justify-content:space-around;align-items:center;gap:40px;">
        <div style="text-align:center;">
            <img src="${selectedHero1.image.url}" width="220" height="220" style="object-fit:cover; border-radius:10px;"><br>
            <strong style="font-size:1.5em;">${selectedHero1.name}</strong>
            <div style="font-size:1.2em; margin-top:10px;">Power: ${selectedHero1.powerstats.power}</div>
            <div style="font-size:1.2em;">Strength: ${selectedHero1.powerstats.strength}</div>
            <div style="font-size:1.2em;">Speed: ${selectedHero1.powerstats.speed}</div>
        </div>
        <div style="text-align:center;">
            <img src="${selectedHero2.image.url}" width="220" height="220" style="object-fit:cover; border-radius:10px;"><br>
            <strong style="font-size:1.5em;">${selectedHero2.name}</strong>
            <div style="font-size:1.2em; margin-top:10px;">Power: ${selectedHero2.powerstats.power}</div>
            <div style="font-size:1.2em;">Strength: ${selectedHero2.powerstats.strength}</div>
            <div style="font-size:1.2em;">Speed: ${selectedHero2.powerstats.speed}</div>
        </div>
    </div>
`;
});