import {Cell} from "./Cell";

export class PositionalCell {
    public row: number;
    public column: number;
    public cell: Cell;


    constructor(row: number, column: number, cell: Cell) {
        this.row = row;
        this.column = column;
        this.cell = cell;
    }
}
