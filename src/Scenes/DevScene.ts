import BaseScene from "../Engine/Scene/BaseScene";
import Player from "../Entities/Player";
import {Layer} from "../config/engine";
import PlainBackground from "../Entities/Backgrounds/PlainBackground";
import Wall from "../Entities/Environment/Wall";

export default class DevScene extends BaseScene {
    private _player!: Player;
    private _gameWidth = 1000;
    private _gameHeight = 1000;

    start() {
        this._player = this.addEntity(new Player(), Layer.Game);
        this.addEntity(new PlainBackground(), Layer.Background);
        // this.addEntity(new Pillar(), Layer.Background);
        this.addEntity(new Wall(0, 0, this._gameWidth, 10), Layer.Background);
        this.addEntity(new Wall(0, this._gameHeight, this._gameWidth, 10), Layer.Background);
        this.addEntity(new Wall(0, 0, 10, this._gameHeight), Layer.Background);
        this.addEntity(new Wall(this._gameWidth, 0, 10, this._gameHeight), Layer.Background);
    }

    tick(): void {
        super.tick();
    }
}