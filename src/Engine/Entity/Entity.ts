import Transform from "../Position/Transform";
import LightGame from "../LightGame";
import Canvas2d from "../../Canvas/Canvas2d";
import IRenderable from "../Render/IRenderable";
import GameObject from "./GameObject";
import Input from "../Control/Input";

export default class Entity extends GameObject implements IRenderable {
    public zIndex = 0;

    public game!: LightGame;
    public input!: Input;

    public start() {

    }

    public tick() {

    }

    public render() {
    }

    public destroy() {

    }

}