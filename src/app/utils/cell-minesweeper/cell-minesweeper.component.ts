import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NiceCell, TypeCell } from '../interfaces/nice-cell.interface.class';

@Component({
  selector: 'cell-minesweeper',
  templateUrl: './cell-minesweeper.component.html',
  styleUrls: ['./cell-minesweeper.component.scss']
})
export class CellMinesweeperComponent implements OnInit {
  @Input()cellId:NiceCell;
 
  constructor(private el : ElementRef) {
    this.cellId = new NiceCell(true,TypeCell.BLANK,0,'NaN');
   }

  ngOnInit(): void {
  }

}
