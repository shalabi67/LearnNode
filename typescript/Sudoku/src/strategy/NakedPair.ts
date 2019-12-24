import {Strategy} from "./Strategy";
import {Unit} from "../units/Unit";
import {Cell} from "../board/Cell";
import {board} from "../index";
import {PositionalCell} from "../board/PositionalCell";

export class NakedPair extends Strategy {
    executeUnit(unit: Unit) {
        const pairs = unit.findPairs();
        if(pairs.size < 2) return;

        const nakedCell = this.findNakedCell(pairs);
        if(nakedCell == null) {
            return;
        }

        const nakedPositionalCells = unit.findCellsByCandidates(nakedCell.getCandidates());
        unit.execute((i: number, j: number, cell: Cell) => {
            const currentPositionalCell = new PositionalCell(i, j, cell);
            // do nothing if cell has no candidates or it is on of the naked pairs
            if(cell.getCandidates().size===0 || this.isNakedCell(currentPositionalCell, nakedPositionalCells)) return;

            nakedCell.getCandidates().forEach((candidate) => currentPositionalCell.removeCandidate(candidate));
        });
    }

    private isNakedCell(currentPositionalCell: PositionalCell, nakedPositionalCells: Set<PositionalCell>): boolean {
        for(let cell of nakedPositionalCells) {
            if(currentPositionalCell.row === cell.row && currentPositionalCell.column === cell.column) {
                return true;
            }
        }

        return false;
    }

    private findNakedCell(pairs: Set<Cell>): Cell | null {
        if(pairs.size === 0) {
            return null;
        }
        const pair = pairs.values().next().value;
        pairs.delete(pair);
        let equalPairs = new Set([...pairs].filter((cell) => this.areMatch(cell, pair)));
        if(equalPairs.size >= 1) {
            return pair;
        }
        return this.findNakedCell(pairs);
    }

    private areMatch(cell1: Cell, cell2: Cell) {
        let difference = new Set(
            [...cell1.getCandidates()].filter(x => !cell2.getCandidates().has(x)));
        return difference.size == 0
    }
}
