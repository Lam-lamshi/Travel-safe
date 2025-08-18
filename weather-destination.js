const weatherApiKey = '832509137e522e915831bdb6c8b17d54'; // Your OpenWeatherMap key
const pixabayKey = '50263741-f0a77360e9892036f8c2eb0c9'; // Your Pixabay API key

const cities = {
  Africa: ['Cape Town', 'Marrakech', 'Accra', 'Dakar', 'Kigali', 'Nairobi', 'Zanzibar'],
  Asia: ['Tokyo', 'Bangkok', 'Bali', 'Singapore', 'Seoul', 'Dubai', 'Kuala Lumpur'],
  Europe: ['Paris', 'Barcelona', 'Rome', 'Amsterdam', 'Prague', 'Lisbon', 'Vienna'],
  'North America': ['New York', 'Los Angeles', 'Toronto', 'Chicago', 'Vancouver', 'Miami', 'San Francisco'],
  'South America': ['Rio de Janeiro', 'Buenos Aires', 'Lima', 'Santiago', 'Bogota', 'Quito', 'Montevideo'],
  'Australia & Oceania': ['Sydney', 'Melbourne', 'Auckland', 'Brisbane', 'Perth', 'Wellington', 'Adelaide'],
  Antarctica: ['McMurdo Station']
};

const continentFlags = {
  Africa: '🌍',
  Asia: '🌏',
  Europe: '🌍',
  'North America': '🌎',
  'South America': '🌎',
  'Australia & Oceania': '🌏',
  Antarctica: '❄️'
};

const continentScores = {};

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return {
      temp: data.main.temp,
      weather: data.weather[0].main
    };
  } catch (err) {
    return null;
  }
}

function scoreWeather(temp, condition) {
  if (temp >= 18 && temp <= 28 && (condition === 'Clear' || condition === 'Clouds')) {
    return 10;
  } else if (temp >= 10 && temp <= 32) {
    return 6;
  } else {
    return 2;
  }
}

async function fetchPixabayImage(city) {
  const url = `https://pixabay.com/api/?key=${pixabayKey}&q=${encodeURIComponent(city)}&image_type=photo&orientation=horizontal&category=places`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.hits.length > 0 ? data.hits[0].webformatURL : 'https://via.placeholder.com/300x200?text=No+Image';
  } catch (error) {
    console.error('Image fetch error:', error);
    return 'https://via.placeholder.com/300x200?text=Error';
  }
}

function openPopup(cityName) {
  document.getElementById('popup-title').innerText = cityName;
  document.getElementById('popup-description').innerHTML = `
    Discover the unique charm of <strong>${cityName}</strong>! From breathtaking sights and rich culture to delicious local cuisine and vibrant nightlife, this destination offers an unforgettable travel experience. Whether you want to explore historic landmarks, relax on pristine beaches, or dive into exciting adventures, <strong>${cityName}</strong> has something for every traveler.
  `;
  document.getElementById('popup').style.display = 'block';
  isPopupOpen = true;
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
  isPopupOpen = false;
}

let autoScrollInterval;
let isPopupOpen = false;
let isHovering = false;

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    if (isPopupOpen || isHovering) return;

    const slider = document.querySelector('.sliding');
    if (!slider) return;

    const scrollLeft = slider.scrollLeft;
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    if (scrollLeft + 320 >= maxScrollLeft) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: 320, behavior: 'smooth' });
    }
  }, 4000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

async function suggestBestContinent() {
  for (const continent in cities) {
    let totalScore = 0;
    let count = 0;
    for (const city of cities[continent]) {
      const weather = await getWeather(city);
      if (weather) {
        totalScore += scoreWeather(weather.temp, weather.weather);
        count++;
      }
    }
    continentScores[continent] = count > 0 ? totalScore / count : 0;
  }

  const best = Object.entries(continentScores).sort((a, b) => b[1] - a[1])[0];

  const suggestionBox = document.getElementById('suggestion');
  suggestionBox.innerHTML = `
    🧭 Based on today's weather, the best continent to visit is:
    <h2>${best[0]}</h2>
  `;

  document.getElementById('continent-flag').innerText = `${continentFlags[best[0]]} ${best[0]}`;

  const slider = document.querySelector('.sliding');
  slider.innerHTML = '';

  const selectedCities = cities[best[0]];
  for (const [index, city] of selectedCities.entries()) {
    const img = await fetchPixabayImage(city);
    slider.innerHTML += `
      <div class="destination_items" style="background-image: url('${img}');">
        <div class="contents">
          <div class="texts">Top spot ${index + 1} to explore in ${city}</div>
          <div class="name">${city}</div>
          <button class="see-more-btn" data-city="${city}">see more</button>
        </div>
      </div>`;
  }
}

// Listen for clicks on "See More" buttons (event delegation)
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('see-more-btn')) {
    const city = event.target.getAttribute('data-city');
    openPopup(city);
  }
});

// Close popup on close button click
document.getElementById('close-popup-btn').addEventListener('click', closePopup);

// Pause auto-scroll when hovering the slider
const slider = document.querySelector('.sliding');
slider.addEventListener('mouseenter', () => {
  isHovering = true;
});
slider.addEventListener('mouseleave', () => {
  isHovering = false;
});

// Start auto-scroll and fetch data
suggestBestContinent().then(() => {
  startAutoScroll();
});
