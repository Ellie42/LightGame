import Rotation from "./Rotation";
import Vector2 from "./Vector2";
import Matrix2d from "./Matrix2d";

export default class Transform {
    position: Vector2 = new Vector2();
    rotation: Rotation = new Rotation();

    /**
     * Return a matrix representation of the transform properties
     */
    public get matrix(): number[] {
        const identity = Matrix2d.identity;

        identity[0] = Math.cos(this.rotation.angleRadians);
        identity[1] = Math.sin(this.rotation.angleRadians);
        identity[2] = -Math.sin(this.rotation.angleRadians);
        identity[3] = Math.cos(this.rotation.angleRadians);
        identity[4] = this.position.x;
        identity[5] = this.position.y;

        return identity;
    }
}