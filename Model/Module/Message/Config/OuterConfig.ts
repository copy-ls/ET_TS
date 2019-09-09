import { BaseConfigComponent } from "../../../Component/Config/BaseConfigComponent";

export class OuterConfig extends BaseConfigComponent {

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

    private address2: string;

    public get Address2(): string {
        return this.address2;
    }

    public set Address2(value: string) {
        this.address2 = value;
    }

    private port2: string | number;

    public get Port2(): string | number {
        return this.port2;
    }

    public set Port2(value: string | number) {
        this.port2 = value;
    }
}