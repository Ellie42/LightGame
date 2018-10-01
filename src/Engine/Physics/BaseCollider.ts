import GameObject from "../Entity/GameObject";
import Collision from "./Collision";

export enum ColliderType {
    BoundingBox, Circle, Line
}

export default abstract class BaseCollider {
    public readonly parent: GameObject;
    public readonly abstract type: ColliderType;

    constructor(parent: GameObject) {
        this.parent = parent;
    }

    render() {

    }

    abstract calculateCollision(otherC: BaseCollider): Collision | null;
}