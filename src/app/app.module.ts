import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeMinesweeperComponent } from './home-minesweeper/home-minesweeper.component';
import { BoardMinesweeperComponent } from './utils/board-minesweeper/board-minesweeper.component';
import { CellMinesweeperComponent } from './utils/cell-minesweeper/cell-minesweeper.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeMinesweeperComponent,
    BoardMinesweeperComponent,
    CellMinesweeperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
