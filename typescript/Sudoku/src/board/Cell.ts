import {board} from "../index";

export class Cell {
    private candidates: Set<string> = new Set<string>();
    private value: string;

    public constructor(value: string) {
        if(value === '') {
            board.defaultRow.forEach((v) => this.candidates.add(v));
        }
        this.value = value;
    }

    public solved(): boolean {
        return this.value != null && this.value !== '';
    }

    public addCandidate(value: string) {
        this.candidates.add(value);
    }

    public removeCandidate(value: string) {
        this.candidates.delete(value);
        board.setUpdated();
        if(this.getCandidates().size === 0) {
            console.log("error");
            throw new Error('Remove last candidate')
        }
    }

    public hasCandidate(value: string) {
        return this.candidates.has(value);
    }

    public getCandidates(): Set<string> {
        return this.candidates
    }

    public getValue(): string {
        return this.value;
    }

    public setValue(value: string) {
        board.setUpdated();
        this.candidates = new Set<string>();
        return this.value = value;
    }

    public toString(): string {
        let value = `(${this.value})//`;
        this.candidates.forEach((x)=> {value = `${value}, ${x}`});

        return value;
    }

    // This method will set values and candidates
    public reSetValues() {

    }

}
