import { gridWidth, gridHeight, initContext, drawSquare, removeSquare, clearScreen } from "./utils";

const gridArea = gridWidth * gridHeight;
const growingBatch = 5;

let headX, headY, tailX, tailY, targetX, targetY;
let squaresToGrow = 0;
let snakeLength = 0;
let direction = 0;

let grid;

const initGrid = () => {
  grid = new Array(gridWidth);
  for (let i = 0; i < gridWidth; i++) {
    grid[i] = new Array(gridHeight);
    for (let j = 0; j < gridHeight; j++) {
      grid[i][j] = 0;
    }
  }
}

const placeSnake = () => {
  const x = Math.floor(Math.random() * gridWidth);
  const y = Math.floor(Math.random() * gridHeight);
  headX = tailX = x;
  headY = tailY = y;
  snakeLength = 1;
  drawSquare(x, y);
  console.log(`Snake placed, headX=${headX} headY=${headY}, x=${x} y=${y}`);
}

const placeTarget = () => {
  const availableSquares = gridArea - snakeLength;
  const index = Math.floor(Math.random() * availableSquares);
  let counter = 0;
  let placed = false;
  for (let i = 0; (i < gridWidth) && !placed; i++) {
    for (let j = 0; (j < gridHeight) && !placed; j++) {
      if(grid[i][j]) continue;
      if (counter === index) {
        targetX = i;
        targetY = j;
        drawSquare(i, j, "red");
        placed = true;
      }
      counter++;
    }
  }
}

const moveAndGrowSnake = () => {
  if (!direction) return;
  grid[headX][headY] = direction;
  switch (direction) {
    case 1:
      headY--;
      break;
    case 2:
      headX++;
      break;
    case 3:
      headY++;
      break;
    case 4:
      headX--;
      break;
  }
  drawSquare(headX, headY);
  if (squaresToGrow) {
    snakeLength++;
    squaresToGrow--;
  } else {
    const tailDirection = grid[tailX][tailY];
    grid[tailX][tailY] = 0;
    removeSquare(tailX, tailY);
    switch (tailDirection) {
      case 1:
        tailY--;
        break;
      case 2:
        tailX++;
        break;
      case 3:
        tailY++;
        break;
      case 4:
        tailX--;
        break;
    }
  }
}

const collisionDetection = () => {
  if (headX < 0 || headX > (gridWidth - 1) || headY < 0 || headY > (gridHeight -1)) return true;
  if (grid[headX][headY]) return true;
  return false;
}

const hitDetection = () => {
  if (headX === targetX && headY === targetY) return true;
  return false;
}

const resetGame = () => {
  squaresToGrow = snakeLength = direction = 0;
  initGrid();
  clearScreen();
  placeSnake();
  placeTarget();
}

export const initGame = () => {
  initContext();
  resetGame();
}

export const handleGameIteration = () => {
  if (!direction) return;
  moveAndGrowSnake();
  if (collisionDetection()) {
    direction = 0;
    return;
  }
  if (hitDetection()) {
    squaresToGrow += growingBatch;
    placeTarget();
  }
}

export const handleControls = (command) => {
  switch(command) {
    case "up":
      direction = 1;
      break;
    case "right":
      direction = 2;
      break;
    case "down":
      direction = 3;
      break;
    case "left":
      direction = 4;
      break;
    case "pause":
    default:
      if (direction) {
        direction = 0;
      } else {
        resetGame();
      } 
  }
} 