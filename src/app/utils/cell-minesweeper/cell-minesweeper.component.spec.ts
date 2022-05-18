import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellMinesweeperComponent } from './cell-minesweeper.component';

describe('CellMinesweeperComponent', () => {
  let component: CellMinesweeperComponent;
  let fixture: ComponentFixture<CellMinesweeperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellMinesweeperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellMinesweeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
