//const { Script } = require("vm");
const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
const food = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => food.push(...data));

function findMatches(wordToMatch, food) {
  return food.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.name.match(regex) 
  });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const matchArray = findMatches(this.value, food);
    const html = matchArray.map(place => {
      const regex = new RegExp(this.value, 'gi');
      const restaurantName = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
      return `
        <li>
          <span class="name">${restaurantName}</span>
        </li>
      `;
    }).join('');
    suggestions.innerHTML = html;
  }

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
