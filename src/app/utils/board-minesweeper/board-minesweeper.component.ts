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
    this._gamecore$=new Observable();
    this._gamecore$= merge(
      fromEvent(document, 'contextmenu').pipe(//segundo click evita el menu contextual
        tap((evnt)=>{
          evnt.preventDefault();
          console.log(evnt);
          
        })
      ),
      fromEvent(document, 'click').pipe(// click ordinario
        tap((evnt)=>{
          //evnt.preventDefault();
          console.log(evnt);
          
        })
      )
    ).pipe(
      

    );
    
  }


  ngOnInit(): void {
    this._gamecore$.pipe(takeUntil(this._destroyer$)).subscribe()
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
