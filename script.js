const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'classic';

let size = DEFAULT_SIZE;
let mode = DEFAULT_MODE;

let pointerDown = false;
document.body.onpointerdown = () => (pointerDown = true);
document.body.onpointerup = () => (pointerDown = false);

const sizeLabel = document.getElementById('sizeLabel')
const sizeSlider = document.getElementById('slider');
const modeSelector = document.getElementById('modeSelector')
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn')
const grid = document.getElementById('grid');

sizeSlider.addEventListener("change", (e) => {
    size = e.target.value
    reloadGrid();
})

sizeSlider.addEventListener("input", (e) => {
    inputSize = e.target.value;
    sizeLabel.innerHTML = "Canvas size: " + e.target.value + " x " + e.target.value;
})

modeSelector.addEventListener("click", () => {
    mode = modeSelector.options[modeSelector.selectedIndex].value;
})

clearBtn.onclick = () => reloadGrid();

function draw(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('pointerover', changeColor)
        gridElement.addEventListener('pointerdown', changeColor)
        grid.appendChild(gridElement);
    }
}

function clear() {
    grid.innerHTML = "";
}

function reloadGrid() {
    clear();
    draw(size);
}

function changeColor(e) {
    if (e.pointerType === "mouse" || e.pointerType === "pen" && !pointerDown) return
    if (mode === 'classic') {
        e.target.style.backgroundColor = 'var(--text-color)';
    }
    else if (mode === 'rainbow') {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        e.target.style.backgroundColor = "#" + randomColor;
    }
    else if (mode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe';
    }
    
}

window.onload = () => {
    draw(DEFAULT_SIZE);
}

