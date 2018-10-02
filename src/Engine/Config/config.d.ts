declare interface ILightEngineLayerConfig {
    defaultLayer: number
    available: number[]
}

declare interface ILightEngineDebugConfig {
    active?: boolean
    showColliders?: boolean
}

declare interface ILightEnginePlayerConfig {
    name?: string
}

declare interface ILightEngineNetworkConfig {
    url: string
}

declare interface ILightEngineConfig {
    targetFps?: number
    debug?: ILightEngineDebugConfig
    layers: ILightEngineLayerConfig
    player?: ILightEnginePlayerConfig
    network?: ILightEngineNetworkConfig
}