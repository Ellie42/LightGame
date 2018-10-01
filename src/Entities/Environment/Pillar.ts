import Entity from "../../Engine/Entity/Entity";
import CircleCollider from "../../Engine/Physics/CircleCollider";
import Vector2 from "../../Engine/Position/Vector2";
import Dimensions from "../../Engine/Physics/DImensions";
import {Tag} from "../../config/engine";

export default class Pillar extends Entity {
    public readonly tag = Tag.Environment;
    public readonly collider: CircleCollider = new CircleCollider(this, 50);
    public readonly dimensions = new Dimensions(50, 50);

    public start() {
        this.transform.position = new Vector2(500, 100);
    }

    public tick(){
        this.transform.position.x = 400 + Math.sin(Date.now()/ 1000) * 100;
        // this.transform.position.y = 200 + Math.sin(Date.now() / 1000) * 100;
    }

    public render() {
        if (!this.layer) {
            return;
        }

        const ctx = this.layer.context;

        ctx.strokeStyle = '#ccc';
        ctx.strokeRect(0, 0, 50, 50);
    }
}