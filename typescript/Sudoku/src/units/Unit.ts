import {Cell} from "../board/Cell";
import {PositionalCell} from "../board/PositionalCell";

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

    public abstract removeCellsCandidates(value: string):any;

    public addValue(value: string) {
        this.values.add(value);
        this.removeCellsCandidates(value);
    }

    public deleteValue(value: string) {
        this.values.delete(value);
    }

    public abstract findPairs(): Set<Cell>;

    // TODO: This method need to be in Hidden Single strategy.
    public findHiddenSingle(): Set<PositionalCell> {
        // it is the one who has count = 1
        let map = new Map<string, number>();
        this.execute((i: number, j: number, cell: Cell) => {
            cell.getCandidates().forEach((candidate) => {
                let count = 1;
                if(map.has(candidate)) {
                    // @ts-ignore
                    count = map.get(candidate) + 1;
                }
                map.set(candidate, count);
            });
        });

        // find to which cell the candidate belongs. notice now it is unique candidate in the unit.
        let difference = new Set<string>();
        map.forEach((count, key, map1) => {
            if(count == 1) {
                difference.add(key);
            }
        });
        let cells = new Set<PositionalCell>();
        this.execute((i: number, j: number, cell: Cell) => {
            if(cell.getCandidates().size == 0) return;

            let candidates = [...difference].filter((value => cell.getCandidates().has(value)));
            if(candidates.length == 1) {  //validate it is a singlr hidden candidate.
                cell.setValue(candidates[0]);
                cells.add(new PositionalCell(i, j, cell));
            }
        });

        return cells;
    }

    findCellsByCandidates(candidates: Set<string>): Set<PositionalCell> {
        const cells = new Set<PositionalCell>();
        this.execute((i: number, j: number, cell: Cell) => {
            let intersection = [...candidates].filter((candidate) => cell.getCandidates().has(candidate));
            if(intersection.length === candidates.size && cell.getCandidates().size === candidates.size) {
                cells.add(new PositionalCell(i, j, cell));
            }
        });

        return cells;
    }

    // TODO: implementation of the lambda call back function uses row, column and cell. this is not good design and they should use PositionalCell.
    public abstract execute(callback: any): any;
}
