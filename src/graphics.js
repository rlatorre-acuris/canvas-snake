export const gridWidth = 30;
export const gridHeight = 30;
const squareSize = 20;

let ctx;

export const initContext = () => {
  if (ctx) return ctx;
  const canvas = document.getElementById("snake");
  ctx = canvas.getContext("2d");
  return ctx;
}

const indexToCoord = index => index * squareSize;

export const drawSquare = (x, y, color = "green") => {
  ctx.fillStyle = color;

  ctx.fillRect(indexToCoord(x), indexToCoord(y), squareSize, squareSize);
}

export const removeSquare = (x, y) => {
  ctx.clearRect(indexToCoord(x), indexToCoord(y), squareSize, squareSize);
}

export const clearScreen = () => {
  ctx.clearRect(0, 0, gridWidth * squareSize, gridHeight * squareSize);
}