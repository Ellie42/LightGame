import ILightEngineConfig from "../Engine/Config/config-types";

//Layer values are in multiples of 2 to allow us to create bitmasks for layer specific events (such as collisions)
export enum Layer {
    Background  = 1 << 0,
    Game        = 1 << 1,
    UI          = 1 << 2
}

export default <ILightEngineConfig>{
    layers: {
        defaultLayer: Layer.Game,
        available: [Layer.Background, Layer.Game, Layer.UI]
    }
};