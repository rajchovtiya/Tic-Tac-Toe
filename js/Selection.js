let headings = document.querySelector(".heading");
let first_selection = document.querySelector(".first_selection");
let second_selection = document.querySelector(".second_selection");

let dropdown = first_selection.children[1].children[0];
let selectionOpsn = first_selection.children[1].children[1];
let options1 = selectionOpsn.querySelectorAll(".custamOPsan");
let first_text = document.querySelector(".first-text");

let dropdown2 = second_selection.children[1].children[0];
let selectionOpsn2 = second_selection.children[1].children[1];
let options2 = selectionOpsn2.querySelectorAll(".custamOPsan");
let second_text = second_selection.querySelector(".first-text");

let custamOPsanSymbols = document.querySelectorAll(".custamOPsanSymbols")
let secondtext = document.querySelector(".second-text")

let isOpen = false;
let isOpen2 = false;
let value = "3X3"

if (localStorage.getItem("heading") === "Multi Player") {
    headings.innerHTML = "Play With Human";
} else {
    headings.innerHTML = "Play With Computer";
}

dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown(selectionOpsn, !isOpen);
    isOpen = !isOpen;
});

options1.forEach((opt) => {
    opt.addEventListener("click", (e) => {
        const value = e.target.innerText;
        localStorage.setItem("grid", value);
        first_text.innerText = value;
        toggleDropdown(selectionOpsn, false);
        isOpen = false;
        chakevalue()
    });
});

dropdown2.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown(selectionOpsn2, !isOpen2);
    isOpen2 = !isOpen2;
});

options2.forEach((opt) => {
    opt.addEventListener("click", (e) => {
        value = e.target.innerText;
        localStorage.setItem("symbols", value);
        second_text.innerText = value;
        toggleDropdown(selectionOpsn2, false);
        isOpen2 = false;
    });
});

function toggleDropdown(element, open) {
    if (open) {
        element.style.visibility = "hidden";
        element.style.height = "auto";
        const height = element.scrollHeight;
        element.style.height = "0px";
        element.style.visibility = "visible";
        gsap.to(element, {
            height: height + "px",
            duration: 0.4,
            ease: "power2.out"
        });
    } else {
        gsap.to(element, {
            height: "0px",
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                element.style.visibility = "hidden";
            }
        });
    }
}

document.addEventListener("click", (e) => {
    if (
        isOpen &&
        !selectionOpsn.contains(e.target) &&
        !dropdown.contains(e.target)
    ) {
        toggleDropdown(selectionOpsn, false);
        isOpen = false;
    }
    if (
        isOpen2 &&
        !selectionOpsn2.contains(e.target) &&
        !dropdown2.contains(e.target)
    ) {
        toggleDropdown(selectionOpsn2, false);
        isOpen2 = false;
    }
});

function chakevalue() {
    custamOPsanSymbols.forEach((element) => {
        element.classList.add("hidden")
        let localvalue = localStorage.getItem("grid")
        if (Number(element.innerHTML) <= Number(localvalue.slice(0, 1))) {
            element.classList.remove("hidden")
        }
        element.addEventListener("click", (elem) => {
            const value = elem.target.innerText;
            localStorage.setItem("Symbols", value);
            secondtext.innerText = value;
            toggleDropdown(selectionOpsn2, false);
            isOpen = false;
        })
    })
}

chakevalue()