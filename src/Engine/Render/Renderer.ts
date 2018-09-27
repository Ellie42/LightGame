import IRenderable from "./IRenderable";
import GameCamera from "../Camera/GameCamera";
import LightGame from "../LightGame";
import Canvas2d from "../../Canvas/Canvas2d";
import Matrix2d from "../Position/Matrix2d";
import Entity from "../Entity/Entity";
import Transform from "../Position/Transform";

/**
 * Reponsible for calling the render() function on all entities that require rendering, and keeping track of
 * zIndex positions for each entity
 */
export default class Renderer {
    public camera: GameCamera;
    private _renderQueue = new Map<any, IRenderable[][]>();
    private _game: LightGame;

    constructor(game: LightGame) {
        this.camera = game.camera;
        this._game = game;
    }

    /**
     * Render all entities in the queue in order of zIndex
     */
    public render() {

        this._renderQueue.forEach((layer, layerId) => {
            let canvas = (this._game.layers.get(layerId) as Canvas2d);

            canvas.reset();
            canvas.clear();

            for (let list of layer) {
                let i = 0;
                const listLength = list.length;

                for (; i < listLength; i++) {
                    this._renderEntity(canvas, list[i]);
                }
            }
        });
    }

    /**
     * Setup canvas transforms and render entity
     * @param canvas
     * @param entity
     * @private
     */
    private _renderEntity(canvas: Canvas2d, entity: IRenderable) {
        //Reset the canvas transforms so we don't use the transforms of previously rendered entities
        canvas.reset();

        if ((<Entity>entity).transform) {
            const transformableEntity = <Entity>entity;

            let centerX = transformableEntity.bounds.width / 2;
            let centerY = transformableEntity.bounds.height / 2;

            //Here we offset the canvas by the center pivot position of the entity so the rotation happens from
            //the center of the entity
            canvas.context.setTransform.call(canvas.context, ...Matrix2d.translate(
                Matrix2d.MATRIX_IDENTITY, centerX, centerY
            ));

            canvas.context.transform.call(canvas.context, ...transformableEntity.transform.matrix);

            //Removing canvas offset
            canvas.context.transform.call(canvas.context, ...Matrix2d.translate(
                Matrix2d.MATRIX_IDENTITY, -centerX, -centerY
            ));
        }

        entity.render();
    }

    /**
     * Add an entity to the queue for rendering
     * @param entity
     */
    public register(entity: IRenderable) {
        let layer = this._renderQueue.get(entity.layer.id);

        if (!layer) {
            layer = [];
        }

        if (!layer[entity.zIndex]) {
            layer[entity.zIndex] = [];
        }

        layer[entity.zIndex].push(entity);

        this._renderQueue.set(entity.layer.id, layer);
    }

    /**
     * Remove an entity from the render queue
     * @param entity
     */
    public unregister(entity: IRenderable) {
        let layer = this._renderQueue.get(entity.layer.id);

        if (!layer) {
            console.warn("Trying to remove entity from layer that does not exist");
            return;
        }

        let index = layer[entity.zIndex].findIndex(queueEntity => {
            return queueEntity === entity;
        });

        if (!index) {
            console.warn('Trying to unregister entity from renderer that has not been registered');
            return;
        }

        layer[entity.zIndex] = layer[entity.zIndex].splice(index, 1);

        this._renderQueue.set(entity.layer.id, layer);
    }

    forceRender() {
        this.render();
        this.renderStale();
    }

    /**
     * Force re-render of all layers that are not rendered every frame
     */
    private renderStale() {
        //TODO implement
    }
}