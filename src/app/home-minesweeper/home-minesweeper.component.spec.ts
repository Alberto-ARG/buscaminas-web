import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMinesweeperComponent } from './home-minesweeper.component';

describe('HomeMinesweeperComponent', () => {
  let component: HomeMinesweeperComponent;
  let fixture: ComponentFixture<HomeMinesweeperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMinesweeperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMinesweeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
