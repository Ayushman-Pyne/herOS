const options = [
    { alt: "puppy1", src: "resources/1.gif", head: "Pretty Please?" },
    { alt: "puppy2", src: "resources/2.gif", head: "How about now?" },
    { alt: "puppy3", src: "resources/3.gif", head: "Still no?" },
    { alt: "puppy4", src: "resources/4.gif", head: "Are you sure?" },
    { alt: "puppy5", src: "resources/5.gif", head: "Last chance!" },
    { alt: "puppy6", src: "resources/6.gif", head: "Really?" },
    { alt: "puppy7", src: "resources/7.gif", head: "Think again!" },
    { alt: "puppy8", src: "resources/8.gif", head: "Why not?" },
    { alt: "puppy9", src: "resources/9.gif", head: "Please reconsider!" },
    { alt: "puppy10", src: "resources/10.gif", head: "One more time?" },
    { alt: "puppy11", src: "resources/11.gif", head: "Don't say no!" },
];

var yes = document.querySelector("#Yes");
var ques = document.querySelector("#question-container");
var cc = document.querySelector("#confirm-container");
var button = document.querySelector("#No");
var gif = document.querySelector("#gif");
var head = document.querySelector("#head");

cc.style.display = "none"; // Hide the confirmation container initially

// Set an initial GIF
var initialGif = options[0];
gif.src = initialGif.src;
gif.alt = initialGif.alt;
head.textContent = initialGif.head; // Set the initial head text

gif.style.display = "block"; // Ensure the GIF is visible

let lastGifIndex = -1; // To track the last displayed GIF

button.addEventListener("click", function() {
  // Get the viewport dimensions
  var viewportHeight = window.innerHeight;
  var viewportWidth = window.innerWidth;

  // Calculate random positions for the button
  var changeTop = Math.random() * (viewportHeight - button.offsetHeight);
  var changeLeft = Math.random() * (viewportWidth - button.offsetWidth);

  // Apply the new positions
  button.style.position = "absolute";
  button.style.top = changeTop + "px";
  button.style.left = changeLeft + "px";

  // Randomize the GIF source and alt text without repeating the last one
  let randomIndex;
if (!this.randomOrder || this.randomOrder.length === 0) {
    this.randomOrder = [...options].sort(() => Math.random() - 0.5); // Shuffle the array
}

randomIndex = options.indexOf(this.randomOrder.pop()); // Get the next GIF in the shuffled order

  lastGifIndex = randomIndex;
  var randomGif = options[randomIndex];

  gif.src = randomGif.src;
  gif.alt = randomGif.alt;
  head.textContent = randomGif.head; // Update the head text with the new GIF's head
});

// Preload all GIFs to optimize loading
const preloadImages = () => {
  options.forEach(option => {
    const img = new Image();
    img.src = option.src;
  });
};

// Call the preload function
preloadImages();

// Update the theme switcher functionality
document.querySelector("#theme-switcher").addEventListener("click", () => {
  const body = document.querySelector("body");
  body.classList.toggle("theme-light");
  body.classList.toggle("theme-dark");
});

const triggerConfetti = () => {
  const confettiCanvas = document.getElementById("confetti-canvas");
  confettiCanvas.style.position = "absolute";
  confettiCanvas.style.top = 0;
  confettiCanvas.style.left = 0;
  confettiCanvas.style.width = "100%";
  confettiCanvas.style.height = "100%";
  confettiCanvas.style.zIndex = 1000;

  const ctx = confettiCanvas.getContext("2d");
  const particles = [];
  const particleCount = 150;
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3"];

  // Resize canvas to fit the window
  const resizeCanvas = () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  };

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * confettiCanvas.width, // Spread across the entire width
      y: Math.random() * confettiCanvas.height, // Spread across the entire height
      r: Math.random() * 6 + 2,
      d: Math.random() * particleCount,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngle: Math.random() * Math.PI * 2,
    });
  }

  const drawParticles = () => {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
  };

  const updateParticles = () => {
    particles.forEach((p) => {
      p.y += Math.cos(p.d) + 1 + p.r / 2;
      p.x += Math.sin(p.d);
      p.tiltAngle += 0.1;
      p.tilt = Math.sin(p.tiltAngle) * 15;

      if (p.y > confettiCanvas.height) {
        p.y = -10;
        p.x = Math.random() * confettiCanvas.width;
      }
    });
  };

  const animateConfetti = () => {
    drawParticles();
    updateParticles();
    requestAnimationFrame(animateConfetti);
  };
  animateConfetti();

  // Stop confetti after 5 seconds
  setTimeout(() => {
    document.getElementById("confetti-canvas").style.display = "none";
  }, 15000);
};


yes.addEventListener("click", function() {
  ques.style.display = "none"; // Hide the question container
  cc.style.display = "block"; // Ensure the confirmation container is visible
  triggerConfetti(); // Trigger confetti animation
});

// New functionality to randomize Pookie positions
const randomizePookiePositions = () => {
  const pookieImages = document.querySelectorAll("#confirm-container img");
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const positions = [];

  pookieImages.forEach((img) => {
    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;

    let randomTop, randomLeft;
    let isOverlapping;

    do {
      randomTop = Math.random() * (viewportHeight - imgHeight);
      randomLeft = Math.random() * (viewportWidth - imgWidth);

      isOverlapping = positions.some(pos => {
        return (
          randomLeft < pos.left + pos.width &&
          randomLeft + imgWidth > pos.left &&
          randomTop < pos.top + pos.height &&
          randomTop + imgHeight > pos.top
        );
      });
    } while (isOverlapping);

    positions.push({ top: randomTop, left: randomLeft, width: imgWidth, height: imgHeight });

    const randomRotation = Math.random() * 360 - 180 + "deg"; // Random rotation

    img.style.position = "absolute";
    img.style.top = randomTop + "px";
    img.style.left = randomLeft + "px";
    img.style.transform = `rotate(${randomRotation})`;
  });
};

// Call the function every 3 seconds
setInterval(randomizePookiePositions, 1000);

