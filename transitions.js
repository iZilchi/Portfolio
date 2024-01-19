document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');

    let currentSectionIndex = 0;
    let touchStartY;


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
});
