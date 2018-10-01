import BaseCollider, {ColliderType} from "./BaseCollider";
import Collision from "./Collision";

export default class LineCollider extends BaseCollider {
    readonly type: ColliderType = ColliderType.Line;

    calculateCollision(otherC: BaseCollider): Collision | null {
        // switch (otherC.type) {
        //     case ColliderType.BoundingBox:
        //         return Physics.rayToBoundingBoxCollision(this, otherC, otherC.parent);
        // }
        return null
    }
}