declare interface ILightEngineLayerConfig {
    defaultLayer: number
    available: number[]
}

declare interface ILightEngineDebugConfig {
    active?: boolean
    showColliders?: boolean
}

declare interface ILightEngineConfig {
    targetFps?: number
    debug: ILightEngineDebugConfig
    layers: ILightEngineLayerConfig
}