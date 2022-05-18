import { Injectable } from '@angular/core';
import { of, map, tap } from 'rxjs';
import { apprules } from './app-rules.rules';

@Injectable({
  providedIn: 'root'
})
export class ServiceMinesweeperService {

      constructor() {
        this.tablero=[];

      }
      prepararJuego(){
        this.tablero= Array(apprules.tamano).fill(0);
        for (let index = 0; index < this.tablero.length; index++) {
          this.tablero[index]=Array(apprules.tamano).fill(0);
        }
        this.agregarMinas(this.tablero);
        this.agregarnumeros(this.tablero);
        console.log(this.tablero);
      }

 

      private agregarMinas(arr: number[][]) {
        for (let i = 0; i < apprules.tamano / 2; i++) {
          arr[this.numeroAleatorio()][this.numeroAleatorio()] = apprules.mine;
        }
        return arr;
      };



    private agregarnumeros(arr:number[][]) {
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
    private marcarlugar = (arr:number[][], x: number, y: number) => {
      arr[x] !== undefined && arr[x][y] !== undefined
        ? (arr[x][y] += arr[x][y] === apprules.mine ? 0 : 1)
        : () => {};
    }
    private numeroAleatorio = () =>
    {
      return Math.floor(Math.random() * Math.floor(apprules.tamano));
    }
    tablero: number[][];
}
// totalmente no inspirado en https://www.learnrxjs.io/learn-rxjs/recipes/mine-sweeper-game 