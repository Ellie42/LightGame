import BaseScene from "../Scene/BaseScene";
import GameObject from "../Entity/GameObject";
import Collision from "./Collision";
import BaseCollider from "./BaseCollider";
import BoundingBoxCollider from "./BoundingBoxCollider";
import CircleCollider from "./CircleCollider";
import Vector2 from "../Position/Vector2";

/**
 * Calculates all collisions for all entities in all scenes
 */
export default class Physics {
    private _loadedScenes: BaseScene[] = [];

    /**
     * Add a scene to the list of scenes which will have physics calculated for them
     * @param scene
     */
    addScene(scene: BaseScene) {
        this._loadedScenes.push(scene);
    }

    /**
     * Remove scene from loaded scenes and all collision checks
     * @param scene
     */
    removeScene(scene: BaseScene) {
        const foundIndex = this._loadedScenes.findIndex(ls => ls === scene);

        if (foundIndex < 0) {
            throw Error("Trying to remove unloaded scene from physics manager");
        }

        this._loadedScenes.splice(foundIndex, 1);
    }

    tick() {

    }

    /**
     * Check to see if 'object' is currently colliding with any other gameObjects in loaded scenes which match
     * the provided tag and layer masks
     * @param object
     * @param tagMask
     * @param layerMask
     */
    colliding(object: GameObject, tagMask: number = 1 << 32, layerMask: number = 1 << 32): Collision[] | null {
        const collisions: Collision[] = [];
        //Iterate all loaded scenes as it might be possible to have multiple scenes loaded at once in the future
        //with cross-scene collision
        for (const scene of this._loadedScenes) {
            let i = 0;
            const entities = scene.entities;
            const entityCount = entities.length;

            for (; i < entityCount; i++) {
                //If the other entity in the list does not have a collider then nothing to check
                if (!entities[i].collider) {
                    continue;
                }

                //If entity does not match any tags
                if (!(entities[i].tag & tagMask)) {
                    continue;
                }

                //If entity does not match any layers
                if (!(entities[i].layer.id & layerMask)) {
                    continue;
                }

                const objC = <BaseCollider>object.collider;
                const otherC = <BaseCollider>entities[i].collider;

                const collision = objC.calculateCollision(otherC);

                if (collision) {
                    collisions.push(collision);
                }
            }
        }

        if (collisions.length > 0) {
            return collisions;
        }

        return null;
    }

    static boundingBoxToCircleCollision(box: BoundingBoxCollider, circle: CircleCollider, target?: GameObject): Collision | null {
        if (!target) {
            target = circle.parent;
        }

        const boxB = box.boxBounds(true);

        let dX = circle.centerX - Math.max(boxB.topLeft[0], Math.min(circle.centerX, boxB.topRight[0]));
        let dY = circle.centerY - Math.max(boxB.topLeft[1], Math.min(circle.centerY, boxB.bottomLeft[1]));

        if ((dX * dX + dY * dY) < ((circle.size / 2) * (circle.size / 2))) {
            return new Collision(target);
        }

        return null;
    }

    static circleToCircleCollision(a: CircleCollider, b: CircleCollider): Collision | null {
        const distance = Vector2.distance(a.centerX, a.centerY, b.centerX, b.centerY);

        if (distance < a.size / 2 + b.size / 2) {
            const collision = new Collision(b.parent);

            collision.distance = distance;

            return collision;
        }

        return null;
    }

    static boundingBoxToboundingBoxCollision(a: BoundingBoxCollider, b: BoundingBoxCollider): Collision | null {
        const ab = a.boxBounds(true);
        const bb = b.boxBounds(true);

        if (!(ab.topRight[0] < bb.topLeft[0] ||
            ab.bottomLeft[1] < bb.topLeft[1] ||
            ab.topLeft[0] > bb.topRight[0] ||
            ab.topLeft[1] > bb.bottomLeft[1])) {
            return new Collision(b.parent);
        }

        return null;
    }
}