import Rotation from "./Rotation";
import Vector2 from "./Vector2";
import Matrix2d from "./Matrix2d";

export default class Transform {
    position: Vector2 = new Vector2();
    rotation: Rotation = new Rotation();
}