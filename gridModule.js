
let grid = []
const getGrid = () => grid;

const createGrid = (x, y) => {
  grid = Array(x).fill(null).map(() => Array(y).fill().map((block) => block = { block: Math.floor(Math.random() * 2), user: null, userId: null }));


  for (let i = 0; i < grid.length; i++) {
    if (i % 2 != 0) {
      for (let j = 0; j < grid[i].length; j++) {
        if (j % 2 != 0) {
          grid[i][j].block = 2
        }
      }

    }
  }
  function setCornerValues(x, y, value) {
    const positions = [
      [x, y],
      [x, y + 1],
      [x + 1, y],
      [x - 1, y],
      [x, y - 1],

    ];

    positions.forEach(([i, j]) => {
      if (i < 11 && j < 11 && grid[i] && grid[i][j]) {
        grid[i][j].block = value;
      }
    });
  }
  setCornerValues(0, 0, 0);
  setCornerValues(0, y - 1, 0);
  setCornerValues(x - 1, 0, 0);
  setCornerValues(x - 1, y - 1, 0);

  return grid
}


module.exports = {
  getGrid,
  createGrid
}