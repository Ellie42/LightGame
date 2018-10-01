import {Direction} from "./Transform";

export default class Vector2 {
    static get Up() {
        return new Vector2(0, -1)
    };

    static get Down() {
        return new Vector2(0, 1)
    };

    static get Left() {
        return new Vector2(-1, 0)
    };

    static get Right() {
        return new Vector2(1, 0)
    };

    public x: number = 0;
    public y: number = 0;

    get squareMagnitude() {
        return Math.abs(this.x * this.x + this.y * this.y);
    }

    get magnitude() {
        return Math.sqrt(this.squareMagnitude);
    }

    get normalised() {
        const magnitude = this.magnitude;

        if (magnitude <= 0) {
            return new Vector2();
        }

        return new Vector2(this.x / magnitude, this.y / magnitude);
    }

    constructor(x: number = 0, y: number = 0) {
        this.set(x, y);
    }

    add(other: Vector2) {
        this.x += other.x;
        this.y += other.y;

        return this;
    }

    public static add(a: Vector2 | t_Vector2, b: Vector2 | t_Vector2) {
        const {ax, ay, bx, by} = this._getVectorValues(a, b);

        return new Vector2(
            ax + bx,
            ay + by
        );
    }

    private static _getVectorValues(a: Vector2 | t_Vector2, b: Vector2 | t_Vector2) {
        let ax: number, ay: number, bx: number, by: number;

        if (Array.isArray(a)) {
            ax = a[0];
            ay = a[1];
        } else {
            ax = a.x;
            ay = a.y;
        }

        if (Array.isArray(b)) {
            bx = b[0];
            by = b[1];
        } else {
            bx = b.x;
            by = b.y;
        }
        return {ax, ay, bx, by};
    }

    set(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;

        return this;
    }

    static times(a: Vector2 | t_Vector2, b: Vector2 | t_Vector2 | number) {
        let ax: number, ay: number, bx: number, by: number;

        if (Array.isArray(a)) {
            ax = a[0];
            ay = a[1];
        } else {
            ax = a.x;
            ay = a.y;
        }

        if (Array.isArray(b)) {
            bx = b[0];
            by = b[1];
        } else if (typeof b === 'number') {
            return new Vector2(ax * b, ay * b);
        } else {
            bx = b.x;
            by = b.y;
        }

        return new Vector2(ax * bx, ay * by);
    }

    times(num: number) {
        this.x *= num;
        this.y *= num;

        return this;
    }

    static distance(x: number, y: number, x2: number, y2: number) {
        const dx = x - x2;
        const dy = y - y2;

        return Math.sqrt(dx * dx + dy * dy);
    }

    static sub(a: Vector2 | t_Vector2, b: Vector2 | t_Vector2) {
        const {ax, ay, bx, by} = this._getVectorValues(a, b);

        return new Vector2(ax - bx, ay - by);
    }

    static fromDirection(direction: Direction): Vector2 {
        switch (direction) {
            case Direction.Up:
                return Vector2.Up;
            case Direction.Down:
                return Vector2.Down;
            case Direction.Left:
                return Vector2.Left;
            default:
                return Vector2.Right;
        }
    }

    invert() {
        this.x *= -1;
        this.y *= -1;

        return this;
    }
}