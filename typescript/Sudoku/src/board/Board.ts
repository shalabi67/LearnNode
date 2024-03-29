import {Cell} from "./Cell";
import {Row} from "../units/Row";
import {Column} from "../units/Column";
import {Box} from "../units/Box";
import {DefaultUnit} from "../units/DefaultUnit";
import {board} from "../index";
import {Strategy} from "../strategy/Strategy";
import {LastCandidate} from "../strategy/LastCandidate";
import {HiddenSingle} from "../strategy/HiddenSingle";
import {NakedPair} from "../strategy/NakedPair";
import {Unit} from "../units/Unit";

export class Board {
    public readonly width: number;
    public readonly defaultRow: string[];

    protected cells: Cell[][] = [];
    protected rows: Row[] = [];
    protected columns: Column[] = [];
    protected boxes: Box[] = [];

    private updated: boolean = true;

    protected strategies: Strategy[] = [];

    constructor(defaultRow: string[]) {
        this.width = defaultRow.length;
        this.defaultRow = defaultRow;

        this.strategies.push(new LastCandidate());
        this.strategies.push(new HiddenSingle());
        this.strategies.push(new LastCandidate());
        this.strategies.push(new NakedPair());
        this.strategies.push(new LastCandidate());

        for(let i=0; i<this.width; i++) {
            this.rows.push(new Row(this.cells, i)); // TODO: we can just send row cells no need to send all cells
            this.columns.push(new Column(this.cells, i)); // TODO: we can just send column cells no need to send all cells
            this.boxes.push(new Box(this.cells, i));
        }
    }

    getUnits(): Set<Unit[]> {
        const units = new Set<Unit[]>();
        units.add(this.rows);
        units.add(this.columns);
        units.add(this.boxes);

        return units;
    }

    setUpdated() {
        this.updated = true;
    }

    getRows(): Row[] {
        return this.rows;
    }

    getColumns(): Column[] {
        return this.columns;
    }

    getBoxes(): Box[] {
        return this.boxes;
    }

    addRow(rowNumber: number, row: string[]) {
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

    print() {
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

    // TODO: This method exposes bad design. it is recommended to change it to: setValue(cell: PositionalCell, value: string)
    setValue(row: number, column: number, value: string) {
        const boxNumber = Box.getBoxNumber(this.width, row, column);
        const defaultUnit = new DefaultUnit(this.rows[row], this.columns[column], this.boxes[boxNumber], this.cells, boxNumber);
        this.cells[row][column].setValue(value);

        defaultUnit.addValue(value);
    }

    initializeBoard() {
        for(let i=0; i<board.width; i++) {
            for(let j=0; j<board.width; j++) {
                const cell = this.cells[i][j];
                if(cell.solved()) {
                    this.setValue(i, j, cell.getValue());
                }
            }
        }

        this.solve();
    }

    solve() {
        while(this.updated) {
            this.updated = false;
            this.strategies.forEach((strategy) => {
                strategy.execute(this);
            });

        }
    }
}
