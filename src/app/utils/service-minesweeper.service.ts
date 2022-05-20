import { Injectable } from '@angular/core';
import { of, map, tap, Subject } from 'rxjs';
import { apprules } from './app-rules.rules';
import { NiceCell, TypeCell } from './interfaces/nice-cell.interface.class';

@Injectable({
  providedIn: 'root'
})
export class ServiceMinesweeperService {
  

    constructor() {
      this.tablero=[];
      this.referenciasTablero = new Map()//mas facil de buscar con un mapa que un doble for
    }

    prepararJuego(){
      
        this.tablero= Array(apprules.tamano).fill(0);
        for (let index = 0; index < this.tablero.length; index++) {
          const array:NiceCell[] =[];
          for (let index = 0; index < apprules.tamano; index++) {
            let cell = new NiceCell(true,TypeCell.BLANK,0,this.generarId());//la misma instancia esta en el array y en el mapa
            this.referenciasTablero.set(cell.myId,cell);
            array.push(cell);            
          }
          this.tablero[index]=array;
        }
        this.agregarMinas(this.tablero);
        this.agregarnumeros(this.tablero);
        //console.log(this.tablero);
      }
      
      

    private agregarMinas(arr: NiceCell[][]) {
        
        for (let i = 0; i < apprules.tamano ; i++) {
          let cell =new NiceCell(true,TypeCell.MINE,-1,this.generarId())
          this.referenciasTablero.set(cell.myId,cell);
            arr[this.numeroAleatorio()][this.numeroAleatorio()] = cell;
        }     
    }

   
    private agregarnumeros(arr:NiceCell[][]) {
      for (let ri = 0; ri < apprules.tamano; ri++) {
        for (let ci = 0; ci < apprules.tamano; ci++) {
          if (arr[ri][ci].getType() === TypeCell.MINE ) {
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
    };
    private marcarlugar = (arr:NiceCell[][], x: number, y: number) => {
      //console.log(arr[x][y].type);
      if (arr[x] !== undefined && arr[x][y] !== undefined && arr[x][y].getType() !== TypeCell.MINE) {
        //arr[x][y]= new NiceCell(true)
        if (arr[x][y].getType() === TypeCell.BLANK) {
         // console.log(arr[x][y].getType());
         let cell =new NiceCell(true,TypeCell.NUM,0,this.generarId())
         this.referenciasTablero.set(cell.myId,cell);
          arr[x][y]= cell;
        }
        if (arr[x][y].getType() === TypeCell.NUM) {
          arr[x][y].addNumb(1)
        }
      }
      
      
        
    }
    private numeroAleatorio()
    {
      return Math.floor(Math.random() * Math.floor(apprules.tamano));
    }
    private generarId(): string {//genera de 25 largo
      var ee="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for(var e=8,t="";e-- >0;)
      {
          t+=ee[62*Math.random()|0];
        
      }
      return t
  
    }
    referenciasTablero:Map<string,NiceCell>;
    tablero: NiceCell[][];
    
}
// totalmente no inspirado en https://www.learnrxjs.io/learn-rxjs/recipes/mine-sweeper-game 