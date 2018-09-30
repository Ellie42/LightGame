import Entity from "../../Engine/Entity/Entity";
import Vector2 from "../../Engine/Position/Vector2";

export default class Trail extends Entity {
    private _points: t_Vector2[];
    private _currentIndex = -1;

    constructor() {
        super();

        this._points = [];
    }

    public render() {
        if (!this.layer) {
            return;
        }

        const ctx = this.layer.context;

        ctx.beginPath();
        ctx.strokeStyle = '#ff362c';
        ctx.lineWidth = 4;

        let i = 0;
        const pointCount = this._points.length;

        for (; i < pointCount; i++) {
            if (i === 0) {
                ctx.moveTo(this._points[i][0], this._points[i][1]);
                continue;
            }

            ctx.lineTo(this._points[i][0], this._points[i][1]);
        }

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