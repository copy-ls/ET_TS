import { TypeComponent } from "../Base/Helper/Type";
export declare class DecorateManager {
    private static instance;
    static readonly Instance: DecorateManager;
    private configMap;
    AddConfigMap(type: TypeComponent): void;
    GetConfig(name: string): TypeComponent;
}
export declare function Config(type: any): void;
export declare function ObjectSystem(type: TypeComponent): (target: any) => void;
