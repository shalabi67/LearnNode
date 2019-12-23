import {Cell} from "./Cell";

export class Board {
    protected cells: Cell[][] = [];

    public addRow(rowNumber: number, row: string[]) {
        let cellRow = [];
        for(let i=0; i<row.length; i++) {
            const cell = new Cell();
            cell.setValue(row[i]);
            cellRow.push(cell);
        }
        this.cells.push(cellRow);
    }

    public print() {
        const width = this.cells[0].length;
        for (let i = 0; i<width; i++) {
            let rowValue = '';
            for(let j=0;j<width; j++) {
                rowValue = `${rowValue}, ${this.cells[i][j].toString()}`;
            }
            console.log(rowValue);
        }
    }
}
