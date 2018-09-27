import BaseScene from "./BaseScene";
import LightGame from "../LightGame";

export default class SceneManager {
    private _currentScene: BaseScene | null = null;

    public set currentScene(scene: BaseScene) {
        this._currentScene = scene;
        this._currentScene.game = this._game;
        this._game.physics.addScene(scene);
        this._currentScene.start();
    }

    private _game: LightGame;

    constructor(game: LightGame) {
        this._game = game;
    }

    tick() {
        if (this._currentScene) {
            this._currentScene.tick();
        }
    }
}