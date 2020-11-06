//const { Script } = require("vm");
const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
const food = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => food.push(...data));

function findMatches(wordToMatch, food) {
  return food.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.name.match(regex) || place.category.match(regex)
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
      const categoryName = place.category
      return `
        <li>
          <span class="name">${restaurantName.toUpperCase()}</span> <br>
          <span class="category">${categoryName}</span> <br>
          <address>
            <span class="address_line_1">${place.address_line_1}</span> <br>
            <span class="city">${place.city}</span> <br>
            <span class="zip">${place.zip}</span> <br>
          </address>
        </li>
      `;
    }).join('');
    suggestions.innerHTML = html;
  }

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
