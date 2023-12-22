document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.querySelector(".cursor");
    const starsContainer = document.querySelector(".stars-container");
    const planets = document.querySelectorAll(".planet");
    const minStarSize = 2;
    const maxStarSize = 6;
    const minDistanceBetweenStars = 50;

    document.addEventListener("mousemove", (e) => {
        let x = e.pageX;
        let y = e.pageY;

        cursor.style.top = y + "px";
        cursor.style.left = x + "px";
        cursor.style.display = "block";
    });

    document.querySelectorAll("section").forEach((section) => {
        section.addEventListener("mouseenter", () => {
            cursor.style.display = "block";
        });

        section.addEventListener("mouseleave", () => {
            cursor.style.display = "none";
        });
    });

    document.addEventListener("mouseout", () => {
        cursor.style.display = "none";
    });

    function getRandomSize() {
        return Math.floor(Math.random() * (maxStarSize - minStarSize + 1)) + minStarSize;
    }

    function isPointInsideCircle(x, y, cx, cy, radius) {
        const distance = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
        return distance <= radius;
    }

    function isPointTooClose(x, y, otherStars) {
        return otherStars.some(({ x: starX, y: starY, size: starSize }) => {
            const distance = Math.sqrt(Math.pow(x - starX, 2) + Math.pow(y - starY, 2));
            const minDistance = starSize / 2 + minDistanceBetweenStars;
            return distance <= minDistance;
        });
    }

    function setStarPosition(star, otherStars) {
        const maxX = window.innerWidth - star.size * 2;
        const maxY = window.innerHeight - star.size * 2;

        let randomX, randomY;
        do {
            randomX = Math.floor(Math.random() * maxX);
            randomY = Math.floor(Math.random() * maxY);
        } while (
            planets.length > 0 &&
            planets.every((planet) => isPointInsideCircle(randomX, randomY, planet.offsetLeft, planet.offsetTop, planet.offsetWidth / 2 + star.size / 2)) ||
            isPointTooClose(randomX, randomY, otherStars)
        );

        star.style.top = randomY + "px";
        star.style.left = randomX + "px";
    }

    const numStars = 50;
    const createdStars = [];
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.size = getRandomSize();
        star.style.width = star.size + "px";
        star.style.height = star.size + "px";
        starsContainer.appendChild(star);
        setStarPosition(star, createdStars);
        createdStars.push({ x: star.offsetLeft, y: star.offsetTop, size: star.size });
    }
});
