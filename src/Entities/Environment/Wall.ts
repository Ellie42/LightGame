import Entity from "../../Engine/Entity/Entity";

export default class Wall extends Entity {
    constructor(x: number, y: number, width: number, height: number) {
        super();

        this.transform.position.x = x;
        this.transform.position.y = y;
        this.bounds.width = width;
        this.bounds.height = height;
    }

    render() {
        if (!this.layer) {
            return;
        }

        this.layer.context.fillStyle = '#3bf255';
        this.layer.context.fillRect(0, 0, this.bounds.width, this.bounds.height);
    }
}