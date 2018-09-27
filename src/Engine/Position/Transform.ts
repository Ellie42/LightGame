import Rotation from "./Rotation";
import Vector2 from "./Vector2";
import {t_Matrix2x3} from "./Matrix2d";

export default class Transform {
    position: Vector2 = new Vector2();
    rotation: Rotation = new Rotation();

    /**
     * Return a matrix representation of the transform properties
     */
    public get matrix(): t_Matrix2x3 {
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
}