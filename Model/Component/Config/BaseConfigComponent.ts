import { Component } from "../../Base/Object/Component";
import { ISerializeToEntity } from "../../Base/Interface/ISerializeToEntity";

/** 每个config的基类 */
export abstract class BaseConfigComponent extends Component implements ISerializeToEntity{
    ETModelISerializeToEntity: string = "BaseConfigComponent";
}