"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("../Object/Component");
class ComponentStack extends Component_1.Component {
    constructor(typeName) {
        super();
        this.stack = new Component_1.Component[0]();
        this.typeName = typeName;
    }
    get TypeName() {
        return this.typeName;
    }
    get Count() {
        return this.stack.length;
    }
    Push(component) {
        component.Parent = this;
        this.stack.push(component);
    }
    Pop() {
        return this.stack.pop();
    }
    Peek() {
        const count = this.stack.length;
        if (count === 0) {
            return null;
        }
        return this.stack[count - 1];
    }
    Dispose() {
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
exports.ComponentStack = ComponentStack;
class ObjectPool extends Component_1.Component {
    constructor() {
        super();
        this.map = new Map();
    }
    get Name() {
        return this.name;
    }
    set Name(vlaue) {
        this.name = vlaue;
    }
    Fetch(type) {
        const componentStack = this.map.get(type);
        let component;
        if (!componentStack || componentStack.Count === 0) {
            component = new type();
        }
        else {
            component = componentStack.Pop();
        }
        component.IsFromPool = true;
        return component;
    }
    Recycle(component) {
        component.Parent = this;
        const type = component.constructor;
        let stack = this.map.get(type);
        if (!stack) {
            stack = new ComponentStack(type.name);
            stack.Parent = this;
            this.map.set(type, stack);
        }
        stack.Push(component);
    }
    Clear() {
        this.map.forEach((stack) => {
            stack.IsFromPool = false;
            stack.Dispose();
        });
        this.map.clear();
    }
}
exports.ObjectPool = ObjectPool;
//# sourceMappingURL=ObjectPool.js.map