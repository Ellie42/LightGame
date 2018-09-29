import BaseCollider, {ColliderType} from "./BaseCollider";
import GameObject from "../Entity/GameObject";
import Collision from "./Collision";
import Vector2 from "../Position/Vector2";
import Physics from "./Physics";
import BoundingBoxCollider from "./BoundingBoxCollider";

export default class CircleCollider extends BaseCollider {
    public readonly size: number;
    public readonly type = ColliderType.Circle;

    public get centerX() {
        return this.parent.transform.position.x + this.parent.bounds.width / 2;
    }

    public get centerY() {
        return this.parent.transform.position.y + this.parent.bounds.height / 2;
    }

    constructor(parent: GameObject, size: number) {
        super(parent);
        this.size = size;
    }

    render() {
        if (!this.parent.layer) {
            return;
        }

        const ctx = this.parent.layer.context;

        ctx.beginPath();

        ctx.arc(
            this.parent.bounds.width / 2,
            this.parent.bounds.height / 2,
            this.size / 2,
            0,
            2 * Math.PI
        );

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#0f0';
        ctx.stroke();
    }

    calculateCollision(otherC: BaseCollider): Collision | null {
        switch (otherC.type) {
            case ColliderType.Box:
                return Physics.boundingBoxToCircleCollision(<BoundingBoxCollider>otherC, this, otherC.parent);
            case ColliderType.Circle:
                return Physics.circleToCircleCollision(<CircleCollider>otherC, this);
        }

        return null;
    }
}