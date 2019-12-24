import {Cell} from "./Cell";
import {board} from "../index";
import {LastCandidate} from "../strategy/LastCandidate";

export class PositionalCell {
    public row: number;
    public column: number;
    public cell: Cell;


    constructor(row: number, column: number, cell: Cell) {
        this.row = row;
        this.column = column;
        this.cell = cell;
    }

    public removeCandidate(value: string) {
        if(this.cell.solved()) return;

        if(this.cell.getCandidates().size === 1) {
            LastCandidate.addLastCandidate(this);
            return;
        }
        this.cell.removeCandidate(value);
        if(this.cell.getCandidates().size === 0) {
            console.log("error");
            throw new Error('Remove last candidate')
        }

    }
}
