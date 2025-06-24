function gsapCode() {
    gsap.to(".row1_border", {
        left: "100%",
        duration: 1, // adjust speed
        ease: "none",
        repeat: -1,
        startAt: { left: "-100%" }
    });

    gsap.to(".row2_border", {
        left: "-100%",
        duration: 1,
        ease: "none",
        repeat: -1,
        startAt: { left: "100%" }
    });

    gsap.to(".row3_border", {
        top: "100%",
        duration: 1,
        ease: "none",
        repeat: -1,
        startAt: { top: "-100%" }
    });

    gsap.to(".row4_border", {
        top: "-100%",
        duration: 1,
        ease: "none",
        repeat: -1,
        startAt: { top: "100%" }
    });


}

function hoverButtons() {
    const hoverButtons = document.querySelectorAll(".hoverButton");

    hoverButtons.forEach((element) => {
        const [border1, border2, border3, border4] = element.children;

        element.addEventListener("mousemove", () => {
            gsap.to(border1, { x: "100%", duration: 0.5, ease: "power2.out", width: "101%" });
            gsap.to(border2, { x: "-100%", duration: 0.5, width: "110%" });
            gsap.to(border3, { y: "100%", duration: 0.5, height: "110%" });
            gsap.to(border4, { y: "-100%", duration: 0.5, height: "110%" });
        });

        element.addEventListener("mouseleave", () => {
            gsap.to(border1, { x: "0%", duration: 0.5, ease: "power2.out", width: "15%" });
            gsap.to(border2, { x: "0%", duration: 0.5, ease: "power2.out", width: "15%" });
            gsap.to(border3, { y: "0%", duration: 0.5, ease: "power2.out", height: "40%" });
            gsap.to(border4, { y: "0%", duration: 0.5, ease: "power2.out", height: "40%" });
        });
    });

    // Button background + text color change
    const BAOP = document.querySelectorAll(".BA_OP")
    const Play = document.querySelector(".Play")


    BAOP.forEach((button) => {
        button.addEventListener("mousemove", () => {
            gsap.to(button, {
                duration: 3,
                backgroundColor: "#32ff7e",
                color: "#000000",
                overwrite: "auto"

            });
        });

        button.addEventListener("mouseleave", () => {
            gsap.to(button, {
                duration: 0.6,
                ease: "power2.out",
                backgroundColor: "transparent",
                color: "#32ff7e",
                overwrite: "auto"

            });
        });
    });

    Play.addEventListener("mousemove", () => {
        gsap.to(Play, {
            duration: 3,
            backgroundColor: "#fbff18",
            color: "#000000",
            overwrite: "auto"

        });
    });

    Play.addEventListener("mouseleave", () => {
        gsap.to(Play, {
            duration: 0.6,
            ease: "power2.out",
            backgroundColor: "transparent",
            color: "#fbff18",
            overwrite: "auto"

        });
    });

}
let Single_button = document.querySelectorAll(".Single_button")
Single_button.forEach((element) => {
    element.addEventListener("click", (e) => {
        localStorage.setItem("heading", e.target.innerText)
    })
})

document.querySelector(".Back").addEventListener("click", () => {
    history.back(); // go to previous page in browser history
});

gsapCode()

hoverButtons()