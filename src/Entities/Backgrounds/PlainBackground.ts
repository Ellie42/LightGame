import Entity from "../../Engine/Entity/Entity";

export default class PlainBackground extends Entity{
    render(){
        if(!this.layer){
            return;
        }

        this.layer.fillBackground('black');
    }
}