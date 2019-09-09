import { Component } from "../Object/Component";
import { TypeComponent } from "../Helper/Type";

export class ComponentStack extends Component {

    constructor(typeName: string) {
        super();
        this.typeName = typeName;
    }

    private typeName: string

    public get TypeName(): string {
        return this.typeName;
    }

    public get Count(): number {
        return this.stack.length;
    }

    private readonly stack: Component[] = new Component[0]();

    public Push(component: Component): void {
        component.Parent = this;
        this.stack.push(component);
    }

    public Pop(): Component {
        return this.stack.pop();
    }

    public Peek(): Component {
        const count = this.stack.length;
        if (count === 0) {
            return null;
        }
        return this.stack[count - 1];
    }

    public Dispose(): void {
        if (this.IsDisposed) {
            return;
        }
        super.Dispose();

        while (this.stack.length > 0) {
            const component = this.stack.pop();
            component.IsFromPool = false;
            component.Dispose();
        }
    }
}

export class ObjectPool extends Component {

    constructor() {
        super();
    }

    private name: string;
    private readonly map: Map<TypeComponent, ComponentStack> = new Map<TypeComponent, ComponentStack>();

    public get Name(): string {
        return this.name;
    }

    public set Name(vlaue: string) {
        this.name = vlaue;
    }

    public Fetch<K extends Component>(type: new () => K): K {
        const componentStack = this.map.get(type);
        let component: K;
        if (!componentStack || componentStack.Count === 0) {
            component = new type();
        } else {
            component = componentStack.Pop() as K;
        }
        component.IsFromPool = true;
        return component;
    }

    public Recycle(component: Component): void {
        component.Parent = this;
        const type = component.constructor as TypeComponent;
        let stack = this.map.get(type);
        if (!stack) {
            stack = new ComponentStack(type.name);
            stack.Parent = this;
            this.map.set(type, stack);
        }
        stack.Push(component);
    }

    public Clear(): void {
        this.map.forEach((stack) => {
            stack.IsFromPool = false;
            stack.Dispose();
        })
        this.map.clear();
    }
}