const action_btn =document.querySelector(".action_btn")
const action_btnIcon =document.querySelector(".action_btn i")
const dropdown_menu =document.querySelector(".dropdown_menu")

action_btn.onclick=function() {
    dropdown_menu.classList.toggle("open")
    const isOpen = dropdown_menu.classList.contains("open")

    action_btnIcon.className = (isOpen)
    ? "fa-solid fa-close"
    : "fa-solid fa-bars"
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const isClickInside = dropdown_menu.contains(event.target) || action_btn.contains(event.target);
    if (!isClickInside) {
        dropdown_menu.classList.remove("open");
        action_btnIcon.className = "fa-solid fa-bars";
    }
});

// Close dropdown when clicking on a menu item
dropdown_menu.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
        dropdown_menu.classList.remove("open");
        action_btnIcon.className = "fa-solid fa-bars";
    });
});

