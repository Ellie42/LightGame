export default class Vector2 {
    x: number = 0;
    y: number = 0;

    constructor(x: number = 0, y: number = 0) {
        this.set(x, y);
    }

    add(other: Vector2) {
        this.x += other.x;
        this.y += other.y;

        return this;
    }

    set(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;

        return this;
    }

    static times(a: Vector2, b: Vector2 | number) {
        if (typeof b === 'number') {
            return new Vector2(a.x * b, a.y * b);
        }

        return new Vector2(a.x * b.x, a.y * b.y);
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
}