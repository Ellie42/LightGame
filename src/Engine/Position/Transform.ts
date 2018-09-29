import Rotation from "./Rotation";
import Vector2 from "./Vector2";

export default class Transform {
    position: Vector2 = new Vector2();
    rotation: Rotation = new Rotation();

    /**
     * Return a matrix representation of the transform properties
     */
    public get canvasMatrix(): t_Matrix2x3 {
        return <t_Matrix2x3>[
            Math.cos(this.rotation.angleRadians),
            Math.sin(this.rotation.angleRadians),
            -Math.sin(this.rotation.angleRadians),
            Math.cos(this.rotation.angleRadians),
            this.position.x,
            this.position.y,
        ];
    }

    public get translationMatrix(): t_Matrix2x3 {
        return <t_Matrix2x3>[
            1, 0, 0, 1, this.position.x, this.position.y
        ];
    }

    toMatrix2x2(): t_Matrix2x2 {
        const cos = Math.cos(this.rotation.angleRadians);
        const sin = Math.sin(this.rotation.angleRadians);

        return [
            cos, -sin,
            sin, cos
        ];
    }

    toMatrix3x3(): t_Matrix3x3 {
        const cos = Math.cos(this.rotation.angleRadians);
        const sin = Math.sin(this.rotation.angleRadians);
        return <t_Matrix3x3>[
            cos, -sin, this.position.x,
            sin, cos, this.position.y,
            0, 0, 1
        ];
    }
}