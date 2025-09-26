const allCards = [
    { name: "Masai Mara", region: "Africa", type: "Nature", budget: "Budget",
      img:"https://www.sojournsafaris.co.ke/wp-content/uploads/2023/05/masai-mara-saruni-mara-590x390-1.jpg" },
    { name: "Tokyo", region: "Asia", type: "City", budget: "Luxury", },
    { name: "Paris", region: "Europe", type: "City", budget: "Luxury" },
    { name: "New York City", region: "America", type: "City", budget: "Luxury" },
    { name: "Machu Picchu", region: "America", type: "Nature", budget: "Budget" ,img: "https://theabroadguide.com/wp-content/uploads/2025/02/uruguay_s_luxurious_coastal_destination.jpg"},
    { name: "Sydney", region: "Australia", type: "Beach", budget: "Luxury",img: "https://afar.brightspotcdn.com/dims4/default/90ae472/2147483647/strip/false/crop/3584x2016+224+0/resize/1200x675!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2F7b%2F02%2F622498784a9090879c9c160fb6a2%2Faustralia-sydney-michelle-heimerman.jpg" },
      { name: "Antarctica", region: "Antarctica", type: "Nature", budget: "Luxury" },
      { name: "Santorini", region: "Europe", type: "Beach", budget: "Luxury" },
      { name: "Grand Canyon", region: "America", type: "Nature", budget: "Budget" },
      { name: "Bali", region: "Asia", type: "Beach", budget: "Budget" },
      { name: "Rome", region: "Europe", type: "City", budget: "Luxury" },
      { name: "Rio de Janeiro", region: "America", type: "Beach", budget: "Budget" },
      { name: "Bangkok", region: "Asia", type: "City", budget: "Budget" },
      { name: "Dubai", region: "Asia", type: "Luxury", budget: "Luxury" },
      { name: "Cape Town", region: "Africa", type: "Nature", budget: "Luxury" },
      { name: "Barcelona", region: "Europe", type: "City", budget: "Luxury" },
      { name: "Great Barrier Reef", region: "Australia", type: "Nature", budget: "Luxury" },
      { name: "Maui", region: "America", type: "Beach", budget: "Luxury" },
      { name: "Iceland", region: "Europe", type: "Nature", budget: "Luxury" },
      { name: "Hawaii", region: "America", type: "Beach", budget: "Luxury" },
      { name: "Amsterdam", region: "Europe", type: "City", budget: "Budget" },
      { name: "Kruger National Park", region: "Africa", type: "Nature", budget: "Budget" },
      { name: "Phuket", region: "Asia", type: "Beach", budget: "Budget" },
      { name: "Venice", region: "Europe", type: "City", budget: "Luxury" },
      { name: "Yellowstone National Park", region: "America", type: "Nature", budget: "Budget" },
      { name: "Zanzibar", region: "Africa", type: "Beach", budget: "Luxury" },
      { name: "Marrakech", region: "Africa", type: "City", budget: "Budget" },
      { name: "Galapagos Islands", region: "America", type: "Nature", budget: "Luxury" },
      { name: "Cappadocia", region: "Asia", type: "Nature", budget: "Budget" },
      { name: "Lisbon", region: "Europe", type: "City", budget: "Budget" },
      { name: "Victoria Falls", region: "Africa", type: "Nature", budget: "Luxury" },
      { name: "Santorini", region: "Europe", type: "Beach", budget: "Luxury" },
      { name: "Banff National Park", region: "Canada", type: "Nature", budget: "Luxury" },
      { name: "Cinque Terre", region: "Italy", type: "Beach", budget: "Budget" },
      { name: "Petra", region: "Jordan", type: "Nature", budget: "Luxury" },
      { name: "Prague", region: "Czech Republic", type: "City", budget: "Budget" },
      { name: "Budapest", region: "Hungary", type: "City", budget: "Budget" },
      { name: "Machu Picchu", region: "Peru", type: "Nature", budget: "Luxury" },
      { name: "Kyoto", region: "Japan", type: "City", budget: "Luxury" },
      { name: "Seychelles", region: "Africa", type: "Beach", budget: "Luxury" },
      { name: "Costa Rica", region: "Central America", type: "Nature", budget: "Budget" },
      { name: "Tuscany", region: "Italy", type: "Nature", budget: "Luxury" },
      { name: "Barcelona", region: "Spain", type: "City", budget: "Luxury" },
      { name: "Hokkaido", region: "Japan", type: "Nature", budget: "Budget" },
      { name: "Reykjavik", region: "Iceland", type: "City", budget: "Luxury" },
      { name: "Buenos Aires", region: "Argentina", type: "City", budget: "Budget" },
      { name: "Dubai", region: "UAE", type: "Luxury", budget: "Luxury" },
      { name: "Nairobi", region: "Kenya", type: "City", budget: "Budget" },
      { name: "Galapagos Islands", region: "Ecuador", type: "Nature", budget: "Luxury" },
      { name: "Bora Bora", region: "French Polynesia", type: "Beach", budget: "Luxury" },
      { name: "Marrakech", region: "Morocco", type: "City", budget: "Budget" },
      { name: "Lake Bled", region: "Slovenia", type: "Nature", budget: "Budget" },
      { name: "Santorini", region: "Greece", type: "Beach", budget: "Luxury" },
      { name: "Helsinki", region: "Finland", type: "City", budget: "Budget" },
      { name: "Queenstown", region: "New Zealand", type: "Nature", budget: "Luxury" },
      { name: "Lisbon", region: "Portugal", type: "City", budget: "Budget" },
      { name: "Victoria Falls", region: "Zimbabwe/Zambia", type: "Nature", budget: "Luxury" },
      { name: "Amsterdam", region: "Netherlands", type: "City", budget: "Budget" },
      { name: "Bali", region: "Indonesia", type: "Beach", budget: "Budget" },
      { name: "Cairo", region: "Egypt", type: "City", budget: "Budget" },
      { name: "Moscow", region: "Russia", type: "City", budget: "Luxury" },
      { name: "Havana", region: "Cuba", type: "City", budget: "Budget" },
      { name: "Tallinn", region: "Estonia", type: "City", budget: "Budget" }
  ];
    function renderCards(cards) {
    const wrapper = document.getElementById("destinationSlider");
    wrapper.innerHTML = "";
    cards.forEach(card => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `
        <div class="destination-card">
          <img src="${card.img}" alt="${card.name}">
          <h3>${card.name}</h3>
          <p>${card.region} • ${card.type} • ${card.budget}</p>
        </div>
      `;
      wrapper.appendChild(slide);
    });

    // Reinitialize Swiper after rendering
   new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

  function applyFilters() {
    const region = document.getElementById("regionFilter").value;
    const type = document.getElementById("typeFilter").value;
    const budget = document.getElementById("budgetFilter").value;

    const filtered = allCards.filter(card =>
      (!region || card.region === region) &&
      (!type || card.type === type) &&
      (!budget || card.budget === budget)
    );

    renderCards(filtered);
  }

  document.getElementById("regionFilter").addEventListener("change", applyFilters);
  document.getElementById("typeFilter").addEventListener("change", applyFilters);
  document.getElementById("budgetFilter").addEventListener("change", applyFilters);

  // Initial load
  renderCards(allCards);