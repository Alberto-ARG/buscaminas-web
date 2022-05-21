import { ElementRef } from "@angular/core";

export class NiceCell{
   
   
   

    constructor(private isHide:boolean,private type : TypeCell, private numero :number,private idUnico:string,private x:number, private y:number){
       this.secondClickCount=0;
        this.isBandera=false;
        this.isQuestionMark=false;
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
    get getX(){
        return this.x;
    }
    get getY(){
        return this.y;
    }
    get get2ndClick(){
        if (this.secondClickCount!=undefined) {
            return this.secondClickCount;
        }
        return  0;
       
    }
    reset2Count(){
        this.secondClickCount=0;
        this.isBandera=false;
        this.isQuestionMark=false;
    }
    add2Click(){
        this.secondClickCount+=1;
    }
    setSigno() {
        this.isBandera=false;
        this.isQuestionMark=true;
    }
    setBandera() {
        this.isBandera=true;
    }
    private isBandera:boolean;
    private isQuestionMark:boolean;
    private secondClickCount:number;
 
    


}

export enum TypeCell{
    BLANK,
    NUM,
    MINE,
}