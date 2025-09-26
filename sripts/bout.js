const aboutpixabayApiKey = "31496043-2fe9cd081b0b76a68243b7e3b";
function fetchAboutPixabayImages(query, elementId) {
  fetch(`https://pixabay.com/api/?key=${aboutpixabayApiKey}&q=${encodeURIComponent(query)}&image_type=photo`)
    .then(response => response.json())
    .then(data => {
      if (data.hits.length > 0) {
        document.getElementById(elementId).src = data.hits[0].webformatURL;
      } else {
        console.error(`No image found for ${query}`);
      }
    })
    .catch(error => console.error("Pixabay error:", error));
    onclick="fetchAboutPixabayImages('African', 'AfricanAttraction2')"
    onclick="fetchAboutPixabayImages('Asia', 'AsianAttraction1')"   
    onclick="fetchAboutPixabayImages('Europe', 'EuropeanAttraction1')"
    onclick="fetchAboutPixabayImages('North America', 'NorthAmericanAttraction1')"
    onclick="fetchAboutPixabayImages('South America', 'SouthamericanAttraction1')"
    onclick="fetchAboutPixabayImages('Australia & Oceania', 'AustraliaAttraction1')"
    onclick="fetchAboutPixabayImages('Antarctica', 'AntarcticanAttraction1')"
}
const continentsWithAttraction = {
  African: ["safaris", "Deserts", "Cities", "pyramid"],
  Asian: ["Temples", "cuisine", "megacities", "traditions"],
  European: ["Art", "architecture", "scenic villages", "rich history"],
  NorthAmerican: ["Brandenburg Gate", "Neuschwanstein Castle", "Berlin Wall", "Cologne Cathedral", "Black Forest"],
  Southamerican: ["Keukenhof Gardens", "Amsterdam Canals", "Zaanse Schans", "Van Gogh Museum", "Kinderdijk Windmills"],
  Antarctican: ["Schonbrunn Palace", "Hallstatt", "St. Stephen's Cathedral", "Hofburg Palace", "Grossglockner Alpine Road"],
    Oceanian: ["Lisbon", "Porto", "Madeira", "Algarve", "Sintra"],
    Australia: ["Matterhorn", "Lake Geneva", "Jungfraujoch", "Chapel Bridge", "Rhine Falls"],
};

Object.entries(continentsWithAttraction).forEach(([country, continent]) => {
  continent.forEach((continent, index) => {
    const elementId = `${country}Attraction${index + 1}`;
    fetchAboutPixabayImages(`${continent} ${country} vacation`, elementId);
  });
});
