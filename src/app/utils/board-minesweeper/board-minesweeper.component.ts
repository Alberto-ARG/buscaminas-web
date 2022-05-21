import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, finalize, fromEvent, map, merge, Observable, pluck, race, Subject, takeUntil, takeWhile, tap } from 'rxjs';
import { NiceCell, TypeCell } from '../interfaces/nice-cell.interface.class';
import { ServiceMinesweeperService } from '../service-minesweeper.service';

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
        let domId = this.getIDFromTarget(data.target);//a este punto no puede ser null el EventTarget
        let item = this.serv.referenciasTablero.get(domId);
        return {type:data.type,id:domId,item};//por pura comodidad
      }),
      tap((data)=>{//comportamiento para el segundo click el segundo click
        if (data!=undefined && data.item!=undefined && data.type === 'contextmenu' && data.item.hide) {//es un segundo click
          console.log(data.item);
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
      filter((data)=>(data.type !== 'contextmenu')),//filtro los segundos click ya que no pueden terminar el juego
      //de paso cierro la posibilidad de que descubran casilleros 
      filter((data)=>( data.item?.get2ndClick!=undefined && data.item?.get2ndClick!=1)),
      //si hago click derecho en una mina con bandera que lo filtre que no lo descubra

      tap((data)=>{
        //console.log(data);
        
        if (data.item!=undefined) {
          this.descubir3x3(data.item);
        }
      }),
      
      takeWhile(it => ((it.item?.getType() != TypeCell.MINE))),//la suerte golpea la puerta   
     
      finalize(()=>{
        this.mensajeGmO ="FIN DEL JUEGO";
      })
     
    );
  }
  private descubir3x3(cell:NiceCell){// estoy seguro que este no es el mejor camino para detectar las casillas
    //console.log(cell);
    
    if ( cell!== undefined && cell!== undefined && cell.getType()==TypeCell.BLANK && cell.hide==true && cell.get2ndClick==0) {
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
    if ( cell!== undefined && cell!== undefined && cell.getType()==TypeCell.NUM && cell.hide==true  && cell.get2ndClick==0) {
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
    this._gamecore$.pipe(takeUntil(this._destroyer$)).subscribe()
  }
  ngOnDestroy(): void {

    this._destroyer$.complete();
  }
  
  private _gamecore$: Observable<any>;
  private _destroyer$:Subject<any>;
  mensajeGmO:string;
}
interface CellResult{
  type:string,
  id:string,
  item:NiceCell
}