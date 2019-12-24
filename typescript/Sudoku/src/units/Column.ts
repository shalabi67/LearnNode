import {Unit} from "./Unit";
import {Cell} from "../board/Cell";
import {board} from "../index";
import {PositionalCell} from "../board/PositionalCell";

export class Column extends Unit {

    constructor(cells: Cell[][], unitNumber: number) {
        super(cells, unitNumber);
    }

    public removeCellsCandidates(value: string): any {
        this.execute( (i: number, j: number, cell:Cell) => {
            const positionalCell = new PositionalCell(i, this.unitNumber, cell);
            positionalCell.removeCandidate(value);
        });
    }

    findPairs(): Set<Cell> {
        const pair: Set<Cell> = new Set<Cell>();
        this.execute((i: number, j: number, cell: Cell) => {
            if(cell.getCandidates().size == 2) {
                pair.add(cell);
            }
        });

        return pair;
    }

    public execute(callback: any) {
        for(let i=0; i<board.width; i++) {
            const cell = this.cells[i][this.unitNumber];
            callback(i, this.unitNumber, cell);
        }
    }
}
