import { Component } from "./Component";

export abstract class ComponentWithId extends Component {

    protected constructor(id?: number) {
        super();
        if (id != null) {
            this.Id = id;
            return;
        }
        this.Id = this.InstanceId;
    };

    private id: number;

    public get Id(): number {
        return this.id;
    }

    public set Id(value: number) {
        this.id = value;
    }

    public Dispose(): void {
        if (this.IsDisposed) {
            return;
        }
        super.Dispose();
    }
}