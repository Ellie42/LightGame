import Entity from "../../Engine/Entity/Entity";
import {Tag} from "../../config/engine";
import BoxCollider from "../../Engine/Physics/BoxCollider";

export default class Wall extends Entity {
    public readonly tag = Tag.Environment;
    public readonly collider: BoxCollider;

    constructor(x: number, y: number, width: number, height: number) {
        super();

        this.collider = new BoxCollider(this);
        this.transform.position.x = x;
        this.transform.position.y = y;
        this.bounds.width = width;
        this.bounds.height = height;
    }

    render() {
        if (!this.layer) {
            return;
        }

        this.layer.context.fillStyle = '#f23a41';
        this.layer.context.fillRect(0, 0, this.bounds.width, this.bounds.height);
    }
}