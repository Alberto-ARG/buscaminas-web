import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, fromEvent, map, merge, Observable, pluck, race, Subject, takeUntil, takeWhile, tap } from 'rxjs';
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
    this._gamecore$= merge(
      fromEvent(document, 'contextmenu').pipe(
        tap((evnt)=>{
          evnt.preventDefault();//segundo click evita el menu contextual
        })
      ),
      fromEvent(document, 'click')
    ).pipe(
     
      filter((evnt)=>(this.isFromTable(evnt.target))),//filtramos las celdas del tablero de otros atravez del idUnico
      map((data)=>{
        let domId = this.getIDFromTarget(data.target);//a este punto no puede ser null el EventTarget
        let item = this.serv.referenciasTablero.get(domId);
        return {type:data.type,id:domId,item};//por pura comodidad
      }),
      tap((data)=>{
        if (data.item!=undefined) {//a este punto este if es al pedo, pero el el modo estricto no deja de jod ?
          this.descubir3x3(data.item);
        }
      }),
      takeWhile(it => it.item?.getType() != TypeCell.MINE),//la suerte toca la puerta   
     
      //finalize()
     
    );
    
  }
  private descubir3x3(cell:NiceCell){// estoy seguro que este no es el mejor camino para detectar las casillas
    //console.log(cell);
    
    if ( cell!== undefined && cell!== undefined && cell.getType()==TypeCell.BLANK && cell.hide==true) {
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
    if ( cell!== undefined && cell!== undefined && cell.getType()==TypeCell.NUM && cell.hide==true) {
      this.tablero[cell.getX][cell.getY].setHide(false);
    }
    
   
   
    //this.marcarlugar(arr, ri + 1, ci - 1);
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
}
interface CellResult{
  type:string,
  id:string,
  item:NiceCell
}