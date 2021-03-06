import Entity from "../../Engine/Entity/Entity";
import {Tag} from "../../config/engine";
import BoundingBoxCollider from "../../Engine/Physics/BoundingBoxCollider";

export default class Wall extends Entity {
    public readonly tag = Tag.Environment;
    public readonly collider: BoundingBoxCollider;

    constructor(x: number, y: number, width: number, height: number) {
        super();

        this.collider = new BoundingBoxCollider(this);
        this.transform.position.x = x;
        this.transform.position.y = y;
        this.dimensions.width = width;
        this.dimensions.height = height;
    }

    render() {
        if (!this.layer) {
            return;
        }

        this.layer.context.fillStyle = '#f23a41';
        this.layer.context.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }
}