import { BaseConfigComponent } from "../../../Component/Config/BaseConfigComponent";

export class DBConfig extends BaseConfigComponent {

    public constructor() {
        super();
    }

    private connectionString: string;

    public get ConnectionString(): string {
        return this.connectionString;
    }

    public set ConnectionString(value: string) {
        this.connectionString = value;
    }

    private dbName: string;

    public get DBName(): string {
        return this.dbName;
    }

    public set DBName(value: string) {
        this.dbName = value;
    }
}