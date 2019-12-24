import {Board} from "../board/Board";

export abstract class Strategy {
    abstract execute(board: Board): any;
}
