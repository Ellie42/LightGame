import Entity from "../Engine/Entity/Entity";
import Vector2 from "../Engine/Position/Vector2";
import {Tag} from "../config/engine";
import BoundingBoxCollider from "../Engine/Physics/BoundingBoxCollider";
import {Direction} from "../Engine/Position/Transform";
import Trail from "./Trails/Trail";

export default class Player extends Entity {
    public readonly tag = Tag.Player;

    private _speed = 50;
    private _momentum: Vector2;
    private _prevDirection: Direction;
    private _direction!: Direction;
    private _trail: Trail;

    constructor() {
        super();

        this._momentum = new Vector2(this._speed);
        this._prevDirection = Direction.Right;
        this._changeDirection(Direction.Right);
        this._trail = new Trail(this);

        this.dimensions.width = 20;
        this.dimensions.height = 10;
        // this.collider = new CircleCollider(this, 25);
        this.collider = new BoundingBoxCollider(this);
    }

    public get trailPoint() : Vector2{
        const center = this.center;
        const backwards = Vector2.fromDirection(this._direction).invert();
        const offset = backwards.times((this.dimensions.width / 2) + 1);

        return Vector2.add(center, offset);
    }

    public start() {
        this.transform.position.x = 100;
        this.transform.position.y = 100;

        this.scene.addEntity(this._trail, this.layer.id);
        this._initTrail();
    }

    private _initTrail() {
        this._trail.pushPoint(this.center);
        this._trail.pushPoint(this.center);
    }

    public render() {
        if (!this.layer) {
            return;
        }

        this.layer.context.fillStyle = '#5cd3ff';
        this.layer.context.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }

    public get center(): Vector2 {
        return Vector2.add(this.transform.position, new Vector2(this.dimensions.width / 2, this.dimensions.height / 2));
    }

    public tick() {
        if (this.input.isKeyPressed('ArrowUp')) {
            this._changeDirection(Direction.Up);
        } else if (this.input.isKeyPressed('ArrowDown')) {
            this._changeDirection(Direction.Down);
        } else if (this.input.isKeyPressed('ArrowRight')) {
            this._changeDirection(Direction.Right);
        } else if (this.input.isKeyPressed('ArrowLeft')) {
            this._changeDirection(Direction.Left);
        }

        this.transform.position.add(Vector2.times(this._momentum, this.game.time.perSecond));

        if (this._direction === this._prevDirection) {
            this._trail.updatePoint(this.center);
        } else {
            this._trail.pushPoint(this.center);
        }

        this._prevDirection = this._direction;

        // this.transform.rotation.angle += 90 * this.game.time.perSecond;

        const collisions = this.game.physics.colliding(this, Tag.Environment);

        if (collisions) {
            return this._die();
        }
    }

    private _changeDirection(direction: Direction) {
        let newAngle = 0;
        let directionVector: Vector2;

        switch (direction) {
            case Direction.Up:
                newAngle = 270;
                break;
            case Direction.Left:
                newAngle = 180;
                break;
            case Direction.Right:
                newAngle = 0;
                break;
            case Direction.Down:
                newAngle = 90;
                break;
            default:
                directionVector = new Vector2();
                break;
        }

        this.transform.rotation.angle = newAngle;
        this._momentum = Vector2.times(Vector2.fromDirection(direction), this._speed);
        this._direction = direction;
    }

    public onLaserHit(trail: Trail) {
        this._die();
    }

    private _die() {
        this.transform.position.set(100, 100);
        this._trail.clear();
        this._initTrail();
        this._changeDirection(Direction.Right);
    }
}