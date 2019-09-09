
export interface ISerializeToEntity {
    ETModelISerializeToEntity: string;
}

export function InstanceOfISerializeToEntity(obj: object): boolean {
    return "ETModelISerializeToEntity" in obj;
}
