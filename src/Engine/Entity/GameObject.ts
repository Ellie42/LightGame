import Transform from "../Position/Transform";
import Bounds from "../Collision/Bounds";

export default class GameObject {
    public transform = new Transform();
    public bounds = new Bounds();
}