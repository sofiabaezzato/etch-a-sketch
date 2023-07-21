const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'classic';

let size = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;

function setCurrentMode(newMode) {
    newMode = modeSelector.options[modeSelector.selectedIndex].value;
    currentMode = newMode;
}

const sizeLabel = document.getElementById('sizeLabel')
const sizeSlider = document.getElementById('slider');
const modeSelector = document.getElementById('modeSelector')
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn')
const grid = document.getElementById('grid');

let pointerDown = false;
document.body.onpointerdown = () => (pointerDown = true);
document.body.onpointerup = () => (pointerDown = false);

sizeSlider.addEventListener("change", (e) => {
    size = e.target.value
    reloadGrid();
})

sizeSlider.addEventListener("input", (e) => {
    inputSize = e.target.value;
    sizeLabel.innerHTML = "Canvas size: " + e.target.value + " x " + e.target.value;
})

modeSelector.onclick = () => setCurrentMode();
clearBtn.onclick = () => reloadGrid();

function draw(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        /* gridElement.addEventListener('pointermove', changeColor) */
        gridElement.addEventListener('pointerdown', changeColor)
        grid.appendChild(gridElement);
    }
}

/* function updateMode() {
    mode = modeSelector.options[modeSelector.selectedIndex].value;
} */

function clear() {
    grid.innerHTML = "";
}

function reloadGrid() {
    clear();
    draw(size);
}

function changeColor(e) {
    if (!pointerDown) return
    if (currentMode === 'classic') {
        e.target.style.backgroundColor = 'var(--text-color)';
    }
    else if (currentMode === 'rainbow') {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        e.target.style.backgroundColor = "#" + randomColor;
    }
    else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe';
    }
    
}

window.onload = () => {
    draw(DEFAULT_SIZE);
}



grid.addEventListener('pointerdown', (e) => {
    pointerDown = true;
    changeColor(e);
});


grid.addEventListener('pointermove', (e) => {
    if (pointerDown) {
        changeColor(e);
    }
});
