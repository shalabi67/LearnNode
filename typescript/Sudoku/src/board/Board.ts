import {Cell} from "./Cell";
import {Row} from "../units/Row";
import {Column} from "../units/Column";
import {Box} from "../units/Box";
import {DefaultUnit} from "../units/DefaultUnit";
import {board} from "../index";

export class Board {
    public readonly width: number;
    public readonly defaultRow: string[];

    protected cells: Cell[][] = [];
    protected rows: Row[] = [];
    protected columns: Column[] = [];
    protected boxes: Box[] = [];

    constructor(defaultRow: string[]) {
        this.width = defaultRow.length;
        this.defaultRow = defaultRow;

        for(let i=0; i<this.width; i++) {
            this.rows.push(new Row(this.cells, i));
            this.columns.push(new Column(this.cells, i));
            this.boxes.push(new Box(this.cells, i));
        }
    }

    public addRow(rowNumber: number, row: string[]) {
        if(this.width != row.length) {
            throw 'Invalid row width';
        }
        let cellRow = [];
        for(let i=0; i<row.length; i++) {
            const cell = new Cell(row[i]);
            cellRow.push(cell);
        }
        this.cells.push(cellRow);
    }

    public print() {
        console.log('********************************************************************');
        const width = this.cells[0].length;
        for (let i = 0; i<width; i++) {
            let rowValue = '';
            for(let j=0;j<width; j++) {
                rowValue = `${rowValue}, ${this.cells[i][j].toString()}`;
            }
            console.log(rowValue);
        }
        console.log('********************************************************************');
    }

    public setValue(row: number, column: number, value: string) {
        const boxNumber = Box.getBoxNumber(this.width, row, column);
        const defaultUnit = new DefaultUnit(this.rows[row], this.columns[column], this.boxes[boxNumber], this.cells, boxNumber);
        this.cells[row][column].setValue(value);

        defaultUnit.addValue(value);
    }

    public initializeBoard() {
        for(let i=0; i<board.width; i++) {
            for(let j=0; j<board.width; j++) {
                const cell = this.cells[i][j];
                if(cell.solved()) {
                    this.setValue(i, j, cell.getValue());
                }
            }
        }
    }
}