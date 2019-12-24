import {Board} from "../board/Board";
import {Row} from "../units/Row";
import {Column} from "../units/Column";
import {Box} from "../units/Box";
import {Unit} from "../units/Unit";

export abstract class Strategy {
    execute(board: Board){
        board.getRows().forEach((row) => this.executeUnit(row));
        board.getColumns().forEach((column) => this.executeUnit(column));
        board.getBoxes().forEach((box) => this.executeUnit(box));
    }

    protected executeUnit(unit: Unit){};
}
