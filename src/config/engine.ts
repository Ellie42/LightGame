//Layer values are in multiples of 2 to allow us to create bitmasks for layer specific events (such as collisions)
export enum Layer {
    Background = 1 << 0,
    Game = 1 << 1,
    UI = 1 << 2
}

export enum Tag {
    Player = 1 << 0,
    Environment = 1 << 1
}

export default <ILightEngineConfig>{
    targetFps: 60,
    debug: {
        active: true,
        showColliders: true
    },
    layers: {
        defaultLayer: Layer.Game,
        available: [Layer.Background, Layer.Game, Layer.UI]
    }
};