export default class Time {
    private _targetFps: number;

    public get perSecond() {
        return (1000 / this._targetFps) / 1000;
    }

    constructor(targetFps: number) {
        this._targetFps = targetFps;
    }
}