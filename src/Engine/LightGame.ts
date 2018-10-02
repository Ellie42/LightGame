import Canvas2d from "../Canvas/Canvas2d";
import SceneManager from "./Scene/SceneManager";
import BaseScene from "./Scene/BaseScene";
import engineConfig from "../config/engine";
import Renderer from "./Render/Renderer";
import GameCamera from "./Camera/GameCamera";
import Input from "./Control/Input";
import Physics from "./Physics/Physics";
import Time from "./Time/Time";
import DebugConfig from "./Config/DebugConfig";
import PlayerData from "./Data/PlayerData";
import Client from "./Network/Client";

export default class LightGame {
    public readonly renderer: Renderer;
    public readonly camera: GameCamera;
    public readonly input: Input;
    public readonly physics: Physics;
    public readonly layers = new Map<any, Canvas2d>();
    public readonly defaultLayer: any;
    public readonly time: Time;
    public readonly debugConfig: DebugConfig;
    public readonly player: PlayerData;
    public readonly network: Client;

    public get currentScene() {
        return this._sceneManager.currentScene;
    }

    public get debugMode(): boolean {
        return this.debugConfig.active;
    }

    private get _targetFps() {
        return engineConfig.targetFps ? engineConfig.targetFps : 60;
    }

    /**
     * Length of time in ms that a single frame should last
     * @private
     */
    private get _tickLength() {
        return 1000 / this._targetFps;
    }

    private _container: HTMLElement;
    private _lastTick: number = 0;
    private _sceneManager: SceneManager = new SceneManager(this);

    constructor(container: HTMLElement) {
        this.camera = new GameCamera();
        this.renderer = new Renderer(this);
        this.input = new Input();
        this._container = container;
        this.physics = new Physics();
        this.time = new Time(this._targetFps);
        this.debugConfig = new DebugConfig(engineConfig.debug);
        this.player = new PlayerData();
        this.network = new Client(engineConfig.network);

        if (engineConfig.player && engineConfig.player.name) {
            this.player.name = engineConfig.player.name;
        }

        this.defaultLayer = engineConfig.layers.defaultLayer;

        //So we can add game specific styles to the container without assuming anything about the attributes
        //of the container
        this._container.classList.add('game-container');

        //On window resize we need to resize/redraw the canvases
        window.addEventListener('resize', this._redrawAllCanvases.bind(this));
    }

    start(startScene: BaseScene) {
        this.createCanvasLayerElements();

        this._sceneManager.currentScene = startScene;

        requestAnimationFrame(this._run.bind(this));
    }

    private _redrawAllCanvases() {
        for (let layer of Array.from(this.layers.values())) {
            layer.updateCanvasSize();
        }

        this.renderer.forceRender();
    }

    /**
     * Adds the required canvas elements to the game container
     */
    private createCanvasLayerElements() {
        if (!engineConfig.layers) {
            throw Error("No layers have been specified in engine config file!");
        }

        //Adds a new canvas element for each listed in the configuration
        for (let layerId of engineConfig.layers.available) {
            let layer = new Canvas2d(layerId, this._container);
            layer.element.classList.add('game-layer');
            this.layers.set(layerId, layer)
        }
    }

    private _run(time: number) {
        //Request animation frame is called before the processing of the current ticks as we want to ensure that
        //we catch every animation frame.
        requestAnimationFrame(this._run.bind(this));

        let timeSinceLastTick = time - this._lastTick;

        //If the number of ticks since the last frame processed is some oddly large number, then the script must have
        //been frozen for some reason. We should not run all of the ticks as it will cause the page to become
        //unresponsive.
        //The downside to this method is, if the script gets frozen, the game will no longer try to catch up to
        //the current point in time.
        let numTicks = Math.floor(timeSinceLastTick / this._tickLength);

        if (numTicks > this._targetFps * 5) {
            numTicks = 1;
        }

        //Call tick for each tick that we need to process since the last tick.
        //If the game FPS drops below TARGET_FPS then this will call tick multiple times consecutively in order
        //to catch up to the current expected game state
        for (; numTicks > 0; numTicks--) {
            this._tick();
            this._lastTick = this._lastTick + this._tickLength;
        }

        //We call render after all remaining ticks have been processed so that we only render the current gamestate
        //to the screen once.
        this._render();
    }

    /**
     * Process a single tick of game state
     * @private
     */
    private _tick() {
        this._debug();
        this.physics.tick();
        this._sceneManager.tick();
        this.input.tick();
    }

    private _render() {
        this.renderer.render();
    }

    private _debug() {
        if (this.input.isKeyPressed("o")) {
            this.debugConfig.active = !this.debugConfig.active;
        }
    }
}