interface ILightEngineLayerConfig {
    defaultLayer: number
    available: number[]
}

export default interface ILightEngineConfig {
    layers: ILightEngineLayerConfig
}