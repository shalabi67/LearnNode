import {Board} from "./board/Board";
import {Cell} from "./board/Cell";

console.log("Welcome to Sudoku");
let board = new Board(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
board.addRow(0,['1', '2', '3', '4', '5', '6', '7', '8', '9']);
board.addRow(1,['4', '5', '6', '7', '8', '9', '1', '2', '3']);
board.addRow(2,[ '7', '8', '9', '1', '2', '3', '4', '5', '6']);
board.addRow(3,['1', '2', '3', '4', '5', '6', '7', '8', '9']);
board.addRow(4,['4', '5', '6', '7', '8', '9', '1', '2', '3']);
board.addRow(5,[ '7', '8', '9', '1', '2', '3', '4', '5', '6']);
board.addRow(6,['1', '2', '3', '4', '5', '6', '7', '8', '9']);
board.addRow(7,['4', '5', '6', '7', '8', '9', '1', '2', '3']);
board.addRow(8,[ '7', '8', '9', '1', '2', '3', '4', '5', '6']);

board.print();
