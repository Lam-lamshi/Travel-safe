  const countries = [
    "Kenya", "Japan", "France", "USA", "Peru", "Australia", "Antarctica",
    "Masai Mara", "Tokyo", "Paris", "New York City", "Machu Picchu", "Sydney", "Antarctic Cruise",
    "Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Antarctica",
  ];

  const input = document.getElementById("searchInput");
  const suggestions = document.getElementById("suggestions");
  const searchBtn = document.getElementById("searchBtn");

  input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    suggestions.innerHTML = "";

    if (!value) {
      suggestions.style.display = "none";
      return;
    }

    const matched = countries.filter(c => c.toLowerCase().includes(value));

    if (matched.length === 0) {
      suggestions.style.display = "none";
      return;
    }

    matched.forEach(country => {
      const li = document.createElement("li");
      li.textContent = country;
      li.style.padding = "8px";
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        input.value = country;
        suggestions.style.display = "none";
        redirectToDestination(country);
      });
      suggestions.appendChild(li);
    });

    suggestions.style.display = "block";
  });

  searchBtn.addEventListener("click", () => {
    const val = input.value.trim().toLowerCase();
    const found = countries.find(c => c.toLowerCase().includes(val));
    if (found) {
      redirectToDestination(found);
    } else {
      alert("No matching destination found.");
    }
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBtn.click();
    }
  });

  function redirectToDestination(country) {
    alert(`Redirecting to info about ${country}...`);
    window.location.href = "destination.html";
  }

  document.addEventListener("click", e => {
    if (!document.querySelector(".box").contains(e.target)) {
      suggestions.style.display = "none";
    }
  });

