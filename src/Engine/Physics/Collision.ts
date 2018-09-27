import GameObject from "../Entity/GameObject";

export default class Collision {
    public readonly target: GameObject;
    public distance: number = 0;

    constructor(target: GameObject) {
        this.target = target;
    }
}