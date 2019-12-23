import {Cell} from "../board/Cell";

export abstract class Unit {
    //identify empty cell numbers
    protected emptyCells = new Set<number>();
    protected cells: Cell[][];
    protected unitNumber: number;

    constructor(cells: Cell[][], unitNumber: number) {
        this.cells = cells;
        this.unitNumber = unitNumber;
    }

    //values in this unit
    protected values: Set<string> = new Set();

    protected abstract removeCellsCandidates(value: string):any;

    public addValue(value: string) {
        this.values.add(value);
        this.removeCellsCandidates(value);
    }

    public deleteValue(value: string) {
        this.values.delete(value);
    }
}
