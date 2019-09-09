import { AwakeSystem } from "../Base/Interface/IAwakeSystem";
import { Component } from "../Base/Object/Component";
import { Options } from "../Other/Options";
export declare class OptionComponent extends Component {
    constructor();
    options: Options;
    Awake(args: string[]): void;
}
export declare class OptionComponentSystem extends AwakeSystem<OptionComponent, string[], null, null> {
    Awake(self: OptionComponent, a: string[]): void;
}
