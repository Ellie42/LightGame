import "./scss/_style.scss";

import LightGame from "./Engine/LightGame";
import DevScene from "./Scenes/DevScene";

const gameContainer = document.querySelector('#game') as HTMLElement;
const game = new LightGame(gameContainer);

game.start(new DevScene());