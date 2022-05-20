import { ElementRef } from "@angular/core";

export class NiceCell{
   
   

    constructor(private isHide:boolean,private type : TypeCell, private numero :number,private idUnico:string,private x:number, private y:number){
       
    }
    
    getType() : TypeCell {
        return this.type;
    }
    get num() :number {
        return this.numero;
    }
    setNumb(numb:number){
        this.numero=numb;
    }
    addNumb(numb:number){
        this.numero+=numb;
    }
    toString(){
        return ''+this.numero;
    }
    get hide():boolean{
        return this.isHide;
    }
    setHide(hide:boolean){
        this.isHide=hide;
    }
    get myId(){
        return this.idUnico;
    }

   
 
    


}

export enum TypeCell{
    BLANK,
    NUM,
    MINE,
}