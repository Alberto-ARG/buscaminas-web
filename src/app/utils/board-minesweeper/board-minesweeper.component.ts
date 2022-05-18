import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceMinesweeperService } from '../service-minesweeper.service';

@Component({
  selector: 'board-minesweeper',
  templateUrl: './board-minesweeper.component.html',
  styleUrls: ['./board-minesweeper.component.scss']
})
export class BoardMinesweeperComponent implements OnInit,OnDestroy {

  constructor(private serv:ServiceMinesweeperService) { 
    
  }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
  
  }
  get tablero(){
    return this.serv.tablero;
  }

}
