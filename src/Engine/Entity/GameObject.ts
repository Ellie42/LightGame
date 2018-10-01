import Transform from "../Position/Transform";
import Dimensions from "../Physics/DImensions";
import BaseCollider from "../Physics/BaseCollider";
import Canvas2d from "../../Canvas/Canvas2d";
import BaseScene from "../Scene/BaseScene";

export default class GameObject {
    public transform: Transform;
    public dimensions: Dimensions;
    public collider?: BaseCollider;
    public layer!: Canvas2d;
    public scene!: BaseScene;

    constructor(){
        this.transform = new Transform();
        this.dimensions = new Dimensions();
    }

    /**
     * Tag should be a power of 2 integer for bitmasking
     */
    public tag: number = 0;
}