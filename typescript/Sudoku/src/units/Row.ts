import {Unit} from "./Unit";
import {Cell} from "../board/Cell";
import {board} from "../index";
import {PositionalCell} from "../board/PositionalCell";

export class Row extends Unit {
    constructor(cells: Cell[][], unitNumber: number) {
        super(cells, unitNumber);
    }

    protected removeCellsCandidates(value: string): any {
        this.execute((i: number, j: number, cell: Cell) => {
            const positionalCell = new PositionalCell(this.unitNumber, i, cell);
            positionalCell.removeCandidate(value);
        });
        /*
        for(let i=0; i<board.width; i++) {
            const cell = this.cells[this.unitNumber][i];
            cell.removeCandidate(value);
            if(cell.getCandidates().size == 1){
                board.singleCandidateCells.add(new PositionalCell(this.unitNumber, i, cell));
            }
        }

         */
    }

    findPairs(): Set<Cell> {
        const pair: Set<Cell> = new Set<Cell>();
        this.execute((i: number, j: number, cell: Cell) => {
            pair.add(cell);
        });

        return pair;
        /*
        const pair: Set<Cell> = new Set<Cell>();
        for(let i=0; i<board.width; i++) {
            const cell = this.cells[this.unitNumber][i];
            pair.add(cell);
        }
        return pair;

         */
    }

    private execute(callback: any) {
        for(let i=0; i<board.width; i++) {
            const cell = this.cells[this.unitNumber][i];
            callback(i, this.unitNumber, cell);
        }
    }

}
