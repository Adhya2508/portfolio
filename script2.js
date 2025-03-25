document.addEventListener('DOMContentLoaded', function() {
    const slideshow = document.querySelector('.slideshow');
    const images = ['Adhya4.png', 'Adhya2.png', 'Adhya3.png'];
    let currentImageIndex = 0;

    function createSlideshow() {
        const img = document.createElement('img');
        img.classList.add('slide-image');
        img.src = images[currentImageIndex];
        slideshow.appendChild(img);

        const prevBtn = document.createElement('button');
        prevBtn.classList.add('slide-btn', 'prev-btn');
        prevBtn.innerHTML = '❮';
        slideshow.appendChild(prevBtn);

        const nextBtn = document.createElement('button');
        nextBtn.classList.add('slide-btn', 'next-btn');
        nextBtn.innerHTML = '❯';
        slideshow.appendChild(nextBtn);

        prevBtn.addEventListener('click', showPreviousSlide);
        nextBtn.addEventListener('click', showNextSlide);
    }

    function showNextSlide() {
        const currentImage = slideshow.querySelector('.slide-image');
        currentImage.style.opacity = '0';

        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            currentImage.src = images[currentImageIndex];
            currentImage.style.opacity = '1';
        }, 500);
    }

    function showPreviousSlide() {
        const currentImage = slideshow.querySelector('.slide-image');
        currentImage.style.opacity = '0';

        setTimeout(() => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            currentImage.src = images[currentImageIndex];
            currentImage.style.opacity = '1';
        }, 500);
    }

    function autoSlide() {
        showNextSlide();
    }

    createSlideshow();
    setInterval(autoSlide, 3000);
});