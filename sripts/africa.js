  const apiKey = "d1ed7374e6c83872fd2507f682afea26";

function fetchWeather(city, elementId) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const temp = Math.round(data.main.temp);
        const iconCode = data.weather[0].icon;
        const condition = data.weather[0].main.toLowerCase();

        let iconHTML;
        if (condition === "clear") {
          iconHTML = `<img src="https://img.icons8.com/fluency/24/sun.png" alt="Sunny" style="vertical-align: middle; margin-left: 5px;"/>`;
        } else {
          iconHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="weather icon" style="width: 24px; height: 24px; vertical-align: middle; margin-left: 5px;"/>`;
        }

        document.getElementById(elementId).innerHTML = `${temp}°C ${iconHTML}`;
      } else {
        document.getElementById(elementId).textContent = "Weather unavailable";
      }
    })
    .catch(() => {
      document.getElementById(elementId).textContent = "Weather unavailable";
    });
}

document.addEventListener("DOMContentLoaded", () => {
 // African countries
fetchWeather("Cape Town", "weather-South Africa");
fetchWeather("Gaborone", "weather-Botswana");
fetchWeather("Dar es Salaam", "weather-Tanzania");
fetchWeather("Cairo", "weather-Egypt");
fetchWeather("Addis Ababa", "weather-Ethiopia");
fetchWeather("Antananarivo", "weather-Madagascar");
fetchWeather("Praia", "weather-Cape Verde");
fetchWeather("Lilongwe", "weather-Malawi");
fetchWeather("Kigali", "weather-Rwanda");
fetchWeather("Harare", "weather-Zimbabwe");
fetchWeather("Lusaka", "weather-Zambia");
fetchWeather("Abuja", "weather-Nigeria");

});

const pixabayApiKey = "31496043-2fe9cd081b0b76a68243b7e3b";
const safePlaceholder = "https://via.placeholder.com/400x300?text=Image+Not+Found";

function fetchPixabayImages(query, elementId) {
  fetch(`https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(query)}&image_type=photo`)
    .then(response => response.json())
    .then(data => {
      if (data.hits.length > 0) {
        document.getElementById(elementId).src = data.hits[0].webformatURL;
      } else {
        console.error(`No image found for ${query}`);
      }
    })
    .catch(error => console.error("Pixabay error:", error));
}

const countriesWithAttractions = {
 southafrica: [
    "Table Mountain", 
    "Kruger National Park", 
    "Robben Island", 
    "Cape of Good Hope", 
    "V&A Waterfront"
  ],
  botswana: [
    "Okavango Delta", 
    "Chobe National Park", 
    "Moremi Game Reserve", 
    "Makgadikgadi Pans", 
    "Tsodilo Hills"
  ],
  tanzania: [
    "Serengeti National Park", 
    "Mount Kilimanjaro", 
    "Zanzibar Beach", 
    "Ngorongoro Crater", 
    "Selous Game Reserve"
  ],
  egypt: [
    "Pyramids of Giza", 
    "Valley of the Kings", 
    "Karnak Temple", 
    "Abu Simbel", 
    "Nile Cruise"
  ],
  ethiopia: [
    "Lalibela Rock Churches", 
    "Simien Mountains", 
    "Lake Tana", 
    "Axum Obelisks", 
    "Omo Valley"
  ],
  madagascar: [
    "Avenue of the Baobabs", 
    "Isalo National Park", 
    "Nosy Be", 
    "Tsingy de Bemaraha", 
    "Andasibe Mantadia"
  ],
  capeverde: [
    "Sal Island", 
    "Fogo Volcano", 
    "Santo Antao", 
    "Praia City", 
    "Mindelo"
  ],
  malawi: [
    "Lake Malawi", 
    "Liwonde National Park", 
    "Mount Mulanje", 
    "Nyika Plateau", 
    "Zomba Plateau"
  ],
  rwanda: [
    "Volcanoes National Park", 
    "Lake Kivu", 
    "Nyungwe Forest", 
    "Kigali Memorial", 
    "Akagera Park"
  ],
  zimbabwe: [
    "Victoria Falls", 
    "Hwange National Park", 
    "Great Zimbabwe Ruins", 
    "Matobo Hills", 
    "Mana Pools"
  ],
  zambia: [
    "Victoria Falls", 
    "South Luangwa", 
    "Kafue National Park", 
    "Lower Zambezi", 
    "Lake Kariba"
  ],
  nigeria: [
    "Olumo Rock", 
    "Yankari National Park", 
    "Zuma Rock", 
    "Erin Ijesha Waterfalls", 
    "Obudu Mountain Resort"
  ]
  
};

Object.entries(countriesWithAttractions).forEach(([country, attractions]) => {
  attractions.forEach((attraction, index) => {
    const elementId = `${country}Attraction${index + 1}`;
    fetchPixabayImages(`${attraction} ${country} vacation`, elementId);
  });
});

async function getPixabayImage(query) {
  try {
    const res = await fetch(`https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(query)}&image_type=photo`);
    const data = await res.json();
    if (data.hits.length > 0) {
      return data.hits[0].webformatURL;
    }
    return null;
  } catch (err) {
    console.error("Pixabay fetch error:", err);
    return null;
  }
}

  // For every blog-post on the page, fill slider and each attraction img.
 document.querySelectorAll('.blog-post').forEach(async (post) => {
  const countryName = (post.dataset.title || "").trim();
  if (!countryName) return;

  const sliderImg = post.querySelector('.slider img');
  if (sliderImg) {
    let imgUrl = await getPixabayImage(`${countryName} travel`);
    if (!imgUrl) imgUrl = await getPixabayImage(countryName);
    sliderImg.src = imgUrl || "https://via.placeholder.com/400x300?text=Image+Not+Found";
  }
});

  
  // Toggle buttons for showing/hiding attractions
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    const list = btn.nextElementSibling;
    btn.addEventListener('click', () => {
      list.classList.toggle('show');
      btn.textContent = list.classList.contains('show') 
        ? 'Hide Attractions' 
        : 'Show Top 5 Attractions';
    });
  });
});
 function travel(){
    if(confirm("Do you want to leave this page ?"))
    {
        return true;}
        else {
            return false
        }
    };
  