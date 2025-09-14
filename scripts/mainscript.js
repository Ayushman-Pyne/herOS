
const body = document.querySelector("body");
let count = 0;

// Update the theme switcher functionality
document.querySelector("#theme-switcher").addEventListener("click", () => {
  body.classList.toggle("theme-light");
  body.classList.toggle("theme-dark");
});

// Wallpaper Change icon
document.querySelector("#nextWallpaper").addEventListener("click", () => {
    console.log("clicked");
    body.style.backgroundImage = `url("../resources/Wallpapers/Wall${count}.jpg")`;
    count = count%12 + 1;
});
