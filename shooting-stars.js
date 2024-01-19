document.addEventListener("DOMContentLoaded", () => {
    const shootingStarsContainer = document.querySelector(".shooting-container");
    const minSize = 1, maxSize = 5, minDistance = 50;

    const getRandomSize = () => Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

    const isPointTooClose = (x, y, otherShootingStars) =>
        otherShootingStars.some(({ x: sX, y: sY, size: sSize }) =>
            Math.sqrt((x - sX) ** 2 + (y - sY) ** 2) <= sSize / 2 + minDistance
        );

    const setShootingStarPosition = (shootingStar, otherShootingStars) => {
        const maxX = window.innerWidth - shootingStar.size * 2;
        const maxY = window.innerHeight - shootingStar.size * 2;

        let randomX, randomY;
        do {
            randomX = Math.floor(Math.random() * maxX);
            randomY = Math.floor(Math.random() * maxY);
        } while (isPointTooClose(randomX, randomY, otherShootingStars));

        shootingStar.style.top = `${randomY}px`;
        shootingStar.style.left = `${randomX}px`;
    };

    const createShootingStar = () => {
        const shootingStar = document.createElement("div");
        shootingStar.classList.add("shooting-stars");
        shootingStar.size = getRandomSize();
        shootingStar.style.height = shootingStar.style.width = `${shootingStar.size}px`;
        shootingStar.style.animation = "trail 3s ease-in-out infinite, fall 3s ease-in-out infinite";

        const randomColorIndex = Math.floor(Math.random() * 3); // 0, 1, or 2
        const randomColor = getShootingStarColor(randomColorIndex);

        shootingStar.style.background = `linear-gradient(-45deg, ${randomColor}, rgba(0, 0, 255, 0))`;
        shootingStar.style.borderRadius = "50%";
        shootingStar.style.filter = `drop-shadow(0 0 6px ${randomColor})`;

        ['before', 'after'].forEach(pseudo => {
            const element = document.createElement("div");
            element.style.content = "''";
            element.style.animation = "shining 3s ease-in-out infinite";
            shootingStar.appendChild(element);
        });

        setShootingStarPosition(shootingStar, createdShootingStars);
        shootingStarsContainer.appendChild(shootingStar);

        shootingStar.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1500, iterations: 1, easing: "ease-in-out" });

        return shootingStar;
    };

    const removeShootingStar = (shootingStar) => {
        if (shootingStar) shootingStar.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 1500, iterations: 1, easing: "ease-in-out" }).onfinish = () => shootingStarsContainer.removeChild(shootingStar);
    };

    const getShootingStarColor = (index) => {
        switch (index) {
            case 0:
                return "var(--star1-color)";
            case 1:
                return "var(--star2-color)";
            case 2:
                return "var(--star3-color)";
            default:
                return "var(--inset1-color)";
        }
    };

    const getRandomShootingStarsCount = () => Math.floor(Math.random() * (3 - 2 + 1)) + 2;

    const createdShootingStars = [];

    setInterval(() => {
        const newShootingStarsCount = getRandomShootingStarsCount();

        for (let i = 0; i < newShootingStarsCount; i++) createdShootingStars.push(createShootingStar());

        setTimeout(() => {
            const vanishedShootingStarsCount = Math.floor(Math.random() * createdShootingStars.length) + 1;
            for (let i = 0; i < vanishedShootingStarsCount; i++) removeShootingStar(createdShootingStars.shift());
        }, 5000);
    }, 2000);
});
