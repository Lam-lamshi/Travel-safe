var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    effect: "cube",

    grabCursor: true,
    cubeeffect: {
      slideShadows: false,
      shadow:false,
      shadowOffset: 10,
      shadowScale: 0.8,
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 0.94,

    },
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });