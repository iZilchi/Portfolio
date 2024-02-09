document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    const wrapper = document.querySelector('.wrapper');
    const carousel = document.querySelector('.carousel');
    const arrowBtns = document.querySelectorAll('.wrapper i');
    const firstCardWidth = document.querySelector('.card').offsetWidth;
    const carouselChildren = [...carousel.children];

    let currentSectionIndex = 0;
    let touchStartY;

    let isDragging = false, startX, startScrollLeft, timeoutId;
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    carouselChildren.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
    });

    carouselChildren.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML('beforeend', card.outerHTML);
    });


    arrowBtns.forEach(btn => {
        btn.addEventListener ("click", () => {
            carousel.scrollLeft += btn.id === "left" ? - firstCardWidth : firstCardWidth;
        });
    });
    
    const infiniteScroll = () => {
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
    }

    document.querySelectorAll('.navigation .list').forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    document.getElementById('menuToggle').addEventListener('click', function () {
        this.classList.toggle('open');

        const navItems = document.querySelectorAll('.nav-items');

        navItems.forEach(item => {
            item.classList.toggle('show');
        });
    });

    document.getElementById('socialToggle').addEventListener('click', function () {
        this.classList.toggle('open');

        const socialItems = document.querySelectorAll('.social-items');

        socialItems.forEach(item => {
            item.classList.toggle('show');
        });
    });

    function scrollToNextSection() {
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
        }
    }

    function scrollToPreviousSection() {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
        }
    }

    function handleTouchStart(event) {
        touchStartY = event.touches[0].clientY;
    }

    function handleTouchMove(event) {
        const deltaY = event.touches[0].clientY - touchStartY;

        if (deltaY > 20) {
            scrollToPreviousSection();
        } else if (deltaY < -20) {
            scrollToNextSection();
        }

        touchStartY = null;
    }

    function handleWheel(event) {
        if (event.deltaY > 0) {
            scrollToNextSection();
        } else if (event.deltaY < 0) {
            scrollToPreviousSection();
        }
    }

    function handleIntersection(entries) {
        entries.forEach((entry) => {
            recursiveApplyShowClass(entry.target, entry.isIntersecting);
    
            // Get the corresponding navigation list item using the data-target attribute
            const target = entry.target.id;
            const navigationListItem = document.querySelector('.navigation .list[data-target="' + target + '"]');
    
            // Add or remove the .active class based on intersection
            if (entry.isIntersecting) {
                navigationListItem.classList.add('active');
            } else {
                navigationListItem.classList.remove('active');
            }
        });
    }

    function recursiveApplyShowClass(element, shouldShow) {
        const hiddenElements = element.querySelectorAll('.hidden');
        hiddenElements.forEach((hiddenElement) => {
            if (shouldShow) {
                hiddenElement.classList.add('show');
            } else {
                hiddenElement.classList.remove('show');
            }
        });

        const menuBarElement = document.querySelector('.menu-bar');
        menuBarElement.classList.add('show');

        const socialsElement = document.querySelector('.socials');
        socialsElement.classList.add('show');

        const brandElement = document.querySelector('.brand');
        brandElement.classList.add('show');

        const children = Array.from(element.children);
        children.forEach((child) => {
            recursiveApplyShowClass(child, shouldShow);
        });
    }

    const observer = new IntersectionObserver(handleIntersection, { rootMargin: "-50px 0px -49px 0px" });

    sections.forEach((section) => {
        observer.observe(section);
    });
    

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('wheel', handleWheel);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout (timeoutId));
});