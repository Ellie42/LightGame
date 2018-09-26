import ICanvasDimensions from "./ICanvasDimensions";
import Matrix2d from "../Engine/Position/Matrix2d";

export default class Canvas2d {
    public readonly id: number;
    public readonly element: HTMLCanvasElement;
    public readonly context: CanvasRenderingContext2D;

    constructor(id: number, parent?: HTMLElement) {
        this.id = id;
        this.element = document.createElement("canvas");
        this.element.setAttribute('data-layer', id.toString());

        let context = this.element.getContext("2d");

        if (!context) {
            throw Error("Cannot get 2d context of canvas element");
        }

        this.context = context;

        if (parent) {
            parent.appendChild(this.element);
        }

        this.updateCanvasSize();
    }

    public updateCanvasSize() {
        this.element.width = window.innerWidth;
        this.element.height = window.innerHeight;
    }

    get size(): ICanvasDimensions {
        return {
            width: this.element.width,
            height: this.element.height,
        }
    }

    fillBackground(style: string | CanvasGradient | CanvasPattern) {
        this.context.fillStyle = style;
        this.context.fillRect(0, 0, this.size.width, this.size.height);
    }

    clear() {
        this.context.clearRect(0, 0, this.size.width, this.size.height);
    }

    reset() {
        this.context.setTransform.apply(this.context, Matrix2d.identity);
    }
}