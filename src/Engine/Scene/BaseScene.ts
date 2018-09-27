import Entity from "../Entity/Entity";
import LightGame from "../LightGame";
import Canvas2d from "../../Canvas/Canvas2d";

export default abstract class BaseScene {
    public game!: LightGame;

    public get entities(){
        return this._entities;
    }
    private _entities: Entity[] = [];

    public tick(): void {
        let i = 0;
        const entityLength = this._entities.length;

        for (; i < entityLength; i++) {
            this._entities[i].tick();
        }
    }

    public start(): void {
        if (!this.game) {
            throw Error("Scene is being started before proper initialisation, do not call start() on " +
                "scenes directly, instead set the currentScene on SceneManager.");
        }
    }

    /**
     * Destroy all entity object references and unload scene data
     */
    public destroy() {
        let i = 0;
        const entityLength = this._entities.length;

        for (; i < entityLength; i++) {
            this._entities[i].destroy();
        }

        delete this._entities;
        this._entities = [];
    }

    /**
     * Add a new entity to the entity list, all entities added will have their tick(), render() and start() methods
     * called by the scene, and they will be destroyed on scene change.
     * @param entity
     * @param layerId
     */
    public addEntity<T extends Entity>(entity: T, layerId?: number): T {
        this._entities.push(entity);

        if (typeof layerId === 'undefined') {
            layerId = this.game.defaultLayer;
        }

        entity.layer = this.game.layers.get(layerId) as Canvas2d;
        entity.game = this.game;
        entity.input = this.game.input;
        entity.start();

        this.game.renderer.register(entity);

        return entity;
    }
}