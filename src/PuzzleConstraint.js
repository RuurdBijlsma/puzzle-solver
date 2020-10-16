export default class PuzzleConstraint {
    constructor(type = '', name = '', cells = [], value = null, constraint = null) {
        this.type = type;
        this.name = name;
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