import {Strategy} from "./Strategy";
import {Unit} from "../units/Unit";
import {board} from "../index";

export class HiddenSingle extends Strategy {
    executeUnit(unit: Unit) {
        // it can be found by intersection cell candidates in the unit with other cell candidates in the unit.
        const hiddenSingles = unit.findHiddenSingle();
        hiddenSingles.forEach((positionalCell) => board.setValue(positionalCell.row, positionalCell.column, positionalCell.cell.getValue()));
    }
}
