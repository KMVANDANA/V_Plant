/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/*===== MENU SHOW & HIDDEN =====*/
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll('.nav__link');

function closeMenu() {
    navMenu.classList.remove('show-menu');
}

navLinks.forEach(navLink => {
    navLink.addEventListener('click', closeMenu);
});

/*=============== CHANGE BACKGROUND HEADER ===============*/
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
});

/*=============== QUESTIONS ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.questions__item');

accordionItems.forEach(item => {
    const accordionHeader = item.querySelector('.questions__header');

    accordionHeader.addEventListener('click', () => {
        item.classList.toggle('accordion-open');
        const accordionContent = item.querySelector('.questions__content');
        if (item.classList.contains('accordion-open')) {
            accordionContent.style.height = accordionContent.scrollHeight + 'px';
        } else {
            accordionContent.style.height = '0';
        }
    });
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionTop = current.offsetTop - 58;
        const sectionHeight = current.offsetHeight;
        const sectionId = current.getAttribute('id');

        const isInSection = scrollY > sectionTop && scrollY <= sectionTop + sectionHeight;
        const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

        if (navLink) {
            navLink.classList.toggle('active-link', isInSection);
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*=============== SHOW SCROLL UP ===============*/ 
window.addEventListener('scroll', () => {
    const scrollUp = document.getElementById('scroll-up');
    scrollUp.classList.toggle('show-scroll', window.scrollY >= 400);
});

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

function toggleTheme() {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
}

function getCurrentTheme() {
    return document.body.classList.contains(darkTheme) ? 'dark' : 'light';
}

function getCurrentIcon() {
    return themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';
}

themeButton.addEventListener('click', toggleTheme);

// Initialize theme based on user preference
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
});

sr.reveal('.home__data');
sr.reveal('.home__img', { delay: 500 });
sr.reveal('.home__social', { delay: 600 });
sr.reveal('.about__img, .contact__box', { origin: 'left' });
sr.reveal('.about__data, .contact__form', { origin: 'right' });
sr.reveal('.steps__card, .product__card, .questions__group, .footer', { interval: 100 });


$(document).ready(function() {
    $('.questions__header').click(function() {
      $(this).parent('.questions__item').toggleClass('active');
    });
  });
  
