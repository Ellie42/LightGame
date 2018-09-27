export default class DebugConfig {
    public showColliders = false;
    public active = false;

    constructor(options?: ILightEngineDebugConfig) {
        if(!options){
            return;
        }

        this.active = !!options.active;
        this.showColliders = !!options.showColliders;
    }
}