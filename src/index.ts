import "./scss/_style.scss";

import LightGame from "./Engine/LightGame";
import DevScene from "./Scenes/DevScene";

const gameContainer = document.querySelector('#game') as HTMLElement;
const game = new LightGame(gameContainer);

(async function start() {
    await game.network.connect();
    game.start(new DevScene());
})();
