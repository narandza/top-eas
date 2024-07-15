const INITIAL_GRID_DIMENSION = 16;

const container = document.querySelector(".container");

const createGrid = (side = INITIAL_GRID_DIMENSION) => {
  container.innerHTML = "";
  for (let i = 0; i < side; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < side; j++) {
      const column = document.createElement("div");
      column.classList.add("column");
      column.addEventListener("mouseover", () => {
        column.style.backgroundColor = "red";
      });
      row.appendChild(column);
    }

    container.appendChild(row);
  }
};

const newGridBtn = document.querySelector(".newSketchBtn");
newGridBtn.addEventListener("click", () => {
  const dimension = parseInt(
    prompt("How many squares per side on new grid? (max 100)")
  );
  if (dimension < 0 || dimension >= 100) {
    alert("Please enter number between 0 and 100");
  } else if (typeof dimension != "number") {
    alert("Please enter a number");
  } else {
    createGrid(dimension);
  }
});

createGrid();
