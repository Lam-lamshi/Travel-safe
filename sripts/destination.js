let filteredDestinations = [];
let currentDestinations = [];

function initializeDestinations() {
  loadDestinations();
  setupFilters();
}

function loadDestinations() {
  const destinationsGrid = document.getElementById('destinations-grid');

  
  if (!destinationsGrid || !destinations) return;
  
  // Show loading state
  destinationsGrid.innerHTML = createLoadingGrid();
  
  // Simulate loading delay for better UX
  setTimeout(() => {
    currentDestinations = [...destinations];
    filteredDestinations = [...destinations];
    renderDestinations();
    updateResultsCount();
  }, 1000);
}

function createLoadingGrid() {
  let loadingHTML = '';
  for (let i = 0; i < 6; i++) {
    loadingHTML += `
      <div class="destination-card animate-shimmer" style="height: 20rem;">
        <div style="height: 12rem; background: hsl(var(--muted));"></div>
        <div style="padding: 1.5rem;">
          <div style="height: 1rem; background: hsl(var(--muted)); margin-bottom: 0.5rem; border-radius: 0.25rem;"></div>
          <div style="height: 0.75rem; background: hsl(var(--muted)); width: 60%; margin-bottom: 1rem; border-radius: 0.25rem;"></div>
          <div style="height: 2rem; background: hsl(var(--muted)); margin-bottom: 1rem; border-radius: 0.25rem;"></div>
          <div style="height: 2.5rem; background: hsl(var(--muted)); border-radius: 0.25rem;"></div>
        </div>
      </div>
    `;
  }
  return loadingHTML;
}

function renderDestinations() {
  const destinationsGrid = document.getElementById('destinations-grid');
  
  if (!destinationsGrid) return;
  
  if (filteredDestinations.length === 0) {
    destinationsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
        <p style="font-size: 1.25rem; color:  hsl(210, 40%, 96%); margin-bottom: 1rem;">
          No destinations found matching your criteria
        </p>
        <button class="btn btn-outline" onclick="clearFilters()">
          Clear all filters
        </button>
      </div>
    `;
    return;
  }
  
  destinationsGrid.innerHTML = filteredDestinations.map((destination, index) => `
    <div class="destination-card animate-scale-in" style="animation-delay: ${index * 0.1}s;">
      <div class="destination-image">
        <img src="${destination.image}" alt="${destination.name}" loading="lazy">
        <div class="destination-badges">
          <div class="badge">${destination.region}</div>
          <div class="badge badge-outline">${destination.budget}</div>
        </div>
        <div class="destination-overlay"></div>
      </div>
      
      <div class="destination-content">
        <div class="destination-header">
          <div>
            <h3 class="destination-title">${destination.name}</h3>
            <div class="destination-location">
              <i data-lucide="map-pin" style="width: 1rem; height: 1rem; margin-right: 0.25rem;"></i>
              <span>${destination.country}</span>
            </div>
          </div>
          <div class="destination-rating">
            <i data-lucide="star" style="width: 1rem; height: 1rem; color: #fbbf24; fill: currentColor;"></i>
            <span>${destination.rating}</span>
          </div>
        </div>
        
        <p class="destination-description">${destination.description}</p>
        
        <div class="destination-details">
          <div class="destination-detail">
            <i data-lucide="thermometer" style="width: 1rem; height: 1rem; margin-right: 0.25rem;"></i>
            ${destination.temperature}
          </div>
          <div class="destination-detail">
            <i data-lucide="camera" style="width: 1rem; height: 1rem; margin-right: 0.25rem;"></i>
            ${destination.type}
          </div>
        </div>
        
        <div class="destination-highlights">
          ${destination.highlights.slice(0, 3).map(highlight => `
            <span class="highlight-badge">${highlight}</span>
          `).join('')}
        </div>
        
        <button class="btn btn-primary btn-full" onclick="exploreDestination('${destination.id}')">
          Explore Destination
        </button>
      </div>
    </div>
  `).join('');
  
  // Recreate Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function setupFilters() {
  const regionFilter = document.getElementById('region-filter');
  const typeFilter = document.getElementById('type-filter');
  const budgetFilter = document.getElementById('budget-filter');
  
  if (regionFilter) regionFilter.addEventListener('change', applyFilters);
  if (typeFilter) typeFilter.addEventListener('change', applyFilters);
  if (budgetFilter) budgetFilter.addEventListener('change', applyFilters);
}

function applyFilters() {
  const regionFilter = document.getElementById('region-filter');
  const typeFilter = document.getElementById('type-filter');
  const budgetFilter = document.getElementById('budget-filter');
  const clearFiltersBtn = document.getElementById('clear-filters');
  
  const regionValue = regionFilter ? regionFilter.value : '';
  const typeValue = typeFilter ? typeFilter.value : '';
  const budgetValue = budgetFilter ? budgetFilter.value : '';
  
  // Filter destinations
  filteredDestinations = currentDestinations.filter(destination => {
    const matchesRegion = !regionValue || destination.region === regionValue;
    const matchesType = !typeValue || destination.type === typeValue;
    const matchesBudget = !budgetValue || destination.budget === budgetValue;
    
    return matchesRegion && matchesType && matchesBudget;
  });
  
  // Show/hide clear filters button
  const hasFilters = regionValue || typeValue || budgetValue;
  if (clearFiltersBtn) {
    clearFiltersBtn.style.display = hasFilters ? 'inline-flex' : 'none';
  }
  
  renderDestinations();
  updateResultsCount();
}

function clearFilters() {
  const regionFilter = document.getElementById('region-filter');
  const typeFilter = document.getElementById('type-filter');
  const budgetFilter = document.getElementById('budget-filter');
  const clearFiltersBtn = document.getElementById('clear-filters');
  
  if (regionFilter) regionFilter.value = '';
  if (typeFilter) typeFilter.value = '';
  if (budgetFilter) budgetFilter.value = '';
  if (clearFiltersBtn) clearFiltersBtn.style.display = 'none';
  
  filteredDestinations = [...currentDestinations];
  renderDestinations();
  updateResultsCount();
}

function updateResultsCount() {
  const resultsText = document.getElementById('results-text');
  
  if (resultsText && currentDestinations.length > 0) {
    resultsText.textContent = `Showing ${filteredDestinations.length} of ${currentDestinations.length} destinations`;
  }
}

function exploreDestination(destinationId) {
  const destination = destinations.find(d => d.id === destinationId);
  
  if (destination) {
    showToast(
      'Exploring Destination',
      `Planning your adventure to ${destination.name}, ${destination.country}!`,
      3000
    );
    
    // Here you could redirect to a detailed destination page
    // or show a modal with more information
    setTimeout(() => {
      scrollToSection('contact');
    }, 1500);
  }
}

// Make functions globally available
window.applyFilters = applyFilters;
window.clearFilters = clearFilters;
window.exploreDestination = exploreDestination;


// Destinations data
const destinations = [
  {
    id: "1",
    name: "Masai Mara",
    country: "Kenya",
    region: "Africa",
    type: "Nature",
    budget: "Luxury",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&h=400&fit=crop",
    rating: 4.9,
    temperature: "24°C",
    highlights: ["Safari", "Wildlife", "Culture"],
    description: "Experience the great migration and witness Africa's incredible wildlife in one of the world's most famous game reserves."
  },
  {
    id: "2",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    type: "City",
    budget: "Luxury",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
    rating: 4.8,
    temperature: "18°C",
    highlights: ["Technology", "Culture", "Food"],
    description: "Discover the perfect blend of traditional culture and modern innovation in Japan's bustling capital city."
  },
  {
    id: "3",
    name: "Paris",
    country: "France",
    region: "Europe",
    type: "City",
    budget: "Luxury",
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop",
    rating: 4.7,
    temperature: "15°C",
    highlights: ["Art", "Architecture", "Romance"],
    description: "The City of Light offers world-class museums, stunning architecture, and romantic atmosphere like nowhere else."
  },
  {
    id: "4",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    type: "Beach",
    budget: "Budget",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&h=400&fit=crop",
    rating: 4.6,
    temperature: "28°C",
    highlights: ["Beaches", "Temples", "Culture"],
    description: "Tropical paradise with stunning beaches, ancient temples, and rich cultural heritage waiting to be explored."
  },
  {
    id: "5",
    name: "Machu Picchu",
    country: "Peru",
    region: "America",
    type: "Nature",
    budget: "Budget",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&h=400&fit=crop",
    rating: 4.9,
    temperature: "16°C",
    highlights: ["History", "Hiking", "Mountains"],
    description: "Ancient Incan citadel nestled high in the Andes mountains, offering breathtaking views and rich history."
  },
  {
    id: "6",
    name: "Sydney",
    country: "Australia",
    region: "Oceania",
    type: "City",
    budget: "Luxury",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    rating: 4.8,
    temperature: "22°C",
    highlights: ["Opera House", "Beaches", "Harbor"],
    description: "Iconic harbor city with stunning architecture, beautiful beaches, and vibrant cultural scene."
  }
];
initializeDestinations();