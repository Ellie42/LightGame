export default class Rotation {
    private _angle: number = 0;

    get angle(): number {
        return this._angle;
    }

    /**
     * Set angle in degrees
     * @param val
     */
    set angle(val: number) {
        this._angle = val % 360;
    }

    /**
     * Set angle in radians
     * @param val
     */
    set angleRadians(val: number) {
        this._angle = val * 180 / Math.PI;
    }

    get angleRadians() {
        return this._angle * Math.PI / 180;
    }
}