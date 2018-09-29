import Transform from "../Position/Transform";
import Dimensions from "../Physics/DImensions";
import Matrix2d from "../Position/Matrix2d";
import BaseCollider from "../Physics/BaseCollider";
import Canvas2d from "../../Canvas/Canvas2d";

export default class GameObject {
    public transform: Transform;
    public bounds: Dimensions;
    public collider?: BaseCollider;
    public layer!: Canvas2d;

    constructor(){
        this.transform = new Transform();
        this.bounds = new Dimensions();
    }

    /**
     * Tag should be a power of 2 integer for bitmasking
     */
    public tag: number = 0;
}