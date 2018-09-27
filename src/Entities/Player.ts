import Entity from "../Engine/Entity/Entity";
import Vector2 from "../Engine/Position/Vector2";
import Bounds from "../Engine/Physics/Bounds";
import {Tag} from "../config/engine";
import BoxCollider from "../Engine/Physics/BoxCollider";
import CircleCollider from "../Engine/Physics/CircleCollider";

export default class Player extends Entity {
    public readonly tag = Tag.Player;

    private _speed = 100;
    private _momentum = new Vector2(this._speed);

    constructor() {
        super();

        this.bounds.width = 50;
        this.bounds.height = 25;
        // this.collider = new CircleCollider(this, 25);
        this.collider = new BoxCollider(this);
    }

    public start() {
        this.transform.position.x = 100;
        this.transform.position.y = 100;
    }

    public render() {
        if (!this.layer) {
            return;
        }

        this.layer.context.fillStyle = '#5cd3ff';
        this.layer.context.fillRect(0, 0, 50, 25);
    }

    public tick() {
        if (this.input.isKeyPressed('ArrowUp')) {
            this._momentum.set(0, -this._speed);
            this.transform.rotation.angle = 270;
        } else if (this.input.isKeyPressed('ArrowDown')) {
            this.transform.rotation.angle = 90;
            this._momentum.set(0, this._speed);
        } else if (this.input.isKeyPressed('ArrowRight')) {
            this.transform.rotation.angle = 0;
            this._momentum.set(this._speed, 0);
        } else if (this.input.isKeyPressed('ArrowLeft')) {
            this.transform.rotation.angle = 180;
            this._momentum.set(-this._speed, 0);
        }

        // this.transform.position.add(Vector2.times(this._momentum, this.game.time.perSecond));
        this.transform.rotation.angle += 90 * this.game.time.perSecond;

        const collisions = this.game.physics.colliding(this, Tag.Environment);

        if (collisions) {
            this.transform.position.set(100, 100);
        }
    }
}