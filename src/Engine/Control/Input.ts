export enum KeyState {
    Up = 0,
    Down = 1,
}

export default class Input {
    private inputState = new Map<string, KeyState>();
    private changedThisTick = new Set();

    constructor() {
        window.addEventListener('keydown', this._keydown.bind(this));
        window.addEventListener('keyup', this._keyup.bind(this));
    }

    public isKeyHeld(key: string): boolean {
        let keyState = this.inputState.get(key);

        if (!keyState) {
            return false;
        }

        return this.inputState.get(key) == KeyState.Down;
    }

    public isKeyPressed(key: string): boolean {
        let held = this.isKeyHeld(key);

        if (!held) {
            return false;
        }

        return this.changedThisTick.has(key);
    }

    public tick() {
        this.changedThisTick.clear();
    }

    private _keyup(e: KeyboardEvent) {
        this.inputState.set(e.key, KeyState.Up);
        this.changedThisTick.add(e.key);
    }

    private _keydown(e: KeyboardEvent) {
        this.inputState.set(e.key, KeyState.Down);
        this.changedThisTick.add(e.key);
    }
}