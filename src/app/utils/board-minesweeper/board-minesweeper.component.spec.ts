import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardMinesweeperComponent } from './board-minesweeper.component';

describe('BoardMinesweeperComponent', () => {
  let component: BoardMinesweeperComponent;
  let fixture: ComponentFixture<BoardMinesweeperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardMinesweeperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardMinesweeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
