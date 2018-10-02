export default class Client {
    public readonly url: string = "";
    public connected: boolean = false;
    public connection?: WebSocket;

    constructor(config?: ILightEngineNetworkConfig) {
        if (!config) {
            return;
        }

        this.url = config.url
    }

    connect() {
        if (!this.url) {
            throw Error("Cannot connect - no url specified!");
        }

        return new Promise((resolve, reject) => {
            this.connection = new WebSocket(this.url);

            this.connection.onopen = () => {
                resolve();
            };

            this.connection.onerror = () => {
                reject("Failed to connect");
            };

            this.connection.onclose = () => {
                reject("Failed to connect");
            }
        })

    }
}