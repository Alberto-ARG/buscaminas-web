import { Component } from '@angular/core';
import { ServiceMinesweeperService } from './utils/service-minesweeper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(serv:ServiceMinesweeperService){
      serv.prepararJuego();
  }
}
