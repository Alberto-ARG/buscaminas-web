import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMinesweeperComponent } from './home-minesweeper/home-minesweeper.component';

const routes: Routes = [
  {path:'',component:HomeMinesweeperComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
