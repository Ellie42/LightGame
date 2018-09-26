import Entity from "../../Engine/Entity/Entity";

export default class PlainBackground extends Entity{
    start(){
        console.log(this.layer.element);
    }

    render(){
        if(!this.layer){
            return;
        }

        this.layer.fillBackground('black');
    }
}