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
      takeWhile(it => it.item?.getType() != TypeCell.MINE),//la suerte toca la puerta    
      tap((data)=>{
        console.log(data);
        
      })
    );
    
  }
  private getIDFromTarget(element:EventTarget | null){
    let item = element as any;//cosas del intelsense ?
    item =item['id'];
    return item;
  }
  

  ngOnInit(): void {
    this._gamecore$.pipe(takeUntil(this._destroyer$)).subscribe()
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


  ngOnDestroy(): void {

    this._destroyer$.complete();
  }
  
  private _gamecore$: Observable<any>;
  private _destroyer$:Subject<any>;
}
