import { Entity } from "../Base/Object/Entity";
export declare function ConfigFromJson<T extends Entity>(type: new (id?: number) => T, obj: any): T;
