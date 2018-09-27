import Transform from "../Position/Transform";
import Bounds from "../Collision/Bounds";
import Matrix2d from "../Position/Matrix2d";

export default class GameObject {
    public transform = new Transform();
    public bounds = new Bounds();
}