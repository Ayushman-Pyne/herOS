
const options = [
    { alt: "Wall0", src: "resources/Wallpapers/Wall0.jpg" },
    { alt: "Wall1", src: "resources/Wallpapers/Wall1.jpg" },
    { alt: "Wall2", src: "resources/Wallpapers/Wall2.jpg" },
    { alt: "Wall3", src: "resources/Wallpapers/Wall3.jpg" },
    { alt: "Wall4", src: "resources/Wallpapers/Wall4.jpg" },
    { alt: "Wall5", src: "resources/Wallpapers/Wall5.jpg" },
    { alt: "Wall6", src: "resources/Wallpapers/Wall6.jpg" },
    { alt: "Wall7", src: "resources/Wallpapers/Wall7.jpg" },
    { alt: "Wall8", src: "resources/Wallpapers/Wall8.jpg" },
    { alt: "Wall9", src: "resources/Wallpapers/Wall9.jpg" },
    { alt: "Wall10", src: "resources/Wallpapers/Wall10.jpg" },
    { alt: "Wall11", src: "resources/Wallpapers/Wall11.jpg" },
    { alt: "Wall12", src: "resources/Wallpapers/Wall12.jpg" }
];

const body = document.querySelector("body");
let currentIndex = 0; 

// --- Preloader Logic ---
const preloadImages = () => {
    const preloader = document.getElementById("preloader");
    let loadedCount = 0;
    const totalImages = options.length;

    options.forEach(option => {
        const img = new Image();
        img.src = option.src;
        img.onload = () => {
            loadedCount++;
            checkAllLoaded();
        };
        img.onerror = () => {
            console.warn(`Failed to load ${option.src}`);
            loadedCount++; // Count errors too so app doesn't hang
            checkAllLoaded();
        };
    });

    function checkAllLoaded() {
        if (loadedCount === totalImages) {
            setTimeout(() => {
                preloader.style.opacity = "0";
                setTimeout(() => {
                    preloader.style.display = "none";
                }, 500);
            }, 800);
        }
    }
};

window.addEventListener('load', preloadImages);

document.querySelector("#theme-switcher").addEventListener("click", () => {
    body.classList.toggle("theme-light");
    body.classList.toggle("theme-dark");
});

document.querySelector("#nextWallpaper").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % options.length;
    const newBg = options[currentIndex].src;
    body.style.backgroundImage = `url('${newBg}')`;
});