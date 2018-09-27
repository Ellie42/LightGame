import BaseCollider, {ColliderType} from "./BaseCollider";
import Bounds from "./Bounds";
import GameObject from "../Entity/GameObject";
import Collision from "./Collision";
import Physics from "./Physics";
import CircleCollider from "./CircleCollider";
import Matrix2d from "../Position/Matrix2d";

export default class BoxCollider extends BaseCollider {
    public readonly type = ColliderType.Box;
    private _bounds: Bounds;

    public get left() {
        return this.parent.transform.position.x;
    }

    public get top() {
        return this.parent.transform.position.y;
    }

    public get right() {
        return this.left + this._bounds.width;
    }

    public get bottom() {
        return this.top + this._bounds.height;
    }

    public get centerX() {
        return this.left + (this._bounds.width / 2);
    }

    public get centerY() {
        return this.top + (this._bounds.height / 2);
    }

    render() {
        if (!this.parent.layer) {
            return;
        }

        const ctx = this.parent.layer.context;

        // let position = [this.left, this.top];

        // let newPos = Matrix2d.multiply1x2(position, this.parent.transform);
        //
        // ctx.lineWidth = 10;
        // ctx.strokeStyle = '#0ef2ff';
        // ctx.beginPath();
        // ctx.arc(newPos[0], newPos[1], 1, 0, Math.PI * 2);
        // ctx.stroke();

        ctx.lineWidth = 1;

        ctx.strokeStyle = '#00ff00';
        ctx.strokeRect(0, 0, this._bounds.width, this._bounds.height);
    }

    constructor(parent: GameObject) {
        super(parent);
        this._bounds = parent.bounds;
    }


    calculateCollision(otherC: BaseCollider): Collision | null {
        switch (otherC.type) {
            case ColliderType.Box:
                return Physics.boxToBoxCollision(this, <BoxCollider>otherC);
            case ColliderType.Circle:
                return Physics.boxToCircleCollision(this, <CircleCollider>otherC);
        }

        return null;
    }
}