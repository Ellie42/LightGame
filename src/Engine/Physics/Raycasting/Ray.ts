import Vector2 from "../../Position/Vector2";

export default class Ray {
    public get origin(): t_Vector2 {
        return [this._x1, this._y1];
    }

    public get end(): t_Vector2 {
        return [this._x2, this._y2];
    }

    private _x1: number;
    private _y1: number;

    private _x2: number;
    private _y2: number;

    constructor(origin: t_Vector2 | Vector2, direction: t_Vector2 | Vector2, distance: number = Number.MAX_SAFE_INTEGER) {
        if (Array.isArray(origin)) {
            this._x1 = origin[0];
            this._y1 = origin[1];
        } else {
            this._x1 = origin.x;
            this._y1 = origin.y;
        }

        const end = Vector2.add(origin, Vector2.times(direction, distance));

        this._x2 = end.x;
        this._y2 = end.y;
    }
}