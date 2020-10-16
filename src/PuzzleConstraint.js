export default class PuzzleConstraint {
    constructor(name = '', type = '', cells = [], value = null, constraint = null) {
        this.name = name;
        this.type = type;
        this.cells = cells;
        this.value = value;
        this.constraint = constraint;
    }

    toJSON() {
        let obj = {...this};
        if (this.constraint === null)
            delete obj.constraint;
        if (this.value === null)
            delete obj.value;
        return obj;
    }
}