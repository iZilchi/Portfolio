document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    const navMenu = document.querySelector('.nav');

    let currentSectionIndex = 0;
    let touchStartY;

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
            if (entry.target.classList.contains('nav-menu')) {
                handleNavMenuIntersection(entry);
            } else {
                recursiveApplyShowClass(entry.target, entry.isIntersecting);
    
                // Check if the entry target has the "brand" class
                if (entry.target.classList.contains('brand')) {
                    entry.target.classList.toggle('show', entry.isIntersecting);
                }
    
                // Check if the entry target has the "socials" class
                if (entry.target.classList.contains('socials')) {
                    entry.target.classList.toggle('show', entry.isIntersecting);
    
                    // Apply "show" class to the children of the "socials" element
                    const socialsChildren = Array.from(entry.target.children);
                    socialsChildren.forEach((child) => {
                        recursiveApplyShowClass(child, entry.isIntersecting);
                    });
                }
            }
        });
    }

    function handleNavMenuIntersection(entry) {
        const children = Array.from(entry.target.children);
        recursiveApplyShowClass(entry.target, entry.isIntersecting);
        for (const child of children) {
            recursiveApplyShowClass(child, entry.isIntersecting);
        }
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

        const children = Array.from(element.children);
        children.forEach((child) => {
            recursiveApplyShowClass(child, shouldShow);
        });
    }

    const observer = new IntersectionObserver(handleIntersection, { rootMargin: "-50px 0px -49px 0px" });

    sections.forEach((section) => {
        observer.observe(section);
    });

    if (navMenu) {
        observer.observe(navMenu);
    }

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('wheel', handleWheel);
});