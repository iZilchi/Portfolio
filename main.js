document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.querySelector(".cursor");

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
});
