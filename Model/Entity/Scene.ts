import { Entity } from "../Base/Object/Entity";

export class Scene extends Entity {

    private name: string;

    constructor(id?:number){
        super(id);
    }

    public get Name():string{
        return this.name;
    }

    public set Name(vlaue:string){
        this.name = vlaue;
    }

    public Dispose(){
        if(this.IsDisposed){
            return;
        }
        super.Dispose();
    }
}