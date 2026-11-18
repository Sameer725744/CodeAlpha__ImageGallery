const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentIndex = 0;

// Open the clicked image in the lightbox.
galleryImages.forEach((image, index) => {
    image.addEventListener("click", function () {
        currentIndex = index;
        showImage();
        lightbox.classList.add("show");
    });
});

function showImage() {
    lightboxImage.src = galleryImages[currentIndex].src;
    lightboxImage.alt = galleryImages[currentIndex].alt;
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage();
}

function showPreviousImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage();
}

nextBtn.addEventListener("click", showNextImage);
prevBtn.addEventListener("click", showPreviousImage);
closeBtn.addEventListener("click", function () {
    lightbox.classList.remove("show");
});

// Close when the dark background is clicked.
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        lightbox.classList.remove("show");
    }
});

// Filter images by category.
filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const category = button.dataset.category;

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        galleryImages.forEach((image) => {
            if (category === "all" || image.dataset.category === category) {
                image.classList.remove("hide");
            } else {
                image.classList.add("hide");
            }
        });
    });
});

// Keyboard navigation.
document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") showNextImage();
    if (event.key === "ArrowLeft") showPreviousImage();
    if (event.key === "Escape") lightbox.classList.remove("show");
});
