import {Board} from "../board/Board";
import {Row} from "../units/Row";
import {Column} from "../units/Column";
import {Box} from "../units/Box";
import {Unit} from "../units/Unit";

export abstract class Strategy {
    execute(board: Board){
        board.getUnits().forEach((units) => units.forEach((row) => this.executeUnit(row)));
    }

    protected executeUnit(unit: Unit){};
}
