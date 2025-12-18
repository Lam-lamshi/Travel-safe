const pixabayApiKey = "31496043-2fe9cd081b0b76a68243b7e3b";

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
  iceland: ["Blue Lagoon", "Gullfoss Waterfall", "Thingvellir National Park", "Reykjavik", "Jokulsarlon Glacier Lagoon"],
  norway: ["Geirangerfjord", "Oslo Opera House", "Trolltunga", "Bergen Bryggen", "Lofoten Islands"],
  czech: ["Charles Bridge", "Prague Castle", "Old Town Square", "Cesky Krumlov", "Kutna Hora"],
  germany: ["Brandenburg Gate", "Neuschwanstein Castle", "Berlin Wall", "Cologne Cathedral", "Black Forest"],
  netherlands: ["Keukenhof Gardens", "Amsterdam Canals", "Zaanse Schans", "Van Gogh Museum", "Kinderdijk Windmills"],
  croatia: ["Dubrovnik Old Town", "Plitvice Lakes", "Hvar Island", "Diocletian's Palace", "Korcula Island"],
  austria: ["Schonbrunn Palace", "Hallstatt", "St. Stephen's Cathedral", "Hofburg Palace", "Grossglockner Alpine Road"],
  switzerland: ["Matterhorn", "Lake Geneva", "Jungfraujoch", "Chapel Bridge", "Rhine Falls"],
  portugal: ["Lisbon", "Porto", "Madeira", "Algarve", "Sintra"]
};

Object.entries(countriesWithAttractions).forEach(([country, attractions]) => {
  attractions.forEach((attraction, index) => {
    const elementId = `${country}Attraction${index + 1}`;
    fetchPixabayImages(`${attraction} ${country} vacation`, elementId);
  });
});