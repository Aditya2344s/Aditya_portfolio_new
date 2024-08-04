// Toggle Dark Mode for Entire Website
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            localStorage.setItem('dark-mode', isDarkMode);
        });
    }

    // Initialize slideshows
    document.querySelectorAll('.slideshow-container').forEach(slideshow => {
        showSlides(slideshow, 1);
    });

    // Initialize with the first image
    showImage(currentIndex);
});

// Initialize Slideshow
let slideIndex = 1;

function openSlideshow(slideshowId) {
    document.getElementById(slideshowId).style.display = 'block';
    showSlides(document.getElementById(slideshowId), slideIndex = 1);
}

function closeSlideshow(slideshowId) {
    document.getElementById(slideshowId).style.display = 'none';
}

function changeSlide(slideshowId, n) {
    const slideshow = document.getElementById(slideshowId);
    showSlides(slideshow, slideIndex += n);
}

function showSlides(slideshow, n) {
    const slides = slideshow.querySelectorAll('.slide');
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    slides.forEach(slide => {
        slide.style.display = 'none';
    });

    slides[slideIndex - 1].style.display = 'block';
}

// Image Navigation
let currentIndex = 0;
const images = document.querySelectorAll('.image-container img');

function showImage(index) {
    images.forEach((img, i) => {
        img.style.display = i === index ? 'block' : 'none';
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

document.querySelector('.nav-button.right').addEventListener('click', nextImage);
document.querySelector('.nav-button.left').addEventListener('click', prevImage);

// Initialize Locomotive Scroll and GSAP ScrollTrigger
function locomotive() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

locomotive();

// Set up ScrollTriggers for sections
const sections = ['#page1', '#page2', '#page3'];
sections.forEach(section => {
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            pin: true,
            scroller: '#main',
        }
    });
});

ScrollTrigger.create({
    trigger: "#page>canvas",
    pin: true,
    scroller: '#main',
    start: 'top top',
    end: '600% top',
});

// Modal Functions
function openModal(certId) {
    document.getElementById(`modal-${certId}`).classList.remove('hidden');
}

function closeModal(certId) {
    document.getElementById(`modal-${certId}`).classList.add('hidden');
}

// Function to view document in a modal
function viewDocument(imageSrc) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.display = 'block';

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement('span');
    closeButton.innerHTML = 'CLOSE';
    closeButton.classList.add('close-button');
    closeButton.style.cursor = 'pointer'; // Ensure the cursor changes to a pointer on hover
    closeButton.onclick = () => {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    };

    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.width = '100%';

    // Add navigation buttons
    const prevButton = document.createElement('span');
    prevButton.innerHTML = '&lt;';
    prevButton.classList.add('nav-button', 'left');
    prevButton.style.cursor = 'pointer'; // Ensure the cursor changes to a pointer on hover
    prevButton.onclick = () => changeSlide(modal.id, -1);

    const nextButton = document.createElement('span');
    nextButton.innerHTML = '&gt;';
    nextButton.classList.add('nav-button', 'right');
    nextButton.style.cursor = 'pointer'; // Ensure the cursor changes to a pointer on hover
    nextButton.onclick = () => changeSlide(modal.id, 1);

    // Append elements to modal content
    modalContent.appendChild(closeButton);
    modalContent.appendChild(prevButton);
    modalContent.appendChild(nextButton);
    modalContent.appendChild(img);

    // Append modal content to modal
    modal.appendChild(modalContent);

    // Append modal to body
    document.body.appendChild(modal);
}
