document.addEventListener('DOMContentLoaded', function () {
    const slideshow = document.querySelector('.slideshow');
    if (!slideshow) return;

    const images = ['Adhya4.png', 'Adhya2.png', 'Adhya3.png'];
    let currentIndex = 0;

    // Create image element
    const img = document.createElement('img');
    img.classList.add('slide-image');
    img.src = images[currentIndex];
    img.alt = 'Adhya Sharma';
    slideshow.appendChild(img);

    // Create buttons
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('slide-btn', 'prev-btn');
    prevBtn.innerHTML = '❮';
    prevBtn.setAttribute('aria-label', 'Previous image');

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('slide-btn', 'next-btn');
    nextBtn.innerHTML = '❯';
    nextBtn.setAttribute('aria-label', 'Next image');

    slideshow.appendChild(prevBtn);
    slideshow.appendChild(nextBtn);

    function goTo(index) {
        img.style.opacity = '0';
        setTimeout(() => {
            currentIndex = (index + images.length) % images.length;
            img.src = images[currentIndex];
            img.style.opacity = '1';
        }, 400);
    }

    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    // Auto-slide every 4 seconds
    setInterval(() => goTo(currentIndex + 1), 4000);
});