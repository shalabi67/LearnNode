import {Unit} from "./Unit";
import {Cell} from "../board/Cell";
import {board} from "../index";

export class Column extends Unit {

    constructor(cells: Cell[][], unitNumber: number) {
        super(cells, unitNumber);
    }

    protected removeCellsCandidates(value: string): any {
        for(let i=0; i<board.width; i++) {
            this.cells[i][this.unitNumber].removeCandidate(value);
        }
    }
}
