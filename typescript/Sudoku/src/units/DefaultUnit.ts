import {Unit} from "./Unit";
import {Row} from "./Row";
import {Column} from "./Column";
import {Box} from "./Box";
import {Cell} from "../board/Cell";

// default unit is a unit that has rows, columns and boxes
export class DefaultUnit extends Unit {
    private row: Row;
    private column: Column;
    private box: Box;

    constructor(row: Row, column: Column, box: Box, cells: Cell[][], unitNumber: number) {
        super(cells, unitNumber);
        this.row = row;
        this.column = column;
        this.box = box;
    }

    public addValue(value: string) {
        this.row.addValue(value);
        this.column.addValue(value);
        this.box.addValue(value);
    }

    public deleteValue(value: string) {
        this.values.delete(value);
    }

    public removeCellsCandidates(value: string): any {
    }

    findPairs(): Set<Cell> {
        return new Set<Cell>();
    }

    public execute(callback: any) {}
}
