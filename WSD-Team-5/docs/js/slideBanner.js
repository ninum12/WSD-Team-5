const wrapper = document.querySelector(".banner-wrapper");
const banners = document.querySelectorAll(".banner");
const leftBtn = document.querySelector(".banner-left-btn");
const rightBtn = document.querySelector(".banner-right-btn");
const pagination = document.querySelector(".banners-pagination");

let currentIndex = 0;
let total = banners.length;
let slideWidth = banners[0].offsetWidth;
let autoSlideInterval;

function updateSlidePosition() {
  wrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  updatePagination();
}

function goToSlide(index) {
  currentIndex = index;
  updateSlidePosition();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % total;
  updateSlidePosition();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + total) % total;
  updateSlidePosition();
}

function updatePagination() {
  const dots = document.querySelectorAll(".banners-pagination li");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function createPagination() {
  for (let i = 0; i < total; i++) {
    const li = document.createElement("li");
    li.addEventListener("click", () => {
      goToSlide(i);
      resetAutoSlide();
    });
    pagination.appendChild(li);
  }
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 3000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

leftBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

rightBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

window.addEventListener("resize", () => {
  slideWidth = banners[0].offsetWidth;
  updateSlidePosition();
});

createPagination();
updateSlidePosition();
startAutoSlide();
