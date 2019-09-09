import { BaseConfigComponent } from "../../../Component/Config/BaseConfigComponent";

export class InnerConfig extends BaseConfigComponent {

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

    private host: string;

    public set Host(value: string) {
        this.host = value;
    }

    public get Host(): string {
        return this.host;
    }

    private port: string | number;

    public get Port(): string | number {
        return this.port;
    }

    public set Port(value: string | number) {
        this.port = value;
    }
}