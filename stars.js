document.addEventListener("DOMContentLoaded", () => {
    const starsContainer = document.querySelector(".stars-container");
    const cursor = document.querySelector(".cursor");
    const minStarSize = 2, maxStarSize = 6, minDistance = 50;

    const getRandomSize = () => Math.floor(Math.random() * (maxStarSize - minStarSize + 1)) + minStarSize;

    document.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;

        cursor.style.transition = "transform 0.2s ease-out";
        cursor.style.transform = `translate(${clientX - 10}px, ${clientY - 10}px)`;
    });

    document.addEventListener("mouseenter", () => {
        cursor.style.display = "block";
    });

    document.addEventListener("mouseleave", () => {
        cursor.style.transition = "none";
        cursor.style.display = "none";
    });

    const isPointTooClose = (x, y, otherStars) =>
        otherStars.some(({ x: starX, y: starY, size: starSize }) =>
            Math.sqrt((x - starX) ** 2 + (y - starY) ** 2) <= starSize / 2 + minDistance
        );

    const setStarPosition = (star, otherStars) => {
        const maxX = window.innerWidth - star.size * 2;
        const maxY = window.innerHeight - star.size * 2;

        let randomX, randomY;
        do {
            randomX = Math.floor(Math.random() * maxX);
            randomY = Math.floor(Math.random() * maxY);
        } while (isPointTooClose(randomX, randomY, otherStars));

        star.style.top = `${randomY}px`;
        star.style.left = `${randomX}px`;
    };

    const createStar = () => {
        const star = document.createElement("div");
        star.classList.add("star");
        star.size = getRandomSize();
        star.style.width = star.style.height = `${star.size}px`;
        star.style.position = "absolute";
        star.style.backgroundColor = "var(--star1-color)";
        star.style.borderRadius = "50%";
        star.style.boxShadow = `0 0 10px var(--star1-color), 0 0 20px var(--star1-color), 0 0 30px var(--star1-color)`;
        setStarPosition(star, createdStars);
        starsContainer.appendChild(star);

        star.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1500, iterations: 1, easing: "ease-in-out" });

        return star;
    };

    const removeStar = (star) => {
        if (star) star.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 1500, iterations: 1, easing: "ease-in-out" }).onfinish = () => starsContainer.removeChild(star);
    };

    const getRandomStarsCount = () => Math.floor(Math.random() * (15 - 5 + 1)) + 5;

    const createdStars = [];

    setInterval(() => {
        const newStarsCount = getRandomStarsCount();
        for (let i = 0; i < newStarsCount; i++) createdStars.push(createStar());

        setTimeout(() => {
            const vanishedStarsCount = Math.floor(Math.random() * createdStars.length) + 1;
            for (let i = 0; i < vanishedStarsCount; i++) removeStar(createdStars.shift());
        }, 5000);
    }, 2000);
});
