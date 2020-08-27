import { handleControls } from "./gameplay";

const keyboardInputHandler = ({ key }) => {
  switch (key) {
    case "ArrowUp":
      handleControls("up");
      break;
    case "ArrowRight":
      handleControls("right");
      break;
    case "ArrowDown":
      handleControls("down");
      break;
    case "ArrowLeft":
      handleControls("left");
      break;
    default:
      handleControls("pause");
  }
}

export const handleInput = () => {
  document.addEventListener("keydown", keyboardInputHandler);
};
