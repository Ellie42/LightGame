import BaseCollider, {ColliderType} from "./BaseCollider";
import Dimensions from "./DImensions";
import GameObject from "../Entity/GameObject";
import Collision from "./Collision";
import Physics from "./Physics";
import CircleCollider from "./CircleCollider";
import Matrix2x2 from "../Position/Matrix2x2";

export default class BoundingBoxCollider extends BaseCollider {
    public readonly type = ColliderType.BoundingBox;
    private _bounds: Dimensions;

    render() {
        if (!this.parent.layer) {
            return;
        }

        const ctx = this.parent.layer.context;
        const {bottomRight, topRight, bottomLeft, topLeft} = this.boxBounds();

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00ff00';

        // Draw all edges of box
        ctx.beginPath();
        ctx.moveTo(topLeft[0], topLeft[1]);
        ctx.lineTo(topRight[0], topRight[1]);
        ctx.lineTo(bottomRight[0], bottomRight[1]);
        ctx.lineTo(bottomLeft[0], bottomLeft[1]);
        ctx.lineTo(topLeft[0], topLeft[1]);
        ctx.stroke();
    }

    public boxBounds(worldSpace: boolean = false): Bounds {
        const pMat = this.parent.transform.toMatrix2x2();

        const w = this._bounds.width;
        const h = this._bounds.height;

        const pivotX = w / 2;
        const pivotY = h / 2;

        const points = [
            Matrix2x2.multiplyBy2x1(pMat, [w - pivotX, h - pivotY]),
            Matrix2x2.multiplyBy2x1(pMat, [w - pivotX, -pivotY]),
            Matrix2x2.multiplyBy2x1(pMat, [-pivotX, h - pivotY]),
            Matrix2x2.multiplyBy2x1(pMat, [-pivotX, -pivotY])
        ];

        let minX = Number.MAX_SAFE_INTEGER;
        let minY = Number.MAX_SAFE_INTEGER;
        let maxX = 0;
        let maxY = 0;

        for (let point of points) {
            point[0] += pivotX;
            point[1] += pivotY;

            if (point[0] < minX)
                minX = point[0];
            if (point[0] > maxX)
                maxX = point[0];
            if (point[1] < minY)
                minY = point[1];
            if (point[1] > maxY)
                maxY = point[1];
        }

        if (worldSpace) {
            minX += this.parent.transform.position.x;
            maxX += this.parent.transform.position.x;
            minY += this.parent.transform.position.y;
            maxY += this.parent.transform.position.y;
        }

        return {
            topLeft: [minX, minY],
            topRight: [maxX, minY],
            bottomRight: [maxX, maxY],
            bottomLeft: [minX, maxY],
            left: minX,
            top: minY,
            right: maxX,
            bottom: maxY
        };
    }

    constructor(parent: GameObject) {
        super(parent);
        this._bounds = parent.dimensions;
    }


    calculateCollision(otherC: BaseCollider): Collision | null {
        switch (otherC.type) {
            case ColliderType.BoundingBox:
                return Physics.boundingBoxToboundingBoxCollision(this, <BoundingBoxCollider>otherC);
            case ColliderType.Circle:
                return Physics.boundingBoxToCircleCollision(this, <CircleCollider>otherC);
        }

        return null;
    }
}