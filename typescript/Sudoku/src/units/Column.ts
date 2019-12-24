import {Unit} from "./Unit";
import {Cell} from "../board/Cell";
import {board} from "../index";
import {PositionalCell} from "../board/PositionalCell";

export class Column extends Unit {

    constructor(cells: Cell[][], unitNumber: number) {
        super(cells, unitNumber);
    }

    protected removeCellsCandidates(value: string): any {
        this.execute( (i: number, j: number, cell:Cell) => {
            cell.removeCandidate(value);
            if(cell.getCandidates().size == 1){
                board.singleCandidateCells.add(new PositionalCell(i, this.unitNumber, cell));
            }
        });
        /*
        for(let i=0; i<board.width; i++) {
            const cell = this.cells[i][this.unitNumber];
            cell.removeCandidate(value);
            if(cell.getCandidates().size == 1){
                board.singleCandidateCells.add(new PositionalCell(i, this.unitNumber, cell));
            }
        }

         */
    }

    findPairs(): Set<Cell> {
        const pair: Set<Cell> = new Set<Cell>();
        this.execute((i: number, j: number, cell: Cell) => {;
            pair.add(cell);
        });

        return pair;
        /*
        const pair: Set<Cell> = new Set<Cell>();
        for(let i=0; i<board.width; i++) {
            const cell = this.cells[i][this.unitNumber];
            pair.add(cell);
        }
        return pair;
         */
    }

    private execute(callback: any) {
        for(let i=0; i<board.width; i++) {
            const cell = this.cells[i][this.unitNumber];
            callback(i, this.unitNumber, cell);
        }
    }
}
