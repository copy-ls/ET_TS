import { BaseConfigComponent } from "./BaseConfigComponent";

export class ClientConfig extends BaseConfigComponent {

    public constructor() {
        super();
    }

    private address: string;

    public get Address(): string {
        return this.address;
    }

    public set Address(value: string) {
        this.address = value;
    }

    private port: string | number;

    public get Port(): string | number {
        return this.port;
    }

    public set Port(value: string | number) {
        this.port = value;
    }
}