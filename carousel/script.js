let currentIndex = 0;
const images = document.querySelectorAll(".carousel img");
const prevButton = document.querySelector(".btn.prev");
const nextButton = document.querySelector(".btn.next");
const intervalTime = 5000;

function changeSlide(direction) {
  images[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + direction + images.length) % images.length;
  images[currentIndex].classList.add("active");
}

function autoSlide() {
  changeSlide(1);
}

const prev = document.querySelector("btn prev");
const next = document.querySelector("btn next");

setInterval(autoSlide, intervalTime);

prevButton.addEventListener("click", function () {
  changeSlide(-1);
});

nextButton.addEventListener("click", function () {
  changeSlide(1);
});
