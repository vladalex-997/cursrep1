const carousel = document.querySelector(".carousel");
const images = document.querySelectorAll(".carousel img");
const totalImages = images.length;
const radius = 200;
const angleStep = 360 / totalImages;
let angle = 0;
let isAnimating = true;
let lastInteractionTime = Date.now();
let autoRotateTimeout;

images.forEach((img, index) => {
  const theta = angleStep * index;
  img.style.transform = `rotateY(${theta}deg) translateZ(${radius}px)`;
});

function rotateImages() {
  if (isAnimating) {
    angle += 0.1;
    images.forEach((img, index) => {
      const theta = angleStep * index + angle;
      img.style.transform = `rotateY(${theta}deg) translateZ(${radius}px)`;
    });
  }
  requestAnimationFrame(rotateImages);
}

function rotateManually(direction) {
  clearTimeout(autoRotateTimeout);
  lastInteractionTime = Date.now();
  isAnimating = false;
  angle += direction * angleStep;
  images.forEach((img, index) => {
    const theta = angleStep * index + angle;
    img.style.transform = `rotateY(${theta}deg) translateZ(${radius}px)`;
  });
  startAutoRotateAfterDelay();
}

function startAutoRotateAfterDelay() {
  autoRotateTimeout = setTimeout(() => {
    if (Date.now() - lastInteractionTime >= 5000) {
      isAnimating = true;
    }
  }, 5000);
}

document
  .getElementById("rotate-left")
  .addEventListener("click", () => rotateManually(-1));

document
  .getElementById("rotate-right")
  .addEventListener("click", () => rotateManually(1));

document.getElementById("stop").addEventListener("click", () => {
  isAnimating = false;
  clearTimeout(autoRotateTimeout);
  lastInteractionTime = Date.now();
  startAutoRotateAfterDelay();
});

document.getElementById("start").addEventListener("click", () => {
  isAnimating = true;
  clearTimeout(autoRotateTimeout);
});

rotateImages();
