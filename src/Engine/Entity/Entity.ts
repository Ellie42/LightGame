import LightGame from "../LightGame";
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