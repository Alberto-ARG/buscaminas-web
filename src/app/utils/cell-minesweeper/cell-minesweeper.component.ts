import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NiceCell, TypeCell } from '../interfaces/nice-cell.interface.class';

@Component({
  selector: 'cell-minesweeper',
  templateUrl: './cell-minesweeper.component.html',
  styleUrls: ['./cell-minesweeper.component.scss']
})
export class CellMinesweeperComponent implements OnInit {
  @Input()cellId:NiceCell;
  @Output()onClickMe:EventEmitter<NiceCell>;
  constructor() {
    this.onClickMe = new EventEmitter();
    this.cellId = new NiceCell(true,TypeCell.BLANK,0);
   }

  ngOnInit(): void {
  }
  onClickCell(){
    this.onClickMe.emit(this.cellId);
  }
}
