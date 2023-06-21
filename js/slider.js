document.addEventListener("DOMContentLoaded", function () {
    const sliderContainer = document.querySelector(".slider-container");
    const slides = document.querySelectorAll(".slide");

    let currentIndex = 1;
    let timer = setInterval(nextSlide, 3000);

    function nextSlide() {
        currentIndex++;
        sliderContainer.style.transition = "transform 0.5s ease-in-out";
        sliderContainer.style.transform = `translateX(-${currentIndex * 640}px)`;
        updateSlides();
    }

    function prevSlide() {
        currentIndex--;
        sliderContainer.style.transition = "transform 0.5s ease-in-out";
        sliderContainer.style.transform = `translateX(-${currentIndex * 640}px)`;
        updateSlides();
    }

    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add("active");
            } else {
                slide.classList.remove("active");
            }
        });
    }

    sliderContainer.addEventListener("transitionend", function () {
        if (slides[currentIndex].classList.contains("last-clone")) {
            currentIndex = 1;
            sliderContainer.style.transition = "none";
            sliderContainer.style.transform = `translateX(-${currentIndex * 640}px)`;
            updateSlides();
        }
        if (slides[currentIndex].classList.contains("first-clone")) {
            currentIndex = slides.length - 2;
            sliderContainer.style.transition = "none";
            sliderContainer.style.transform = `translateX(-${currentIndex * 640}px)`;
            updateSlides();
        }
    });

    // Clone first and last slide for infinite loop
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    firstClone.classList.add("first-clone");
    lastClone.classList.add("last-clone");
    sliderContainer.appendChild(firstClone);
    sliderContainer.insertBefore(lastClone, slides[0]);

    updateSlides();
});
