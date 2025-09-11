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
      fetchWeather("South Pole", "weather-SouthPole");
      fetchWeather("Ross Ice Shelf", "weather-RossIceShelf");
      fetchWeather("Marie Byrd Land", "weather-MarieByrdLand");
      fetchWeather("Ellsworth Mountains", "weather-EllsworthMountains");
      fetchWeather("McMurdo Station", "weather-McMurdo");
      fetchWeather("Mount Erebus", "weather-MountErebus");
      fetchWeather("Transantarctic Mountains", "weather-TransantarcticMountains");
      fetchWeather("Queen Maud Land", "weather-QueenMaudLand");
      fetchWeather("Antarctic Peninsula", "weather-AntarcticPeninsula");
      fetchWeather("Lemaire Channel", "weather-LemaireChannel");
      fetchWeather("Weddell Sea", "weather-WeddellSea");
      fetchWeather("Shackleton Ice Shelf", "weather-ShackletonIceShelf");
      fetchWeather("Deception Island", "weather-DeceptionIsland");
    });
  // Add other countries as needed


const pixabayApiKey = "31496043-2fe9cd081b0b76a68243b7e3b";

function fetchPixabayImages(query, elementId) {
  fetch(`https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(query)}&image_type=photo`)
    .then(response => response.json())
    .then(data => {
      if (data.hits.length > 0) {
        document.getElementById(elementId).src =data.hits[0].webformatURL;
      } else {
        console.error(`No image found for ${query}`);
      }
    })
    .catch(error => console.error("Pixabay error:", error));
}

// ================== Antarctica "Countries" ==================
const countriesWithAttractions = {
  southPole: [
    "Ceremonial South Pole",
    "Geographic South Pole Marker",
    "Amundsen–Scott Station",
    "Polar Plateau",
    "90° South Signpost"
  ],
  rossIceShelf: [
    "Ross Sea Coastline",
    "Ice Cliffs of Ross Shelf",
    "Penguin Colonies",
    "Whale Watching Ross Sea",
    "Scott Base (nearby)"
  ],
  marieByrdLand: [
    "Remote Icefields",
    "Mount Sidley Volcano",
    "Scientific Research Camps",
    "Glacial Valleys",
    "Polar Skies Viewing"
  ],
  ellsworthMountains: [
    "Vinson Massif",
    "Heritage Range",
    "Ellsworth Glaciers",
    "Adventurers’ Base Camps",
    "Polar Climbing Routes"
  ],
  mcMurdoStation: [
    "McMurdo Research Facilities",
    "Observation Hill",
    "Harbor at McMurdo Sound",
    "Ice Runway Airfield",
    "Historic Discovery Hut"
  ],
  mountErebus: [
    "Active Lava Lake",
    "Summit Crater",
    "Ice Fumaroles",
    "Lower Slopes Glaciers",
    "Research Stations nearby"
  ],
  transantarcticMountains: [
    "Beardmore Glacier",
    "Ferrar Glacier",
    "Geological Formations",
    "Polar Expedition Routes",
    "Glacial Valleys"
  ],
  queenMaudLand: [
    "Dry Valleys",
    "Troll Research Station",
    "Ice Ridges",
    "Nunataks (mountain peaks through ice)",
    "Polar Plateau Views"
  ],
  antarcticPeninsula: [
    "Paradise Harbor",
    "Neko Harbor",
    "Penguin Rookeries",
    "Glacial Ice Cliffs",
    "Research Stations"
  ],
  lemaireChannel: [
    "Scenic Iceberg Views",
    "Steep Cliffs",
    "Wildlife Spotting",
    "Glacial Reflections",
    "Popular Cruise Route"
  ],
  weddellSea: [
    "Iceberg Fields",
    "Historic Endurance Expedition Site",
    "Seals and Whales",
    "Tabular Icebergs",
    "Pack Ice Cruises"
  ],
  shackletonIceShelf: [
    "Expansive Ice Shelf",
    "Remote Research Outposts",
    "Ice Cliffs",
    "Emperor Penguin Colonies",
    "Glacial Flow Fields"
  ],
  deceptionIsland: [
    "Volcanic Caldera Harbor",
    "Hot Springs Beaches",
    "Whalers Bay",
    "Scientific Stations",
    "Hiking Trails"
  ]
};


Object.entries(countriesWithAttractions).forEach(([country, attractions]) => {
  attractions.forEach((attraction, index) => {
    const elementId = `${country}Attraction${index + 1}`;
    fetchPixabayImages(`${attraction} ${country} vacation`, elementId);
  });
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
        if(window.onbeforeunload= true){
           if (confirm("Do you want to leave this page ?")) {
 
    return true; // Allow navigation
           } else {
    return false; // Prevent navigation
           }
        }
};
