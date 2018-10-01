import Entity from "../../Engine/Entity/Entity";
import Vector2 from "../../Engine/Position/Vector2";
import Ray from "../../Engine/Physics/Raycasting/Ray";
import {Tag} from "../../config/engine";
import Player from "../Player";

export default class Trail extends Entity {
    private _points: t_Vector2[];
    private _currentIndex = -1;
    private _parent: Entity;

    constructor(parent: Entity) {
        super();
        this._parent = parent;

        this._points = [];
    }

    public tick() {
        if (this._points.length < 2) {
            return;
        }

        let i = 0;

        for (; i < this._points.length; i++) {
            if (i === this._points.length - 1) {
                break;
            }

            const distance = Vector2.distance(this._points[i][0], this._points[i][1], this._points[i + 1][0], this._points[i + 1][1]);

            const hits = this.game.physics.raycast(
                new Ray(this._points[i], Vector2.sub(this._points[i + 1], this._points[i]).normalised, distance),
                Tag.Player
            );

            if (hits) {
                hits.forEach(p => {
                    if(!(this._points.length - i < 4 && p.target === this._parent))
                    if ((<Player>p.target).onLaserHit) {
                        (<Player>p.target).onLaserHit(this);
                    }
                });
            }
        }
    }

    public render() {
        if (!this.layer) {
            return;
        }

        const ctx = this.layer.context;

        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.fillStyle = '#fff';

        let i = 0;

        const pointCount = this._points.length;

        for (; i < pointCount; i++) {
            if (this.game.debugMode) {
                ctx.font = '16px sans-serif';
                ctx.fillText(`${this._points[i][0].toFixed(0)} ${this._points[i][1].toFixed(0)}`,
                    this._points[i][0], this._points[i][1]);
            }

            if (i === 0) {
                ctx.moveTo(this._points[i][0], this._points[i][1]);
                continue;
            }

            ctx.lineTo(this._points[i][0], this._points[i][1]);
        }

        ctx.lineWidth = 4;
        ctx.strokeStyle = '#ff362c';
        ctx.stroke();
    }

    updatePoint(point: t_Vector2 | Vector2) {
        if (Array.isArray(point)) {
            this._points[this._currentIndex] = point;
        } else {
            this._points[this._currentIndex] = [point.x, point.y];
        }
    }

    pushPoint(point: t_Vector2 | Vector2) {
        if (Array.isArray(point)) {
            this._points[++this._currentIndex] = point;
        } else {
            this._points[++this._currentIndex] = [point.x, point.y];
        }
    }

    clear() {
        this._points = [];
        this._currentIndex = -1;
    }
}