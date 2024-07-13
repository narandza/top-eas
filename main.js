const GRID_ROWS = 16;
const GRID_COLUMNS = 16;

const container = document.querySelector(".container");

for (let i = 0; i < GRID_ROWS; i++) {
  const row = document.createElement("div");
  row.classList.add("row");

  for (let j = 0; j < GRID_COLUMNS; j++) {
    const column = document.createElement("div");
    column.classList.add("column");
    row.appendChild(column);
  }

  container.appendChild(row);
}
