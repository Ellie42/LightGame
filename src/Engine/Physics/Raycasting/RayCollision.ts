import Collision from "../Collision";
import GameObject from "../../Entity/GameObject";

export default class RayCollision extends Collision {
    public readonly nearPoint: number[];
    public readonly farPoint: number[];

    constructor(target: GameObject, near: number[], far: number[]) {
        super(target);
        this.nearPoint = near;
        this.farPoint = far;
    }
}