const tgg_btn =document.querySelector(".tgg_btn")
		const tgg_btnIcon =document.querySelector(".tgg_btn i")
		const dropdown_menu =document.querySelector(".dropdown_menu")


		tgg_btn.onclick=function() {
		dropdown_menu.classList.toggle("open")
		const isOpen = dropdown_menu.classList.contains("open")

		tgg_btnIcon.classList =isOpen
		? "fa-solid fa-close"
		: "fa-solid fa-bars"

		alert("sent successfully");
		document.location.href ="send.php";
	}