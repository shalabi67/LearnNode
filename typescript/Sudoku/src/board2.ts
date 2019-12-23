import {Board} from "./board/Board";
import {Cell} from "./board/Cell";

console.log("Welcome to Sudoku");
export let board = new Board(['1', '2', '3', '4', '5', '6', '7', '8', '9']);

board.addRow(0,['', '', '', '1', '', '5', '', '', '']);
board.addRow(1,['1', '4', '', '', '', '', '6', '7', '']);
board.addRow(2,[ '', '8', '', '', '', '2', '4', '', '']);
board.addRow(3,['', '6', '3', '', '7', '', '', '1', '']);
board.addRow(4,['9', '', '', '', '', '', '', '', '3']);
board.addRow(5,[ '', '1', '', '', '9', '', '5', '2', '']);
board.addRow(6,['', '', '7', '2', '', '', '', '8', '']);
board.addRow(7,['', '2', '6', '', '', '', '', '3', '5']);
board.addRow(8,[ '', '', '', '4', '', '9', '', '', '']);

board.print();

board.initializeBoard();
board.print();
