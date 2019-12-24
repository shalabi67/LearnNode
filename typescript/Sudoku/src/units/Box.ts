import {Unit} from "./Unit";
import {Cell} from "../board/Cell";
import {board} from "../index";
import {PositionalCell} from "../board/PositionalCell";

export class Box extends Unit {
    public static getBoxNumber(width: number, row: number, column: number): number {
        const rowBoxes = Math.sqrt(width);
        return Math.trunc(row/rowBoxes) * rowBoxes + Math.trunc(column /rowBoxes);
    }

    constructor(cells: Cell[][], unitNumber: number) {
        super(cells, unitNumber);
    }

    protected removeCellsCandidates(value: string): any {
        this.execute(null, (i: number, j: number, cell: Cell)=> {
            const positionalCell = new PositionalCell(i, j, cell);
            positionalCell.removeCandidate(value);
        })

        /*
        const rowBoxes = Math.sqrt(board.width);
        const startingRow = this.getStartingRow(rowBoxes);
        const startingColumn = this.getStartingColumn(rowBoxes);
        for(let i=startingRow; i<rowBoxes + startingRow; i++) {
            for(let j=startingColumn; j<rowBoxes + startingColumn; j++) {
                const cell = this.cells[i][j];
                cell.removeCandidate(value);
                if(cell.getCandidates().size == 1) {
                    board.singleCandidateCells.add(new PositionalCell(i, j, cell));
                }
            }
        }
         */
    }

    findPairs(): Set<Cell> {
        const pair: Set<Cell> = new Set<Cell>();
        this.execute(null, (i: number,j: number, cell: Cell) => {;
            pair.add(cell);
        })

        return pair;
        /*
        const rowBoxes = Math.sqrt(board.width);
        const startingRow = this.getStartingRow(rowBoxes);
        const startingColumn = this.getStartingColumn(rowBoxes);

        const pair: Set<Cell> = new Set<Cell>();
        for(let i=startingRow; i<rowBoxes + startingRow; i++) {
            for(let j=startingColumn; j<rowBoxes + startingColumn; j++) {
                const cell = this.cells[i][j];
                pair.add(cell);
            }
        }
        return pair;

         */
    }

    private execute(toReturn: any, callback: any): any {
        const rowBoxes = Math.sqrt(board.width);
        const startingRow = this.getStartingRow(rowBoxes);
        const startingColumn = this.getStartingColumn(rowBoxes);

        for(let i=startingRow; i<rowBoxes + startingRow; i++) {
            for(let j=startingColumn; j<rowBoxes + startingColumn; j++) {
                const cell = this.cells[i][j];
                callback(i, j, cell);
            }
        }
        return toReturn;
    }

    // what is the cells row this boy number belongs to
    private getStartingRow(rowBoxes: number) {
        return Math.trunc(this.unitNumber / rowBoxes) * rowBoxes;
    }

    // what is the cells column this boy number belongs to
    private getStartingColumn(rowBoxes: number) {
        return Math.trunc(this.unitNumber % rowBoxes) * rowBoxes;
    }
}
