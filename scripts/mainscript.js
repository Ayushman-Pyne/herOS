
const options = [
    { alt: "choti0", src: "../resources/Wallpapers/Wall0.jpg"},
    { alt: "choti1", src: "../resources/Wallpapers/Wall1.jpg"},
    { alt: "choti2", src: "../resources/Wallpapers/Wall2.jpg"},
    { alt: "choti3", src: "../resources/Wallpapers/Wall3.jpg"},
    { alt: "choti4", src: "../resources/Wallpapers/Wall4.jpg"},
    { alt: "choti5", src: "../resources/Wallpapers/Wall5.jpg"},
    { alt: "choti6", src: "../resources/Wallpapers/Wall6.jpg"},
    { alt: "choti7", src: "../resources/Wallpapers/Wall7.jpg"},
    { alt: "choti8", src: "../resources/Wallpapers/Wall8.jpg"},
    { alt: "choti9", src: "../resources/Wallpapers/Wall9.jpg"},
    { alt: "choti10", src: "../resources/Wallpapers/Wall10.jpg"},
    { alt: "choti11", src: "../resources/Wallpapers/Wall11.jpg"}
];

const body = document.querySelector("body");
let count = 0;


// Update the theme switcher functionality
document.querySelector("#theme-switcher").addEventListener("click", () => {
  body.classList.toggle("theme-light");
  body.classList.toggle("theme-dark");
});


// Preload all
const preloadImages = () => {
  const preloader = document.getElementById("preloader");
  let loadedCount = 0;
  const totalImages = options.length;
options.forEach(option => {
    const img = new Image();
    img.src = option.src;
    img.onload = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setTimeout(() => {
          preloader.style.display = "none"; // Hide preloader after 3 seconds
        }, 3000);
      }
    };
  });
};


// Wallpaper Change icon
document.querySelector("#nextWallpaper").addEventListener("click", () => {
    console.log("clicked");
    body.style.backgroundImage = `url(${options[count].src})`;
    count = count%11 + 1;
});
