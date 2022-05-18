import { Injectable } from '@angular/core';
import { apprules } from './app-rules.rules';

@Injectable({
  providedIn: 'root'
})
export class ServiceMinesweeperService {

  constructor() {
    this.tablero=[];
   }
  prepararJuego(){
    this.agregarMinas(this.tablero);
    this.agregarnumeros(this.tablero);
    console.log(this.tablero);
    
  }

  numeroAleatorio()
  {
    return Math.floor(Math.random() * Math.floor(apprules.tamano));
  }

  agregarMinas(arr: number[][]) {
    for (let i = 0; i < apprules.tamano / 2; i++) {
      arr[this.numeroAleatorio()][this.numeroAleatorio()] = apprules.mine;
    }

    return arr;
  };

  marcarlugar(arr:number[][], x: number, y: number){
      arr[x] !== undefined && arr[x][y] !== undefined
        ? (arr[x][y] += arr[x][y] === apprules.mine ? 0 : 1)
        : () => {};
  }

  agregarnumeros(arr:number[][]) {
      for (let ri = 0; ri < apprules.tamano; ri++) {
        for (let ci = 0; ci < apprules.tamano; ci++) {
          if (arr[ri][ci] === apprules.mine) {
            this.marcarlugar(arr, ri - 1, ci + 1);
            this.marcarlugar(arr, ri - 1, ci);
            this.marcarlugar(arr, ri - 1, ci - 1);
            this.marcarlugar(arr, ri, ci + 1);
            this.marcarlugar(arr, ri, ci - 1);
            this.marcarlugar(arr, ri + 1, ci + 1);
            this.marcarlugar(arr, ri + 1, ci);
            this.marcarlugar(arr, ri + 1, ci - 1);
          }
        }
      }
      return arr;
    };

    tablero: number[][];
}
