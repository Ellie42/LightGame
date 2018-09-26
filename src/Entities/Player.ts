import Entity from "../Engine/Entity/Entity";
import Vector2 from "../Engine/Position/Vector2";
import Bounds from "../Engine/Collision/Bounds";

export default class Player extends Entity {
    private _speed = 3;
    private _momentum = new Vector2(this._speed);
    public bounds = new Bounds(50,25);

    public start(){
        this.transform.position.x = 300;
        this.transform.position.y = 300;
    }

    public render() {
        if (!this.layer) {
            return;
        }

        this.layer.context.fillStyle = '#5cd3ff';
        this.layer.context.fillRect(0, 0, 50, 25);
    }

    public tick() {
        if (this.game.input.isKeyPressed('ArrowUp')) {
            this._momentum.set(0, -this._speed);
            this.transform.rotation.angle = 270;
        } else if (this.game.input.isKeyPressed('ArrowDown')) {
            this.transform.rotation.angle = 90;
            this._momentum.set(0, this._speed);
        } else if (this.game.input.isKeyPressed('ArrowRight')) {
            this.transform.rotation.angle = 0;
            this._momentum.set(this._speed, 0);
        } else if (this.game.input.isKeyPressed('ArrowLeft')) {
            this.transform.rotation.angle = 180;
            this._momentum.set(-this._speed, 0);
        }

        this.transform.position.add(this._momentum);
    }
}