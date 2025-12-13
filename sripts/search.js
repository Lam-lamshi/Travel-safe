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

    fetch("https://YOUR-URL.onrender.com/search?q=" + value)
        .then(res => res.json())
        .then(data => {
            const matched = data.results;

            if (matched.length === 0) {
                suggestions.style.display = "none";
                return;
            }

            matched.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item.name;    
                li.style.padding = "8px";
                li.style.cursor = "pointer";

                li.addEventListener("click", () => {
                    input.value = item.name;
                    suggestions.style.display = "none";
                    redirectToDestination(item);
                });

                suggestions.appendChild(li);
            });

            suggestions.style.display = "block";
        })
        .catch(err => console.error("Search error:", err));
});


searchBtn.addEventListener("click", () => {
    const val = input.value.trim().toLowerCase();

    fetch("https://YOUR-URL.onrender.com/search?q=" + val)
        .then(res => res.json())
        .then(data => {
            if (data.results.length > 0) {
                redirectToDestination(data.results[0]);
            } else {
                alert("No matching destination found.");
            }
        })
        .catch(err => console.error("Button search error:", err));
});


input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
    }
});


function redirectToDestination(item) {
    alert(`Redirecting to info about ${item.name}...`);
    window.location.href =
        `Pagestml/destination.html?id=${item.id}`;
}


document.addEventListener("click", e => {
    if (!document.querySelector(".search-container").contains(e.target)) {
        suggestions.style.display = "none";
    }
});
