const generateBtn = document.querySelector(".generator");
const whiteboard = document.querySelector(".whiteboard");
const container = document.querySelector(".generator-container");
const placeholder = document.querySelector(".placeholder");
const tooltip = document.querySelector("#tooltip");

let hexGenerated = false;

container.addEventListener("click", (e) => {
    console.log(e);
    if (e.target === generateBtn) {
        // console.log(true);
        whiteboard.removeChild(whiteboard.firstElementChild);

        if (container.lastElementChild.classList[0] == "copied") {
            container.removeChild(container.lastElementChild);
        }

        tooltip.classList.remove("before");
        tooltip.classList.add("tooltip");
        tooltip.style.animation = "bounce 1s ease forwards";

        setTimeout(() => {
            tooltip.style.animation = "";
            tooltip.classList.add("before");
            tooltip.classList.remove("tooltip");
        }, 1000);

        const span = document.createElement("span");
        span.innerText = generate();
        whiteboard.appendChild(span);
        hexGenerated = true;
    }
    if (e.target !== generateBtn) {
        // console.log(false);
        // console.log(whiteboard.children);
        if (hexGenerated) {
            navigator.clipboard.writeText(e.target.innerText);

            if (container.lastElementChild.classList[0] !== "copied") {
                const span = document.createElement("span");
                span.innerText = "Copied";
                span.classList.add("copied");
                setTimeout(() => {
                    span.style.opacity = 1;
                }, 100);
                container.appendChild(span);
            }
        }
    }
});

// randome hex color code generator
function generate() {
    const possibleUnits = "ABCDEF1234567890";
    let value = "#";

    for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * possibleUnits.length);
        value += possibleUnits[index];
    }

    return value;
}

const boxes = document.querySelectorAll(".box");
const body = document.body;

boxes.forEach((box) => {
    const span = box.lastElementChild;
    // console.log(span.innerText);
    box.style.backgroundColor = box.lastElementChild.innerText;
    box.addEventListener("click", (e) => {
        body.style.backgroundColor = box.lastElementChild.innerText;
        navigator.clipboard.writeText(e.target.innerText);
    });
    box.addEventListener(
        "contextmenu",
        (e) => {
            e.preventDefault();
            navigator.clipboard.readText().then((text) => {
                if (text.match(/^#[a-fA-F0-9]{6}$/)) {
                    span.innerText = text;
                    box.style.backgroundColor = text;
                }
            });
        },
        true
    );
});
