export class Cell {
    private candidates: Set<string> = new Set();
    private value: string = '';

    public solved(): boolean {
        return this.value != null && this.value != '';
    }

    public addCandidate(value: string) {
        this.candidates.add(value);
    }

    public removeCandidate(value: string) {
        this.candidates.delete(value);
    }

    public hasCandidate(value: string) {
        return this.candidates.has(value);
    }

    public getCandidates(): Set<String> {
        return this.candidates
    }

    public getValue(): string {
        return this.value;
    }

    public setValue(value: string) {
        return this.value = value;
    }

    public toString(): string {
        let value = this.value + '//';
        this.candidates.forEach((x)=> {value = `${value}, ${x}`});

        return value;
    }

}
