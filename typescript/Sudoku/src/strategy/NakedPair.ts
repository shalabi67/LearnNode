import {Strategy} from "./Strategy";
import {Unit} from "../units/Unit";
import {Cell} from "../board/Cell";
import {board} from "../index";

export class NakedPair extends Strategy {
    executeUnit(unit: Unit) {
        const pairs = unit.findPairs();
        if(pairs.size < 2) return;

        const nakedCell = this.findNakedCell(pairs);
        if(nakedCell == null) {
            return;
        }

        nakedCell.getCandidates().forEach((candidate) => unit.removeCellsCandidates(candidate));
    }

    private findNakedCell(pairs: Set<Cell>): Cell | null {
        if(pairs.size === 0) {
            return null;
        }
        const pair = pairs.values().next().value;
        pairs.delete(pair);
        let equalPairs = new Set([...pairs].filter((cell) => this.areMatch(cell, pair)));
        if(equalPairs.size > 1) {
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
