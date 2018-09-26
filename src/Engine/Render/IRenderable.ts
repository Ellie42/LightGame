import Canvas2d from "../../Canvas/Canvas2d";

export default interface IRenderable {
    zIndex: number
    layer: Canvas2d

    render(): void
}