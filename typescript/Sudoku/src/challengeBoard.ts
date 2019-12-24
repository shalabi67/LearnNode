import {Board} from "./board/Board";
import {Cell} from "./board/Cell";

console.log("Welcome to Sudoku");
export let board = new Board(['1', '2', '3', '4', '5', '6', '7', '8', '9']);

board.addRow(0,['4', '1', '9', '', '8', '', '', '', '']);
board.addRow(1,['5', '', '8', '', '', '', '', '', '6']);
board.addRow(2,[ '', '', '', '5', '', '', '', '', '']);
board.addRow(3,['', '9', '', '6', '', '', '', '', '4']);
board.addRow(4,['', '4', '', '', '', '', '', '', '3']);
board.addRow(5,[ '6', '', '', '2', '9', '', '', '8', '']);
board.addRow(6,['', '', '2', '3', '', '1', '', '', '']);
board.addRow(7,['', '', '', '', '', '9', '2', '5', '']);
board.addRow(8,[ '', '7', '', '', '', '', '', '', '']);

board.print();

board.initializeBoard();
board.print();

/*
4,1,9,0,8,0,0,0,0
5,0,8,0,0,0,0,0,6
0,0,0,5,0,0,0,0,0
0,9,0,6,0,0,0,0,4
0,4,0,0,0,0,0,0,3
6,0,0,2,9,0,0,8,0
0,0,2,3,0,1,0,0,0
0,0,0,0,0,9,2,5,0
0,7,0,0,0,0,0,0,0


4,1,9,0,8,0,0,0,0,5,0,8,0,0,0,0,0,6,0,0,0,5,0,0,0,0,0,0,9,0,6,0,0,0,0,4,0,4,0,0,0,0,0,0,3,6,0,0,2,9,0,0,8,0,0,0,2,3,0,1,0,0,0,0,0,0,0,0,9,2,5,0,0,7,0,0,0,0,0,0,0
*/
