export abstract class Unit {
    //identify empty cell numbers
    protected emptyCells = new Set<number>();

    //values in this unit
    protected values: Set<string> = new Set();

    public addValue(value: string) {
        this.values.add(value);
    }

    public deleteValue(value: string) {
        this.values.delete(value);
    }
}
