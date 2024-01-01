const generateBtn = document.querySelector(".generator");
const whiteboard = document.querySelector(".whiteboard");
const container = document.querySelector(".generator-container");
const placeholder = document.querySelector(".placeholder");
const tooltip = document.getElementById("tooltip");
const boxes = document.querySelectorAll(".box");

let hexGenerated = false;

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

const changeColorCode = () => {
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
};

const copyColorCode = (colorCode) => {
    if (hexGenerated) {
        navigator.clipboard.writeText(colorCode);

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
};

container.addEventListener("click", (e) => {
    // console.log(e);
    if (e.target === generateBtn) {
        changeColorCode();
    }

    if (e.target !== generateBtn) {
        copyColorCode(e.target.innerText);
    }
});

boxes.forEach((box) => {
    const boxCode = box.querySelector(".color-code");
    box.style.backgroundColor = box.lastElementChild.innerText;
    box.addEventListener("click", (e) => {
        document.body.style.backgroundColor = boxCode.innerText;
        navigator.clipboard.writeText(e.target.innerText);
    });

    box.addEventListener(
        "contextmenu",
        (e) => {
            e.preventDefault();
            navigator.clipboard.readText().then((code) => {
                if (code.match(/^#[a-fA-F0-9]{6}$/)) {
                    boxCode.innerText = code;
                } else if (text.match(/^[a-fA-F0-9]{6}$/)) {
                    boxCode.innerText = "#" + code;
                }
                box.style.backgroundColor = boxCode.innerText;
            });
        },
        true
    );
});
