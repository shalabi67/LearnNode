import {Strategy} from "./Strategy";
import {Unit} from "../units/Unit";
import {PositionalCell} from "../board/PositionalCell";
import {Board} from "../board/Board";

export class LastCandidate extends Strategy {
    private static singleCandidateCells: Set<PositionalCell> = new Set<PositionalCell>();
    public static addLastCandidate(positionalCell: PositionalCell) {
        LastCandidate.singleCandidateCells.add(positionalCell);
    }

    execute(board: Board): any {
        LastCandidate.singleCandidateCells.forEach((positionalCell) => {
            positionalCell.cell.getCandidates().forEach((value => {
                board.setValue(positionalCell.row, positionalCell.column, value);
            }));
            LastCandidate.singleCandidateCells.delete(positionalCell);
        });
    }

}
