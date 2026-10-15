const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
const imagesData = [];


galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.caption').innerText;
    imagesData.push({ src: img.src, alt: img.alt, caption: caption });

    item.addEventListener('click', () => {
        currentIndex = index;
        updateLightbox();
        lightbox.style.display = 'flex';
    });
});

function updateLightbox() {
    lightboxImg.src = imagesData[currentIndex].src;
    lightboxImg.alt = imagesData[currentIndex].alt;
    lightboxCaption.innerText = imagesData[currentIndex].caption;
}

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % imagesData.length;
    updateLightbox();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
    updateLightbox();
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % imagesData.length;
            updateLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
            updateLightbox();
        }
    }
});