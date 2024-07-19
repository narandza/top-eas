const INITIAL_GRID_DIMENSION = 16;

// Control panel DOM

const controlPanel = document.querySelector(".control-panel");

const options = [
  {
    className: "grid-range",
    label: "Create new grid",
    inputType: "range",
  },
  {
    className: "color",
    label: "Select Color",
    inputType: "color",
  },
  {
    className: "rainbow",
    label: "Colorful",
    inputType: "checkbox",
  },
  {
    className: "eraser",
    label: "Eraser",
    inputType: "checkbox",
  },
  {
    className: "reset",
    label: "Reset grid",
    inputType: "button",
  },
];

options.forEach((option) => {
  const optionContainer = document.createElement("div");
  optionContainer.classList.add("option");
  if (option.className === "grid-range") {
    optionContainer.classList.add("range-container");
  }
  optionContainer.innerHTML = `<label for=${option.className}>${
    option.label
  }:</label>
          <input class=${option.className} type=${option.inputType} ${
    option.className === "reset"
      ? "value = 'Reset'"
      : option.className === "grid-range"
      ? "value=16 min=16 max=64 step=16"
      : ""
  } />
  `;
  controlPanel.appendChild(optionContainer);
});

const gridRange = document.querySelector(".range-container");

const gridRangeValue = document.createElement("span");

gridRangeValue.textContent = INITIAL_GRID_DIMENSION;

gridRange.addEventListener("input", (e) => {
  gridRangeValue.textContent = e.target.value;
  createGrid(e.target.value);
});

gridRange.appendChild(gridRangeValue);

// Grid

const container = document.querySelector(".container");
let drawing = false;

const color = document.querySelector(".color");
const rainbow = document.querySelector(".rainbow");
const eraser = document.querySelector(".eraser");

const createGrid = (side = INITIAL_GRID_DIMENSION) => {
  container.innerHTML = "";
  let backgroundColor = color.value;
  let colorful = false;
  let earase = false

  color.addEventListener("change", (e) => {
    if(!earase)
    backgroundColor = e.target.value;
  });

  rainbow.addEventListener("change", (e) => {
    colorful = e.target.checked;
  });

  eraser.addEventListener("change", (e) => {
    if (e.target.checked) {
      colorful = false;
      earase = true
      backgroundColor = "#fff";
    }
  });

  for (let i = 0; i < side; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < side; j++) {
      const column = document.createElement("div");
      column.classList.add("column");

      column.addEventListener("mousedown", (e) => {
        drawing = true;
        column.style.backgroundColor = colorful
          ? getRandomColor()
          : backgroundColor;
      });

      column.addEventListener("mousemove", (e) => {
        if (drawing) {
          column.style.backgroundColor = colorful
            ? getRandomColor()
            : backgroundColor;
        }
      });

      row.appendChild(column);
    }

    container.appendChild(row);
  }
};

const reset = document.querySelector(".reset");

reset.addEventListener("click", (e) => {
  createGrid(gridRangeValue.textContent);
});

document.body.addEventListener("mouseup", () => {
  drawing = false;
});

const getRandomNumberFromARange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomColor = () => {
  const red = getRandomNumberFromARange(0, 255);
  const green = getRandomNumberFromARange(0, 255);
  const blue = getRandomNumberFromARange(0, 255);

  return `rgb(${red}, ${green}, ${blue})`;
};

createGrid();
