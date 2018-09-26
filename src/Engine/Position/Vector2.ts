export default class Vector2 {
    x: number = 0;
    y: number = 0;

    constructor(x: number = 0, y: number = 0) {
        this.set(x, y);
    }

    add(other: Vector2) {
        this.x += other.x;
        this.y += other.y;
    }

    set(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}