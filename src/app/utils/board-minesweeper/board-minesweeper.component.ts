import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, fromEvent, merge, Observable, race, Subject, takeUntil, tap } from 'rxjs';
import { NiceCell } from '../interfaces/nice-cell.interface.class';
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
      tap((data)=>{
        console.log(data);
      }),
    );
    
  }


  ngOnInit(): void {
    this._gamecore$.pipe(takeUntil(this._destroyer$)).subscribe()
  }
  private isFromTable(element:EventTarget | null){
    if (element==null) {
      return false;
    }

    let item = element as any;//cosas del intelsense ?
    item =item['id'];
    let valido=false;
    
   for( let row of this.tablero){
     for( let niceCell of row){
        if (niceCell.myId===item) {
          valido= true;
          //console.log(niceCell.myId);
          break;
        }
     }
   }
   return valido;
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
