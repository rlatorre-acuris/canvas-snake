import { initGame, handleGameIteration } from "./gameplay";
import { handleInput } from "./input";

console.log("document loaded");
initGame();

setInterval(handleGameIteration, 100);

handleInput();



