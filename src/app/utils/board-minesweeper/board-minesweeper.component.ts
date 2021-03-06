import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, finalize, fromEvent, map, merge, Observable, pluck, race, Subject, takeUntil, takeWhile, tap } from 'rxjs';
import { NiceCell, TypeCell } from '../interfaces/nice-cell.interface.class';
import { ServiceMinesweeperService } from '../service-minesweeper.service';
import { Moment } from 'moment';
import * as moment from 'moment';
@Component({
  selector: 'board-minesweeper',
  templateUrl: './board-minesweeper.component.html',
  styleUrls: ['./board-minesweeper.component.scss']
})
export class BoardMinesweeperComponent implements OnInit,OnDestroy {
  
  
  

  constructor(private serv:ServiceMinesweeperService) { 
    this._destroyer$= new Subject();
    //this._gamecore$=new Observable();
    this._gamecore$= this.iniciarJuego();
    this.mensajeGmO="";
    this.victoria=false;
    this.tiempo= moment();
    this.starT=false;
    this.interval = window.setInterval(() => { this.getmyTiempo() }, 1000);
    this.texttiempo='';
    
  }
  iniciarJuego(){
    return merge(
      fromEvent(document, 'contextmenu').pipe(
        tap((evnt)=>{
          evnt.preventDefault();//segundo click evita el menu contextual
        })
      ),
      fromEvent(document, 'click')
    ).pipe(
      
      filter((evnt)=>(this.isFromTable(evnt.target))),//filtramos las celdas del tablero de otros elementos
      // atravez del idUnico
      
      map((data)=>{
        if (this.starT==false) {//inicia el tiempo
          this.tiempo= moment();
          this.starT=true;
        }
        let domId = this.getIDFromTarget(data.target);//a este punto no puede ser null el EventTarget
        let item = this.serv.referenciasTablero.get(domId);
        return {type:data.type,id:domId,item};//por pura comodidad
      }),
      tap((data)=>{//comportamiento para el segundo click el segundo click
        if (data!=undefined && data.item!=undefined && data.type === 'contextmenu' && data.item.hide) {//es un segundo click
          //console.log(data.item);
          if (data.item.get2ndClick==0) {
            //TODO // Bandera 
            data.item.setBandera();
            data.item.add2Click();
            return;
          }
          if (data.item.get2ndClick==1) {
            //TODO // Signo Pregunta 
            data.item.setSigno();
            data.item.add2Click();
            return;
          }
          if (data.item.get2ndClick==2) {
            //TODO //RESET
            data.item.reset2Count();
            return;
          }
        }
      }),
      map((data)=> { //busca victoria
        let victory=true;
        let countMines=0;
        let countMinesMark=0;

        for (let j = 0; j < this.tablero.length; j++) {
          for (let k = 0; k < this.tablero.length; k++) {
            let element = this.tablero[j][k];
            if (element.getType()==TypeCell.MINE) {
              countMines++;
              if (element.get2ndClick>0) {
                countMinesMark++;
              }
            }
            
          }
          
        }
        if (countMines==countMinesMark) {
          victory=false;
          this.victoria=victory;
        }
         
        
         this.victoria=victory;
        //console.log(victory);
         
         
        return {type:data.type,id:data.id,item:data.item,victory: victory};
      }),
      takeWhile(it => (it.victory!=false)),//la buena suerte golpea la puerta  

      filter((data)=>(data.type !== 'contextmenu')),//filtro los segundos click si no esta terminado el juego
      //de paso cierro la posibilidad de que descubran casilleros 
      filter((data)=>( data.item?.get2ndClick!=undefined && data.item?.get2ndClick!=1)),
      //si hago click derecho en una mina con bandera que lo filtre que no lo descubra

      tap((data)=>{
        //console.log(data);
        
        if (data.item!=undefined) {
          this.descubir3x3(data.item);
        }
      }),
      tap((data)=>{//descubrir mina
        if (data.item!=undefined) {
          if(data.item.getType()==TypeCell.MINE){
            data.item.setHide(false);
          }
        }
      }),
     
     
    
      takeWhile(it => ((it.item?.getType() != TypeCell.MINE))),//la mala suerte golpea la puerta   
     
      finalize(()=>{
        window.clearInterval(this.interval);
        this.serv.referenciasTablero.forEach((k,v)=>{
         if ( k.getType()==TypeCell.MINE) {
           k.setHide(false);
         }
        })
        if (this.victoria==false) {
          this.mensajeGmO ="BIEN JUGADO!!";
        }
        else{
          this.mensajeGmO="FIN DEL JUEGO"
        }

      })
     
    );
  }

  private descubir3x3(cell:NiceCell){// estoy seguro que este no es el mejor camino para detectar las casillas
    //console.log(cell);
    
    if ( cell!== undefined && cell!== undefined && cell.getType()==TypeCell.BLANK && cell.hide==true && (cell.get2ndClick==0 || cell.get2ndClick==2) ) {
      this.tablero[cell.getX][cell.getY].setHide(false);
      try {
        this.descubir3x3(this.tablero[cell.getX - 1][cell.getY + 1])
      this.descubir3x3(this.tablero[cell.getX - 1][cell.getY])
      this.descubir3x3(this.tablero[cell.getX - 1][cell.getY -1])
      this.descubir3x3(this.tablero[cell.getX ][cell.getY +1])
      this.descubir3x3(this.tablero[cell.getX ][cell.getY -1])
      this.descubir3x3(this.tablero[cell.getX + 1 ][cell.getY + 1])
      this.descubir3x3(this.tablero[cell.getX + 1 ][cell.getY])
      this.descubir3x3(this.tablero[cell.getX + 1 ][cell.getY -1])
      } catch (error) {
        //meh
      }
      
    }
    if ( cell!== undefined && cell!== undefined && cell.getType()==TypeCell.NUM && cell.hide==true  && (cell.get2ndClick==0 || cell.get2ndClick==2)) {
      this.tablero[cell.getX][cell.getY].setHide(false);
    }
  }
  private getIDFromTarget(element:EventTarget | null){
    let item = element as any;//cosas del intelsense ?
    item =item['id'];
    return item;
  }
  


  private isFromTable(element:EventTarget | null){
    if (element==null) {
      return false;
    }
    let item = this.getIDFromTarget(element)
     return this.serv.referenciasTablero.has(item);
  }
  get tablero(){
    return this.serv.tablero;
  }

  ngOnInit(): void {
    //this._gamecore$.pipe(takeUntil(this._destroyer$)).subscribe()
    this.resetGame();
  }
  getmyTiempo() 
  {
    if (this.starT==true) {
      this.texttiempo=moment().diff(this.tiempo,'seconds').toString();
    }
    else{
      this.texttiempo="..."
    }
   
  }
  ngOnDestroy(): void {

    this._destroyer$.complete();
  }
  resetGame(){
    
    this._gamecore$=this.iniciarJuego();
    this.interval = window.setInterval(() => { this.getmyTiempo() }, 1000);
    this.serv.prepararJuego();
    this.starT=false;
    this.mensajeGmO="";
    this._gamecore$.pipe(takeUntil(this._destroyer$)).subscribe()
  }
  
  private _gamecore$: Observable<any>;
  private _destroyer$:Subject<any>;
  mensajeGmO:string;
  victoria: boolean;
  private tiempo : Moment;
  private starT: boolean;
  private interval:number;
  texttiempo:string;
}
interface CellResult{
  type:string,
  id:string,
  item:NiceCell
}